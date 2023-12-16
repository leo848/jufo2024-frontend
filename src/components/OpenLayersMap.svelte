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
			.bindPopup('Aachener Dom');

		L.marker([50.77932, 6.05888]).addTo(map)
			.bindPopup('Informatik-Fakultät');

		console.log(map);
	});
</script>

<div class="h-full" bind:this={wrapperDiv}>
</div>
