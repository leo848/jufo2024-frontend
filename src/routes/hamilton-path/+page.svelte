<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import * as Icon from 'flowbite-svelte-icons';
	import { RgbColor } from '../../color/colorSpaces';
	import { distColor } from '../../color/gradient';
	import AdjacencyMatrix from '../../components/AdjacencyMatrix.svelte';
	import ForceDirectedGraph from '../../components/ForceDirectedGraph.svelte';
	import Window from '../../components/Window.svelte';
	import { gradient } from '../../ui/color';
	import { title } from '../../ui/navbar';

	title.set('Kürzester Hamilton-Pfad');

	let matrixValues: number[][] = [
		[0, 20, 4, 3, 10],
		[20, 0, 8, 9, 4],
		[4, 8, 0, 2, 5],
		[3, 9, 2, 0, 11],
		[10, 4, 5, 11, 0]
	];

	let vertexNames = ['a', 'b', 'c', 'd', 'e'];

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

	const gradientStops = new Array(80)
		.fill(0)
		.map((_, index) => distColor(index, [0, 80]) ?? new RgbColor(0.2, 0.2, 0.2).color());

	$: scaleStopAmount = (max ?? 0) >= 1000 ? 5 : 10;
	let scaleStops: number[] = [];
	$: if (max !== null && min !== null && max > min) {
		scaleStops = [];
		const step = (max - min) / scaleStopAmount;
		for (let counter = min; counter <= max + step / 2; counter += step) {
			scaleStops = [...scaleStops, counter];
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
			execute() {
				// bmax => block max;
				let bmax = max ?? 1;
				forEachMatrix((x) => bmax - x);
			}
		},
		{
			name: 'min = 0',
			execute() {
				let bmin = min ?? 0;
				forEachMatrix((x) => x - bmin);
			}
		},
		{
			name: '/ max',
			execute() {
				let bmax = max ?? 1;
				forEachMatrix((x) => x / bmax);
			}
		},
		{
			name: '* 10',
			execute() {
				forEachMatrix((x) => x * 10);
			}
		},
		{
			name: '/ 10',
			execute() {
				forEachMatrix((x) => x / 10);
			}
		},
		{
			name: '+1',
			execute() {
				forEachMatrix((x) => x + 1);
			}
		},
		{
			name: 'Quadrieren',
			execute() {
				forEachMatrix((x) => x ** 2);
			}
		},
		{
			name: 'Quadratwurzel',
			execute() {
				forEachMatrix(Math.sqrt);
			}
		}
	];

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
	$: {
		$page.url.searchParams.set('v', matrixValues.map((row) => row.join('i')).join('o'));
		$page.url.searchParams.set('n', vertexNames.join('_'));
		goto(`?${$page.url.searchParams.toString()}`, {
			keepFocus: true,
			replaceState: true,
			noScroll: true
		});
	}
</script>

<div class="mt-4 pb-10 mx-10">
	<div
		class="grid grid-cols-12 gap-8 auto-cols-max align-stretch justify-stretch justify-items-stretch"
	>
		<div class="col-span-12 xl:col-span-6 grid grid-cols-1 gap-8">
			<Window title="Adjazenzmatrix (bearbeitbar)" xlCol={12} mdCol={12}>
				<AdjacencyMatrix
					bind:values={matrixValues}
					{symmetric}
					vertexNames={vertexNames.map((v, i) => `${i}/${v}`)}
					editable
				/>
			</Window>
			<Window title="Skala" xlCol={12} mdCol={12}>
				<div
					class="h-20 rounded-b-xl flex flex-row justify-between align-center items-center text-3xl text-white"
					style:background={gradient(gradientStops, { smooth: true })}
				>
					{#each scaleStops as stop}
						<div>{stop.toFixed((max ?? 0) > 5 ? 0 : 1)}</div>
					{/each}
				</div>
			</Window>
			<Window title="Werkzeuge" xlCol={12} mdCol={12}>
				<div class="flex flex-row gap-4 m-4">
					{#each actions as action}
						<button
							class="p-2 bg-gray-700 hover:bg-gray-600 transition-all rounded text-xl"
							on:click={action.execute}>{action.name}</button
						>
					{/each}
				</div>
			</Window>
			<Window title="Kräftebasierter Graph" xlCol={12} mdCol={12}>
				<div class="h-[420px] w-full">
					<ForceDirectedGraph bind:redraw values={matrixValues} matrix names={vertexNames} />
				</div>
			</Window>
		</div>
		<div class="col-span-12 xl:col-span-6">
			<Window title="Knoten">
				<div class="flex flex-row gap-2 m-2 text-xl flex-wrap">
					{#each vertexNames as name, index}
						<div class="bg-gray-700 p-2 px-4 flex flex-row items-center gap-4">
							<input
								class="bg-gray-700 w-full min-w-[50px] max-w-[60px]"
								bind:value={vertexNames[index]}
							/>
							<button on:click={() => removeVertex(index)} class="hover:text-white transition-all"
								><Icon.TrashBinSolid size="sm" /></button
							>
						</div>
					{/each}
					<div class="bg-gray-700 p-2 px-4 flex flex-row items-center gap-4">
						<button on:click={() => addVertex()} class="hover:text-white transition-all"
							><Icon.PlusSolid size="sm" /></button
						>
					</div>
				</div>
			</Window>
		</div>
	</div>
</div>
