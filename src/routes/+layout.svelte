<script lang="ts">
	import { Navbar, NavBrand, NavUl, NavLi, NavHamburger, Toast, Button } from 'flowbite-svelte';
	import ServerStatus from '../components/ServerStatus.svelte';

	import { onMount } from 'svelte';

	import { setGlobalErrorHandler, type DisplayError } from '../server/error';
	import { title } from '../ui/navbar';

	import '../app.postcss';
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	import './fonts.css';

	let errors: { error: DisplayError; showDetails: boolean }[] = [];

	onMount(() => {
		setGlobalErrorHandler((error: DisplayError) => {
			errors = [...errors, { error, showDetails: false }];
		});
	});
</script>

<div class="complete min-h-screen dark:bg-gray-900">
	<Navbar let:toggle color="primary">
		<NavBrand href="/">
			<span class="self-center whitespace-nowrap text-3xl font-semibold">jufo2024</span>
		</NavBrand>
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
							class="mt-4"
							color="light"
						>
							{#if showDetails}
								Weniger anzeigen
							{:else}
								Mehr anzeigen
							{/if}
						</Button>
					</div>
				</Toast>
			</div>
		{/each}
	</div>
	<!-- <PageTransition refresh={$page.url.pathname}> -->
	<slot />
	<!-- </PageTransition> -->
</div>
