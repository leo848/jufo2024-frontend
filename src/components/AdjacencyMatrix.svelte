<script lang="ts">
	export let values: number[][];
	export let vertexNames: string[];

	$: length = values.length;
	$: {
		if (values.length !== length || values.some(inner => inner.length !== length)) {
			throw new Error("invalid length");
		}
	}

	let max = Infinity, min = -Infinity;
	$: {
		for (const vector of values) {
		for (const dist of vector) {
		if (dist > max) max = dist;
		if (dist < min) min = dist;
		}
		}
	}
</script>

<div>
	<div class="grid overflow-scroll" style:grid-template-columns={`repeat(${length+1}, minmax(auto, 1fr))`}>
		<div class="m-2 text-center"></div>
		{#each vertexNames as name (name)}
				<div class="m-2 rounded-xl bg-gray-700 text-center">{name}</div>
		{/each}
		{#each vertexNames as name, index (name)}
			{@const vector = values[index]}
			<div class="m-2 rounded-xl bg-gray-700 text-center">{name}</div>
			{#each vertexNames as name, index (name)}
				{@const value = vector[index]}
				{#if value !== 0}
				<div class="py-2 px-2 border-gray-500 border-1 border text-align-center">{value.toFixed(1)}</div>
				{:else}
				<div class="py-2 px-2 border-gray-500 border-1 border text-align-center">–</div>
				{/if}
			{/each}
		{/each}
	</div>
</div>
