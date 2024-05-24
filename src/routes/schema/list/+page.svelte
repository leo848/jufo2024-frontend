<script lang="ts">
	import { title } from '../../../ui/navbar';
	import { loadSchemas } from '../storage';

	title.set('Schema auswählen');

	const schemas = loadSchemas();
</script>

<div class="grid grid-cols-12 m-4 gap-4">
	{#each schemas as schema}
		<div class="col-span-6 xl:col-span-2 md:col-span-4 dark:bg-gray-800 bg-gray-100 p-4 rounded-xl">
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
		</div>
	{/each}
</div>
