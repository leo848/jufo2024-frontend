<script lang="ts">
	import * as THREE from 'three';
	import { T, extend, useThrelte } from '@threlte/core';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

	const { renderer, renderMode } = useThrelte();

	extend({
		OrbitControls
	});

	renderMode.set('always');

	export let content: { value: number; highlight?: 'compare' | 'swap' | 'correct' }[];

	let values: { value: number; highlight?: 'compare' | 'swap' | 'correct' }[] = [];
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

	function material(highlight: 'compare' | 'swap' | 'correct' | undefined): THREE.Material {
		return new THREE.MeshStandardMaterial({
			roughness: 0.56,
			metalness: 0.7,
			color:
				highlight === 'compare'
					? 0xffaa00
					: highlight === 'swap'
					? 0xff66cc
					: highlight === 'correct'
					? 0x00ff44
					: 0xcdcdcd
			/* reflectivity: .5,
			combine: THREE.MixOperation, */
		});
	}

	$: len = values.length;

	function position(index: number, value: number): [number, number, number] {
		return [(index + 1 / 2) / (len + 1) + index / len / len, value / len / 2 - 1 / 2, 0];
	}

	let lightPositions: [number, number, number][] = [[0, 0, 0.3]];
</script>

{#each values as { value, highlight }, index (value)}
	<T.Mesh
		geometry={new THREE.CylinderGeometry(1 / len / 2, 1 / len / 2, value / len, 12)}
		position={position(index, value)}
		material={material(highlight)}
		castShadow
	/>
{/each}
<T.PerspectiveCamera position={[0.5, 0.5, 3]} target={[0.5, 0.5, 0]} />

<T.AmbientLight intensity={0.5} />

{#each lightPositions as position}
	<T.DirectionalLight intensity={0.8} {position} />
{/each}

<T.Group position={[0, -1 / 2, 0]}>
	<T.Mesh
		geometry={new THREE.PlaneGeometry(50, 50, len, len)}
		material={new THREE.MeshStandardMaterial({ color: 'black' })}
		rotation={[-Math.PI / 2, 0, 0]}
		receiveShadow
	/>

	<T is={new THREE.GridHelper(50, 50, 0x444444, 0x555555)} position={[0, 0.001, 0]} />
</T.Group>

background={new THREE.Color('papayawhip')}
fog={new THREE.FogExp2('papayawhip', 0.05)}
antialias shadows >
{#each values as { value, highlight }, index (value)}
	<T.Mesh
		geometry={new THREE.CylinderGeometry(1 / len / 2, 1 / len / 2, value / len, 12)}
		position={position(index, value)}
		material={material(highlight)}
		castShadow
	/>
{/each}

<T.AmbientLight intensity={0.5} />

{#each lightPositions as position}
	<T.DirectionalLight intensity={0.8} {position} />
{/each}

<T.Group position={[0, -1 / 2, 0]}>
	<T.Mesh
		geometry={new THREE.PlaneGeometry(50, 50, len, len)}
		material={new THREE.MeshStandardMaterial({ color: 'black' })}
		rotation={[-Math.PI / 2, 0, 0]}
		receiveShadow
	/>

	<T is={new THREE.GridHelper(50, 50, 0x444444, 0x555555)} position={[0, 0.001, 0]} />
</T.Group>

<T.PerspectiveCamera let:ref makeDefault position={[0.5, 0.5, 3]} target={[0.5, 0.5, 0.5]}>
	<T.OrbitControls
		args={[ref, renderer.domElement]}
		maxPolarAngle={Math.PI * 0.51}
		maxDistance={2}
		enablePan={false}
		target={[0.5, 0.0, 0.0]}
	/>
</T.PerspectiveCamera>
