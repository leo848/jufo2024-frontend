<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicIn } from 'svelte/easing';
	import { constrain } from '../utils/math';
	import Window from './Window.svelte';

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
		Math.max(3 - Math.max(0, Math.log10($chainLength)), 0) - 0.01
	);
	$: averageDistDisplay = ($chainLength / length).toFixed(
		Math.max(2 - Math.max(0, Math.log10($chainLength / length)), 0) - 0.01
	);

	const _tailwind = [
		'grid-cols-4',
		'grid-cols-2',
		'xl:col-span-2',
		'xl:col-span-3',
		'xl:col-span-4',
		'xl:col-span-6'
	];
</script>

<Window title="Eigenschaften" xlCol={horizontal ? 6 : 3}>
	<div class="text-xl tabular-nums m-4">
		<div class={`grid grid-cols-${horizontal ? 4 : 2} gap-4`}>
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
</Window>
