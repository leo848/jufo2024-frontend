<script lang="ts">
	import { onMount } from 'svelte';
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';
	import 'leaflet/dist/images/marker-icon.png';

	let wrapperDiv: HTMLDivElement;
	let map: L.map;

	onMount(() => {
		map = L.map(wrapperDiv, {
			center: [50.77450,6.08382],
			zoom: 13,
		});

		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(map);
		
		L.marker([50.77450, 6.08382]).addTo(map)
			.bindPopup('A pretty CSS popup.<br> Easily customizable.')
			.openPopup();

		console.log(map);
	});
</script>

<div class="h-[420px]" bind:this={wrapperDiv}>
</div>
