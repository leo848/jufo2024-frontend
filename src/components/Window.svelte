<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import * as Icon from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	export let title: string;
	export let options: boolean = false;
	export let closable: boolean = true;
	export let scrollable: boolean = false;

	export let closed = false;

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

<div
	class={` col-span-${closed ? 6 : 12} md:col-span-${closed ? 6 : mdCol} xl:col-span-${
		closed ? 2 : xlCol
	} row-span-${closed ? 1 : row} max-w-none md:m-0`}
>
	<Card
		class={` rounded-xl max-w-none md:p-0 ${
			closed ? 'w-auto h-auto' : 'h-full max-h-[600px]'
		} transition-all`}
	>
		<div
			class={`gap-4 text-2xl dark:text-white bg-gray-700 p-2 rounded-t-xl flex flex-row ${
				closed ? 'truncate' : 'justify-between'
			}`}
		>
			<div class="flex flex-row gap-4">
				{#if closable}<div>
						<button
							class="bg-gray-600 hover:bg-gray-500 transition-all rounded-xl p-2"
							on:click={() => (closed = !closed)}
						>
							{#if closed}
								<Icon.PlusSolid />
							{:else}
								<Icon.MinusSolid />
							{/if}
						</button>
					</div>{/if}
				<div>{title}</div>
			</div>
			{#if options}
				<div>
					<button class="bg-gray-600 rounded-xl p-2" on:click={() => dispatch('optionClick')}
						><Icon.CogOutline /></button
					>
				</div>
			{/if}
		</div>
		{#if !closed}
			<div
				transition:slide={{ axis: 'y' }}
				class={`h-full ${scrollable ? 'overflow-scroll' : 'overflow-hidden'} `}
			>
				<slot />
			</div>
		{/if}
	</Card>
</div>
