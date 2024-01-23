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
	import type { DistanceType } from '../../geom/dist';
	import { goto } from '$app/navigation';

	title.set('Orte sortieren');

	let points: NamedPoint[] = presets[4].values;
	let pointsLocked: boolean = false;
	$: length = points.length;

	let edges: [CoordPoint, CoordPoint][] = [];
	let norm: DistanceType = 'euclidean';
	let rotation: number = presets[2].rotation ?? 0;

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
				<OpenLayersMap {invalidate} {norm} bind:points {rotation} {edges} />
			</div>
		</Window>

		<Window title="Optionen" xlCol={6}>
			<Options
				on:blowUp={blowUp}
				bind:invalidate
				bind:locked={pointsLocked}
				hide={['add']}
				on:delete={invalidate(() => (points = []))}
				bind:norm
				on:asVectors={invalidate(() => {
					goto(
						'/sort-vectors?v=' +
							points.map((p) => [p.lat, p.lng].map((f) => f.toFixed(5)).join('i')).join('o')
					);
				})}
			/>
		</Window>
		<PathProperties {path} {length} {blownUp} horizontal />

		<PathAlgorithms
			on:deletePath={() => (path = null)}
			bind:invalidate={invalidateAlgorithms}
			dimensions={2}
			horizontal
			points={points.map((p) => [p.lat, p.lng])}
		/>
	</div>
</div>
