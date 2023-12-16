<script lang="ts">
	import { Card, Gallery } from 'flowbite-svelte';
	import Container from './Container.svelte';
	import { scale } from 'svelte/transition';

	const cards = [
		{
			img: '/vackground-pattern.png',
			href: '/sort-integers',
			text: 'Liste ganzer Zahlen sortieren',
			desc: 'Eine beliebige Anzahl ganzer Zahlen nach ihrem Wert sortieren'
		},
		{
			img: '/robert-katzki-colors.png',
			reverse: false,
			href: '/sort-colors',
			text: 'Farben sortieren',
			desc: 'Farben in beliebigem Farbraum eingeben und nach einzelnen Komponenten oder mit eigener TSP-Metrik optimal oder heuristisch sortieren'
		},
		{
			img: '/shubbam-dhage-vector.png',
			reverse: true,
			href: '/sort-vectors',
			text: 'Vektoren sortieren',
			desc: 'n-dimensionale Vektoren sortieren'
		},
	];
	let displayCards: typeof cards = [];

	setTimeout(function oneMore() {
		if (displayCards.length == cards.length) return;
		displayCards = [...displayCards, cards[displayCards.length]];
		setTimeout(oneMore, 200);
	});
</script>

<Gallery class="gap-4 md:grid-cols-2 mx-32 mt-4">
	{#each displayCards as card, i (card.text)}
		<div transition:scale>
			<Card img={card.img} horizontal reverse={i % 2 == i % 4} href={card.href} class="mb-4">
				<h5 class="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
					{card.text}
				</h5>
				<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
					{card.desc}
				</p>
			</Card>
		</div>
	{/each}
</Gallery>
