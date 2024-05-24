<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { title } from '../../../ui/navbar';
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
		<div
			class="col-span-6 xl:col-span-2 md:col-span-4 dark:bg-gray-800 transition-all bg-gray-100 p-4 rounded-xl inline-block flex flex-col items-start justify-start align-start content-start"
		>
			<div class="dark:text-white text-black text-2xl">
				{schema.name}
			</div>
			{#if schema.desc}
				<div class="dark:text-gray-500 text-gray-500">
					{schema.desc}
				</div>
			{/if}

			<div class="dark:text-gray-300 text-gray-700">
				<b>{schema.dimAmount().total}</b> Dimensionen, davon
				{#if schema.dimAmount().numeric > 0}
					<br /><b class="pl-2">{schema.dimAmount().numeric}</b> numerisch
					{#each schema.numericDimensions as dim}
						<div class="ml-4">
							<span class="opacity-50">–</span>
							{dim.name}
						</div>
					{/each}
				{/if}
				{#if schema.dimAmount().option > 0}
					<br /><b class="pl-2">{schema.dimAmount().option}</b> kategorisch
					{#each schema.optionDimensions as dim}
						<div class="ml-4">
							<span class="opacity-50">–</span>
							{dim.name}
							<div class="ml-8 opacity-50 text-xs">
								{#each dim.options as option, index}
									{option}
									{#if index < dim.options.length - 1}
										<span class="opacity-50"> | </span>
									{/if}
								{/each}
							</div>
						</div>
					{/each}
				{/if}
			</div>
			<div class="flex-grow" />
			<button
				class="p-2 mt-2 text-xl dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600 bg-gray-200 hover:bg-gray-300 rounded transition-all w-full"
				on:click={() => useSchema(schema)}
			>
				Auswählen
			</button>
		</div>
	{/each}
</div>
