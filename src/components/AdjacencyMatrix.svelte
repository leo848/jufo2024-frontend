<script lang="ts">
	import type { Color } from '../color/color';
	import { RgbColor } from '../color/colorSpaces';
	import { rangeMap } from '../utils/math';

	export let values: number[][];
	export let vertexNames: string[];

	$: sorted = vertexNames
		.map((value, index) => ({ index, name: value }))
		.toSorted((a, b) => a.name.localeCompare(b.name));

	$: length = values.length;
	$: {
		if (values.length !== length || values.some((inner) => inner.length !== length)) {
			throw new Error('invalid length');
		}
	}

	let max = -Infinity,
		min = Infinity;
	$: {
		(max = -Infinity), (min = Infinity);
		for (const vector of values) {
			for (const dist of vector) {
				if (dist > max) max = dist;
				if (dist < min && dist > 0) min = dist;
			}
		}
	}

	function distColor(dist: number): Color {
		let [minColor, maxColor] = [new RgbColor(0, 255, 0), new RgbColor(255, 0, 0)].map((rgb) => {
			return rgb.color().space('hsl').with('s', 0.2).color().oklab().with('l', 0.3);
		});

		let t = rangeMap(dist, [min, max], [0, 1]);
		let result = minColor.lerp(maxColor, t).color();
		return result;
	}
</script>

<div>
	<div
		class="grid overflow-scroll"
		style:grid-template-columns={`repeat(${length + 1}, minmax(auto, 1fr))`}
	>
		<div class="m-2 text-center" />
		{#each sorted as { name } (name)}
			<div class="border-gray-500 border">
				<div class="bg-gray-700 text-center text-xl">{name}</div>
			</div>
		{/each}
		{#each sorted as { name, index } (name)}
			{@const vector = values[index]}
			<div class="border-gray-500 border">
				<div class="bg-gray-700 h-full text-center text-xl">{name}</div>
			</div>
			{#each sorted as { name, index } (name)}
				{@const value = vector[index]}
				{#if value !== 0}
					<div
						class="tabular-nums py-2 px-2 border-gray-500 border-1 border"
						style={`background-color:${distColor(value).rgb().css()}`}
					>
						{value.toFixed(1)}
					</div>
				{:else}
					<div class="py-2 px-2 border-gray-500 border-1 border">–</div>
				{/if}
			{/each}
		{/each}
	</div>
</div>
