<script lang="ts">
	import { title } from '../../../ui/navbar';

	title.set('Video (8 Minuten)');

	let allowedYouTube = false;

	const videoID = 'MUNU9x1WDwU';
</script>

<div class="flex flex-row justify-around mt-8">
	{#if allowedYouTube}
		<iframe
			width={560 * 2}
			height={315 * 2}
			src={` https://www.youtube-nocookie.com/embed/${videoID}?si=vmI70gD6ZxHvUcCx&loop=1&playlist=${videoID}&rel=0`}
			title="Youtube-Videoansicht"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			allowfullscreen
		/>
	{:else}
		<div class="flex flex-col text-white max-w-[300px] p-4 bg-gray-800 rounded-xl">
			Das Auswählen von "YouTube-Video einblenden" sorgt dafür, dass Daten an Google-Server (in den
			Vereinigten Staaten) gesendet werden. Durch Klicken auf den Button wird der Verwendung dieser
			Daten zugestimmt.
			<button
				on:click={() => (allowedYouTube = true)}
				class="bg-cyan-700 hover:bg-cyan-500 transition-all text-xl p-4 mt-4 rounded-xl"
				>YouTube-Video einblenden</button
			>
		</div>
	{/if}
</div>
