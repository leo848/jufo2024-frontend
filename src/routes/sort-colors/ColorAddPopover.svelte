<script lang="ts">
	import { Popover } from 'flowbite-svelte';
	import type { Color } from '../../color/color';
	import { RgbColor } from '../../color/colorSpaces';

	export let colors: Color[];
	export let triggeredBy: string;
	export let invalidate: (callback: () => void) => () => void;

	let howManyRandomToAdd = 1;
	function addRandom() {
		const toAdd = [];
		for (let i = 0; i < howManyRandomToAdd; i++) {
			toAdd.push(new RgbColor(Math.random(), Math.random(), Math.random()).color());
		}
		colors = [...colors, ...toAdd];
	}
</script>

<Popover {triggeredBy} placement="bottom" trigger="click">
	<div>
		<div class="max-w-xs flex flex-col text-xl">
			<div class="text-2xl text-white">Farben anpassen</div>
			<button
				class="mt-2 mx-2 p-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-all"
				disabled={colors.length === 0}
				on:click={invalidate(() => (colors = []))}>Alle löschen</button
			>
			<div class="flex flex-row gap-2 mx-2">
				<button
					class="mt-2 p-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-all"
					on:click={invalidate(addRandom)}>Zufällige hinzufügen</button
				>
				<input
					type="number"
					class="bg-gray-700 rounded-lg w-16 p-0 mt-2 border-none text-white text-xl text-center"
					on:submit={invalidate(addRandom)}
					bind:value={howManyRandomToAdd}
				/>
			</div>
		</div>
	</div>
</Popover>

<style>
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		/* display: none; <- Crashes Chrome on hover */
		-webkit-appearance: none;
		margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
	}

	input[type='number'] {
		-moz-appearance: textfield; /* Firefox */
		appearance: textfield;
	}
</style>
