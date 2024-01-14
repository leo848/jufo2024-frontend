<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicIn } from 'svelte/easing';
	import { constrain } from '../utils/math';
	import Window from './Window.svelte';
	import { dist, type DistanceType } from '../geom/dist';

	export let path: number[][] | null = null;
	export let length: number = path?.length || 0;

	export let norm: DistanceType = 'euclidean';

	export let horizontal: boolean = false;
	export let blownUp: boolean = false;

	let chainLength = tweened(0);

	let displayLength = tweened(length, {
		duration(from, to) {
			return constrain(to - from, 10, 100) * 10;
		},
		easing: cubicIn
	});
	$: displayLength.set(length);

	function distance(point1: number[], point2: number[], norm: DistanceType) {
		return dist(point1, point2, norm);
	}

	$: if (path != null) {
		let lengthAcc = 0;
		for (let i = 0; i < path.length - 1; i++) {
			lengthAcc += distance(path[i], path[i + 1], norm);
		}
		chainLength.set(lengthAcc);
	} else {
		chainLength.set(0);
	}

	$: chainLengthDisplay = $chainLength.toFixed(
		Math.max(3 - Math.max(0, Math.log10($chainLength)), 0) - 0.001
	);
	$: averageDistDisplay = ($chainLength / length).toFixed(
		Math.max(3 - Math.max(0, Math.log10($chainLength / length)), 0) - 0.001
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
	<div class="text-xl tabular-nums">
		<div class={`grid grid-cols-${horizontal ? 4 : 2} gap-4 m-4`}>
				<div
					class="col-span-1 rounded-2xl bg-gray-700 py-4 text-gray-400 flex-col flex justify-around items-center"
				>
					<div class="text-5xl">{$displayLength.toFixed(0)}</div>
					<div>Anzahl</div>
				</div>
			{#if path !== null}
				<div
					class="col-span-1 rounded-2xl bg-gray-700 py-4 text-gray-400 flex-col flex justify-around items-center"
				>
					<div class="text-5xl">{averageDistDisplay}</div>
					<div>Ø Distanz</div>
				</div>
				<div
					class="col-span-2 rounded-2xl bg-gray-700 py-4 text-gray-400 flex-col flex justify-around items-center"
				>
					<div class="text-8xl">{chainLengthDisplay}</div>
					<div>Kettenlänge</div>
				</div>
			{:else}
				<div class="col-span-2 p-4 bg-gray-700 rounded">
					{#if blownUp}
						<div class="text-4xl text-white">Pfad gelöscht</div>
						<div>
							Durch eine Änderung der Werte im entsperrten Modus wurde der Pfad gelöscht. Drücke auf <b
								>Aktuelle Anordnung</b
							>, um einen Pfad aus der vorliegenden Reihenfolge zu erstellen.
						</div>
					{:else}
						<div class="text-4xl text-white">Kein Pfad</div>
						<div>Erzeuge einen Pfad mittels der <b>Konstruktion</b>.</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</Window>
