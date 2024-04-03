<script lang="ts">
	import { Spinner } from 'flowbite-svelte';
	import { RgbColor } from '../../color/colorSpaces';
	import { scale } from 'svelte/transition';
	import type { Color } from '../../color/color';
	import { gradient } from '../../ui/color';

	export let colors: Color[];
	export let addColor: () => void;

	$: randomColors = new Array(100)
		.fill(0)
		.map((_) => new RgbColor(Math.random(), Math.random(), Math.random()).color());
	$: randomColor = randomColors[0];

	let inputAmount = 100;

	$: while (randomColors.length < inputAmount) {
		randomColors = [
			...randomColors,
			new RgbColor(Math.random(), Math.random(), Math.random()).color()
		];
	}
</script>

<div
	class="m-4 p-4 rounded-md max-w-[50%]"
	style={`background-color:${randomColor.css()}; color:${randomColor.readable().css()}`}
	in:scale
>
	<div class="text-3xl">Keine Farben ausgewählt</div>
	<div>
		Klicke auf Hinzufügen oder Laden im Optionen-Dialog rechts und erstelle so eine zu sortierende
		Liste von Farben.
	</div>
	<div>
		Oder wie wäre es damit, einfach mit

		{#await randomColor.name('german')}
			<Spinner />
		{:then meta}
			<b>{meta.name}</b>
		{/await}
		(#{randomColor.rgb().hex()}) anzufangen?
	</div>
	<div>
		<button class="p-2 mt-2 rounded bg-gray-800 text-white" on:click={addColor}
			><b>Auswahldialog</b> öffnen</button
		>
		<button
			class="p-2 mt-2 rounded"
			style={`background-color:${randomColor.readable().css()};color:${randomColor.css()}`}
			on:click={() => (colors = [randomColor])}
		>
			<b
				>{#await randomColor.name('german')}
					<Spinner />
				{:then meta}
					{meta.name}
				{/await}</b
			>
			auswählen</button
		>
		<button
			class="p-2 mt-2 rounded text-white"
			style:background={gradient(randomColors.slice(0, 10).map((c) => c.darken(0.4)))}
			on:click={() => (colors = randomColors.slice(0, 10))}
		>
			<b><span class="opacity-0">0</span>10 zufällige</b> Farben auswählen
		</button>
		<div>
			<input
				type="number"
				bind:value={inputAmount}
				on:click|preventDefault={() => {}}
				style:background-color={randomColor.readable().css()}
				style:color={randomColor.css()}
				class="w-16 border-none rounded font-bold -pr-2"
				max={1024}
			/>
			<button
				class="p-2 mt-2 rounded text-white"
				style:background={gradient(randomColors.slice(0, inputAmount).map((c) => c.darken(0.4)))}
				on:click={() => (colors = randomColors.slice(0, inputAmount))}
			>
				<b> zufällige</b> Farbe{inputAmount === 1 ? '' : 'n'} auswählen
			</button>
		</div>
	</div>
</div>
