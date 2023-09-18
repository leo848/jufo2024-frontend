<script lang="ts">
	import { page } from '$app/stores';
	import { Section, Page404 } from 'flowbite-svelte-blocks';
	import { Button } from 'flowbite-svelte';
</script>

<Section name="page404">
	<Page404 class="mt-8">
		<svelte:fragment slot="h1">404</svelte:fragment>
		<svelte:fragment slot="paragraph">
			<p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
				Seite nicht gefunden
			</p>
			<p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400 max-w-md mx-auto">
				Die angefragte Seite <span class="font-bold">{$page.url.pathname}</span> wurde nicht gefunden.
				Vielleicht wurde der Link falsch eingegeben, oder sie wurde einfach noch nicht erstellt?
			</p>
			<Button href="/" size="lg" color="red">Zurück zur Startseite</Button>
		</svelte:fragment>
	</Page404>
</Section>
