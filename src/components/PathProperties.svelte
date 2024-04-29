<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { quartIn } from 'svelte/easing';
	import { constrain } from '../utils/math';
	import Window from './Window.svelte';
	import EdgeDistances from './EdgeDistances.svelte';
	import { dist, type TrueDistanceType } from '../geom/dist';
	import { scale } from 'svelte/transition';

	export let path: number[][] | null = null;
	export let length = path?.length || 0;

	export let metric: TrueDistanceType | ((from: number, to: number) => number);

	export let blownUp: boolean = false;

	export let selectedIndex: number | null = null;

	export let horizontal: boolean = false;
	export let xlCol: number | null = null;

	let displayLength = tweened(length, {
		duration(from, to) {
			return constrain(Math.abs(to - from), 5, 100) * 20;
		},
		easing: quartIn
	});
	$: displayLength.set(length);

	let distances: number[] = [];

	function setDistChain() {
		if (path == null) {
			chainLength.set(0);
			distances = [];
			return;
		}
		let lengthAcc = 0;
		distances = [];
		for (let i = 0; i < path.length - 1; i++) {
			const distance =
				typeof metric === 'function'
					? metric(path[i][0], path[i + 1][0])
					: dist(path[i], path[i + 1], metric);
			lengthAcc += distance;
			distances = [...distances, distance];
		}
		chainLength.set(lengthAcc);
	}

	let chainLength = tweened(0);
	$: path, setDistChain();

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

<Window title="Eigenschaften" xlCol={xlCol ?? (horizontal ? 6 : 3)}>
	<div class="text-xl tabular-nums">
		<div class={`grid grid-cols-${horizontal ? 4 : 2} gap-4 m-4`}>
			<div
				class="col-span-1 rounded-2xl dark:bg-gray-700 bg-gray-100 py-4 dark:text-gray-400 text-gray-800 flex-col flex justify-around items-center"
			>
				{#key length}
					<div class="text-5xl" in:scale>{$displayLength.toFixed(0)}</div>
				{/key}
				<div>Anzahl</div>
			</div>
			{#if path != null}
				<div
					class="col-span-1 rounded-2xl dark:bg-gray-700 bg-gray-100 py-4 dark:text-gray-400 text-gray-800 flex-col flex justify-around items-center"
				>
					<div class="text-5xl">
						{#if averageDistDisplay == 'NaN' || averageDistDisplay == 'Infinity'}
							<span class="text-gray-500">–</span>
						{:else}
							{averageDistDisplay}
						{/if}
					</div>
					<div>Ø Distanz</div>
				</div>
				<div
					class="col-span-2 rounded-2xl dark:bg-gray-700 bg-gray-100 py-4 dark:text-gray-400 text-gray-800 flex-col flex justify-around items-center"
				>
					<div class="text-8xl">{chainLengthDisplay}</div>
					<div>Kettenlänge</div>
				</div>
				<div
					class="col-span-2 rounded-2xl dark:bg-gray-700 bg-gray-100 py-2 dark:text-gray-400 text-gray-800 max-h-[100px]"
				>
					<EdgeDistances {distances} {selectedIndex} />
				</div>
			{:else}
				<div class="col-span-2 p-4 dark:bg-gray-700 bg-gray-100 rounded">
					{#if blownUp}
						<div class="text-4xl dark:text-white text-black">Pfad gelöscht</div>
						<div>
							Durch eine Änderung der Werte im entsperrten Modus wurde der Pfad gelöscht. Drücke auf <b
								>Aktuelle Anordnung</b
							>, um einen Pfad aus der vorliegenden Reihenfolge zu erstellen.
						</div>
					{:else}
						<div class="text-4xl dark:text-white text-black">Kein Pfad</div>
						<div>Erzeuge einen Pfad mittels der <b>Konstruktion</b>.</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</Window>
