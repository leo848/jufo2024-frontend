<script lang="ts">
	import { title } from '../../ui/navbar';
	import { Card } from 'flowbite-svelte';
	import * as Icon from 'flowbite-svelte-icons';
	import OpenLayersMap from './OpenLayersMap.svelte';
	import PathProperties from '../../components/PathProperties.svelte';
	import PathAlgorithms from '../../components/PathAlgorithms.svelte';
	import { type CoordPoint, type NamedPoint, coordSimilar } from '../../geom/coordPoint';
	import { registerCallback, unregisterCallback } from '../../server/websocket';
	import { serverOutputPathCreation, serverOutputPathImprovement } from '../../server/types';
	import { onDestroy } from 'svelte';
	import presets from './presets';
	import Window from '../../components/Window.svelte';

	title.set('Orte sortieren');

	let points: NamedPoint[] = presets[0].values;
	$: length = points.length;

	let edges: [CoordPoint, CoordPoint][] = [];

	let path: null | number[][] = [];
	let invalidateAlgorithms: () => {};

	function setDataFromPath(path: number[][]) {
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

	let callbackIdCreation = registerCallback(serverOutputPathCreation, (pc) => {
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

	let callbackIdImprovement = registerCallback(serverOutputPathImprovement, (pi) => {
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
		<Window title="Karte" options row={2}>
			<div class="h-full m-0">
				<OpenLayersMap bind:points {edges} />
			</div>
		</Window>

		<PathProperties {path} {length} horizontal />

		<PathAlgorithms
			on:deletePath={() => (path = null)}
			bind:invalidate={invalidateAlgorithms}
			dimensions={2}
			horizontal
			points={points.map((p) => [p.lat, p.lng])}
		/>
	</div>
</div>
