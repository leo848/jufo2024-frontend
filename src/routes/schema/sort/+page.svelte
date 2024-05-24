<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { title } from '../../../ui/navbar';
	import { loadSchema } from '../storage';
	import type { Schema } from '../types';

	title.set('Eigenes Schema');

	let aborted = false;

	function abort(pkey: null | string) {
		goto('/schema/list?invalid=' + pkey, { replaceState: true });
		aborted = true;
	}

	let schema: Schema | null = null;
	$: key = $page.url.searchParams.get('pkey') ?? abort(null);
	$: if (!aborted) schema = loadSchema(key) ?? abort(key || null);
	$: if (schema) title.set(schema.name);
</script>
