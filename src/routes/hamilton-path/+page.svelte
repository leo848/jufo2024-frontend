<script lang="ts">
	import { RgbColor } from '../../color/colorSpaces';
	import { distColor } from '../../color/gradient';
	import AdjacencyMatrix from '../../components/AdjacencyMatrix.svelte';
	import Window from '../../components/Window.svelte';
	import { gradient } from '../../ui/color';
	import { title } from '../../ui/navbar';

	title.set('Kürzester Hamilton-Pfad');

	let matrixValues: number[][] = [
		[0, 20, 4, 3, 10],
		[20, 0, 8, 9, 1],
		[4, 8, 0, 2, 1],
		[3, 9, 2, 0, 11],
		[10, 1, 1, 11, 0]
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
		for (const row of matrixValues) {
			for (const entry of row) {
				if (entry === 0) continue;
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

	const scaleStopAmount = 10;
	let scaleStops: number[] = [];
	$: if (max !== null && min !== null) {
		scaleStops = [];
		const step = (max - min) / scaleStopAmount;
		for (let counter = min; counter <= max + step / 2; counter += step) {
			scaleStops = [...scaleStops, counter];
		}
	}
</script>

<div class="mt-4 pb-10 mx-10">
	<div
		class="grid grid-cols-12 gap-8 auto-cols-max align-stretch justify-stretch justify-items-stretch"
	>
		<div class="col-span-12 xl:col-span-6 grid grid-cols-1 gap-8">
			<Window title="Adjazenzmatrix" xlCol={12} mdCol={12}>
				<AdjacencyMatrix bind:values={matrixValues} {symmetric} {vertexNames} editable />
			</Window>
			<Window title="Skala" xlCol={12} mdCol={12}>
				<div
					class="h-20 rounded-b-xl flex flex-row justify-between align-center items-center text-3xl text-white"
					style:background={gradient(gradientStops, { smooth: true })}
				>
					{#each scaleStops as stop}
						<div>{stop.toFixed(0)}</div>
					{/each}
				</div>
			</Window>
		</div>
	</div>
</div>
