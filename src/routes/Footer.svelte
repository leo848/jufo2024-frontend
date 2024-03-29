<script lang="ts">
	import { gradient } from '../ui/color';
	import { OklabColor } from '../color/colorSpaces';
	import Deployment from './Deployment.svelte';
	import SimpleLink from '../components/SimpleLink.svelte';

	const pages = [
		{ url: '/', title: 'Startseite' },
		{ url: '/sort-colors', title: 'Farben sortieren' },
		{ url: '/sort-integers', title: 'Zahlen sortieren' },
		{ url: '/sort-words', title: 'Wörter sortieren' },
		{ url: '/sort-places', title: 'Orte sortieren' },
		{ url: '/sort-vectors', title: 'Vektoren sortieren' },
		{ url: '/hamilton-path', title: 'Hamilton-Pfad finden' }
	];
	const links = [
		{ url: '/Langfassung.pdf', title: 'Langfassung' },
		{ url: '/video/8m', title: 'Video (Vollversion 8min)', target: '_self' },
		{ url: 'https://vimeo.com/916472978', title: 'Video (gekürzt 3min)' },
		{ url: 'https://github.com/leo848/jufo2024-backend', title: 'Quelltext Backend' },
		{ url: 'https://github.com/leo848/jufo2024-frontend', title: 'Quelltext Frontend' },
		{ url: '/Karten.pdf', title: 'Farbkarten (ausdruckbar)' },
		{ url: '/Abbildungen.pdf', title: 'Abbildungen' }
	];

	let footerGradient: string;
	{
		const amount = 100;
		let range = new Array(amount)
			.fill(0)
			.map((_v, i) => i / (amount - 1))
			.map((v) => v * Math.PI * 2)
			.map((h) => {
				const l = 0.3;
				const c = 0.05;
				const [a, b] = [c * Math.sin(h), c * Math.cos(h)];
				return OklabColor.fromUnnormalOklab(l, a, b).color();
			});
		footerGradient = gradient(range);
	}
</script>

<div
	class="min-h-40 bg-gray-800 text-gray-300 p-10 grid grid-cols-6 gap-12 rotating-bg"
	style={`background:${footerGradient}`}
>
	<!-- footer -->
	<div class="xl:col-span-2 col-span-3">
		<div class="text-6xl">sorting the colors</div>
		<div class="text-2xl">
			Dimensionsbezogene <b>Generalisierung</b><br />vergleichsbasierter <b>Sortierung</b>
		</div>

		<Deployment />
	</div>
	<div class="xl:col-span-2 col-span-3">
		<a href="https://jugend-forscht.de" target="_blank">
			<img
				class="bg-white-transparent p-2 rounded-md mb-4"
				src="/1920px-Jugend_forscht.svg"
				alt="Jugend forscht logo"
			/>
		</a>
		<div class="">Ein <b>jugend forscht</b>-Projekt von Leo Blume</div>
		<div class="opacity-50">
			Copyright &copy; 2023, 2024 Leo Blume. Der Quelltext des Projekts (Frontend und Backend) steht
			unter der GNU GPL v3-Lizenz und ist damit freie Software; er kann unter den Bedingungen dieser
			Lizenz geteilt und/oder modifiziert werden.
		</div>
	</div>

	<div class="col-span-2 xl:col-span-1">
		<div class="text-gray-200 text-2xl">Unterseiten</div>
		<div class="flex flex-col text-gray-400">
			{#each pages as { url: href, title }}
				<SimpleLink {href}>{title}</SimpleLink>
			{/each}
		</div>
	</div>
	<div class="col-span-2 xl:col-span-1">
		<div class="text-gray-200 text-2xl">Weitere Links</div>
		<div class="flex flex-col text-gray-400">
			{#each links as { url: href, target, title }}
				<SimpleLink {href} {target}>{title}</SimpleLink>
			{/each}
		</div>
	</div>
</div>

<style>
	.bg-white-transparent {
		background-color: rgba(255, 255, 255, 10%);
		transition: all 0.1s;
	}
	.bg-white-transparent:hover {
		background-color: rgba(255, 255, 255, 50%);
	}

	.rotating-bg {
		background-repeat: repeat-x;
		animation: rotate-bg 100s linear infinite;
		border-top: 0.25rem solid rgba(255, 255, 255, 50%);
	}

	@keyframes rotate-bg {
		from {
			background-position-x: 0vw;
		}
		to {
			background-position-x: 100vw;
		}
	}
</style>
