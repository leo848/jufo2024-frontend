<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import { title } from '../../../ui/navbar';
	import * as Icon from 'flowbite-svelte-icons';
	import SchemaDisplay from '../SchemaDisplay.svelte';
	import { loadSchemas, deleteSchema } from '../storage';
	import type { Schema } from '../types';
	import { onMount } from 'svelte';

	title.set('Schema auswählen');

	let schemas: Schema[] = [];
	let invalidationKey = 0;
	$: $page, invalidationKey, (schemas = loadSchemas());

	let error: string | null = null;
	$: if ($page.url.searchParams.has('invalid')) {
		error = $page.url.searchParams.get('invalid');
	}

	let schemaElements: HTMLElement[] = new Array(schemas.length);
	let highlight: string | null = null;
	$: if ($page.url.searchParams.has('highlight')) {
		highlight = $page.url.searchParams.get('highlight');
		onMount(() =>
			setTimeout(() => {
				const idx = schemas.findIndex((schema) => schema.name === highlight);
				if (idx != null)
					schemaElements[idx].scrollIntoView({
						behavior: 'smooth',
						block: 'center',
						inline: 'center'
					});
			})
		);
	}

	function dismissError() {
		$page.url.searchParams.delete('invalid');
		goto($page.url, { noScroll: true, replaceState: true });
		error = null;
	}

	function useSchema(schema: Schema) {
		goto('/schema/sort?pkey=' + encodeURIComponent(schema.name));
	}
</script>

<div class="grid grid-cols-12 m-4 gap-4">
	{#if error}
		<div
			class="bg-red-500 col-span-12 p-4 rounded-xl text-xl flex flex-row"
			transition:slide={{ axis: 'y' }}
		>
			<div class="flex-grow" />
			Unbekanntes Schema:&nbsp;<b>{error}</b>. Bitte wähle ein anderes aus.
			<div class="flex-grow" />
			<button on:click={dismissError} class="dark:bg-red-800 -m-2 p-2 rounded dark:text-white"
				>Schließen</button
			>
		</div>
	{/if}
	<a
		class="col-span-12 p-8 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white text-black bg-gray-100 hover:bg-gray-200 transition-all rounded-xl text-3xl flex flex-row gap-4"
		href="/schema/create"
	>
		<Icon.FilePlusSolid size="xl" />
		<span>Neues Schema</span>
	</a>
	{#each schemas as schema, schemaIdx}
		<div class="col-span-6 xl:col-span-2 md:col-span-4" bind:this={schemaElements[schemaIdx]}>
			<SchemaDisplay
				{schema}
				highlight={highlight === schema.name}
				selectable
				on:click={() => useSchema(schema)}
				on:edit={() => goto('/schema/create?load=' + schema.name)}
				on:delete={() => (deleteSchema(schema.name), invalidationKey++)}
			/>
		</div>
	{/each}
</div>
