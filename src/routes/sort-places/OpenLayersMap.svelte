<script lang="ts">
	import { onMount } from 'svelte';
	import L, { type LatLngLiteral } from 'leaflet';
	import 'leaflet/dist/leaflet.css';
	import 'leaflet/dist/images/marker-icon.png';
	import type { CoordPoint, NamedPoint } from '../../geom/coordPoint';
	import { scale } from 'svelte/transition';
	import type { TrueDistanceType } from '../../geom/dist';

	export let points: NamedPoint[];
	export let edges: [CoordPoint, CoordPoint][];

	export let metric: TrueDistanceType = { norm: 'euclidean', invert: false };
	export let invalidate: <T>(c: (t: T) => void) => (t: T) => void;

	let wrapperDiv: HTMLDivElement;
	let selectElt: HTMLDivElement;
	let map: L.Map;

	let markers: L.Marker[] = [];

	$: if (map) {
		markers.forEach((m) => m.removeFrom(map));
		markers = points.map((p) => {
			const marker = L.marker(p, { opacity: 0.8 });
			marker.bindTooltip(p.name);
			return marker;
		});
		markers.forEach((m) => {
			m.addTo(map);
		});
	}

	let edgeLines: L.Path[] = [];
	$: {
		edgeLines.forEach((l) => l.removeFrom(map));
		if (metric.norm === 'euclidean') {
			edgeLines = edges.map((edge) => new L.Polyline([edge]));
		} else {
			edgeLines = edges.map(
				([point1, point2]) => new L.Polyline([point1, [point2.lat, point1.lng], point2])
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
		const config = {
			center: center(points),
			zoom: 13,
			minZoom: 8,
			attributionControl: false,
			rotate: true
			// maxBounds: [[ 50.7, 6.0 ], [ 50.8, 6.1 ]]
		};
		map = L.map(wrapperDiv, config);

		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
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

	function center(points: CoordPoint[]): CoordPoint {
		return {
			lat: points.map((p) => p.lat).reduce((a, b) => a + b, 0) / points.length,
			lng: points.map((p) => p.lng).reduce((a, b) => a + b, 0) / points.length
		};
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

<div class="h-full" bind:this={wrapperDiv} />

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
