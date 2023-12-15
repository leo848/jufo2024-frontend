<script lang="ts">
	import { title } from '../../ui/navbar';
	import PathAlgorithms from '../../components/PathAlgorithms.svelte';
	import { Card } from 'flowbite-svelte';
	import * as Icon from 'flowbite-svelte-icons';
	import { registerCallback, unregisterCallback } from '../../server/websocket';
	import { serverOutputPathCreation, serverOutputPathImprovement } from '../../server/types';
	import type { NamedVector } from '../../physics/vector';
	import { onDestroy } from 'svelte';
	import { flip } from 'svelte/animate';
	import PathProperties from '../../components/PathProperties.svelte';
	import ForceDirectedGraph from '../../components/ForceDirectedGraph.svelte';

	title.set('Vektoren sortieren');

	let dim = 4;

	function incrementDim() {
		dim += 1;
		for (let i = 0; i < length; i++) {
			data[i].inner = vectorLength(data[i].inner, dim);
		}
	}

	let data: NamedVector[] = randomVectors(dim, 8);
	$: length = data.length;
	$: points = data.map((p) => {
		return { ...p, inner: vectorLength(p.inner, dim) };
	});

	let path: number[][] | null = null;
	let edges: [number, number][] = [];

	let scrollElement: HTMLElement;
	$: duplicates = data.some((v1, i1) =>
		data.some((v2, i2) => i1 != i2 && vectorEquals(v1.inner, v2.inner))
	);

	let invalidateAlgorithms: () => void;
	function blowUp() {
		path = null;
		edges = [];
		invalidateAlgorithms();
	}

	function setValue(evt: { currentTarget: HTMLInputElement }, i: number, comp: number) {
		let elt = evt.currentTarget;
		data[i].inner[comp] = +elt.value;
	}

	function vectorLength(v: number[], dim: number): number[] {
		if (v.length >= dim) {
			return v.slice(0, dim);
		} else {
			let arr = v.slice();
			while (arr.length < dim) arr.push(0);
			return arr;
		}
	}

	function randomVectors(dim: number, amount: number): NamedVector[] {
		let vectors: NamedVector[] = [];
		while (vectors.length < amount) {
			let namedVector: NamedVector = { inner: [], name: getName(vectors.length) };
			vectors.push(namedVector);
			for (let comp = 0; comp < dim; comp++) {
				namedVector.inner.push(Math.floor(Math.random() * 10));
			}
			for (let i = 0; i < vectors.length - 1; i++) {
				const vector = vectors[i];
				let equal = true;
				for (let comp = 0; comp < dim; comp++) {
					if (vector.inner[comp] !== vectors[vectors.length - 1].inner[comp]) {
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
		const dim = Math.min(v1.length, v2.length);
		for (let i = 0; i < dim; i++) {
			if (v1[i] !== v2[i]) return false;
		}
		return true;
	}

	function addEmptyVector() {
		data = [...data, { name: getName(data.length), inner: emptyVector(dim) }];
		if (data.length == 27) {
			data.map((named, index) => (named.name = getName(index)));
		}
		requestAnimationFrame(() =>
			scrollElement.scrollTo({ behavior: 'smooth', left: scrollElement.scrollWidth, top: 0 })
		);
	}

	function getName(index: number): string {
		return length > 26 || index > 25 ? `v<sub>${index + 1}</sub>` : String.fromCharCode(97 + index);
	}

	function pathToEdges(path: number[][]): [number, number][] {
		let edges = [];
		for (let i = 0; i < path.length - 1; i++) {
			let edge = edgeToIndices([path[i], path[i + 1]]);
			edges.push(edge);
		}
		return edges;
	}

	function edgeToIndices(edge: [number[], number[]]): [number, number] {
		let indices: [number, number] = edge.map(
			(arr) =>
				data.findIndex((named) => vectorEquals(named.inner, arr)) ??
				(() => {
					console.error(arr, data[0].inner);
					throw new Error('Could not find in list');
				})()
		) as [number, number];
		return indices;
	}

	function setDataFromPath(path: number[][]) {
		data = path.map(
			(arr) =>
				data.find((named) => vectorEquals(named.inner, arr)) ??
				(() => {
					throw new Error('Invalid: returned invalid vector not in list');
				})()
		);
	}

	let callbackIdCreation = registerCallback(serverOutputPathCreation, (pc) => {
		path = null;
		if (pc.donePath) {
			path = pc.donePath;
			edges = pathToEdges(pc.donePath);
			setDataFromPath(pc.donePath);
		} else {
			edges = pc.currentEdges.map(edgeToIndices);
		}
	});
	onDestroy(() => unregisterCallback(callbackIdCreation));

	let callbackIdImprovement = registerCallback(serverOutputPathImprovement, (pi) => {
		if (pi.better) {
			edges = pathToEdges(pi.currentPath);
			path = pi.currentPath;
		}
		if (pi.done) {
			setDataFromPath(pi.currentPath);
		}
	});
	onDestroy(() => unregisterCallback(callbackIdImprovement));
</script>

<div class="mt-4 pb-10 mx-10">
	<div class="flex-row flex gap-4 overflow-x-scroll" bind:this={scrollElement}>
		<div class="flex-col flex p-2 gap-2 rounded self-end">
			<div class="flex flex-row justify-stretch gap-2 justify-items-center">
				<button
					class="bg-gray-800 hover:bg-gray-700 transition-all text-white py-2 rounded grow flex flex-row justify-center"
					on:click={() => (dim -= 1)}
				>
					<Icon.MinusSolid />
				</button>
				<button
					class="bg-gray-800 hover:bg-gray-700 transition-all text-white py-2 rounded grow flex flex-row justify-center"
					on:click={incrementDim}
				>
					<Icon.PlusSolid />
				</button>
			</div>
			{#each { length: dim } as _, comp}
				<div class="bg-gray-800 text-white text-2xl py-2 px-6 rounded">x<sub>{comp + 1}</sub></div>
			{/each}
		</div>
		{#each data as vector, index (vector.name)}
			<div class="bg-gray-800 flex-col flex p-2 gap-2 rounded" animate:flip>
				<div class="text-4xl text-gray-300 text-center mb-2">{@html vector.name}</div>
				{#each { length: dim } as _, comp}
					<input
						type="number"
						step="0.00001"
						class="w-20 px-4 py-2 text-2xl text-white bg-gray-700 border-none rounded overflow-hidden text-center"
						value={data[index].inner[comp]}
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
					class="w-20 px-4 py-2 text-2xl text-white bg-gray-700 border-none rounded overflow-hidden text-center"
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
			<div class="h-full m-0 min-h-[420px]">
				<ForceDirectedGraph vectors={points} {edges} />
			</div>
		</Card>

		<PathProperties {path} {length} />

		<PathAlgorithms
			on:deletePath={() => (path = null)}
			bind:invalidate={invalidateAlgorithms}
			dimensions={dim}
	  points={points.map(p => p.inner)}
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
