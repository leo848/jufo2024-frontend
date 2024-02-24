<script lang="ts">
	import * as Icon from 'flowbite-svelte-icons';
	import OptionsButton from '../../components/OptionsButton.svelte';
	import { presets, type WordList } from './presets';
	import { createEventDispatcher } from 'svelte';

	export let invalidate: <T>(callback: (t: T) => void) => (t: T) => void;

	let wordsLists: Record<string, WordList> = presets; // loadColorLists();
	// $: key, (colorLists = loadColorLists());

	let selectedWordList: null | WordList = null;

	const dispatch = createEventDispatcher<{ load: { values: { str: string; desc?: string }[] } }>();

	function load(list: WordList) {
		dispatch('load', { values: list.values });
	}

	function translate(key: string): string {
		if (key === 'default') return 'STANDARD';
		else if (key === 'custom') return 'EIGENE';
		else return key;
	}
</script>

<div class="grid grid-cols-6 gap-2 mb-2">
	{#if selectedWordList === null}
		<div class="first:mt-0 text-sm bg-gray-600 align-center px-2 py-1 rounded col-span-6">
			{translate('default')}
		</div>
		{#each Object.keys(wordsLists) as name}
			{@const list = wordsLists[name]}
			<div class="col-span-3 rounded overflow-hidden">
				<button
					class="text-xl bg-gray-700 hover:bg-gray-600 transition-all p-2 color-white w-full items-center justify-between flex flex-row"
					on:click={() => (selectedWordList = list)}
				>
					<div class="text-white truncate">{list.name}</div>
					<div><Icon.ArrowRightSolid /></div>
				</button>
			</div>
		{/each}
		<!-- {/each} -->
	{:else}
		<div class="text-3xl col-span-6 text-white align-center">{selectedWordList.name}</div>
		<div class="max-h-64 col-span-4 overflow-y-scroll flex gap-2 text-sm flex-wrap grow">
			{#each selectedWordList.values as point}
				<div class="rounded-full bg-gray-600 p-1" title={point.desc}>{point.str}</div>
			{/each}
		</div>
		<div class="col-span-2">
			<div class="text-2xl">{selectedWordList.values.length} Wörter</div>
			{#if selectedWordList.aiGenerated}
				<div class="rounded-full bg-gray-300 text-black text-center">KI-generierte Liste</div>
			{/if}
			<div class="mt-4">
				<OptionsButton
					icon={Icon.DownloadSolid}
					title="Laden"
					on:click={invalidate(() => selectedWordList && load(selectedWordList))}
				/>
			</div>
		</div>
	{/if}
</div>
