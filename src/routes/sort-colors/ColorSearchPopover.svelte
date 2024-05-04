<script lang="ts">
	import { Popover } from 'flowbite-svelte';
	import type { Color } from '../../color/color';
	import Window from '../../components/Window.svelte';
	import { onMount } from 'svelte';

	import colorLists from './colorLists.json';
	import { RgbColor } from '../../color/colorSpaces';
	import type { ColorNameList } from '../../color/colorName';
	import { colorKeys } from '../../color/comparisonSort';
	import { scale } from 'svelte/transition';

	export let triggeredBy: string;
	export let value: Color;

	export let colorNameList: ColorNameList = 'german';

	type ColorItem = { hex: string; name: string };

	let valueMeta = value.name(colorNameList);
	$: valueMeta = value.name(colorNameList);

	onMount(() => {
		valueMeta.then((v) => (search = v.name));
	});

	let search: string | null = null;

	let matches: ColorItem[] = [];
	$: {
		const lowerSearch = search?.toLowerCase() ?? '';
		matches = colors
			.map((item) => {
				const lowername = item.name.toLowerCase();
				if (lowername === lowerSearch) return { item, prio: 1 };
				else if (lowername.startsWith(lowerSearch)) return { item, prio: 2 };
				else if (lowername.endsWith(lowerSearch)) return { item, prio: 3 };
				else if (lowername.includes(lowerSearch)) return { item, prio: 4 };
				else return { item, prio: -1 };
			})
			.filter(({ prio }) => prio !== -1)
			.toSorted((a, b) => (sortOptionIndex === 0 ? a.prio - b.prio : 0))
			.map(({ item }) => item);
	}

	const keys: {
		name: string;
		method: (color: Color, item: ColorItem) => string | number;
	}[] = colorKeys.map(({ name, keyExtractor }) => ({ name, method: keyExtractor }));
	const sortOptions: {
		name: string;
		method: (color: Color, item: ColorItem) => number | string;
	}[] = keys
		.slice(0, 0)
		.concat([
			{
				name: 'Relevanz',
				method: (_: Color) => 0
			},
			{
				name: 'Alphabetisch',
				method: (_: Color, item: ColorItem) => item.name
			}
		])
		.concat(keys);
	let sortOptionIndex = 0;
	let sortInvert = false;

	let colors: ColorItem[] = [];
	$: if (Object.keys(colorLists).includes(colorNameList)) {
		let key = colorNameList as keyof typeof colorLists;
		colors = colorLists[key];
		colors = colors.toSorted((a, b) => {
			let [keyA, keyB] = [a, b].map((item) => {
				const color = RgbColor.fromNumeric(
					parseInt(item.hex.startsWith('#') ? item.hex.slice(1) : item.hex, 16)
				).color();
				return sortOptions[sortOptionIndex].method(color, item);
			});
			if (typeof keyA === 'number') {
				return (keyA - (keyB as number)) * (sortInvert ? -1 : 1);
			} else {
				if (!sortInvert) return keyA.localeCompare(keyB as string);
				else return (keyB as string).localeCompare(keyA);
			}
		});
	}

	$: randomColorName = 'Farbname';
	$: {
		let randomIndex = new Date().getTime() % colors.length;
		randomColorName = colors[randomIndex].name;
	}

	let inputElement: HTMLInputElement | null = null;
	$: inputElement?.select();
</script>

<Popover
	{triggeredBy}
	placement="bottom"
	trigger="click"
	defaultClass="bg-transparent dark:bg-black dark:backdrop-blur dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-xl dark:bg-opacity-10 dark:border dark:border-gray-800 overflow-scroll"
	class="text-sm p-0 m-0 overflow-scroll"
>
	<Window title="Farbsuche" closable={false}>
		<div class="m-4">
			<form
				class="grid grid-cols-12 gap-4 dark:text-gray-300 text-gray-700 p-2 rounded mb-4 max-h-[300px] min-w-[400px] overflow-scroll"
			>
				<input
					bind:this={inputElement}
					class="col-span-12 text-xl md-4 dark:bg-gray-700 bg-gray-100 p-2 rounded"
					placeholder={randomColorName}
					bind:value={search}
				/>
				<div class="col-span-12">
					{#if search?.length}Suche nach <i>{search}</i> • {/if}
					<b>{matches.length}</b>
					{#if search?.length}Treffer gefunden{:else}Farben{/if}
				</div>
				{#if matches.length > 1}
					<div class="col-span-12" transition:scale>
						<div class="flex flex-row">
							Sortieren:&emsp;
							{#each sortOptions as option, index}
								<button class="mr-1" on:click|preventDefault={() => (sortOptionIndex = index)}>
									{#if sortOptionIndex === index}
										<b>{option.name}</b>
									{:else}
										{option.name}
									{/if}
								</button>
							{/each}
						</div>
						<div class="flex flex-row">
							Reihenfolge:&emsp;
							{#each ['Aufsteigend', 'Absteigend'] as option, index}
								<button class="mr-1" on:click|preventDefault={() => (sortInvert = !!index)}>
									{#if sortInvert === !!index}
										<b>{option}</b>
									{:else}
										{option}
									{/if}
								</button>
							{/each}
						</div>
					</div>
				{/if}
				{#each matches as match}
					{@const color = RgbColor.fromNumeric(
						parseInt(match.hex.startsWith('#') ? match.hex.slice(1) : match.hex, 16)
					).color()}
					{@const bright = color.space('oklab').l}
					<div class="col-span-12 md:col-span-4">
						<button
							transition:scale
							class="dark:bg-gray-700 bg-gray-100 rounded p-2 text-md w-full"
							style:background-color={color.css()}
							style:color={bright > 0.7 ? 'black' : 'white'}
							on:click={() => (value = color)}
						>
							{match.name}
						</button>
					</div>
				{:else}
					<div class="col-span-12 dark:bg-gray-700 bg-gray-100 rounded">
						<div class="p-4 text-2xl">
							Keine Treffer gefunden
							<div>
								<button
									class="text-xl p-2 mt-2 rounded"
									style:background-color={value.css()}
									style:color={value.readable().css()}
									on:click={() => (search = '')}>Löschen</button
								>
							</div>
						</div>
					</div>
				{/each}
			</form>
		</div>
	</Window>
</Popover>
