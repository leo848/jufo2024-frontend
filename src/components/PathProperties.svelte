<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import { tweened } from 'svelte/motion';
	import { cubicIn } from 'svelte/easing';
	import { constrain } from '../utils/math';

	export let path: number[][] | null = null;
	export let length: number = path?.length || 0;

	export let horizontal: boolean = false;

	let chainLength = tweened(0);

	let displayLength = tweened(length, {
		duration(from, to) {
			return constrain(to - from, 10, 100) * 10;
		},
		easing: cubicIn
	});
	$: displayLength.set(length);

	function distance(point1: number[], point2: number[]) {
		let distSq = 0;
		for (let comp = 0; comp < point1.length; comp++) {
			let diff = point1[comp] - point2[comp];
			distSq += diff * diff;
		}
		return Math.sqrt(distSq);
	}

	$: if (path != null) {
		let lengthAcc = 0;
		for (let i = 0; i < path.length - 1; i++) {
			lengthAcc += distance(path[i], path[i + 1]);
		}
		chainLength.set(lengthAcc);
	} else {
		chainLength.set(0);
	}

	$: chainLengthDisplay = $chainLength.toFixed(
		Math.max(2 - Math.max(0, Math.log10($chainLength)), 0)
	);
	$: averageDistDisplay = ($chainLength / length).toFixed(
		Math.max(2 - Math.max(0, Math.log10($chainLength / length)), 0)
	);
</script>

<Card class={` rounded-xl col-span-12 md:col-span-6 lg:col-span-5 xl:col-span-${ horizontal ? 6 : 3 } max-w-none` }>
	<p class="text-2xl xl:text-3xl dark:text-white bg-gray-700 p-4 -m-6 rounded-t-xl mb-4">
		Eigenschaften
	</p>
	<div class="text-xl tabular-nums">
		<div class={`grid grid-cols-${horizontal ? 4 : 2 } gap-4`}>
			<div
				class="col-span-2 rounded-2xl bg-gray-700 py-4 text-gray-400 flex-col flex justify-around items-center"
			>
				<div class="text-8xl">{chainLengthDisplay}</div>
				<div>Kettenlänge</div>
			</div>
			<div
				class="col-span-1 rounded-2xl bg-gray-700 py-4 text-gray-400 flex-col flex justify-around items-center"
			>
				<div class="text-5xl">{$displayLength.toFixed(0)}</div>
				<div>Anzahl</div>
			</div>
			<div
				class="col-span-1 rounded-2xl bg-gray-700 py-4 text-gray-400 flex-col flex justify-around items-center"
			>
				<div class="text-5xl">{averageDistDisplay}</div>
				<div>Ø Distanz</div>
			</div>
		</div>
	</div>
</Card>
