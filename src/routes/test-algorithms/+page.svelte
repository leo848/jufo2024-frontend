<script lang="ts">
	import { Progressbar } from 'flowbite-svelte';
	import { OklabColor, RgbColor } from '../../color/colorSpaces';
	import { chainLength } from '../../geom/dist';
	import {
		serverOutputDistPathCreation,
		PathCreateMethod,
		PathImproveMethod,
		serverOutputDistPathImprovement
	} from '../../server/types';
	import { registerCallback, sendWebsocket } from '../../server/websocket';
	import { title } from '../../ui/navbar';
	import CopyButton from '../../components/CopyButton.svelte';
	import type { Color } from '../../color/color';
	import ColorDisplay from '../sort-colors/ColorDisplay.svelte';

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
				sizeBound: SizeBound;
		  }
		| {
				type: 'getNN';
				data: Array<number>[];
				repeat: number;
				sizeBound: SizeBound;
				optimal: number;
		  }
		| {
				type: 'getOther';
				data: Array<number>[];
				nnEstimate: Array<number>[];
				optimal: number;
				algorithmsLeft: Array<PathCreateMethod | PathImproveMethod>;
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
		chainLengthPercent: number;
	};

	let colorsForViz: Color[] = [];
	let vizTimeout: NodeJS.Timeout | null = null;

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
					ilpMaxDuration: state.sizeBound.current
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
		} else if (state.type === 'getNN') {
			sendWebsocket({
				type: 'action',
				pool: {},
				action: {
					type: 'createDistPath',
					method: {
						type: 'nearestNeighbor'
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
			let algorithm = state.algorithmsLeft[0];
			let create = PathCreateMethod.safeParse(algorithm);
			if (create.success) {
				sendWebsocket({
					type: 'action',
					pool: {},
					action: {
						type: 'createDistPath',
						method: create.data,
						values: state.data,
						dimensions: 3,
						metric: {
							norm: 'euclidean',
							invert: false
						}
					}
				});
			} else {
				let improve = PathImproveMethod.parse(algorithm);
				sendWebsocket({
					type: 'action',
					pool: {},
					action: {
						type: 'improveDistPath',
						method: improve,
						path: state.nnEstimate,
						dimensions: 3,
						metric: {
							norm: 'euclidean',
							invert: false
						}
					}
				});
			}
		}
	}

	function advanceStateOther() {
		if (state.type !== 'getOther') return;
		if (state.algorithmsLeft.length > 1) {
			state = {
				...state,
				type: 'getOther',
				algorithmsLeft: state.algorithmsLeft.slice(1)
			};
		} else if (state.repeat > 1) {
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
			colorsForViz = [];
			state = {
				type: 'done'
			};
		}
	}

	registerCallback(serverOutputDistPathCreation, (dpc) => {
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
			console.log('get optimal done');
			state = {
				...state,
				type: 'getNN',
				optimal: chainLength(dpc.donePath)
			};
			dataPoints = [
				...dataPoints,
				{
					algorithm: 'ilp',
					chainLengthPercent: 1,
					size: state.sizeBound.current
				}
			];
			let path = dpc.donePath;
			let timeout = setTimeout(() => {
				if (vizTimeout !== null && vizTimeout !== timeout) {
					clearTimeout(vizTimeout);
					vizTimeout = null;
					return;
				}
				colorsForViz = path.map((v) => new OklabColor(v[0], v[1], v[2]).color());
			}, 500);
			vizTimeout = timeout;
			return advanceState();
		} else if (state.type === 'getNN') {
			console.log('nn done');
			state = {
				...state,
				type: 'getOther',
				nnEstimate: dpc.donePath,
				algorithmsLeft: getAlgorithms()
			};
			dataPoints.push({
				algorithm: 'nearestNeighbor',
				chainLengthPercent: chainLength(dpc.donePath) / state.optimal,
				size: state.sizeBound.current
			});
			dataPoints = dataPoints;
			return advanceState();
		} else if (state.type === 'getOther') {
			dataPoints.push({
				algorithm: state.algorithmsLeft[0].type,
				chainLengthPercent: chainLength(dpc.donePath) / state.optimal,
				size: state.sizeBound.current
			});
			dataPoints = dataPoints;
			advanceStateOther();
			return advanceState();
		}
	});

	registerCallback(serverOutputDistPathImprovement, (dpi) => {
		if (!dpi.done) return;
		if (state.type === 'getOther') {
			dataPoints.push({
				algorithm: state.algorithmsLeft[0].type,
				chainLengthPercent: chainLength(dpi.currentPath) / state.optimal,
				size: state.sizeBound.current
			});
			dataPoints = dataPoints;
			advanceStateOther();
			advanceState();
		}
	});

	function getAlgorithms(): Array<PathCreateMethod | PathImproveMethod> {
		let alwaysIncluded: Array<PathCreateMethod | PathImproveMethod> = [
			{ type: 'optimalNearestNeighbor' },
			{ type: 'greedy' },
			{ type: 'transmute' },
			{ type: 'insertion' },
			{ type: 'twoOpt' },
			{ type: 'innerRotate' },
			{ type: 'twoOptAndInnerRotate' }
		];
		let algorithms = alwaysIncluded;
		/*if (problemSize < 13) {
			algorithms.push('bruteForce');
		}*/
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

	<div class="mt-4">
		{#each colorsForViz as color}
			<ColorDisplay offline {color} />
		{/each}
	</div>

	{#if state.type !== 'start' && state.type !== 'done'}
		<div class="text-white text-xl">n={state.sizeBound.current}</div>
	{/if}

	<CopyButton text={JSON.stringify(dataPoints)} title="Datenpunkte kopieren" />

	<div class="text-white text-xl">k={dataPoints.length}</div>

	<div class="text-white text-xl">{state.type}</div>

	{#if state.type === 'getOther'}
		<div class="text-white text-xl">A={state.algorithmsLeft[0].type}</div>
	{/if}
</div>
