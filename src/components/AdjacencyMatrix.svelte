<script lang="ts">
	import { Tooltip } from 'flowbite-svelte';
	import { RgbColor } from '../color/colorSpaces';
	import { distColor } from '../color/gradient';
	import { dark } from '../ui/darkmode';

	export let values: number[][];
	export let vertexNames: string[];
	export let digits: number = 1;

	export let highlightEdges: [number, number][] = [];

	export let editable: boolean = false;
	export let symmetric: boolean = true;

	export let sort: boolean = !editable;
	export let collapseNames: boolean = false;

	$: sorted = sort
		? vertexNames
				.map((value, index) => ({ index, name: value }))
				.toSorted((a, b) => a.name.localeCompare(b.name))
		: vertexNames.map((value, index) => ({ index, name: value }));

	$: length = values.length;
	$: {
		if (values.length !== length || values.some((inner) => inner.length !== length)) {
			throw new Error(
				`invalid length: length is ${length}, and lengths are ${values.map(
					(inner) => inner.length
				)}`
			);
		}
	}

	let highlightMatrix: number[][];
	$: {
		highlightMatrix = new Array(vertexNames.length)
			.fill(0)
			.map((_) => new Array(vertexNames.length).fill(0));
		for (const [from, to] of highlightEdges) {
			highlightMatrix[from][to] = 1;
		}
	}

	let max = -Infinity,
		min = Infinity;
	$: {
		(max = -Infinity), (min = Infinity);
		for (let i = 0; i < values.length; i++) {
			const vector = values[i];
			for (let j = 0; j < vector.length; j++) {
				const dist = vector[j];
				if (dist > max) max = dist;
				if (dist < min && i != j) min = dist;
			}
		}
	}
</script>

<div>
	<div
		class="grid overflow-scroll dark:text-white text-black"
		style:grid-template-columns={`repeat(${length + 1}, minmax(auto, 1fr))`}
	>
		<div class="m-2 text-center" />
		{#each sorted as { name }, index (name)}
			<div class="dark:border-gray-500 border-gray-200 border">
				<div class="dark:bg-gray-700 bg-gray-100 text-center">
					{collapseNames ? index + 1 : name}
				</div>
				{#if collapseNames}
					<Tooltip type="light">{name}</Tooltip>
				{/if}
			</div>
		{/each}
		{#each sorted as { name, index }, trueIndex (name)}
			{@const vector = values[index]}
			<div class="dark:border-gray-500 border-gray-200 border">
				<div class="dark:bg-gray-700 bg-gray-100 h-full text-center">
					{collapseNames ? trueIndex + 1 : name}
				</div>
				{#if collapseNames}
					<Tooltip type="light">{name}</Tooltip>
				{/if}
			</div>
			{#each sorted as { name, index: index1 } (name)}
				{@const value = vector[index1]}
				{#if index != index1}
					<div
						class="tabular-nums py-2 px-2 dark:border-gray-700 border-gray-200 border-2 border transition-all"
						class:dark:border-white={highlightMatrix[index][index1]}
						class:border-black={highlightMatrix[index][index1]}
						style={`background-color:${(
							distColor(value, [min, max], { dark: $dark }) ??
							($dark ? new RgbColor(0.2, 0.2, 0.2) : new RgbColor(0.7, 0.7, 0.7)).color()
						)
							.rgb()
							.css()}`}
					>
						{#if editable}
							<input
								class="border-none w-full min-w-[80px]"
								class:text-gray-300={$dark && symmetric && index > index1}
								class:text-gray-500={!$dark && symmetric && index > index1}
								type="number"
								bind:value={values[index][index1]}
								disabled={symmetric && index > index1}
								style={`background-color:${(
									distColor(value, [min, max], { dark: $dark })?.lighten(0.05) ??
									new RgbColor(0.2, 0.2, 0.2).color()
								)
									.rgb()
									.css()}`}
							/>
						{:else}
							{value.toFixed(digits)}
						{/if}
					</div>
				{:else}
					<div class="py-2 px-2 dark:border-gray-500 border-gray-100 border-1 border">–</div>
				{/if}
			{/each}
		{/each}
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
