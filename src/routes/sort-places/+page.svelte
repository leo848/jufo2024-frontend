<script lang="ts">
	import { title } from '../../ui/navbar';
	import OpenLayersMap from './OpenLayersMap.svelte';
	import PathProperties from '../../components/PathProperties.svelte';
	import PathAlgorithms from '../../components/PathAlgorithms.svelte';
	import {
		type CoordPoint,
		type NamedPoint,
		coordSimilar,
		coordDelta
	} from '../../geom/coordPoint';
	import { registerCallback, unregisterCallback } from '../../server/websocket';
	import {
		serverOutputDistPathCreation,
		serverOutputDistPathImprovement
	} from '../../server/types';
	import { onDestroy } from 'svelte';
	import presets from './presets';
	import Window from '../../components/Window.svelte';
	import Options from '../../components/Options.svelte';
	import type { TrueDistanceType } from '../../geom/dist';
	import { goto } from '$app/navigation';
	import LoadPlace from './LoadPlace.svelte';
	import { getDurationMatrix, type OpenRouteMatrixInput } from './openRoute';
	import AdjacencyMatrix from '../../components/AdjacencyMatrix.svelte';
	import { sortByKey } from '../../utils/sort';

	title.set('Orte sortieren');

	let points: NamedPoint[] = presets.hamburg.values;
	let pointsLocked: boolean = false;
	$: length = points.length;

	let edges: [CoordPoint, CoordPoint][] = [];
	let metric: TrueDistanceType = { norm: 'euclidean', invert: false };

	let path: null | number[][] = null;
	let invalidateAlgorithms: () => {};
	let invalidate: <T>(c: (t: T) => void) => (t: T) => void;

	let blownUp = false;

	function blowUp() {
		if (path != null) blownUp = true;
		path = null;
		edges = [];
		invalidateAlgorithms();
	}

	let durationMatrix: number[][] | null = null;
	let openRouteKeyPresent: boolean;
	$: points, (openRouteKeyPresent = !!process.env.OPENROUTE_KEY);
	$: points, (durationMatrix = null);

	async function requestMatrix() {
		const [sumLng, sumLat] = points.reduce(
			([lngAcc, latAcc], item) => [lngAcc + item.lng, latAcc + item.lat],
			[0, 0]
		);
		const averageCoord = { lng: sumLng / points.length, lat: sumLat / points.length };
		console.log(points.map((p) => p.name));
		points = sortByKey(points, (p) => {
			const fromOrigin = coordDelta(averageCoord, p);
			const angle = Math.atan2(fromOrigin.lng, fromOrigin.lat);
			return -angle;
		});
		console.log(points.map((p) => p.name));
		let input: OpenRouteMatrixInput = {
			locations: points.map((named) => [named.lng, named.lat])
		};
		let response = await getDurationMatrix(input);
		durationMatrix = response.durations;
	}

	let olmKey = 0;

	function setDataFromPath(path: number[][]) {
		pointsLocked = true;
		points = path.map(
			(arr) =>
				points.find((point) => coordSimilar(point, { lat: arr[0], lng: arr[1] })) ??
				(() => {
					throw new Error('Invalid: returned invalid vector not in list');
				})()
		);
	}

	function pathToEdges(path: number[][]): [CoordPoint, CoordPoint][] {
		let edges = [];
		for (let i = 0; i < path.length - 1; i++) {
			const from = { lat: path[i][0], lng: path[i][1] };
			const to = { lat: path[i + 1][0], lng: path[i + 1][1] };
			const edge: [CoordPoint, CoordPoint] = [from, to];
			edges.push(edge);
		}
		return edges;
	}
	$: if (path === null) edges = [];

	let callbackIdCreation = registerCallback(serverOutputDistPathCreation, (pc) => {
		path = null;
		if (pc.donePath) {
			path = pc.donePath;
			setDataFromPath(pc.donePath);
			edges = pathToEdges(pc.donePath);
			if (demo) olmKey++;
		} else {
			edges = pc.currentEdges.map(([from, to]) => [
				{ lat: from[0], lng: from[1] },
				{ lat: to[0], lng: to[1] }
			]);
		}
	});
	onDestroy(() => unregisterCallback(callbackIdCreation));

	let callbackIdImprovement = registerCallback(serverOutputDistPathImprovement, (pi) => {
		if (pi.better) {
			path = pi.currentPath;
		}
		if (pi.done) {
			setDataFromPath(pi.currentPath);
		}
		edges = pathToEdges(pi.currentPath);
	});
	onDestroy(() => unregisterCallback(callbackIdImprovement));

	let demo = false;
</script>

<div class="mt-4 pb-10 mx-10">
	<div
		class="mt-8 grid grid-cols-12 gap-8 auto-cols-max align-stretch justify-stretch justify-items-stretch"
	>
		<Window title="Karte" options row={3}>
			<div
				class="h-full m-0"
				style={demo && path !== null
					? 'width:100vw;height:100vh;position:fixed;left:0;top:0;z-index:20'
					: ''}
			>
				{#key olmKey}
					<OpenLayersMap {invalidate} {metric} bind:points {edges} demo={demo && path !== null} />
				{/key}
			</div>
		</Window>

		<Options
			xlCol={6}
			on:blowUp={blowUp}
			bind:invalidate
			bind:locked={pointsLocked}
			hide={['add']}
			show={durationMatrix ? ['asGraph'] : []}
			on:delete={invalidate(() => (points = []))}
			bind:metric
			loadAmount={Object.keys(presets).length}
			on:asVectors={invalidate(() => {
				goto(
					'/sort-vectors?v=' +
						points.map((p) => [p.lat, p.lng].map((f) => f.toFixed(5)).join('i')).join('o')
				);
			})}
			on:asGraph={invalidate(() => {
				if (!durationMatrix) return;
				goto(
					'/hamilton-path?v=' +
						durationMatrix.map((row) => row.map((v) => v.toFixed(4)).join('i')).join('o') +
						'&n=' +
						points.map((p) => p.name).join('_')
				);
			})}
		>
			<LoadPlace slot="load" on:load={() => olmKey++} {invalidate} bind:points />
		</Options>

		<PathProperties {path} {length} {blownUp} {metric} horizontal />

		<PathAlgorithms
			on:deletePath={invalidate(() => (path = null))}
			bind:invalidate={invalidateAlgorithms}
			dimensions={2}
			horizontal
			{metric}
			values={points.map((p) => [p.lat, p.lng])}
		/>

		{#if openRouteKeyPresent}
			<Window
				title={durationMatrix === null ? 'Echtzeitdaten ermitteln' : 'Adjazenzmatrix'}
				scrollable
			>
				{#if durationMatrix === null}
					<div class="m-4 p-4 bg-gray-700">
						<div class="text-xl text-white">Fahrtzeitanfrage über externen Server</div>
						{#if points.length > 50}
							<div class="text-white">
								Hinweis: Die API kann nur für 50 oder weniger Punkte verwendet werden. Aktuell sind {points.length}
								Punkte gespeichert. Um dennoch eine Matrix berechnen zu können, können {points.length -
									50} Punkte aus der Liste entfernt werden.
							</div>
							<button
								class="bg-gray-600 hover:bg-gray-500 transition-all rounded text-white p-2"
								on:click={() => (points = points.slice(points.length - 50))}
								>{points.length - 50} erste löschen</button
							>
							<button
								class="bg-gray-600 hover:bg-gray-500 transition-all rounded text-white p-2"
								on:click={() => (points = points.slice(0, 50))}
								>{points.length - 50} letzte löschen</button
							>
						{:else}
							<div>
								Durch Klick auf den Button unten werden die Standortdaten an OpenRouteService
								gesendet, um die Live-Fahrtzeit zwischen den gegebenen Orten (angegeben in Sekunden)
								zu ermitteln. Durch anschließendes Wechseln ins Graph-Menü kann die so induzierte
								Metrik als Sortierkriterium verwendet werden.
							</div>
							<button
								class="bg-gray-600 hover:bg-gray-500 transition-all rounded text-white p-2"
								on:click={requestMatrix}>Matrix anfordern</button
							>
						{/if}
					</div>
				{:else}
					<AdjacencyMatrix
						sort={false}
						values={durationMatrix}
						vertexNames={points.map((p) => p.name)}
						collapseNames
					/>
				{/if}
			</Window>
		{/if}
	</div>
</div>
