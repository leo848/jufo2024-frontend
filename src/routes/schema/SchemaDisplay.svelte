<script lang="ts">
	import type { Schema } from './types';

	export let schema: Schema;

	export let selectable: boolean = false;
</script>

<div
	class="h-full dark:bg-gray-800 transition-all bg-gray-100 p-4 rounded-xl inline-block flex flex-col items-start justify-start align-start content-start"
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
	{#if selectable}
		<div class="flex-grow" />
		<button
			class="p-2 mt-2 text-xl dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600 bg-gray-200 hover:bg-gray-300 rounded transition-all w-full"
			on:click
		>
			Auswählen
		</button>
	{/if}
</div>
