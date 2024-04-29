<script lang="ts">
	import * as THREE from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import { T, extend, useThrelte } from '@threlte/core';
	import type { ColorSpace } from '../../color/colorSpaces';
	import { RgbColor } from '../../color/colorSpaces';
	import type { Color } from '../../color/color';
	import { cubicOut, quadIn, quadInOut } from 'svelte/easing';
	import { Point3, axes } from '../../geom/point';
	import { createEventDispatcher, onMount } from 'svelte';
	import { type Tweened, tweened } from 'svelte/motion';
	import type { TrueDistanceType } from '../../geom/dist';
	import { dark } from '../../ui/darkmode';

	extend({
		OrbitControls
	});

	export let projection: 'orthographic' | 'perspective' = 'orthographic';
	export let metric: TrueDistanceType;
	export let space: ColorSpace;
	export let colors: Color[];
	export let edges: [Point3, Point3, Color | undefined][];
	export let ballSize: number = 0.5;
	export let selectedIndex: number | null = null;
	export let colorsAnim: boolean;
	export let edgesAnim: boolean = true;
	export let animDuration: number = 500;

	export let canvas: HTMLCanvasElement;

	const { renderer, renderMode, advance } = useThrelte();

	const ballSizeAnim = tweened(ballSize, { duration: 250, easing: cubicOut });
	$: $ballSizeAnim = ballSize;

	renderMode.set('manual');
	$: colors,
		edges,
		space,
		projection,
		$ballSizeAnim,
		selectedIndex,
		$displayPoints,
		$displayEdges,
		advance();
	canvas.addEventListener('resize', advance);

	$: axisTextures = new Array(3).fill(null).map((_, index) => {
		const spaced = new RgbColor(0, 0, 0).color().space(space);
		const comp = spaced.xyzComponents()[index];
		if (comp === null) return null;
		if (!spaced.isComponent(comp)) throw new Error('invalid');
		const gradient = spaced.gradientTexture(comp as never);
		const texture = new THREE.Texture(gradient);
		texture.needsUpdate = true;
		return texture;
	});

	const rotations = [
		[0, 0, -Math.PI / 2],
		[0, Math.PI / 2, 0],
		[Math.PI / 2, 0, 0]
	] as const;
	$: axisPositions = [
		[
			[5, 0, 0],
			[5, 0, 10],
			[5, 10, 0],
			[5, 10, 10]
		],
		[
			[0, 5, 0],
			[10, 5, 0],
			[0, 5, 10],
			[10, 5, 10]
		],
		[
			[0, 0, 5],
			[10, 0, 5],
			[0, 10, 5],
			[10, 10, 5]
		]
	] as const;
	const gridPositions = [
		[-5, 0.001, 5],
		[-5, 0.001, 5],
		[5, 0.001, -5]
	] as const;

	for (const evtTypeSuffix of ['move', 'down', 'up', 'enter', 'leave']) {
		const evtType = 'mouse' + evtTypeSuffix;
		canvas.addEventListener(evtType, advance);
	}
	for (const evtTypeSuffix of ['start', 'end', 'cancel', 'move']) {
		const evtType = 'touch' + evtTypeSuffix;
		canvas.addEventListener(evtType, advance);
	}
	canvas.addEventListener('wheel', advance);

	let displayPoints: Tweened<{ point: Point3; color: Color }[]> = tweened(undefined, {
		duration: 500,
		easing: quadInOut,
		interpolate(a: { point: Point3; color: Color }[], b: { point: Point3; color: Color }[]) {
			const noAnim = () => b;
			if (!colorsAnim) return noAnim;
			if (a.length + 1 === b.length && a.length !== 0) {
				return (t) => {
					const copy = b.slice();
					const last = copy[copy.length - 1];
					const nextToLast = copy[copy.length - 2];

					copy[copy.length - 1] = {
						point: nextToLast.point.add(nextToLast.point.delta(last.point).scale(t)),
						color: last.color
					};
					return copy;
				};
			}
			if (a.length != b.length) return noAnim;
			return (t) => {
				return a.map((valueA, index) => {
					const valueB = b[index];
					if (valueA.point.equals(valueB.point)) return valueB;
					return {
						point: valueA.point.add(valueA.point.delta(valueB.point).scale(t)),
						color: valueB.color
					};
				});
			};
		}
	});

	$: {
		displayPoints.set(
			colors.map((color) => ({ point: color.space(space).point().scale(10), color }))
		);
	}

	let displayEdges: Tweened<[Point3, Point3, Color | undefined][]> = tweened(undefined, {
		duration(a: [Point3, Point3, Color | undefined][], b: [Point3, Point3, Color | undefined][]) {
			if (a == null || b == null) return 0;
			if (!edgesAnim) return 0;
			if (a.length + 1 === b.length) return animDuration;
			if (b.length === 0 || a.length === 0) return 1000;
			if (a.length !== b.length) return 0;
			return animDuration;
		},
		easing: quadInOut,
		interpolate(
			a: [Point3, Point3, Color | undefined][],
			b: [Point3, Point3, Color | undefined][]
		) {
			const noAnim = () => b;
			if (!edgesAnim) return noAnim;
			if (b.length === 0) {
				return (tRaw) => {
					let t = quadIn(tRaw);
					return a.map((value) => {
						return [
							value[0].add(value[0].delta(new Point3(value[0].x, -0.5, value[0].z)).scale(t)),
							value[1].add(value[1].delta(new Point3(value[0].x, -0.5, value[0].z)).scale(t)),
							undefined
						];
					});
				};
			}
			if (a.length + 1 === b.length) {
				if (a.some((edge, i) => !(edge[0].equals(b[i][0]) && edge[1].equals(b[i][1])))) {
					let firstDifferentEdge = a.findIndex(
						(edge, i) => !(edge[0].equals(b[i][0]) && edge[1].equals(b[i][1]))
					);
					return (t) => {
						const copy = b.slice();
						copy[firstDifferentEdge] = [
							a[firstDifferentEdge][0],
							a[firstDifferentEdge][0]
								.lerpTo(a[firstDifferentEdge][1], 0.5)
								.lerpTo(b[firstDifferentEdge][1], t),
							undefined
						];
						copy[firstDifferentEdge + 1] = [
							a[firstDifferentEdge][0]
								.lerpTo(a[firstDifferentEdge][1], 0.5)
								.lerpTo(b[firstDifferentEdge][1], t),
							a[firstDifferentEdge][1],
							undefined
						];
						return copy;
					};
				} else {
					return (t) => {
						const copy = b.slice();
						const last = copy[copy.length - 1];
						copy[copy.length - 1] = [
							last[0],
							last[0].add(last[0].delta(last[1]).scale(t)),
							undefined
						];
						return copy;
					};
				}
			}
			if (a.length === 0) {
				return (tRaw) => {
					let t = quadIn(tRaw);
					return b.map((value) => {
						return [
							value[0].add(value[0].delta(value[1]).scale(1 / 2 - t / 2)),
							value[1].add(value[1].delta(value[0]).scale(1 / 2 - t / 2)),
							undefined
						];
					});
				};
			}
			if (a.length != b.length) return noAnim;
			return (t) => {
				return a.map((valueA, index) => {
					const valueB = b[index];
					return [
						valueA[0].add(valueA[0].delta(valueB[0]).scale(t)),
						valueA[1].add(valueA[1].delta(valueB[1]).scale(t)),
						undefined
					];
				});
			};
		}
	});
	$: {
		displayEdges.set(edges);
	}

	let cameraPosition: [number, number, number] = [5, 5, 20];
	let cameraRefOrth: THREE.OrthographicCamera;
	let cameraRefPers: THREE.PerspectiveCamera;

	let meshes: (undefined | THREE.Mesh)[] = new Array(colors.length).fill(undefined);

	const raycaster = new THREE.Raycaster();

	const dispatch = createEventDispatcher<{
		pick: { index: number; position: { x: number; y: number } } | null;
	}>();

	let mounted = false;
	onMount(() => (mounted = true));

	export function getHoveredIndex(evt: MouseEvent): number | null {
		const rect = canvas.getBoundingClientRect();
		const canvasRelativePos = {
			x: ((evt.clientX - rect.left) * canvas.width) / rect.width,
			y: ((evt.clientY - rect.top) * canvas.height) / rect.height
		};
		const pickPos = {
			x: (canvasRelativePos.x / canvas.width) * 2 - 1,
			y: (canvasRelativePos.y / canvas.height) * -2 + 1
		};

		raycaster.setFromCamera(
			new THREE.Vector2(pickPos.x, pickPos.y),
			projection === 'orthographic' ? cameraRefOrth : cameraRefPers
		);
		const intersectedObjects = raycaster.intersectObjects(
			meshes.filter((m) => m != null).map((m) => m as THREE.Mesh)
		);

		if (intersectedObjects.length >= 1) {
			const point = intersectedObjects[0].object.position;

			const index = colors.findIndex((p) => {
				let diff = p
					.space(space)
					.point()
					.scale(10)
					.delta(new Point3(point.x, point.y, point.z))
					.mag();
				return diff < 0.01;
			});

			if (index !== -1) {
				return index;
			} else return null;
		} else return null;
	}

	export function tryPick(evt: MouseEvent) {
		dispatch('pick', null);

		const index = getHoveredIndex(evt);
		if (index === selectedIndex) {
			dispatch('pick', null);
			return;
		}

		dispatch('pick', {
			index: index ?? -1,
			position: { x: evt.clientX + 5, y: evt.clientY + 5 }
		});
	}

	requestAnimationFrame(advance);

	/*background={new THREE.Color(0x0c0c0c)}
		fog={new THREE.FogExp2(0x0c0c0c, 0.015)}
		antialias
		shadows*/
</script>

{#each $displayPoints as { point, color }, index (color.rgb().numeric())}
	{@const selected = selectedIndex === index}
	{#if selected}
		{#each axes as comp}
			{@const end = point.with(0, comp)}
			{@const deltaVector = point.delta(end)}
			{@const distance = deltaVector.mag()}
			{@const position = point.add(deltaVector.scale(0.5)).values()}
			{@const rotation = deltaVector.rotationFromPoint(point)}
			<T.Mesh {position} {rotation}>
				<T.CylinderGeometry args={[0.1, 0.08, distance, 10]} />
				<T.MeshStandardMaterial roughness={0.8} metalness={0.2} color={0xffffff} />
			</T.Mesh>
		{/each}
	{/if}
	{#if mounted}
		<!-- Reaktivität – für #19 -->
		<T.Mesh
			geometry={new THREE.SphereGeometry($ballSizeAnim * (selected ? 1.1 : 1.0))}
			position={point.values()}
			material={new THREE.MeshStandardMaterial({
				roughness: selected ? 0.5 : 0.6,
				metalness: selected ? 0 : 0.8,
				color: color.rgb().numeric()
			})}
			bind:ref={meshes[index]}
			castShadow
		/>
	{/if}
{/each}

{#each $displayEdges as [pointA, pointB] ([pointA, pointB])}
	{@const [displayA, displayB] = [pointA.scale(10), pointB.scale(10)]}
	{#if metric.norm === 'euclidean'}
		{@const deltaVector = displayA.delta(displayB)}
		{@const distance = deltaVector.mag()}
		{@const position = displayA.add(deltaVector.scale(0.5)).values()}
		{@const rotation = deltaVector.rotationFromPoint(displayA)}
		<T.Mesh {position} {rotation}>
			<T.CylinderGeometry args={[0.08, 0.06, distance, 10]} />
			<T.MeshStandardMaterial roughness={0.2} metalness={0.8} color={0xffffff} />
		</T.Mesh>
	{:else}
		{@const distances = axes.map((axis) => displayA[axis] - displayB[axis])}
		{@const maxIndex = distances.findIndex(
			(comp) => Math.abs(Math.abs(comp) - Math.max(...distances.map(Math.abs))) < 0.0001
		)}
		{#each axes as axis, index}
			{@const position = displayA
				.map((n, _, axIdx) => {
					if (axIdx < index) return n - distances[axIdx];
					else if (axIdx == index) return n - distances[axIdx] / 2;
					else return n;
				})
				.values()}
			{@const rotation = rotations[index]}
			{@const maxFactor = metric.norm === 'max' ? (index !== maxIndex ? 0.4 : 1) : 1}
			<T.Mesh {position} rotation={[rotation[0], rotation[1], rotation[2]]}>
				<T.CylinderGeometry
					args={[0.09 * maxFactor, 0.075 * maxFactor, displayA[axis] - displayB[axis], 10]}
				/>
				<T.MeshStandardMaterial roughness={0.2} metalness={0.8} color={0xffffff} />
			</T.Mesh>
		{/each}
	{/if}
{/each}

<T.AmbientLight intensity={$dark ? 0.5 : 2} />

{#each [0, 5, 10] as x}
	{#each [0, 5, 10] as y}
		{#each [0, 5, 10] as z}
			<T.DirectionalLight intensity={0.2} position={[x, y, z]} />
		{/each}
	{/each}
{/each}

{#each rotations as rotation, index}
	{#each axisPositions[index] as position, axisIndex}
		{#if axisTextures[index]}
			<T.Mesh
				geometry={new THREE.CylinderGeometry(0.2, 0.15, 10, 12)}
				position={[...position]}
				rotation={[...rotation]}
				material={new THREE.MeshBasicMaterial({
					map: axisTextures[index],
					opacity: axisIndex === 0 ? 1 : axisIndex === 3 ? 0.1 : 0.25,
					transparent: axisIndex !== 0
				})}
			/>
		{/if}
	{/each}
	<T.Group position={[0, 0, 0]} rotation={[...rotation]}>
		<T.Mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow />

		<T
			is={THREE.GridHelper}
			args={[10, 10, $dark ? 0x444444 : 0xaaaaaa, $dark ? 0x555555 : 0xcccccc]}
			position={[...gridPositions[index]]}
		/>
	</T.Group>
{/each}

{#if projection == 'orthographic'}
	<T.OrthographicCamera
		args={[canvas.width / -2, canvas.width / 2, canvas.height / 2, canvas.height / -2, 1, 100]}
		bind:ref={cameraRefOrth}
		zoom={25}
		let:ref
		makeDefault
		position={cameraPosition}
		target={[5, 5, 5]}
	>
		<T.OrbitControls
			args={[ref, renderer.domElement]}
			maxPolarAngle={Math.PI * 0.51}
			maxDistance={10}
			enablePan={false}
			target={[5, 5, 5]}
		/>
	</T.OrthographicCamera>
{:else if projection == 'perspective'}
	<T.PerspectiveCamera
		bind:ref={cameraRefPers}
		let:ref
		makeDefault
		position={cameraPosition}
		target={[5, 5, 5]}
	>
		<T.OrbitControls
			args={[ref, renderer.domElement]}
			maxPolarAngle={Math.PI * 0.51}
			maxDistance={25}
			enablePan={false}
			target={[5, 5, 5]}
		/>
	</T.PerspectiveCamera>
{/if}
