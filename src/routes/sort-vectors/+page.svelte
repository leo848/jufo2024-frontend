<script lang="ts">
	import { title } from '../../ui/navbar';
	import PathAlgorithms from '../../components/PathAlgorithms.svelte';
	import { Card } from 'flowbite-svelte';
	import * as Icon from 'flowbite-svelte-icons';
	import { registerCallback, unregisterCallback } from '../../server/websocket';
	import { serverOutputPathCreation, serverOutputPathImprovement } from '../../server/types';
	import { onDestroy } from 'svelte';
	import { flip } from 'svelte/animate';
	import PathProperties from '../../components/PathProperties.svelte';

	title.set('Vektoren sortieren');

	let dim = 3;
	let data: number[][] = randomVectors(dim, 10);
	$: length = data.length;

	let path: number[][] | null = null;
	let edges: [number[], number[]][] = [];

	let scrollElement: HTMLElement;
	$: duplicates = data.some((v1, i1) => data.some((v2, i2) => i1 != i2 && vectorEquals(v1, v2)));

	let invalidateAlgorithms: () => void;
	function blowUp() {
		path = null;
		edges = [];
		invalidateAlgorithms();
	}

	function setValue(evt: { currentTarget: HTMLInputElement }, i: number, comp: number) {
		let elt = evt.currentTarget;
		data[i][comp] = +elt.value;
	}

	function randomVectors(dim: number, amount: number): number[][] {
		let vectors: number[][] = [];
		while (vectors.length < amount) {
			vectors.push([]);
			for (let comp = 0; comp < dim; comp++) {
				vectors[vectors.length - 1].push(Math.floor(Math.random() * 10));
			}
			for (let i = 0; i < vectors.length - 1; i++) {
				const vector = vectors[i];
				let equal = true;
				for (let comp = 0; comp < dim; comp++) {
					if (vector[comp] !== vectors[vectors.length - 1][comp]) {
						equal = false;
						break;
					}
				}
				if (equal) {
					vectors.pop();
					break;
				}
			}
		}
		return vectors;
	}

	function emptyVector(dim: number): number[] {
		let vector = [];
		for (let i = 0; i < dim; i++) {
			vector.push(0);
		}
		return vector;
	}

	function vectorEquals(v1: number[], v2: number[]) {
		for (let i = 0; i < v1.length; i++) {
			if (v1[i] !== v2[i]) return false;
		}
		return true;
	}

	function addEmptyVector() {
		data = [...data, emptyVector(dim)];
		requestAnimationFrame(() =>
			scrollElement.scrollTo({ behavior: 'smooth', left: scrollElement.scrollWidth, top: 0 })
		);
	}

	function getName(index: number): string {
		return length > 26 || index > 25 ? `v<sub>${index + 1}</sub>` : String.fromCharCode(97 + index);
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
	<div class="flex-row flex gap-4 overflow-x-scroll" bind:this={scrollElement}>
		<div class="flex-col flex p-2 gap-2 rounded self-end">
			<div class="text-4xl text-center" />
			{#each { length: dim } as _, comp}
				<div class="bg-gray-800 text-white text-2xl py-2 px-4 rounded">x<sub>{comp + 1}</sub></div>
			{/each}
		</div>
		{#each data as vector, index (vector.join(',') + (duplicates ? `index${index}` : ''))}
			{@const name = getName(index)}
			<div class="bg-gray-800 flex-col flex p-2 gap-2 rounded" animate:flip>
				<div class="text-4xl text-gray-300 text-center mb-2">{@html name}</div>
				{#each vector as _, comp}
					<input
						type="number"
						step="0.00001"
						class="w-20 px-4 py-2 text-2xl text-white bg-gray-700 border-none rounded overflow-hidden text-center"
						value={data[index][comp]}
						on:change={(evt) => setValue(evt, index, comp)}
					/>
				{/each}
			</div>
		{/each}
		<button
			class="bg-gray-800 flex-col flex p-2 gap-2 rounded opacity-50"
			on:click={addEmptyVector}
		>
			<div class="text-4xl text-gray-300 text-center mb-2">
				{@html getName(length)}
			</div>
			{#each { length: dim } as _}
				<input
					type="number"
					class="bg-gray-700 text-white text-2xl py-2 px-4 rounded w-20 text-center"
					value={0}
				/>
			{/each}
		</button>
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

<style>
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		/* display: none; <- Crashes Chrome on hover */
		-webkit-appearance: none;
		margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
	}

	input[type='number'] {
		-moz-appearance: textfield; /* Firefox */
		appearance: textfield;
	}
</style>
