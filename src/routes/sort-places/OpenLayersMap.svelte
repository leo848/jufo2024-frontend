<script lang="ts">
	import { onMount } from 'svelte';
	import L, { type LatLngLiteral, type MapOptions } from 'leaflet';
	import 'leaflet/dist/leaflet.css';
	import 'leaflet/dist/images/marker-icon.png';
	import {
		coordAdd,
		coordDelta,
		coordScale,
		type CoordPoint,
		type NamedPoint
	} from '../../geom/coordPoint';
	import { scale } from 'svelte/transition';
	import type { TrueDistanceType } from '../../geom/dist';
	import { tweened, type Tweened } from 'svelte/motion';
	import { quadIn, quadInOut } from 'svelte/easing';

	export let points: NamedPoint[];
	export let edges: [CoordPoint, CoordPoint][];

	export let metric: TrueDistanceType = { norm: 'euclidean', invert: false };
	export let invalidate: <T>(c: (t: T) => void) => (t: T) => void;

	export let demo: boolean = false;

	let wrapperDiv: HTMLDivElement;
	let selectElt: HTMLDivElement;
	let map: L.Map;

	let tileLayer: L.TileLayer;
	let markers: L.Marker[] = [];

	let displayEdges: Tweened<[CoordPoint, CoordPoint][]> = tweened(undefined, {
		easing: quadInOut,
		duration: 600,
		interpolate(a: [CoordPoint, CoordPoint][], b: [CoordPoint, CoordPoint][]) {
			const noAnim = () => b;
			if (b.length === 0) {
				return (tRaw) => {
					let t = quadIn(tRaw);
					return a.map((value) => {
						return [
							coordAdd(value[0], coordScale(coordDelta(value[0], value[1]), t / 2)),
							coordAdd(value[1], coordScale(coordDelta(value[1], value[0]), t / 2))
						];
					});
				};
			}
			if (a.length + 1 === b.length) {
				return (t) => {
					const copy = b.slice();
					const last = copy[copy.length - 1];
					copy[copy.length - 1] = [
						last[0],
						coordAdd(last[0], coordScale(coordDelta(last[0], last[1]), t))
					];
					return copy;
				};
			}
			if (a.length === 0) {
				return (tRaw) => {
					let t = quadIn(tRaw);
					return b.map((value) => {
						return [
							coordAdd(value[0], coordScale(coordDelta(value[0], value[1]), 0.5 - t / 2)),
							coordAdd(value[1], coordScale(coordDelta(value[1], value[0]), 0.5 - t / 2))
						];
					});
				};
			}
			if (a.length != b.length) return noAnim;
			return (t) => {
				return a.map((valueA, index) => {
					const valueB = b[index];
					return [
						coordAdd(valueA[0], coordScale(coordDelta(valueA[0], valueB[0]), t)),
						coordAdd(valueA[1], coordScale(coordDelta(valueA[1], valueB[1]), t))
					];
				});
			};
		}
	});
	$: $displayEdges = edges;

	$: if (map) {
		markers.forEach((m) => m.removeFrom(map));
		markers = (demo ? [] : points).map((p) => {
			const marker = L.marker(p, { opacity: 0.8 });
			marker.bindTooltip(p.name);
			marker.addTo(map);
			return marker;
		});
	}

	let edgeLines: L.Path[] = [];
	$: if (map) {
		edgeLines.forEach((l) => l.removeFrom(map));
		if (metric.norm === 'euclidean') {
			edgeLines = $displayEdges.map(
				(edge) => new L.Polyline([edge], demo ? { color: 'red', weight: 12 } : undefined)
			);
		} else {
			edgeLines = $displayEdges.map(
				([point1, point2]) =>
					new L.Polyline([point1, [point2.lat, point1.lng], point2], {
						color: demo ? 'red' : undefined
					})
			);
		}
		edgeLines.forEach((l) => l.addTo(map));
	}

	let selection: null | {
		position: LatLngLiteral;
		name: string;
	} = null;

	let selectionPopup: L.Popup;

	$: selection === null && selectionPopup && map.closePopup(selectionPopup);

	onMount(() => {
		const config: MapOptions = {
			minZoom: 4,
			attributionControl: false
			// maxBounds: [[ 50.7, 6.0 ], [ 50.8, 6.1 ]]
		};

		map = L.map(wrapperDiv, config);

		map.fitBounds(pointsToBounds(points));

		tileLayer = L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

		map.addControl(
			L.control.attribution({
				prefix: "<a href='https://openstreetmap.com/fixthemap'>Fehler melden</a>"
			})
		);

		map.addEventListener('click', (evt) => {
			if (selection != null) {
				selection = null;
				return;
			}
			selection = {
				position: evt.latlng,
				name: 'Punkt ' + (points.length + 1)
			};
			selectionPopup = L.popup({
				className: 'popup-thing rounded-xl',
				keepInView: true,
				maxWidth: 200
			})
				.setLatLng(evt.latlng)
				.setContent(selectElt);

			requestAnimationFrame(() => selectionPopup.openOn(map));
		});
	});

	function pointsToBounds(points: CoordPoint[]): L.LatLngBounds {
		const latMin = points.map((p) => p.lat).reduce((a, b) => Math.min(a, b));
		const latMax = points.map((p) => p.lat).reduce((a, b) => Math.max(a, b));
		const lngMin = points.map((p) => p.lng).reduce((a, b) => Math.min(a, b));
		const lngMax = points.map((p) => p.lng).reduce((a, b) => Math.max(a, b));
		return L.latLngBounds([latMin, lngMin], [latMax, lngMax]);
	}

	function addSelection() {
		if (selection == null) return;
		let newPoint: NamedPoint = {
			name: selection.name,
			lat: selection.position.lat,
			lng: selection.position.lng
		};
		points = [...points, newPoint];
		selection = null;
	}
</script>

<div class="hidden">
	<div bind:this={selectElt} class="text-white m-4 p-2 leading-tight">
		<div transition:scale>
			{#if selection !== null}
				<div class="text-xl">Punkt hinzufügen</div>
				<div>{selection.position.lat.toFixed(5)}°N, {selection.position.lng.toFixed(5)}°E</div>
				<input type="text" class="mt-4 bg-gray-700 w-full rounded" bind:value={selection.name} />
				<button
					on:click|stopPropagation={invalidate(addSelection)}
					class="text-xl p-2 bg-gray-600 hover:bg-gray-500 transition-all w-full rounded mt-4"
					>Hinzufügen</button
				>
			{/if}
		</div>
	</div>
</div>

<div
	class="h-full"
	style={demo ? 'left:0;top:0;height:100vh;width:100vw;position:fixed;z-index:20' : ''}
	bind:this={wrapperDiv}
/>

<style>
	:global(.popup-thing) {
		padding: 0;
		margin: 0;
	}

	:global(
			.popup-thing,
			.popup-thing > .leaflet-popup-content-wrapper,
			.leaflet-popup-tip,
			.leaflet-popup-content
		) {
		background-color: rgb(31 41 55);
		font-family: Inter;
	}

	:global(.popup-thing, .popup-thing > .leaflet-popup-content-wrapper, .leaflet-popup-content) {
		margin: 0;
	}
</style>
