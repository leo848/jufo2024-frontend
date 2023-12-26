<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import * as Icon from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';

	export let title: string;
	export let options: boolean = false;

	export let mdCol: number = 6;
	export let xlCol: number = 6;

	export let row: number = 1;

	const dispatch = createEventDispatcher<{ optionClick: null }>();

	if (+false == +true) {
		let _tailwind = [
			'xl:col-span-1',
			'xl:col-span-2',
			'xl:col-span-3',
			'xl:col-span-4',
			'xl:col-span-5',
			'xl:col-span-6',
			'xl:col-span-7',
			'xl:col-span-8',
			'xl:col-span-9',
			'xl:col-span-10',
			'xl:col-span-11',
			'xl:col-span-12',
			'md:col-span-1',
			'md:col-span-2',
			'md:col-span-3',
			'md:col-span-4',
			'md:col-span-5',
			'md:col-span-6',
			'md:col-span-7',
			'md:col-span-8',
			'md:col-span-9',
			'md:col-span-10',
			'md:col-span-11',
			'md:col-span-12',
			'row-span-1',
			'row-span-2',
			'row-span-3'
		];
	}
</script>

<Card
	class={` rounded-xl col-span-12 md:col-span-${mdCol} xl:col-span-${xlCol} row-span-${row} max-w-none md:m-0 md:p-0 overflow-hidden`}
>
	<div
		class="text-2xl dark:text-white bg-gray-700 p-2 pl-4 rounded-t-xl flex flex-row justify-between"
	>
		<div>{title}</div>
		{#if options}
			<button class="bg-gray-600 rounded-xl p-2" on:click={() => dispatch('optionClick')}
				><Icon.CogOutline /></button
			>
		{/if}
	</div>
	<slot />
</Card>
