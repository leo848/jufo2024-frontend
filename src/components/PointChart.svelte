<script lang="ts">
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import type { ColorSpace } from '../geom/colorSpaces';
	import { RgbColor } from '../geom/colorSpaces';
	import type { Color } from '../geom/color';

	export let space: ColorSpace;
	export let colors: Color[];

	let axisTextures = new Array(3).fill(null).map((_, index) => {
		const spaced = new RgbColor(0, 0, 0).color().space(space);
		const comp = spaced.xyzComponents()[index];
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
				geometry={new THREE.SphereGeometry(0.5)}
				position={color.space(space).point().scale(10).position()}
				material={new THREE.MeshStandardMaterial({
					roughness: 0.6,
					metalness: 0.8,
					color: color.rgb().numeric()
				})}
				castShadow
			/>
		{/each}

		<SC.PerspectiveCamera position={[5, 5, 20]} target={[5, 5, 5]} />

		<SC.AmbientLight intensity={0.5} />

		<SC.DirectionalLight intensity={0.8} position={[5, 5, 5]} />

		{#each rotations as rotation, index}
			{#each axisPositions[index] as position, axisIndex}
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
