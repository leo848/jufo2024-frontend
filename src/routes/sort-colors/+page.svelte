<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import ColorPicker from '../../components/ColorPicker.svelte';
	import { RgbColor } from '../../geom/colorSpaces';
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	import * as Icon from 'flowbite-svelte-icons';
	import type { ComponentType } from 'svelte';
	import PointChart from '../../components/PointChart.svelte';

	let colors = [
		RgbColor.fromNumeric(0xff1e26).color(),
		RgbColor.fromNumeric(0xfe941e).color(),
		RgbColor.fromNumeric(0xffff00).color(),
		RgbColor.fromNumeric(0x06bd00).color(),
		RgbColor.fromNumeric(0x001a98).color(),
		RgbColor.fromNumeric(0x760088).color()
	];

	const constructionItems: {
		name: string;
		description: string;
		icon: ComponentType;
		index: number;
	}[] = [
		{
			name: 'Manuell',
			description: 'Manuelle Auswahl der Punkte in einer Reihenfolge',
			icon: Icon.AnnotationOutline
		},
		{
			name: 'Greedy',
			description: 'Greedy-Algorithmus',
			icon: Icon.DollarOutline
		},
		{
			name: 'Nearest Neighbor',
			description: 'Nächster Nachbar',
			icon: Icon.PhoneOutline
		},
		{
			name: 'Brute Force',
			description: 'Teste alle möglichen Kombinationen',
			icon: Icon.HourglassOutline
		},
		{
			name: 'Optimal (Concorde)',
			description: 'Finde die optimale Lösung mittels des externen Tools Concorde',
			icon: Icon.WandMagicSparklesOutline
		}
	].map((e, i) => Object.assign({}, e, { index: i }));
	let selectedConstructionItem: null | number = null;
	let displayConstructionItems = constructionItems;
	$: {
		let find = constructionItems.find((e) => e.index === selectedConstructionItem);
		displayConstructionItems = find === undefined ? constructionItems : [find];
	}
	$: constructionOpen = selectedConstructionItem !== null;
</script>

<div class="mx-10">
	<p class="text-3xl xl:text-5xl dark:text-white mb-4">Farben sortieren</p>
	<div class="flex flex-row flex-wrap justify-start gap-8 items-stretch h-16">
		{#each colors as color, index}
			<ColorPicker bind:value={colors[index]}>
				<div slot="open-button">
					<div class="color-button w-full grow" style={'background-color:' + color.rgb().css()}>
						<div class="h-16 w-16" />
					</div>
				</div>
			</ColorPicker>
		{/each}
	</div>
	<div
		class="mt-8 grid grid-cols-12 gap-8 auto-cols-max align-stretch justify-stretch justify-items-stretch"
	>
		<Card class="rounded-xl col-span-12 xl:col-span-5 max-w-none p-0">
			<p class="text-2xl xl:text-3xl dark:text-white bg-gray-700 p-4 -m-6 rounded-t-xl mb-4">
				3D-Darstellung
			</p>
			<div class="h-full m-0 min-h-[420px]">
				<PointChart {colors} space="rgb" />
			</div>
		</Card>
		<Card class="rounded-xl col-span-12 md:col-span-6 lg:col-span-5 xl:col-span-3 max-w-none">
			<p class="text-2xl xl:text-3xl dark:text-white bg-gray-700 p-4 -m-6 rounded-t-xl mb-4">
				Eigenschaften
			</p>
			<div class="text-xl">
				<div class="flex-col">
					<div>Anzahl: {colors.length}</div>
					<div>Weglänge: undefined</div>
				</div>
			</div>
		</Card>
		<Card class="rounded-xl col-span-12 md:col-span-6 lg:col-span-7 xl:col-span-4 max-w-none">
			<p class="text-2xl xl:text-3xl dark:text-white bg-gray-700 p-4 -m-6 rounded-t-xl mb-4">
				Konstruktion
			</p>
			<div class="text-xl">
				{#each displayConstructionItems as { name, description, icon, index } (index)}
					<div
						animate:flip={{ duration: 200 }}
						transition:scale
						class="transition"
						on:click={() => (selectedConstructionItem = constructionOpen ? null : index)}
						role="button"
						on:keydown={() => {}}
						tabindex="0"
					>
						<div class="bg-gray-700 p-4 mb-4 rounded-xl border border-gray-600">
							<div class="flex items-center justify-between">
								<Icon.AngleRightSolid
									class="transition"
									style={`transform: rotate(${constructionOpen ? 90 : 0}deg)`}
								/>
								<span class="font-bold text-2xl">
									{name}
								</span>
								<svelte:component this={icon} />
							</div>
							{#if constructionOpen}
								<div>{description}</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</Card>
	</div>
</div>

<style>
	.color-button {
		border-radius: 10px;
		border: 3px solid rgba(0, 0, 0, 0.3);
	}
</style>
