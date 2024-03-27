<script lang="ts">
	import { Navbar, NavUl, NavLi, NavHamburger, Toast, Button } from 'flowbite-svelte';
	import ServerStatus from './ServerStatus.svelte';

	import { onMount } from 'svelte';

	import { setGlobalErrorHandler, type DisplayError } from '../server/error';
	import { title } from '../ui/navbar';

	import '../app.postcss';
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	import './fonts.css';
	import { gradient } from '../ui/color';
	import { OklabColor } from '../color/colorSpaces';

	let errors: { error: DisplayError; showDetails: boolean }[] = [];
	let ignore = new Set();

	onMount(() => {
		setGlobalErrorHandler((error: DisplayError) => {
			if (ignore.has(keySep([error.title, error.origin]))) return;
			errors = [...errors, { error, showDetails: false }];
		});
	});

	function keySep(strings: string[]): string {
		return strings.join('|SEP|␞');
	}

	function addIgnore(title: string, origin: string) {
		console.log(ignore);
		const key = keySep([title, origin]);
		ignore.add(key);
		errors = errors.filter((e) => keySep([e.error.title, e.error.origin]) != key);
	}

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

<div class="complete min-h-screen dark:bg-gray-900">
	<Navbar let:toggle color="primary" class="max-lg:py-0 max-lg:px-0">
		<span class="self-center whitespace-nowrap text-3xl font-semibold"
			><a href="/">jufo2024</a></span
		>
		{#if $title}
			{#if typeof $title === 'string'}
				<div class="flex flex-col content-center items-center h-full">
					<p class="text-3xl dark:text-white">{$title}</p>
				</div>
			{:else}
				<svelte:component this={$title} />
			{/if}
		{/if}
		<NavUl>
			<NavLi>
				<ServerStatus />
			</NavLi>
			<!-- <NavLi>
				<DarkMode>
					<svelte:fragment slot="lightIcon">
						<SunSolid />
					</svelte:fragment>
					<svelte:fragment slot="darkIcon">
						<MoonSolid />
					</svelte:fragment>
				</DarkMode>
			</NavLi> -->
		</NavUl>
		<NavHamburger on:click={toggle} />
	</Navbar>
	<div class="toast">
		{#each errors as { error, showDetails }, index (error.description + index)}
			<div
				animate:flip
				transition:fly={{ x: -200, duration: 500 }}
				class="m-6 shadow-xl"
				style={`position: absolute; z-index: 9; transform: translateY(${index * 40}px)`}
			>
				<Toast
					class="max-w-lg bg-red-300 dark:bg-red-500 text-black dark:text-black"
					defaultIconClass="w-20 h-20"
					on:close={() => (errors = [...errors.slice(0, index), ...errors.slice(index + 1)])}
					color="gray"
				>
					<svelte:fragment slot="icon">
						{#if error.icon}
							<svelte:component this={error.icon} class="w-12 h-12" />
						{/if}
					</svelte:fragment>
					<div class="text-md font-bold">{error.origin.toUpperCase()}-FEHLER ({index})</div>
					<div class="text-xl">Fehler: {error.title}</div>
					{#if showDetails}
						<div class="bg-white dark:bg-red-900 p-4 rounded-lg text-black dark:text-white">
							<!-- eslint-disable -->
							{@html error.description}
						</div>
					{/if}
					<div>
						<Button
							on:click={() => (errors[index].showDetails = !errors[index].showDetails)}
							class="mt-4 text-sm p-2"
							color="light"
						>
							{#if showDetails}
								Weniger anzeigen
							{:else}
								Mehr anzeigen
							{/if}
						</Button>
						{#if errors.length >= 2}
							<Button on:click={() => (errors = [])} class="mt-4 text-sm p-2" color="light">
								Alle schließen
							</Button>
						{/if}
						<Button
							on:click={() => addIgnore(error.title, error.origin)}
							class="text-sm p-2"
							color="light">Nicht mehr anzeigen</Button
						>
					</div>
				</Toast>
			</div>
		{/each}
	</div>
	<!-- <PageTransition refresh={$page.url.pathname}> -->
	<div class="min-h-[60vh]">
		<slot />
	</div>
	<!-- </PageTransition> -->
	<div class="h-64" />
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
				Copyright &copy; 2023, 2024 Leo Blume. Der Quelltext des Projekts (Frontend und Backend)
				steht unter der GNU GPL v3-Lizenz und ist damit freie Software; er kann unter den
				Bedingungen dieser Lizenz geteilt und/oder modifiziert werden.
			</div>
		</div>

		<div class="col-span-2 xl:col-span-1">
			<div class="text-gray-200 text-2xl">Unterseiten</div>
			<div class="flex flex-col text-gray-400">
				{#each pages as page}
					<a
						href={page.url}
						class="underline underline-offset-2 hover:underline-offset-4 transition-all hover:text-gray-200"
						>{page.title}</a
					>
				{/each}
			</div>
		</div>
		<div class="col-span-2 xl:col-span-1">
			<div class="text-gray-200 text-2xl">Weitere Links</div>
			<div class="flex flex-col text-gray-400">
				{#each links as link}
					<a
						href={link.url}
						target={link.target ?? '_blank'}
						class="underline underline-offset-2 hover:underline-offset-4 transition-all hover:text-gray-200 active:text-gray-200"
						>{link.title}</a
					>
				{/each}
			</div>
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
