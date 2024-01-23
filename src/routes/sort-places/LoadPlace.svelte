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

<div class="grid grid-cols-6 gap-2 mb-2">
	{#if selectedPointList === null}
		<!-- {#each colorListCategories as key} -->
		<div class="first:mt-0 text-sm bg-gray-600 align-center px-2 py-1 rounded col-span-6">
			{translate('default')}
		</div>
		{#each Object.keys(pointsLists) as name}
			{@const list = pointsLists[name]}
			<div class="col-span-3 rounded overflow-hidden">
				<button
					class="text-xl bg-gray-700 hover:bg-gray-600 transition-all p-2 color-white w-full items-center justify-between flex flex-row"
					on:click={() => (selectedPointList = list)}
				>
					<div class="text-white truncate">{list.name}</div>
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
		<div class="text-3xl col-span-6 text-white align-center">{selectedPointList.name}</div>
		<div class="max-h-64 col-span-4 overflow-y-scroll flex gap-2 text-sm flex-wrap grow">
			{#each selectedPointList.values as point}
				<div class="rounded-full bg-gray-600 p-1" title={point.desc}>{point.name}</div>
			{/each}
		</div>
		<div class="col-span-2">
			<div class="text-2xl">{selectedPointList.values.length} Orte</div>
			{#if selectedPointList.aiGenerated}
				<div class="rounded-full bg-gray-300 text-black text-center">KI-generierte Liste</div>
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
