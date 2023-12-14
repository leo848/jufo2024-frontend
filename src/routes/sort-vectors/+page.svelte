<script lang="ts">
	import { title } from '../../ui/navbar';
	import type { Point3 } from '../../geom/point';
	import PathProperties from '../../components/PathProperties.svelte';
	import PathAlgorithms from '../../components/PathAlgorithms.svelte';
	import { Card } from 'flowbite-svelte';
	import * as Icon from 'flowbite-svelte-icons';

	title.set('Vektoren sortieren');

	let dim = 3;
	let data: number[][] = randomVectors(dim, 30);
	$: length = data.length;

	let path: Point3[] | null = null;
	let edges: [Point3, Point3][] = [];

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
</script>

<div class="mt-4 pb-10 mx-10">
	<div class="flex-row flex gap-4 overflow-x-scroll">
		<div class="flex-col flex p-2 gap-2 rounded self-end">
			<div class="text-4xl text-center" />
			{#each { length: dim } as _, comp}
				<div class="bg-gray-800 text-white text-2xl py-2 px-4 rounded">x<sub>{comp + 1}</sub></div>
			{/each}
		</div>
		{#each data as vector, index}
			{@const name = getName(index)}
			<div class="bg-gray-800 flex-col flex p-2 gap-2 rounded">
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
		<Card class="rounded-xl col-span-12 xl:col-span-5 max-w-none xl:p-0 mb-0" >
			<div
				class="text-2xl xl:text-3xl dark:text-white bg-gray-700 p-4 rounded-t-xl flex flex-row justify-between items-center"
			>
				<div>Ansicht des Graphen</div>
				<button
					class="bg-gray-600 rounded-xl p-2"
	 				disabled
					><Icon.CogOutline /></button
				>
			</div>
		</Card>

		<PathProperties {path} {length} />

		<PathAlgorithms
			on:deletePath={() => (path = null)}
			bind:invalidate={invalidateAlgorithms}
			points={data}
		/>
	</div>
</div>
