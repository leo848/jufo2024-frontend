<script lang="ts">
	import { Navbar, NavBrand, NavUl, NavLi, DarkMode, NavHamburger } from 'flowbite-svelte';
	import { SunSolid, MoonSolid } from 'flowbite-svelte-icons';

	import '../app.postcss';
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
</style>
