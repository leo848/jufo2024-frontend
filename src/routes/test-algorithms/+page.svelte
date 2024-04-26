<script lang="ts">
	import { Progressbar } from 'flowbite-svelte';
	import { RgbColor } from '../../color/colorSpaces';
	import { chainLength } from '../../geom/dist';
	import { serverOutputDistPathCreation, type PathCreateMethod } from '../../server/types';
	import { registerCallback, sendWebsocket } from '../../server/websocket';
	import { title } from '../../ui/navbar';
	import CopyButton from '../../components/CopyButton.svelte';

	title.set('Algorithmen testen');

	let repet = 50;

	type SizeBound = { start: number; end: number; current: number };
	let state:
		| { type: 'start'; sizeBound: SizeBound }
		| { type: 'repeat'; repeat: number; sizeBound: SizeBound }
		| {
				type: 'getOptimal';
				data: Array<number>[];
				repeat: number;
				lastStartTime: Date;
				sizeBound: SizeBound;
		  }
		| {
				type: 'getOther';
				data: Array<number>[];
				optimal: number;
				lastStartTime: Date;
				algorithmsLeft: Array<PathCreateMethod['type']>;
				repeat: number;
				sizeBound: SizeBound;
		  }
		| { type: 'done' } = {
		type: 'start',
		sizeBound: { start: 5, end: 30, current: 5 }
	};

	type DataPoint = {
		size: number;
		algorithm: string;
		time: number;
		chainLengthPercent: number;
	};

	let dataPoints: DataPoint[] = [];

	function advanceState() {
		if (state.type === 'start') {
			state = {
				type: 'repeat',
				repeat: repet,
				sizeBound: state.sizeBound
			};
			advanceState();
		} else if (state.type === 'repeat') {
			let data = new Array(state.sizeBound.current)
				.fill(0)
				.map((_) =>
					new RgbColor(Math.random(), Math.random(), Math.random()).color().oklab().point().values()
				);
			state = {
				type: 'getOptimal',
				repeat: state.repeat,
				sizeBound: state.sizeBound,
				lastStartTime: new Date(),
				data
			};
			return advanceState();
		} else if (state.type === 'done') {
			state = {
				type: 'start',
				sizeBound: {
					start: 5,
					current: 5,
					end: 20
				}
			};
		} else if (state.type === 'getOptimal') {
			sendWebsocket({
				type: 'action',
				pool: {
					ilpMaxDuration: state.sizeBound.current,
				},
				action: {
					type: 'createDistPath',
					method: {
						type: 'ilp'
					},
					values: state.data,
					dimensions: 3,
					metric: {
						norm: 'euclidean',
						invert: false
					}
				}
			});
		} else if (state.type === 'getOther') {
			sendWebsocket({
				type: 'action',
				pool: {},
				action: {
					type: 'createDistPath',
					method: {
						type: state.algorithmsLeft[0]
					},
					values: state.data,
					dimensions: 3,
					metric: {
						norm: 'euclidean',
						invert: false
					}
				}
			});
		}
	}

	registerCallback(serverOutputDistPathCreation, (dpc) => {
		console.log(dpc);
		if (!dpc.donePath) return;
		if (state.type === 'getOptimal') {
			let newChainLength = chainLength(dpc.donePath);
			let naiveChainLength = chainLength(state.data);
			if (Math.abs(naiveChainLength - newChainLength) < 0.001) {
				state = {
					...state,
					type: 'repeat'
				};
				return advanceState();
			}
			state = {
				...state,
				type: 'getOther',
				optimal: chainLength(dpc.donePath),
				lastStartTime: new Date(),
				algorithmsLeft: getAlgorithms(state.sizeBound.current)
			};
			dataPoints = [
				...dataPoints,
				{
					algorithm: 'ilp',
					chainLengthPercent: 1,
					time: new Date().getTime() - state.lastStartTime.getTime(),
					size: state.sizeBound.current
				}
			];
			return advanceState();
		} else if (state.type === 'getOther') {
			dataPoints = [
				...dataPoints,
				{
					algorithm: state.algorithmsLeft[0],
					chainLengthPercent: chainLength(dpc.donePath) / state.optimal,
					time: new Date().getTime() - state.lastStartTime.getTime(),
					size: state.sizeBound.current
				}
			];
			if (state.algorithmsLeft.length > 1) {
				state = {
					...state,
					type: 'getOther',
					lastStartTime: new Date(),
					algorithmsLeft: state.algorithmsLeft.slice(1)
				};
			} else if (state.repeat > 0) {
				state = {
					type: 'repeat',
					repeat: state.repeat - 1,
					sizeBound: state.sizeBound
				};
			} else if (state.sizeBound.current < state.sizeBound.end) {
				state = {
					type: 'repeat',
					repeat: repet,
					sizeBound: {
						...state.sizeBound,
						current: state.sizeBound.current + 1
					}
				};
			} else {
				state = {
					type: 'done'
				};
			}
			advanceState();
		}
	});

	function getAlgorithms(problemSize: number): Array<PathCreateMethod['type']> {
		let alwaysIncluded: Array<PathCreateMethod['type']> = [
			'nearestNeighbor',
			'optimalNearestNeighbor',
			'greedy',
			'transmute',
			'insertion'
		];
		let algorithms = alwaysIncluded;
		/*if (problemSize < 13) {
			algorithms.push('bruteForce');
		}*/
		if (problemSize < 16) {
			algorithms.push('heldKarp');
		}
		return algorithms;
	}

	function progressValue(s: typeof state): number | null {
		if (s.type !== 'start' && s.type !== 'done') {
			return ((repet - s['repeat']) / repet) * 100;
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
				<input type="number" bind:value={state.sizeBound.current} />
				zu
				<input type="number" bind:value={state.sizeBound.end} />
			</div>
			<div class="p-2">
				Wiederholungen
				<input type="number" bind:value={repet} />
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
		<div class="text-white text-xl">n={state.sizeBound.current}</div>
	{/if}

	<CopyButton text={JSON.stringify(dataPoints)} title="Datenpunkte kopieren" />

	<div class="text-white text-xl">k={dataPoints.length}</div>

	<div class="text-white text-xl">{state.type}</div>

	{#if state.type === 'getOther'}
		<div class="text-white text-xl">A={state.algorithmsLeft[0]}</div>
	{/if}
</div>
