<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import * as Icon from 'flowbite-svelte-icons';
	import { ArrowKeyUp } from 'flowbite-svelte';

	export let value: number;

	export let mapDisplay: (n: number) => number;
	export let mapValue: (n: number) => number;

	export let max = 100;
	export let min = 0;
	export let step = 1;

	// $: displayValue = mapDisplay(value);
	let displayValue: number = mapDisplay(value);

	const dispatch = createEventDispatcher<{ set: number }>();

	function setValue() {
		value = mapValue(displayValue);
		dispatch('set', mapValue(displayValue));
	}

	function increment() {
		displayValue += step;
		setValue();
	}

	function decrement() {
		displayValue -= step;
		setValue();
	}
</script>

<div class="flex flex-row text-xl">
	<div class="w-6 flex flex-col justify-stretch">
		<button
			class="w-6 bg-gray-600 disabled:bg-gray-700 h-full text-sm text-center"
			disabled={displayValue > max - step}
			on:click={increment}
		>
			▲
		</button>
		<button
			class="w-6 bg-gray-600 disabled:bg-gray-700 h-full text-sm text-center"
			disabled={displayValue < min + step}
			on:click={decrement}
		>
			▼
		</button>
	</div>
	<input
		class="w-14 px-2 text-xl text-white bg-gray-700 border-none text-center"
		{max}
		{min}
		step="1"
		type="number"
		bind:value={displayValue}
		on:change={setValue}
	/>
	<div class="pl-2 text-2xl text-center justify-center flex flex-col text-gray-200">
		<div>%</div>
	</div>
</div>

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
