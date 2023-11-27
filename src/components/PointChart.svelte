<script lang="ts">
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import type { ColorSpace } from '../geom/colorSpaces';
	import { RgbColor } from '../geom/colorSpaces';
	import type { Color } from '../geom/color';
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import type { Point3 } from '../geom/point';

	export let space: ColorSpace;
	export let colors: Color[];
	export let path: Point3[];

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

	let pathSegments: [Point3, Point3][] = [];
	$: {
		pathSegments = [];
		for (let i = 0; i < path.length - 1; i++) {
			pathSegments.push([path[i], path[i + 1]]);
		}
	}

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

	export let ballSize: number = 0.5;
	const ballSizeAnim = tweened(ballSize, { duration: 250, easing: cubicOut });
	$: $ballSizeAnim = ballSize;
</script>

<div class="chart">
	<SC.Canvas
		background={new THREE.Color(0x0c0c0c)}
		fog={new THREE.FogExp2(0x0c0c0c, 0.015)}
		antialias
		shadows
	>
		{#each colors as color (color.rgb().numeric())}
			<SC.Mesh
				geometry={new THREE.SphereGeometry($ballSizeAnim)}
				position={color.space(space).point().scale(10).values()}
				material={new THREE.MeshStandardMaterial({
					roughness: 0.6,
					metalness: 0.8,
					color: color.rgb().numeric()
				})}
				castShadow
			/>
		{/each}

		{#each pathSegments as [pointA, pointB] ([pointA, pointB])}
			{@const [displayA, displayB] = [pointA.scale(10), pointB.scale(10)]}
			{@const deltaVector = displayA.delta(displayB)}
			{@const distance = deltaVector.mag()}
			{@const position = displayA.add(deltaVector.scale(0.5)).values()}
			{@const rotation = deltaVector.rotationFromPoint(displayA)}
			<SC.Mesh
				geometry={new THREE.CylinderGeometry(0.08, 0.06, distance, 10)}
				material={new THREE.MeshStandardMaterial({
					roughness: 0.2,
					metalness: 0.8,
					color: 0xeeeeee
				})}
				{position}
				{rotation}
			/>
		{/each}

		<SC.PerspectiveCamera position={[5, 5, 20]} target={[5, 5, 5]} />

		<SC.AmbientLight intensity={0.5} />

		<SC.DirectionalLight intensity={0.8} position={[5, 5, 5]} />

		{#each rotations as rotation, index}
			{#each axisPositions[index] as position, axisIndex}
				{#if axisTextures[index]}
					<SC.Mesh
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
			<SC.Group position={[0, 0, 0]} rotation={[...rotation]}>
				<SC.Mesh
					geometry={new THREE.PlaneGeometry(50, 50)}
					material={new THREE.MeshStandardMaterial({ color: 'black' })}
					rotation={[-Math.PI / 2, 0, 0]}
					receiveShadow
				/>

				<SC.Primitive
					object={new THREE.GridHelper(50, 50, 0x444444, 0x555555)}
					position={[0, 0.001, 0]}
				/>
			</SC.Group>
		{/each}

		<SC.OrbitControls
			enableDamping
			maxPolarAngle={Math.PI * 0.51}
			maxDistance={30}
			enablePan={false}
			target={[5, 5, 5]}
		/>
	</SC.Canvas>
</div>

<style>
	.chart {
		position: relative;
		width: 100%;
		height: 100%;
	}
</style>
