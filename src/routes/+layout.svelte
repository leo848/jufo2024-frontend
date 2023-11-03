<script lang="ts">
	import {
		Navbar,
		NavBrand,
		NavUl,
		NavLi,
		DarkMode,
		NavHamburger,
		Toast,
		Button
	} from 'flowbite-svelte';
	import { SunSolid, MoonSolid } from 'flowbite-svelte-icons';

	import { onMount } from 'svelte';

	import { setGlobalErrorHandler, type DisplayError } from '../server/error';

	import '../app.postcss';
	import { fly } from 'svelte/transition';

	let errors: { error: DisplayError; showDetails: boolean }[] = [];

	onMount(() => {
		setGlobalErrorHandler((error) => {
			errors = [...errors, { error, showDetails: false }];
		});
	});
</script>

<div class="complete min-h-screen dark:bg-gray-900">
	<Navbar let:toggle color="primary">
		<NavBrand href="/">
			<span class="self-center whitespace-nowrap text-3xl font-semibold">jufo2024</span>
		</NavBrand>
		<NavUl>
			<NavLi>
				<DarkMode>
					<svelte:fragment slot="lightIcon">
						<SunSolid />
					</svelte:fragment>
					<svelte:fragment slot="darkIcon">
						<MoonSolid />
					</svelte:fragment>
				</DarkMode>
			</NavLi>
		</NavUl>
		<NavHamburger on:click={toggle} />
	</Navbar>
	<div class="toast">
		{#each errors as { error, showDetails }, index (error.description + index)}
			<Toast
				position="top-right"
				transition={fly}
				params={{ x: 200, duration: 500 }}
				class="max-w-lg bg-red-300 dark:bg-red-500 text-black dark:text-black"
				defaultIconClass="w-20 h-20"
				color="gray"
			>
				<svelte:fragment slot="icon">
					{#if error.icon}
						<svelte:component this={error.icon} class="w-12 h-12" />
					{/if}
				</svelte:fragment>
				<div class="text-md font-bold">{error.origin.toUpperCase()}-FEHLER</div>
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
		{/each}
	</div>
	<!-- <PageTransition refresh={$page.url.pathname}> -->
	<slot />
	<!-- </PageTransition> -->
</div>

<style>
	@font-face {
		font-family: 'Inter';
		src: url('fonts/Inter.ttf') format('truetype');
	}
	.complete {
		font-family: -apple-system, Inter, Helvetica, Arial, ui-sans-serif, sans-serif !important;
	}

	.toast {
		max-width: 40rem !important;
	}
</style>
