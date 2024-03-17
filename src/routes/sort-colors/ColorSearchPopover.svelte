<script lang="ts">
	import { Popover } from 'flowbite-svelte';
	import type { Color } from '../../color/color';
	import Window from '../../components/Window.svelte';
	import { onMount } from 'svelte';

	import colorLists from './colorLists.json';
	import { RgbColor } from '../../color/colorSpaces';
	import type { ColorNameList } from '../../color/colorName';

	export let triggeredBy: string;
	export let value: Color;

	export let colorNameList: ColorNameList = 'german';

	type ColorItem = { hex: string; name: string };

	let colors: ColorItem[] = [];
	$: if (Object.keys(colorLists).includes(colorNameList)) {
		let key = colorNameList as keyof typeof colorLists;
		colors = colorLists[key];
	} else {
		console.error('Wrong key: ' + colorNameList + ' for thing ', colorLists);
	}

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
				if (lowername.startsWith(lowerSearch)) return { item, prio: 1 };
				else if (lowername.includes(lowerSearch)) return { item, prio: 2 };
				else return { item, prio: -1 };
			})
			.filter(({ prio }) => prio !== -1)
			.toSorted((a, b) => a.prio - b.prio)
			.map(({ item }) => item);
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
			<div
				class="grid grid-cols-12 gap-4 text-gray-300 p-2 rounded mb-4 max-h-[300px] min-w-[400px] overflow-scroll"
			>
				<input
					bind:this={inputElement}
					class="col-span-12 text-xl md-4 bg-gray-700 p-2"
					bind:value={search}
				/>
				<div class="col-span-12">
					{#if search?.length}Suche nach <i>{search}</i> • {/if}<b>{matches.length}</b> Treffer gefunden
				</div>
				{#each matches as match}
					{@const color = RgbColor.fromNumeric(parseInt(match.hex.slice(1), 16)).color()}
					{@const bright = color.space('oklab').l}
					<div class="col-span-12 md:col-span-4">
						<button
							class="bg-gray-700 rounded p-2 text-md w-full"
							style:background-color={match.hex}
							style:color={bright > 0.7 ? 'black' : 'white'}
							on:click={() => (value = color)}
						>
							{match.name}
						</button>
					</div>
				{:else}
					<div class="col-span-12 bg-gray-700 rounded">
						<div class="p-4 text-2xl">
							Keine Treffer gefunden
							<div>
								<button
									class="text-xl p-2 mt-2 rounded"
									style:background-color={value.rgb().css()}
									on:click={() => (search = '')}>Löschen</button
								>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</Window>
</Popover>
