<script lang="ts">
	import { Tooltip } from 'flowbite-svelte';
	import type { Color } from '../color/color';
	import { RgbColor } from '../color/colorSpaces';
	import { rangeMap } from '../utils/math';
	import { PerceptualGradient, distColor } from '../color/gradient';

	export let values: number[][];
	export let vertexNames: string[];
	export let digits: number = 1;

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

	let max = -Infinity,
		min = Infinity;
	$: {
		(max = -Infinity), (min = Infinity);
		for (const vector of values) {
			for (const dist of vector) {
				if (dist > max) max = dist;
				if (dist < min && dist > 0.0001) min = dist;
			}
		}
	}
</script>

<div>
	<div
		class="grid overflow-scroll text-white"
		style:grid-template-columns={`repeat(${length + 1}, minmax(auto, 1fr))`}
	>
		<div class="m-2 text-center" />
		{#each sorted as { name }, index (name)}
			<div class="border-gray-500 border">
				<div class="bg-gray-700 text-center">{collapseNames ? index + 1 : name}</div>
				{#if collapseNames}
					<Tooltip type="light">{name}</Tooltip>
				{/if}
			</div>
		{/each}
		{#each sorted as { name, index }, trueIndex (name)}
			{@const vector = values[index]}
			<div class="border-gray-500 border">
				<div class="bg-gray-700 h-full text-center">
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
						class="tabular-nums py-2 px-2 border-gray-500 border-1 border"
						style={`background-color:${(
							distColor(value, [min, max]) ?? new RgbColor(0.2, 0.2, 0.2).color()
						)
							.rgb()
							.css()}`}
					>
						{#if editable}
							<input
								class="border-none w-full min-w-[80px]"
								type="number"
								bind:value={values[index][index1]}
								disabled={symmetric && index > index1}
								style={`background-color:${(
									distColor(value, [min, max])?.lighten(0.05) ?? new RgbColor(0.2, 0.2, 0.2).color()
								)
									.rgb()
									.css()}`}
							/>
						{:else}
							{value.toFixed(digits)}
						{/if}
					</div>
				{:else}
					<div class="py-2 px-2 border-gray-500 border-1 border">–</div>
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
