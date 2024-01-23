<script lang="ts">
	import * as Icon from 'flowbite-svelte-icons';
	import type { Color } from '../../color/color';
	import {
		loadColorLists,
		colorListCategories,
		type ColorList,
		type ColorListStorage
	} from '../../color/list';
	import ColorDisplay from './ColorDisplay.svelte';
	import { gradient } from '../../ui/color';
	import OptionsButton from '../../components/OptionsButton.svelte';
	import {createEventDispatcher} from 'svelte';

	export let colors: Color[];
	export let invalidate: <T>(callback: (t: T) => void) => (t: T) => void;

	let colorLists: ColorListStorage = loadColorLists();
	// $: key, (colorLists = loadColorLists());

	let selectedColorList: null | ColorList = null;

	const dispatch = createEventDispatcher<{load:null}>();

	function load(colorList: ColorList) {
		colors = colorList.colors;
		dispatch("load");
	}

	function translate(key: string): string {
		if (key === 'default') return 'STANDARD';
		else if (key === 'custom') return 'EIGENE';
		else return key;
	}
</script>

<div class="grid grid-cols-2 gap-2 mb-2">
	{#if selectedColorList === null}
		{#each colorListCategories as key}
			<div class="first:mt-0 text-sm bg-gray-600 align-center px-2 py-1 rounded col-span-2">
				{translate(key)}
			</div>
			{#each Object.keys(colorLists[key]) as colorName}
				{@const colorList = colorLists[key][colorName]}
				<div class="rounded overflow-hidden">
					<div class="h-2 w-full" style={`background: ${gradient(colorList.colors)}`} />
					<button
						class="text-xl bg-gray-700 hover:bg-gray-600 transition-all p-2 color-white w-full items-center justify-between flex flex-row"
						on:click={() => (selectedColorList = colorList)}
					>
						<div class="text-white truncate">{colorList.name}</div>
						<div><Icon.ArrowRightSolid /></div>
					</button>
				</div>
			{/each}
		{/each}
	{:else}
		<!--<button
						class="bg-gray-700 hover:bg-gray-600 transition-all p-2 color-white w-full align-center justify-between flex flex-row rounded mb-4"
						on:click={() => (selectedColorList = null)}
					>
						<Icon.ArrowLeftSolid />
						<div>Zurück</div>
					</button>-->
		<div class="text-3xl col-span-2 text-white align-center">{selectedColorList.name}</div>
		<div class="max-h-64 overflow-y-scroll">
			{#each selectedColorList.colors as color}
				<ColorDisplay {color} size="sm" />
			{/each}
		</div>
		<div class="flex flex-col">
			<div class="text-2xl mb-4">{selectedColorList.colors.length} Farben</div>
			<div>
				<OptionsButton
					icon={Icon.DownloadSolid}
					title="Laden"
					on:click={invalidate(() => selectedColorList && load(selectedColorList))}
				/>
			</div>
		</div>
	{/if}
</div>
