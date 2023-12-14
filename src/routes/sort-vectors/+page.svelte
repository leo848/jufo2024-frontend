<script lang="ts">
	import { title } from '../../ui/navbar';
	import type { Point3 } from '../../geom/point';
	import PathProperties from '../../components/PathProperties.svelte';
	import PathAlgorithms from '../../components/PathAlgorithms.svelte';
	import { Card } from 'flowbite-svelte';
	import * as Icon from 'flowbite-svelte-icons';
	import { registerCallback, unregisterCallback } from '../../server/websocket';
	import { serverOutputPathCreation, serverOutputPathImprovement } from '../../server/types';
	import { onDestroy } from 'svelte';
	import { flip } from 'svelte/animate';

	title.set('Vektoren sortieren');

	let dim = 3;
	let data: number[][] = randomVectors(dim, 30);
	$: length = data.length;

	let path: number[][] | null = null;
	let edges: [number[], number[]][] = [];

	let invalidateAlgorithms: () => void;

	function blowUp() {
		path = null;
		edges = [];
		invalidateAlgorithms();
	}

	function randomVectors(dim: number, amount: number): number[][] {
		let vectors: number[][] = [];
		for (let i = 0; i < amount; i++) {
			vectors.push([]);
			for (let comp = 0; comp < dim; comp++) {
				vectors[i].push(Math.floor(Math.random() * 10));
			}
		}
		return vectors;
	}

	function getName(index: number): string {
		return length > 26 ? `v<sub>${index + 1}</sub>` : String.fromCharCode(97 + index);
	}

	function pathToEdges(path: number[][]): [number[], number[]][] {
		let edges = [];
		for (let i = 0; i < path.length - 1; i++) {
			edges.push([path[i], path[i + 1]] as [number[], number[]]);
		}
		return edges;
	}

	let callbackIdCreation = registerCallback(serverOutputPathCreation, (pc) => {
		path = null;
		if (pc.donePath) {
			path = pc.donePath;
			edges = pathToEdges(pc.donePath);
			data = pc.donePath;
		} else {
			edges = pc.currentEdges;
		}
	});
	onDestroy(() => unregisterCallback(callbackIdCreation));

	let callbackIdImprovement = registerCallback(serverOutputPathImprovement, (pi) => {
		edges = pathToEdges(pi.currentPath);
		path = pi.currentPath;
		if (pi.done) {
			data = pi.currentPath;
		}
	});
	onDestroy(() => unregisterCallback(callbackIdImprovement));
</script>

<div class="mt-4 pb-10 mx-10">
	<div class="flex-row flex gap-4 overflow-x-scroll">
		<div class="flex-col flex p-2 gap-2 rounded self-end">
			<div class="text-4xl text-center" />
			{#each { length: dim } as _, comp}
				<div class="bg-gray-800 text-white text-2xl py-2 px-4 rounded">x<sub>{comp + 1}</sub></div>
			{/each}
		</div>
		{#each data as vector, index (vector.join(','))}
			{@const name = getName(index)}
			<div class="bg-gray-800 flex-col flex p-2 gap-2 rounded" animate:flip>
				<div class="text-4xl text-gray-300 text-center mb-2">{@html name}</div>
				{#each vector as _, comp}
					<input
						class="bg-gray-700 text-white text-2xl py-2 px-4 rounded w-20 text-center"
						bind:value={data[index][comp]}
					/>
				{/each}
			</div>
		{/each}
	</div>
	<div
		class="mt-8 grid grid-cols-12 gap-8 auto-cols-max align-stretch justify-stretch justify-items-stretch"
	>
		<Card class="rounded-xl col-span-12 xl:col-span-5 max-w-none xl:p-0 mb-0">
			<div
				class="text-2xl xl:text-3xl dark:text-white bg-gray-700 p-4 rounded-t-xl flex flex-row justify-between items-center"
			>
				<div>Ansicht des Graphen</div>
				<button class="bg-gray-600 rounded-xl p-2" disabled><Icon.CogOutline /></button>
			</div>
		</Card>

		<PathProperties {path} {length} />

		<PathAlgorithms
			on:deletePath={() => (path = null)}
			bind:invalidate={invalidateAlgorithms}
			dimensions={dim}
			points={data}
		/>
	</div>
</div>
