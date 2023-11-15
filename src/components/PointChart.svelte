<script lang="ts">
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import type { ColorSpace } from '../geom/colorSpaces';
	import type { Color } from '../geom/color';

	export let space: ColorSpace;
	export let colors: Color[];

	const rotations = [
		[Math.PI / 2, 0, 0],
		[0, Math.PI / 2, 0],
		[0, 0, -Math.PI / 2]
	] as const;
</script>

<div class="chart">
	<SC.Canvas
		background={new THREE.Color('papayawhip')}
		fog={new THREE.FogExp2('papayawhip', 0.05)}
		antialias
		shadows
	>
		{#each colors as color (color.rgb().numeric())}
			<SC.Mesh
				geometry={new THREE.SphereGeometry(0.05)}
				position={color.space(space).point().position()}
				material={new THREE.MeshStandardMaterial({
					roughness: 0.6,
					metalness: 0.8,
					color: color.rgb().numeric()
				})}
				castShadow
			/>
		{/each}

		<SC.PerspectiveCamera position={[0.5, 0.5, 3]} target={[0.5, 0.5, 0]} />

		<SC.AmbientLight intensity={0.5} />

		<SC.DirectionalLight intensity={0.8} position={[0.5, 0.5, 0.5]} />

		{#each rotations as rotation}
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
			maxDistance={4}
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
