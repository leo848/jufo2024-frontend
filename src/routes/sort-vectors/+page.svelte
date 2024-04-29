<script lang="ts">
	import { title } from '../../ui/navbar';
	import PathAlgorithms from '../../components/PathAlgorithms.svelte';
	import * as Icon from 'flowbite-svelte-icons';
	import { registerCallback, unregisterCallback } from '../../server/websocket';
	import {
		serverOutputDistPathCreation,
		serverOutputDistPathImprovement
	} from '../../server/types';
	import { fromUrlString, type NamedVector } from '../../geom/vector';
	import { onDestroy } from 'svelte';
	import { flip } from 'svelte/animate';
	import { page } from '$app/stores';
	import { writable, type Writable } from 'svelte/store';
	import PathProperties from '../../components/PathProperties.svelte';
	import ForceDirectedGraph from '../../components/ForceDirectedGraph.svelte';
	import ForceDirectedGraphOptions from '../../components/ForceDirectedGraphOptions.svelte';
	import { goto } from '$app/navigation';
	import Window from '../../components/Window.svelte';
	import type { TrueDistanceType } from '../../geom/dist';
	import { adjacencyMatrix, positiveAdjacencyMatrix } from '../../graph/adjacency';
	import Options from '../../components/Options.svelte';
	import AdjacencyMatrix from '../../components/AdjacencyMatrix.svelte';

	title.set('Vektoren sortieren');

	let dim = 4;

	function incrementDim() {
		dim += 1;
		for (let i = 0; i < length; i++) {
			$data[i].inner = vectorLength($data[i].inner, dim);
		}
	}

	let data: Writable<NamedVector[]> = writable([]);

	let redraw: () => void;
	(() => {
		let queryString = $page.url.searchParams.get('v');
		if (queryString == null) return;
		let newData = fromUrlString(queryString, getName);
		if (newData == null) return;
		$data = newData;
		dim = $data.map((v) => v.inner.length).reduce((a, b) => Math.max(a, b));
		$data.forEach((v) => (v.inner = vectorLength(v.inner, dim)));
		requestAnimationFrame(() => redraw());
	})();

	$: length = $data.length;
	$: points = $data.map((p) => {
		return { ...p, inner: vectorLength(p.inner, dim) };
	});

	$: if ($page.url.pathname.includes('sort-vectors')) {
		$page.url.searchParams.set('v', $data.map((v) => v.inner.join('i')).join('o'));
		goto(`?${$page.url.searchParams.toString()}`, {
			keepFocus: true,
			replaceState: true,
			noScroll: true
		});
	}

	let path: number[][] | null = null;
	let edges: [number, number][] = [];

	$: matrix = positiveAdjacencyMatrix(
		$data.map((d) => d.inner),
		metric
	);

	let locked = false;
	let blownUp = false;

	let metric: TrueDistanceType & {} = { norm: 'euclidean', invert: false };

	let scrollElement: HTMLElement;
	$: duplicates = $data.some((v1, i1) =>
		$data.some((v2, i2) => i1 != i2 && vectorEquals(v1.inner, v2.inner))
	);

	let invalidate: <T>(callback: (t: T) => void, invalid?: (t: T) => void) => (t: T) => void;
	let invalidateAlgorithms: () => void;
	let latency: number;

	function blowUp() {
		if (path != null) blownUp = true;
		path = null;
		edges = [];
		invalidateAlgorithms();
	}

	function setValue(evt: { currentTarget: HTMLInputElement }, i: number, comp: number) {
		let elt = evt.currentTarget;
		$data[i].inner[comp] = +elt.value;
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
		$data = [...$data, { name: getName($data.length), inner: emptyVector(dim) }];
		if ($data.length == 27) {
			$data.map((named, index) => (named.name = getName(index)));
		}
		requestAnimationFrame(() =>
			scrollElement.scrollTo({ behavior: 'smooth', left: scrollElement.scrollWidth, top: 0 })
		);
	}

	function getName(index: number): string {
		let base26 = index.toString(26);
		let string = '';
		for (let i = 0; i < base26.length; i++) {
			string += String.fromCharCode(parseInt(base26.charAt(i), 26) + 97);
		}
		return string;
	}

	let fdgOptions = { speed: 3 };
	let fdgActions: { freeze: () => void };

	let dimBtnClassName =
		'dark:bg-gray-800 bg-gray-100 dark:hover:bg-gray-700 hover:bg-gray-200 transition-all dark:text-white text-gray-500 py-2 rounded grow flex flex-row justify-center';

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
				$data.findIndex((named) => vectorEquals(named.inner, arr)) ??
				(() => {
					console.error(arr, $data[0].inner);
					throw new Error('Could not find in list');
				})()
		) as [number, number];
		return indices;
	}

	function setDataFromPath(path: number[][]) {
		$data = path.map(
			(arr) =>
				$data.find((named) => vectorEquals(named.inner, arr)) ??
				(() => {
					throw new Error('Invalid: returned invalid vector not in list');
				})()
		);
	}

	let callbackIdCreation = registerCallback(serverOutputDistPathCreation, (pc) => {
		path = null;
		locked = true;
		if (pc.donePath) {
			path = pc.donePath;
			setDataFromPath(pc.donePath);
			edges = pathToEdges(pc.donePath);
		} else {
			edges = pc.currentEdges.map(edgeToIndices);
		}
	});
	onDestroy(() => unregisterCallback(callbackIdCreation));

	let callbackIdImprovement = registerCallback(serverOutputDistPathImprovement, (pi) => {
		locked = true;
		if (pi.better) {
			path = pi.currentPath;
		}
		if (pi.done) {
			setDataFromPath(pi.currentPath);
		}
		edges = pathToEdges(pi.currentPath);
	});
	onDestroy(() => unregisterCallback(callbackIdImprovement));
</script>

<div class="mt-4 pb-10 mx-10">
	<div
		class="grid grid-cols-12 gap-8 auto-cols-max align-stretch justify-stretch justify-items-stretch"
	>
		<div
			class="flex-row flex gap-4 col-span-12 xl:col-span-8 overflow-x-scroll items-start"
			bind:this={scrollElement}
		>
			<div class="flex-col flex p-2 gap-2 rounded mt-[12px]">
				<div class="flex flex-row justify-stretch gap-2 justify-items-center">
					<button
						class={dimBtnClassName}
						class:opacity-0={locked}
						disabled={locked}
						on:click={() => (dim -= 1)}
					>
						<Icon.MinusSolid />
					</button>
					<button
						class={dimBtnClassName}
						class:opacity-0={locked}
						disabled={locked}
						on:click={incrementDim}
					>
						<Icon.PlusSolid />
					</button>
				</div>
				{#each { length: dim } as _, comp}
					<div
						class="dark:bg-gray-800 bg-gray-200 dark:text-white text-gray-800 text-2xl py-2 px-6 rounded"
					>
						x<sub>{comp + 1}</sub>
					</div>
				{/each}
			</div>
			{#each $data as vector, index (vector.name)}
				<div class="dark:bg-gray-800 bg-gray-100 flex-col flex p-2 gap-2 rounded" animate:flip>
					<div class="text-4xl dark:text-gray-300 text-gray-600 text-center mb-2">
						{@html vector.name}
					</div>
					{#each { length: dim } as _, comp}
						<input
							type="number"
							step="0.00001"
							disabled={locked}
							class="w-20 px-4 py-2 text-2xl dark:text-white text-gray-700 dark:bg-gray-700 bg-gray-200 border-none rounded overflow-hidden text-center"
							value={vector.inner[comp]}
							on:change={invalidate(
								(evt) => setValue(evt, index, comp),
								() => (vector.inner[comp] = vector.inner[comp])
							)}
						/>
					{/each}
				</div>
			{/each}
			{#if !locked}
				<button
					class="dark:bg-gray-800 bg-gray-400 flex-col flex p-2 gap-2 rounded opacity-50"
					on:click={addEmptyVector}
				>
					<div class="text-4xl dark:text-gray-300 text-gray-500 text-center mb-2">
						{@html getName(length)}
					</div>
					{#each { length: dim } as _}
						<input
							type="number"
							class="w-20 px-4 py-2 text-2xl text-white dark:bg-gray-700 bg-gray-500 border-none rounded overflow-hidden text-center"
							value={0}
						/>
					{/each}
				</button>
			{/if}
		</div>
		<Options
			bind:locked
			on:blowUp={blowUp}
			bind:invalidate
			bind:metric
			xlCol={4}
			hide={['asVector', 'load']}
			show={['asGraph']}
			on:asGraph={() => goto('/hamilton-path?v=' + matrix.map((row) => row.join('i')).join('o'))}
			on:add={invalidate(addEmptyVector)}
			on:delete={invalidate(() => data.set([]))}
		/>
		<Window title="Ansicht des Graphen (FDGD)" options xlCol={5}>
			<ForceDirectedGraphOptions slot="options" bind:options={fdgOptions} actions={fdgActions} />
			<div class="h-full m-0 min-h-[420px]">
				<ForceDirectedGraph
					bind:redraw
					values={points.map((p) => p.inner)}
					names={points.map((p) => p.name)}
					{edges}
					{metric}
					options={fdgOptions}
					bind:actions={fdgActions}
					animDuration={latency}
				/>
			</div>
		</Window>

		<PathProperties {path} {length} {metric} {blownUp} />

		<PathAlgorithms
			on:deletePath={invalidate(() => ((path = null), (edges = [])))}
			bind:invalidate={invalidateAlgorithms}
			bind:latency
			dimensions={dim}
			{metric}
			values={points.map((p) => p.inner)}
		/>

		<Window title="Adjazenzmatrix" scrollable xlCol={6}>
			<AdjacencyMatrix values={matrix} vertexNames={$data.map((d) => d.name)} />
		</Window>
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
