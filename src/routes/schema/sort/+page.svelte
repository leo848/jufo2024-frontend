<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import * as Icon from 'flowbite-svelte-icons';
	import Window from '../../../components/Window.svelte';
	import { title } from '../../../ui/navbar';
	import { loadSchema } from '../storage';
	import type { DataPoint, Schema } from '../types';
	import SchemaDisplay from '../SchemaDisplay.svelte';

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
</script>

<div class="m-8 grid grid-cols-12 gap-8">
	<Window title="Datenpunkte">
		<div class="m-4">
			<button
				class="p-4 dark:bg-gray-600 bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-400 transition-all rounded-full"
			>
				<Icon.PlusSolid size="xl" />
			</button>
			{#each dataPoints as dataPoint}
				<div class="p-2">{dataPoint.name}</div>
			{/each}
		</div>
	</Window>
	<Window title="Schema">
		<SchemaDisplay {schema} />
	</Window>
</div>
