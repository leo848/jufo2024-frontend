<script lang="ts">
	import { Popover, TabItem, Tabs } from 'flowbite-svelte';
	import * as Icon from 'flowbite-svelte-icons';
	import type { Color } from '../color/color';
	import {
		loadColorLists,
		saveColorList,
		colorListCategories,
		type ColorList
	} from '../color/list';

	export let colors: Color[];
	export let triggeredBy: string;
	export let invalidate: (callback: () => void) => () => void;

	let saveName: string;
	let description: string;

	$: colorLists = loadColorLists();

	function randomSaveName() {
		function randomHex() {
			return Math.floor(Math.random() * 15).toString(16);
		}

		saveName = new Array(10)
			.fill(null)
			.map(() => randomHex())
			.join('');
	}

	function save() {
		saveColorList({
			colors,
			name: saveName,
			description
		});
	}

	function load(colorList: ColorList) {
		colors = colorList.colors;
	}

	function translate(key: string): string {
		if (key === 'default') return 'STANDARD';
		else if (key === 'custom') return 'EIGENE';
		else return key;
	}

	$: saveNameValid = !(saveName in loadColorLists().custom);
</script>

<Popover {triggeredBy} trigger="click" placement="bottom">
	<div class="w-full flex flex-col text-xl">
		<div class="w-[20rem] text-2xl text-white">Liste speichern / laden</div>
		<Tabs
			style="full"
			class="w-full grow border-solid border-gray-500 border-2"
			defaultClass="flex rounded-lg divide-x divide-gray-200 shadow dark:divide-gray-700"
			inactiveClasses="dark:bg-gray-600"
		>
			<TabItem open title="Speichern" class="w-full">
				<div>Name</div>
				<div class="flex flex-row align-stretch">
					<input
						type="text"
						class={` ${
							saveNameValid ? 'border-none' : 'border-red border-2'
						} w-full text-white bg-gray-700 rounded focus:border-white focus:outline-none focus:ring-none`}
						bind:value={saveName}
					/>
					<button
						class="bg-gray-700 hover:bg-gray-600 transition-all ml-2 p-2 rounded"
						on:click={randomSaveName}
					>
						<Icon.ShuffleSolid />
					</button>
				</div>
				<div class="mt-4">Beschreibung (optional)</div>
				<div class="flex flex-row align-stretch">
					<textarea
						class={`w-full border-none text-white bg-gray-700 rounded focus:border-white focus:outline-none focus:ring-none`}
						bind:value={description}
					/>
				</div>
				<button
					class="p-2 text-xl bg-gray-700 hover:bg-gray-600 text-white transition-all mt-8 rounded"
					on:click={save}>Speichern</button
				>
			</TabItem>

			<TabItem title="Laden" class="w-full">
				{#each colorListCategories as key}
					<div class="mt-4 first:mt-0 text-sm bg-gray-600 align-center px-2 py-1 rounded">
						{translate(key)}
					</div>
					{#each Object.keys(colorLists[key]) as colorName}
						{@const colorList = colorLists[key][colorName]}
						<button
							class="text-xl bg-gray-700 hover:bg-gray-600 transition-all p-2 my-2 color-white w-full align-start flex flex-row"
							on:click={invalidate(() => load(colorList))}
						>
							<span>{colorList.name}</span>
						</button>
					{/each}
				{/each}
			</TabItem>
		</Tabs>
	</div>
</Popover>
