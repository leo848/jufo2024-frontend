<script lang="ts">
	import { Accordion, AccordionItem, Card } from 'flowbite-svelte';
	import ColorPicker from '../../components/ColorPicker.svelte';
	import { RgbColor } from '../../geom/colorSpaces';

	let colors = [
		RgbColor.fromNumeric(0xff1e26).color(),
		RgbColor.fromNumeric(0xfe941e).color(),
		RgbColor.fromNumeric(0xffff00).color(),
		RgbColor.fromNumeric(0x06bd00).color(),
		RgbColor.fromNumeric(0x001a98).color(),
		RgbColor.fromNumeric(0x760088).color()
	];
</script>

<div class="mx-10">
	<p class="lg:text-3xl text-5xl dark:text-white mb-4">Farben sortieren</p>
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
	<div class="mt-12 grid grid-cols-3 justify-stretch gap-8">
		<Card class="rounded-xl">
			<p class="text-2xl xl:text-3xl dark:text-white bg-gray-700 p-4 -m-6 rounded-xl mb-4">
				3D-Darstellung
			</p>
		</Card>
		<Card class="rounded-xl">
			<p class="text-2xl xl:text-3xl dark:text-white bg-gray-700 p-4 -m-6 rounded-xl mb-4">
				Eigenschaften
			</p>
			<div class="text-xl">
				<div class="flex-col">
					<div>Anzahl: {colors.length}</div>
					<div>Weglänge: undefined</div>
				</div>
			</div>
		</Card>
		<Card class="rounded-xl">
			<p class="text-2xl xl:text-3xl dark:text-white bg-gray-700 p-4 -m-6 rounded-xl mb-4">
				Konstruktion
			</p>
			<div class="text-xl">
				<Accordion>
					<AccordionItem>
						<div slot="header">Manuell</div>
						<div>Manuelle Auswahl der Punkte in einer Reihenfolge</div>
					</AccordionItem>
					<AccordionItem>
						<div slot="header">Greedy</div>
						<div>Greedy-Algorithmus</div>
					</AccordionItem>
					<AccordionItem>
						<div slot="header">Nearest Neighbor</div>
						<div>Nächster Nachbar</div>
					</AccordionItem>
					<AccordionItem>
						<div slot="header">Brute Force</div>
						<div>Teste alle möglichen Kombinationen</div>
					</AccordionItem>
					<AccordionItem>
						<div slot="header">Optimal (Concorde)</div>
						<div>
							Finde die optimale Sortierung mittels des externen Tools Concorde
						</div></AccordionItem
					>
				</Accordion>
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
