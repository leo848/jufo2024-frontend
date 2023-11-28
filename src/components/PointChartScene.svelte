<script lang="ts">
	import * as THREE from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import { T, extend, useThrelte } from '@threlte/core';
	import type { ColorSpace } from '../color/colorSpaces';
	import { RgbColor } from '../color/colorSpaces';
	import type { Color } from '../color/color';
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import type { Point3 } from '../geom/point';
	import { createEventDispatcher, type EventDispatcher } from 'svelte';

	extend({
		OrbitControls
	});

	const { renderer, renderMode } = useThrelte();

	renderMode.set('always');

	export let space: ColorSpace;
	export let colors: Color[];
	export let edges: [Point3, Point3, Color | undefined][];
	export let ballSize: number = 0.5;
	export let selection: {
		index: number;
		colorPickerOpen?: boolean;
		position: { x: number; y: number };
	} | null = null;

	let axisTextures = new Array(3).fill(null).map((_, index) => {
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

	const ballSizeAnim = tweened(ballSize, { duration: 250, easing: cubicOut });
	$: $ballSizeAnim = ballSize;

	let cameraPosition = [5, 5, 20] as [number, number, number];

	const dispatch: EventDispatcher<{ pick: number }> = createEventDispatcher();
	const raycaster = new THREE.Raycaster();

	export function tryPick(evt: MouseEvent) {
		selection = null;
	}

	/*background={new THREE.Color(0x0c0c0c)}
		fog={new THREE.FogExp2(0x0c0c0c, 0.015)}
		antialias
		shadows*/
</script>

{#each colors as color, index (color.rgb().numeric())}
	{@const selected = selection?.index === index}
	<T.Mesh
		geometry={new THREE.SphereGeometry($ballSizeAnim * (selected ? 1.1 : 1.0))}
		position={color.space(space).point().scale(10).values()}
		material={new THREE.MeshStandardMaterial({
			roughness: selected ? 0.5 : 0.6,
			metalness: selected ? 0 : 0.8,
			color: color.rgb().numeric()
		})}
		castShadow
	/>
{/each}

{#each edges as [pointA, pointB] ([pointA, pointB])}
	{@const [displayA, displayB] = [pointA.scale(10), pointB.scale(10)]}
	{@const deltaVector = displayA.delta(displayB)}
	{@const distance = deltaVector.mag()}
	{@const position = displayA.add(deltaVector.scale(0.5)).values()}
	{@const rotation = deltaVector.rotationFromPoint(displayA)}
	<T.Mesh {position} {rotation}>
		<T.CylinderGeometry args={[0.08, 0.06, distance, 10]} />
		<T.MeshStandardMaterial roughness={0.2} metalness={0.8} color={0xeeeeee} />
	</T.Mesh>
{/each}

<T.AmbientLight intensity={0.5} />

<T.DirectionalLight intensity={0.8} position={[5, 5, 5]} />

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

		<!-- <T is={new THREE.GridHelper(50, 50, 0x444444, 0x555555)} position={[0, 0.001, 0]} /> -->
		<T
			is={THREE.GridHelper}
			args={[10, 10, 0x444444, 0x555555]}
			position={[...gridPositions[index]]}
		/>
	</T.Group>
{/each}

<T.PerspectiveCamera let:ref makeDefault position={cameraPosition} target={[5, 5, 5]}>
	<T.OrbitControls
		args={[ref, renderer.domElement]}
		maxPolarAngle={Math.PI * 0.51}
		maxDistance={30}
		enablePan={false}
		target={[5, 5, 5]}
	/>
</T.PerspectiveCamera>
