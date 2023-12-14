<script lang="ts">
	import { title } from '../../ui/navbar';

	title.set('Vektoren sortieren');

	let dim = 3;
	let data: number[][] = randomVectors(dim, 30);
	$: length = data.length;

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

<div class="mt-4">
	<div class="flex-row flex gap-4 ml-10 overflow-x-scroll">
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
</div>
