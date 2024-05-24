<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import * as Icon from 'flowbite-svelte-icons';
	import Window from '../../../components/Window.svelte';
	import { title } from '../../../ui/navbar';
	import { loadSchema } from '../storage';
	import type { DataPoint, Schema } from '../types';
	import SchemaDisplay from '../SchemaDisplay.svelte';
	import DataPointPicker from '../DataPointPicker.svelte';
	import { flip } from 'svelte/animate';

	title.set('Eigenes Schema');

	let aborted = false;

	function abort(pkey: null | string) {
		const url = pkey !== null ? '/schema/list?invalid=' + pkey : '/schema/list';
		goto(url, { replaceState: true });
		aborted = true;
	}

	let schema: Schema;
	$: key = $page.url.searchParams.get('pkey') ?? abort(null);
	$: if (!aborted) schema = loadSchema(key) ?? abort(key || null);
	$: if (schema) title.set(schema.name);

	let dataPoints: DataPoint[] = [];

	let picker: null | { type: 'append' } | { type: 'edit'; index: number } = null;
</script>

<div class="m-8 grid grid-cols-12 gap-8">
	<Window title="Datenpunkte">
		<div class="m-4">
			<button
				class="p-4 mb-4 dark:bg-gray-600 bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-400 transition-all rounded-full"
				on:click={() => (picker = { type: 'append' })}
			>
				<Icon.PlusSolid size="xl" />
			</button>
			<div class="flex flex-col gap-2">
				{#each dataPoints as dataPoint, index (dataPoint.name)}
					<div
						class="p-2 dark:bg-gray-700 bg-gray-200 rounded flex flex-row gap-2 align-center items-center"
						animate:flip
					>
						<span>{dataPoint.name}</span>
						<span class="flex-grow" />
						<button
							class="p-2 bg-gray-300 dark:bg-gray-600 rounded-full"
							on:click={() => (picker = { type: 'edit', index })}><Icon.EditOutline /></button
						>
						<button
							class="p-2 bg-gray-300 dark:bg-gray-600 rounded-full"
							on:click={() => (dataPoints = dataPoints.toSpliced(index, 1))}
							><Icon.TrashBinOutline /></button
						>
					</div>
				{/each}
			</div>
		</div>
	</Window>
	<Window title="Schema">
		<SchemaDisplay {schema} />
	</Window>
</div>

{#if picker != null}
	<DataPointPicker
		{schema}
		on:create={(evt) => {
			if (picker == null) return;
			if (picker.type === 'append') {
				dataPoints = [...dataPoints, evt.detail];
			} else if (picker.type === 'edit') {
				dataPoints[picker.index] = evt.detail;
			}
			picker = null;
		}}
		on:cancel={() => (picker = null)}
		initialValue={picker.type === 'edit' ? dataPoints[picker.index] : undefined}
	/>
{/if}
