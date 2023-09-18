<script lang="ts">
	import { scale } from 'svelte/transition';
	import { Card, Gallery } from 'flowbite-svelte';

	const cards = [
		{
			img: '/vackground-pattern.png',
			href: '/sort-integers',
			text: 'Liste ganzer Zahlen sortieren',
			desc: 'Eine beliebige Anzahl ganzer Zahlen nach ihrem Wert sortieren'
		},
		{
			img: '/sven-brandsma-letters.png',
			reverse: false,
			href: '/sort-strings',
			text: 'Liste von Zeichenketten sortieren',
			desc: 'Eine beliebige Anzahl von Zeichenketten korrekt lokalisiert sortieren'
		},
		{
			img: '/fabian-oelkers-mond.png',
			reverse: true,
			href: '/',
			text: 'Gar nichts tun',
			desc: 'Einfach mal entspannen und keine Aktion ausführen'
		}
	];
	let displayCards: typeof cards = [];

	setTimeout(function oneMore() {
		if (displayCards.length == cards.length) return;
		displayCards = [...displayCards, cards[displayCards.length]];
		setTimeout(oneMore, 200);
	});
</script>

<Gallery class="gap-4 md:grid-cols-2 xl:grid-cols-3 mx-4 xl:mx-16 xl:mx-16 mt-4">
	{#each displayCards as card, i (card.text)}
		<Card
			transition={scale}
			img={card.img}
			horizontal
			reverse={i % 3 == 0}
			href={card.href}
			class=""
		>
			<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				{card.text}
			</h5>
			<p class="font-normal text-gray-700 dark:text-gray-600 leading-tight">
				{card.desc}
			</p>
		</Card>
	{/each}
</Gallery>
