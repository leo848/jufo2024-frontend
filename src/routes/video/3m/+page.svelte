<script lang="ts">
	import { title } from '../../../ui/navbar';

	title.set('Kurzvideo (3 Minuten)');

	let allowedVimeo = false;

	const videoID = 916472978;
</script>

<div class="flex flex-row justify-around mt-8">
	{#if allowedVimeo}
		<iframe
			title="Vimeo-Videoansicht"
			src={` https://player.vimeo.com/video/${videoID}?h=166a7ad51a&loop=1`}
			width="640"
			height="360"
			frameborder="0"
			allow="autoplay; fullscreen; picture-in-picture"
			allowfullscreen
		/>
		<p>
			<a href="https://vimeo.com/916472978"
				>sorting the colors Dimensionsbezogene Generalisierung vergleichsbasierter Sortierung</a
			>
			from <a href="https://vimeo.com/jugendforscht">Jugend forscht</a> on
			<a href="https://vimeo.com">Vimeo</a>.
		</p>
	{:else}
		<div class="flex flex-col text-white max-w-[300px] p-4 bg-gray-800 rounded-xl">
			Das Auswählen von "Vimeo-Video einblenden" und anschließender Klick auf das Video sorgt dafür,
			dass Daten an Vimeo-Server (in den Vereinigten Staaten) gesendet werden. Durch Klicken auf den
			Button wird der Verwendung dieser Daten zugestimmt.
			<button
				on:click={() => (allowedVimeo = true)}
				class="bg-cyan-700 hover:bg-cyan-500 transition-all text-xl p-4 mt-4 rounded-xl"
				>Vimeo-Video einblenden</button
			>
		</div>
	{/if}
</div>
