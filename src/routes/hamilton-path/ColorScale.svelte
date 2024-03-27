<script lang="ts">
	import { RgbColor } from '../../color/colorSpaces';
	import { distColor } from '../../color/gradient';
	import { gradient } from '../../ui/color';

	export let min: number | null;
	export let max: number | null;

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
</script>

<div
	class="h-20 rounded-b-xl flex flex-row justify-between align-center items-center text-3xl text-white"
	style:background={gradient(gradientStops, { smooth: true })}
>
	{#each scaleStops as stop}
		<div>{stop.toFixed((max ?? 0) > 5 ? 0 : 1)}</div>
	{/each}
</div>
