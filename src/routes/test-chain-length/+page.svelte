<script lang="ts">
	import { Progressbar } from 'flowbite-svelte';
	import { chainLength } from '../../geom/dist';
	import { serverOutputDistPathCreation } from '../../server/types';
	import { registerCallback, sendWebsocket } from '../../server/websocket';
	import { title } from '../../ui/navbar';
	import CopyButton from '../../components/CopyButton.svelte';

	title.set('Kettenlänge testen');

	let initialRepeat = 50;

	type SizeBound = { start: number; end: number; current: number };
	type DataPoint = {
		size: number;
		dim: number;
		randomChainLength: number;
		optimalChainLength: number;
	};

	const dimensionValues = [1, 2, 3, 4, 10, 50, 100];

	const initialState: typeof state = {
		type: 'start',
		size: { start: 3, end: 50, current: 3 }
	};
	let state:
		| { type: 'start'; size: SizeBound }
		| { type: 'repeat'; dimensionsLeft: number[]; size: SizeBound; repeat: number }
		| {
				type: 'getOptimal';
				dimensionsLeft: number[];
				size: SizeBound;
				repeat: number;
				data: Array<number[]>;
		  }
		| { type: 'done' } = initialState;

	let dataPoints: DataPoint[] = [];

	function advanceState() {
		if (state.type === 'start') {
			state = {
				type: 'repeat',
				size: { ...state.size, start: state.size.current },
				dimensionsLeft: dimensionValues,
				repeat: initialRepeat
			};
			advanceState();
		} else if (state.type === 'repeat') {
			let currentDim = state.dimensionsLeft[0];
			let data = new Array(state.size.current)
				.fill(0)
				.map((_) => new Array(currentDim).fill(0).map((_) => Math.random()));
			sendWebsocket({
				type: 'action',
				pool: {
					ilpMaxDuration: state.size.current
				},
				action: {
					type: 'createDistPath',
					method: {
						type: 'ilp'
					},
					values: data,
					dimensions: currentDim,
					metric: {
						norm: 'euclidean',
						invert: false
					}
				}
			});
			state = {
				...state,
				type: 'getOptimal',
				data
			};
		} else if (state.type === 'done') {
			state = initialState;
		}
	}

	function advanceStateOther() {
		if (state.type !== 'getOptimal') return;
		if (state.repeat > 1) {
			state = {
				...state,
				type: 'repeat',
				repeat: state.repeat - 1
			};
		} else if (state.dimensionsLeft.length > 1) {
			state = {
				...state,
				type: 'repeat',
				repeat: initialRepeat,
				dimensionsLeft: state.dimensionsLeft.slice(1)
			};
		} else if (state.size.current < state.size.end) {
			state = {
				...state,
				type: 'repeat',
				repeat: initialRepeat,
				dimensionsLeft: dimensionValues,
				size: { ...state.size, current: state.size.current + 1 }
			};
		} else {
			state = {
				type: 'done'
			};
		}
	}

	registerCallback(serverOutputDistPathCreation, (dpc) => {
		if (!dpc.donePath) return;
		if (state.type === 'getOptimal') {
			let optimalChainLength = chainLength(dpc.donePath);
			let randomChainLength = chainLength(state.data);
			dataPoints = [
				...dataPoints,
				{
					dim: state.dimensionsLeft[0],
					optimalChainLength,
					randomChainLength,
					size: state.size.current
				}
			];
			advanceStateOther();
			advanceState();
		}
	});

	function progressValue(s: typeof state): number | null {
		if (s.type !== 'start' && s.type !== 'done') {
			const repetition = (initialRepeat - s['repeat']) / initialRepeat;
			const dimensionProgress = 1 - s.dimensionsLeft.length / dimensionValues.length;
			return (dimensionProgress + repetition / dimensionValues.length) * 100;
		} else {
			return 0;
		}
	}
</script>

<div class="mx-32 mt-10">
	<Progressbar progress={progressValue(state) ?? undefined} />
	{#if state.type == 'start'}
		<div class="m-4 p-4 bg-gray-400 rounded flex flex-row items-center justify-start gap-6">
			<div class="p-2">
				Listenlänge von
				<input type="number" bind:value={state.size.current} />
				zu
				<input type="number" bind:value={state.size.end} />
			</div>
			<div class="p-2">
				Wiederholungen
				<input type="number" bind:value={initialRepeat} />
			</div>
			<div class="bg-gray-900 p-2 rounded hover:bg-gray-100 transition-all">
				<button on:click={advanceState} class="text-white text-3xl hover:text-black transition-all">
					Test starten
				</button>
			</div>
		</div>
	{:else if state.type == 'done'}
		<div class="bg-gray-700 p-2 rounded hover:bg-gray-100 transition-all">
			<button on:click={advanceState} class="text-white text-3xl hover:text-black transition-all">
				Fertig: Fortfahren
			</button>
		</div>
	{/if}

	{#if state.type !== 'start' && state.type !== 'done'}
		<div class="text-white text-xl">n={state.size.current}</div>
	{/if}

	<CopyButton text={JSON.stringify(dataPoints)} title="Datenpunkte kopieren" />

	<div class="text-white text-xl">k={dataPoints.length}</div>

	<div class="text-white text-xl">{state.type}</div>

	{#if state.type === 'getOptimal'}
		<div class="text-white text-xl">D={state.dimensionsLeft[0]}</div>
	{/if}
</div>
