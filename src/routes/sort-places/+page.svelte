<script lang="ts">
	import { title } from '../../ui/navbar';
	import OpenLayersMap from './OpenLayersMap.svelte';
	import PathProperties from '../../components/PathProperties.svelte';
	import PathAlgorithms from '../../components/PathAlgorithms.svelte';
	import { type CoordPoint, type NamedPoint, coordSimilar } from '../../geom/coordPoint';
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
</script>

<div class="mt-4 pb-10 mx-10">
	<div
		class="mt-8 grid grid-cols-12 gap-8 auto-cols-max align-stretch justify-stretch justify-items-stretch"
	>
		<Window title="Karte" options row={3}>
			<div class="h-full m-0">
				{#key olmKey}
					<OpenLayersMap {invalidate} {metric} bind:points {edges} />
				{/key}
			</div>
		</Window>

		<Options
			xlCol={6}
			on:blowUp={blowUp}
			bind:invalidate
			bind:locked={pointsLocked}
			hide={['add']}
			on:delete={invalidate(() => (points = []))}
			bind:metric
			loadAmount={Object.keys(presets).length}
			on:asVectors={invalidate(() => {
				goto(
					'/sort-vectors?v=' +
						points.map((p) => [p.lat, p.lng].map((f) => f.toFixed(5)).join('i')).join('o')
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
	</div>
</div>
