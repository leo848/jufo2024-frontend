<script lang="ts">
	import { Popover } from 'flowbite-svelte';
	import {
		type ColorNameList,
		availableColorNameLists,
		getColorNameListInfo,
		colorNameListNames
	} from '../../color/colorName';
	import type { Color } from '../../color/color';
	import { scale } from 'svelte/transition';
	import Window from '../../components/Window.svelte';
	import * as Icon from 'flowbite-svelte-icons';
	import colorLists from './colorLists.json';

	export let triggeredBy: string;
	export let value: ColorNameList;
	export let color: Color;

	$: valueMeta = getColorNameListInfo(value);
</script>

<Popover
	{triggeredBy}
	placement="bottom"
	trigger="click"
	defaultClass="bg-transparent dark:bg-black dark:backdrop-blur dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-xl dark:bg-opacity-10 dark:border dark:border-gray-800 overflow-scroll"
	class="text-sm p-0 m-0 overflow-scroll"
>
	<Window closable={false} title="Namensliste auswählen">
		<div class="m-4">
			<div class="flex-row gap-4 flex text-gray-300 bg-white bg-opacity-10 p-2 rounded mb-4">
				<div class="flex flex-col break-all">
					<div class="text-sm">Aktuell ausgewählt:</div>
					<div class="text-2xl text-white grow">
						{#await valueMeta}
							<span>{value}</span>
						{:then meta}
							{#each meta.title.split(' ') as word}
								<div class="leading-7">{word}</div>
							{/each}
						{/await}
					</div>
					<div>
						{#if Object.keys(colorLists).includes(value)}
							Enumerierbar
						{/if}
					</div>
				</div>
				<div class="grow">
					<div>Originalbeschreibung auf Englisch:</div>
					{#await valueMeta}
						<div>Lädt...</div>
					{:then meta}
						<div class="max-w-xs">"{meta.description}"</div>
					{/await}
				</div>
				<div class="flex flex-col justify-between">
					<div>
						<div>Anzahl an Farben:</div>
						{#await valueMeta}
							<div>Lädt</div>
						{:then meta}
							<span class="text-white text-xl">{meta.colorCount}</span>
						{/await}
					</div>
					<div>
						{#await valueMeta then meta}
							<a
								class="text-white text-base text-sky-200 underline underline-offset-2 hover:underline-offset-4 transition-all"
								href={meta.source}
								target="_blank">Quelle</a
							>
						{/await}
					</div>
				</div>
			</div>
			<div class="grid grid-cols-3 gap-2 h-96 overflow-scroll">
				{#each availableColorNameLists.toSorted((a, b) => a.localeCompare(b)) as colorNameList}
					<button
						class={` bg-gray-${
							colorNameList == value ? 600 : 700
						} hover:bg-gray-600 transition-all bg-gray-${
							colorNameList == value ? 600 : 700
						} p-2 rounded text-${colorNameList == value ? 'white' : 'gray-200'}`}
						on:click={() => (value = colorNameList)}
					>
						<div class="flex flex-row justify-between align-stretch h-full">
							<div class="flex flex-col items-start justify-start">
								<div class="font-bold">
									{#each colorNameListNames[colorNameList].split(' ') as word, index}
										<div class="text-left flex-row flex">
											{#if Object.keys(colorLists).includes(colorNameList) && index === 0}
												<Icon.SearchSolid class="opacity-50 mr-1" />
											{/if}
											{word}
										</div>
									{/each}
								</div>
								<div class="md:w-32 text-start">
									{#await color.name(colorNameList)}
										<span>Lädt...</span>
									{:then meta}
										<span>{meta.name}</span>
									{:catch}
										<span>Fehler</span>
									{/await}
								</div>
							</div>
							{#await color.name(colorNameList)}
								<div
									class="w-10 h-10 text-3xl p-0 m-0 rounded-full"
									style="background: linear-gradient(to right, white, black)"
								>
									?
								</div>
							{:then meta}
								<div
									transition:scale
									class="w-10 h-10 rounded-full"
									style={`background-color: ${meta.color.rgb().css()}`}
								/>
							{/await}
						</div>
					</button>
				{/each}
			</div>
		</div>
	</Window>
</Popover>
