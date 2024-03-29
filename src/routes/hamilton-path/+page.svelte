<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import * as Icon from 'flowbite-svelte-icons';
	import AdjacencyMatrix from '../../components/AdjacencyMatrix.svelte';
	import ForceDirectedGraph from '../../components/ForceDirectedGraph.svelte';
	import Window from '../../components/Window.svelte';
	import { title } from '../../ui/navbar';
	import ColorScale from './ColorScale.svelte';
	import PathAlgorithms from '../../components/PathAlgorithms.svelte';
	import { registerCallback, unregisterCallback } from '../../server/websocket';
	import { serverOutputPathCreation, serverOutputPathImprovement } from '../../server/types';
	import { onDestroy } from 'svelte';
	import { flip } from 'svelte/animate';
	import PathProperties from '../../components/PathProperties.svelte';

	title.set('Kürzester Hamilton-Pfad');

	let matrixValues: number[][] = [
		[0, 20, 4, 3, 10],
		[20, 0, 8, 9, 4],
		[4, 8, 0, 2, 5],
		[3, 9, 2, 0, 11],
		[10, 4, 5, 11, 0]
	];

	let vertexNames = ['a', 'b', 'c', 'd', 'e'];
	let path: null | number[] = null;
	let vertexNamesPath: { name: string; index: number }[];
	let edges: [number, number][] = [];

	$: {
		if (path === null) vertexNamesPath = uniqueVertexNames.map((name, index) => ({ name, index }));
		else {
			vertexNamesPath = path.map((index) => ({ index, name: uniqueVertexNames[index] }));
		}
	}

	let uniqueVertexNames = vertexNames;
	$: {
		const set = new Set(vertexNames);
		const unique = set.size === vertexNames.length;
		if (unique) {
			uniqueVertexNames = vertexNames;
		} else {
			uniqueVertexNames = vertexNames.map((str, i) => `${i + 1}/${str}`);
		}
	}

	let symmetric = true;
	$: if (symmetric) {
		for (let i = 0; i < vertexNames.length; i++) {
			for (let j = i; j < vertexNames.length; j++) {
				matrixValues[j][i] = matrixValues[i][j];
			}
		}
	}

	let min: null | number = null;
	let max: null | number = null;
	$: {
		min = null;
		max = null;
		for (const index1 in matrixValues) {
			for (const index2 in matrixValues[index1]) {
				const entry = matrixValues[index1][index2];
				if (index1 === index2) continue;
				if (min === null || entry < min) {
					min = entry;
				}
				if (max === null || entry > max) {
					max = entry;
				}
			}
		}
	}

	function forEachMatrix(f: (arg: number) => number) {
		let [bmin, bmax] = [min ?? 0, max ?? 1];
		matrixValues = matrixValues.map((row) =>
			row.map((x) => (bmax - bmin < 0.1 ? f(x) : Math.round(f(x) * 10000) / 10000))
		);
	}

	function removeVertex(index: number) {
		vertexNames = vertexNames.toSpliced(index, 1);
		matrixValues = matrixValues.toSpliced(index, 1);
		matrixValues = matrixValues.map((row) => row.toSpliced(index, 1));
	}

	function addVertex() {
		vertexNames = [...vertexNames, 'vertex' + vertexNames.length];
		matrixValues = [...matrixValues, new Array(vertexNames.length - 1).fill(0)];
		matrixValues = matrixValues.map((row) => [...row, 0]);
	}

	const actions = [
		{
			name: 'Umkehren',
			desc: 'Die Distanzfunktion wird so umgekehrt, dass die Knoten mit größten Distanzen am nächsten zueinander gepaart; solche mit kleinsten Distanzen am weitesten entfernt werden.',
			execute() {
				// bmax => block max;
				let bmax = max ?? 1;
				forEachMatrix((x) => bmax - x);
			}
		},
		{
			name: 'min = 0',
			desc: 'Von allen Distanzen wird die minimale subtrahiert. Da es sich nur um eine Translation handelt, bleibt das Sortierergebnis gleich.',
			execute() {
				let bmin = min ?? 0;
				forEachMatrix((x) => x - bmin);
			}
		},
		{
			name: '/ max',
			desc: 'Alle Distanzen werden durch die maximale geteilt, sodass alle nun im Interval [min/max, 1] liegen.',
			execute() {
				let bmax = max ?? 1;
				forEachMatrix((x) => x / bmax);
			}
		},
		{
			name: '* 10',
			desc: 'Alle Distanzen werden mit 10 multipliziert.',
			execute() {
				forEachMatrix((x) => x * 10);
			}
		},
		{
			name: '/ 10',
			desc: 'Alle Distanzen werden durch 10 geteilt.',
			execute() {
				forEachMatrix((x) => x / 10);
			}
		},
		{
			name: '+1',
			desc: 'Alle Distanzen werden um 1 erhöht.',
			execute() {
				forEachMatrix((x) => x + 1);
			}
		},
		{
			name: 'Quadrieren',
			desc: 'Alle Distanzen werden quadriert. Dies hat zur Folge, dass weit entferntere Knoten sich noch weiter entfernen, während nähere relativ zusammenrücken.',
			execute() {
				forEachMatrix((x) => x ** 2);
			}
		},
		{
			name: 'Quadratwurzel',
			desc: 'Alle Distanzen werden durch ihre Quadratwurzel ersetzt. Dies sorgt für eine niedrigere Gewichtung extremer Werte.',
			execute() {
				forEachMatrix(Math.sqrt);
			}
		}
	];

	// URL-Parserei
	let redraw: () => void;
	(() => {
		function fromUrlString(s: string): number[][] | null {
			return s.split('o').map((vString) => vString.split('i').map(Number));
		}
		let queryString = $page.url.searchParams.get('v');
		if (queryString == null) return;
		let newData = fromUrlString(queryString);
		if (newData == null) return;
		matrixValues = newData;

		let queryNames = $page.url.searchParams.get('n');
		if (queryNames == null) {
			vertexNames = new Array(matrixValues.length)
				.fill(0)
				.map((_, i) => String.fromCharCode(97 + i));
		} else {
			vertexNames = queryNames.split('_');
		}

		requestAnimationFrame(() => redraw());
	})();
	$: if ($page.url.pathname.includes('hamilton-path')) {
		$page.url.searchParams.set('v', matrixValues.map((row) => row.join('i')).join('o'));
		$page.url.searchParams.set('n', vertexNames.join('_'));
		goto(`?${$page.url.searchParams.toString()}`, {
			keepFocus: true,
			replaceState: true,
			noScroll: true
		});
	}

	let invalidateAlgorithms: () => void;

	let latency: number;
	function blowUp() {
		path = null;
		edges = [];
		invalidateAlgorithms();
	}

	// Server-Callbacks
	const pathCreationCallback = registerCallback(serverOutputPathCreation, (pc) => {
		edges = pc.currentEdges;
		if (pc.donePath) {
			path = pc.donePath;
		}
	});
	onDestroy(() => unregisterCallback(pathCreationCallback));

	const pathImprovementCallback = registerCallback(serverOutputPathImprovement, (pi) => {
		function pathToEdges(path: number[]): [number, number][] {
			if (path === null) return [];
			let edges: [number, number][] = [];
			for (let i = 0; i < path.length - 1; i++) {
				let edge: [number, number] = [path[i], path[i + 1]];
				edges = [...edges, edge];
			}
			return edges;
		}
		if (pi.better) {
			edges = pathToEdges(pi.currentPath);
			path = pi.currentPath;
		}
		if (pi.done) {
			path = pi.currentPath;
		}
	});
	onDestroy(() => unregisterCallback(pathImprovementCallback));
</script>

<div class="mt-4 pb-10 mx-10">
	<div
		class="grid grid-cols-12 gap-8 auto-cols-max align-stretch justify-stretch justify-items-stretch"
	>
		<div class="col-span-12 xl:col-span-6 grid grid-cols-1 gap-8">
			<Window title="Adjazenzmatrix (bearbeitbar)" xlCol={12} mdCol={12} scrollable>
				<AdjacencyMatrix
					bind:values={matrixValues}
					{symmetric}
					vertexNames={uniqueVertexNames}
					highlightEdges={edges}
					editable={edges.length === 0}
				/>
			</Window>
			<Window title="Skala" xlCol={12} mdCol={12}>
				<ColorScale {min} {max} />
			</Window>
			<Window title="Werkzeuge" xlCol={12} mdCol={12}>
				<div class="flex flex-row gap-4 m-4">
					{#each actions as action}
						<button
							class="p-2 bg-gray-700 hover:bg-gray-600 transition-all rounded text-xl"
							title={action.desc}
							disabled={path !== null}
							on:click={action.execute}>{action.name}</button
						>
					{/each}
				</div>
			</Window>
			<Window title="Kräftebasierter Graph" xlCol={12} mdCol={12}>
				<div class="h-full w-full">
					<ForceDirectedGraph
						bind:redraw
						values={matrixValues.map((row) => row.slice()).slice()}
						matrix
						{edges}
						animDuration={latency}
						names={vertexNames}
					/>
				</div>
			</Window>
		</div>
		<div class="col-span-12 xl:col-span-6 flex flex-col gap-8">
			<Window title="Knoten" scrollable>
				<div class="grid grid-cols-3 gap-4 m-4 text-xl">
					{#each vertexNames as _, index}
						<div class="bg-gray-700 p-2 px-4 flex flex-row items-center gap-4">
							<input class="bg-gray-700 w-full min-w-[50px]" bind:value={vertexNames[index]} />
							<button on:click={() => removeVertex(index)} class="hover:text-white transition-all"
								><Icon.TrashBinSolid size="sm" /></button
							>
						</div>
					{/each}
					<button
						on:click={() => addVertex()}
						class="hover:bg-gray-600 transition-all bg-gray-700 p-2 px-4 flex flex-row items-center gap-4 col-span-3 min-h-[50px]"
					>
						<Icon.PlusSolid size="sm" />
					</button>
				</div>
			</Window>
			<PathProperties
				path={path?.map((index) => [index])}
				metric={(from, to) => matrixValues[from][to]}
				length={vertexNames.length}
			/>
			<PathAlgorithms
	   			dimensions={vertexNames.length}
				values={matrixValues}
				matrix
	   			matrixPath={path}
				bind:invalidate={invalidateAlgorithms}
				bind:latency
				on:deletePath={blowUp}
				horizontal
			/>
			<Window title="Liste" scrollable>
				<div class="m-4 grid grid-cols-1 gap-4">
					{#each vertexNamesPath as vertex, trueIndex (vertex.name)}
						<div class="p-2 bg-gray-700 text-xl rounded flex flex-row gap-2" animate:flip>
							<span class="opacity-50">{vertex.index + 1}.</span>
							{vertex.name}
							<div class="grow" />
							<div class="flex flex-col text-sm mr-8 opacity-70 items-end">
								<div class="-mb-1">
									{#if trueIndex !== 0}
										d({vertex.name}, {vertexNamesPath[trueIndex - 1].name}) =
										<span class="tabular-nums"
											>{matrixValues[vertex.index][vertexNamesPath[trueIndex - 1].index]}</span
										>
									{:else}
										&nbsp;
									{/if}
								</div>
								<div class="-mb-1">
									{#if trueIndex !== vertexNamesPath.length - 1}
										d({vertex.name}, {vertexNamesPath[trueIndex + 1].name}) =
										<span class="tabular-nums"
											>{matrixValues[vertex.index][vertexNamesPath[trueIndex + 1].index]}</span
										>
									{:else}
										&nbsp;
									{/if}
								</div>
							</div>
						</div>
					{/each}
				</div>
			</Window>
		</div>
	</div>
</div>
