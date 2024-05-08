<script lang="ts">
	import * as Icon from 'flowbite-svelte-icons';
	import OptionsButton from '../../components/OptionsButton.svelte';
	import type { NamedPoint } from '../../geom/coordPoint';
	import { presets, type PointList } from './presets';
	import { createEventDispatcher } from 'svelte';

	export let points: NamedPoint[];
	export let invalidate: <T>(callback: (t: T) => void) => (t: T) => void;

	let pointsLists: Record<string, PointList> = presets; // loadColorLists();
	// $: key, (colorLists = loadColorLists());

	let selectedPointList: null | PointList = null;

	const dispatch = createEventDispatcher<{ load: null }>();

	function load(list: PointList) {
		dispatch('load');
		points = list.values;
	}

	function translate(key: string): string {
		if (key === 'default') return 'STANDARD';
		else if (key === 'custom') return 'EIGENE';
		else return key;
	}
</script>

<div class="grid grid-cols-6 gap-2 mb-2 text-black dark:text-white">
	{#if selectedPointList === null}
		<!-- {#each colorListCategories as key} -->
		<div
			class="first:mt-0 text-sm dark:bg-gray-600 bg-gray-100 align-center px-2 py-1 rounded col-span-6"
		>
			{translate('default')}
		</div>
		{#each Object.keys(pointsLists).filter((name) => !pointsLists[name].weird) as name}
			{@const list = pointsLists[name]}
			<div class="col-span-3 rounded overflow-hidden">
				<button
					class="text-xl dark:bg-gray-700 dark:hover:bg-gray-600 bg-gray-100 hover:bg-gray-200 transition-all p-2 color-white w-full items-center justify-between flex flex-row"
					on:click={() => (selectedPointList = list)}
				>
					<div class="dark:text-white text-gray-600 truncate">
						{list.name} ({list.values.length})
					</div>
					<div><Icon.ArrowRightSolid /></div>
				</button>
			</div>
		{/each}
		<!-- {/each} -->
	{:else}
		<!--<button
						class="bg-gray-700 hover:bg-gray-600 transition-all p-2 color-white w-full align-center justify-between flex flex-row rounded mb-4"
						on:click={() => (selectedColorList = null)}
					>
						<Icon.ArrowLeftSolid />
						<div>Zurück</div>
					</button>-->
		<div class="text-3xl col-span-6 dark:text-white text-black align-center">
			{selectedPointList.name}
		</div>
		<div class="max-h-64 col-span-4 overflow-y-scroll flex gap-2 text-sm flex-wrap grow">
			{#each selectedPointList.values as point}
				<div class="rounded-full dark:bg-gray-600 bg-gray-100 p-1" title={point.desc}>
					{point.name}
				</div>
			{/each}
		</div>
		<div class="col-span-2">
			<div class="text-2xl">{selectedPointList.values.length} Orte</div>
			{#if selectedPointList.aiGenerated}
				<div
					class="rounded-full dark:bg-gray-300 bg-gray-900 dark:text-black text-white text-center"
				>
					KI-generierte Liste
				</div>
			{/if}
			<div class="mt-4">
				<OptionsButton
					icon={Icon.DownloadSolid}
					title="Laden"
					on:click={invalidate(() => selectedPointList && load(selectedPointList))}
				/>
			</div>
		</div>
	{/if}
</div>
