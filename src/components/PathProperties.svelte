<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import type { Point3 } from '../geom/point';
	import { tweened } from 'svelte/motion';
	import {cubicIn} from 'svelte/easing';
	import {constrain} from '../utils/math';

	export let path: Point3[]| null = null;
	export let length: number = path?.length || 0;

	let chainLength = tweened(0);

	let displayLength = tweened(length, { duration(from, to) {
		return constrain(to - from, 10, 100) * 10;
	}, easing: cubicIn });
	$: displayLength.set(length);

	$: if (path !== null) {
		let lengthAcc = 0;
		for (let i = 0; i < path.length - 1; i++) {
			lengthAcc += path[i].distanceTo(path[i + 1]);
		}
		chainLength.set(lengthAcc);
	} else {
		chainLength.set(0);
	}
</script>

<Card class="rounded-xl col-span-12 md:col-span-6 lg:col-span-5 xl:col-span-3 max-w-none">
	<p class="text-2xl xl:text-3xl dark:text-white bg-gray-700 p-4 -m-6 rounded-t-xl mb-4">
		Eigenschaften
	</p>
	<div class="text-xl tabular-nums">
		<div class="grid grid-cols-2 gap-4">
			<div class="col-span-2 rounded-2xl bg-gray-700 py-4 text-gray-400 flex-col flex justify-around items-center">
				<div class="text-8xl">{$chainLength.toFixed(2)}</div>
				<div>Kettenlänge</div>
			</div>
			<div class="col-span-1 rounded-2xl bg-gray-700 py-4 text-gray-400 flex-col flex justify-around items-center">
				<div class="text-5xl">{$displayLength.toFixed(0)}</div>
				<div>Anzahl</div>
			</div>
			<div class="col-span-1 rounded-2xl bg-gray-700 py-4 text-gray-400 flex-col flex justify-around items-center">
				<div class="text-5xl">{($chainLength / length).toFixed(3)}</div>
				<div>Ø Distanz</div>
			</div>
		</div>
	</div>
</Card>
