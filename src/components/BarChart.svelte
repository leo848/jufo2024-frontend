<script lang="ts">
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';

	export let content: { value: number; highlight: boolean }[];

	let values: { value: number; highlight: boolean }[] = [];
	$: {
		values = new Array(content.length);
		content
			.map((o, index) => ({ ...o, index }))
			.toSorted((a, b) => a.value - b.value)
			.forEach(
				({ index, highlight }, accIndex) => (values[index] = { value: accIndex + 1, highlight })
			);
		content = content;
	}
</script>

<div class="chart">
	<SC.Canvas
		background={new THREE.Color('papayawhip')}
		fog={new THREE.FogExp2('papayawhip', 0.05)}
		antialias
		shadows
	>
		{#each values as { value, highlight }, index (value)}
			<SC.Mesh
				geometry={new THREE.CylinderGeometry(0.5, 0.5, value, 12)}
				position={[index * 1.1, value / 2 - 1, 0]}
				material={new THREE.MeshStandardMaterial({
					roughness: 0.3,
					metalness: 0.7,
					color: highlight ? 0xffaa00 : 0xcdcdcd
				})}
				castShadow
			/>
		{/each}
		<SC.PerspectiveCamera position={[3, 3, 10]} target={[3, 3, 0]} />

		<SC.AmbientLight intensity={0.2} />

		<SC.DirectionalLight intensity={0.8} position={[0, 0, 4]} />

		<SC.Group position={[0, -1 / 2, 0]}>
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

		<SC.OrbitControls enableDamping maxPolarAngle={Math.PI * 0.51} />
	</SC.Canvas>
</div>

<style>
	.chart {
		position: relative;
		width: 100%;
		height: 500px;
	}
</style>
