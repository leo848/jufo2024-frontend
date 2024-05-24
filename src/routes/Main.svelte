<script lang="ts">
	import { Gallery } from 'flowbite-svelte';
	import { scale } from 'svelte/transition';
	import SimpleLink from '../components/SimpleLink.svelte';

	const cards = [
		{
			img: '/vackground-pattern.png',
			imgSource: 'vackground.com',
			href: '/sort-integers',
			text: 'Zahlen sortieren',
			desc: 'Eine Liste ganzer Zahlen zwischen -9999 und 9999 mittels verschiedener linearithmischer oder quadratischer Algorithmen sortieren und die Sortierung visualisieren'
		},
		{
			img: '/robert-katzki-colors.png',
			imgSource: 'Robert Katzki',
			href: '/sort-colors',
			text: 'Farben sortieren',
			desc: 'Farben in beliebigem Farbraum eingeben und als mehrdimensionale Objekte nach zahlreichen Konstruktions- und Verbesserungsalgorithmen sortieren'
		},
		{
			img: '/shubbam-dhage-vector.png',
			imgSource: 'Shubbam Dhage',
			href: '/sort-vectors',
			text: 'Vektoren sortieren',
			desc: 'n-dimensionale Vektoren gemäß all ihren Komponenten und einer durch eine p-Norm induzierte Metrik sortieren'
		},
		{
			img: '/joel-de-vriend-metro.png',
			imgSource: 'Joel de Vriend',
			href: '/sort-places',
			text: 'Orte sortieren',
			desc: 'Geografische Orte über eine Kartenanwendung sortieren'
		},
		{
			img: '/glen-carrie-words.png',
			imgSource: 'Glen Carrie',
			href: '/sort-words',
			text: 'Wörter sortieren',
			desc: 'Deutsche Wörter nach ihrer Bedeutung (semantisch) als Einbettung in einen hochdimensionalen Vektorraum sortieren'
		},
		{
			img: '/r-d-smith-hamilton.png',
			imgSource: 'R. D. Smith',
			href: '/hamilton-path',
			text: 'Hamilton-Pfad',
			desc: 'Den kürzesten Hamilton-Pfad eines beliebigen schlichten Graphen finden, einzugeben über dessen Adjazenzmatrix'
		},
		{
			img: '/jason-leung.png',
			imgSource: 'Jason Leung',
			href: '/schema/list',
			text: 'Eigenes Schema',
			desc: 'Ein eigenes Schema mit numerischen und kategoriellen Dimensionen erstellen, Datenpunkte eingeben und sortieren.'
		}
	];
	let displayCards: typeof cards = [];

	setTimeout(function oneMore() {
		if (displayCards.length == cards.length) return;
		displayCards = [...displayCards, cards[displayCards.length]];
		setTimeout(oneMore, 100);
	});
</script>

<Gallery
	class="gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 mx-32 mt-4"
>
	{#each cards as { img, text }}
		<img src={img} alt={text} class="hidden" />
	{/each}
	{#each displayCards as card (card.text)}
		<div transition:scale>
			<button
				on:click={() => (location.href = card.href)}
				class="mb-4 h-full w-full transition-all lg:flex lg:flex-col max-md:grid max-md:grid-cols-2 dark:bg-gray-800 bg-gray-100 dark:hover:bg-gray-700 hover:bg-gray-300 transition-all rounded-xl overflow-hidden"
			>
				<img src={card.img} class="w-full aspect-ratio-1" alt="Bildvorschau {card.text}" />
				<div class="dark:text-white text-black text-sm opacity-30 max-md:hidden">
					Bildquelle: {card.imgSource} über
					<SimpleLink tabindex={-1} href="https://unsplash.com">Unsplash</SimpleLink>
				</div>
				<div class="m-4">
					<h5 class="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
						{card.text}
					</h5>
					<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
						{card.desc}
					</p>
				</div>
			</button>
		</div>
	{/each}
</Gallery>
