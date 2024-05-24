<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { title } from '../../../ui/navbar';
	import SchemaDisplay from '../SchemaDisplay.svelte';
	import { loadSchemas } from '../storage';
	import type { Schema } from '../types';

	title.set('Schema auswählen');

	const schemas = loadSchemas();

	let error: string | null = null;
	$: if ($page.url.searchParams.has('invalid')) {
		error = $page.url.searchParams.get('invalid');
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
		<div class="bg-red-500 col-span-12 p-4 rounded-xl text-xl flex flex-row">
			<div class="flex-grow" />
			Unbekanntes Schema:&nbsp;<b>{error}</b>. Bitte wähle ein anderes aus.
			<div class="flex-grow" />
			<button on:click={dismissError} class="dark:bg-red-800 -m-2 p-2 rounded dark:text-white"
				>Schließen</button
			>
		</div>
	{/if}
	{#each schemas as schema}
		<div class="col-span-6 xl:col-span-2 md:col-span-4">
			<SchemaDisplay {schema} selectable on:click={() => useSchema(schema)} />
		</div>
	{/each}
</div>
