<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import * as Icon from 'flowbite-svelte-icons';
	import { scale, slide } from 'svelte/transition';

	export let title: string;
	export let options: boolean = false;
	export let closable: boolean = true;
	export let scrollable: boolean = false;

	export let demo: boolean = false;

	export let closed = false;
	export let showOptions = false;

	export let mdCol: number = 6;
	export let xlCol: number = 6;

	export let row: number = 1;

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
			'row-span-3',
			'row-span-4'
		];
	}
</script>

<div
	class={` col-span-${closed ? 6 : 12} md:col-span-${closed ? 6 : mdCol} xl:col-span-${
		closed ? 2 : xlCol
	} row-span-${closed ? 1 : row} max-w-none md:m-0 m-0`}
	transition:scale
>
	<Card
		class={` rounded-xl max-w-none p-0 md:p-0 ${
			closed ? 'w-auto h-auto' : 'h-full' + (demo ? '' : ' max-h-[600px]')
		} transition-all`}
	>
		<div
			class={`gap-4 md:text-xl lg:text-2xl text-black dark:text-white bg-gray-200 dark:bg-gray-700 p-2 rounded-t-xl flex flex-row ${
				closed ? 'truncate' : 'justify-between'
			}`}
		>
			<div class="flex flex-row gap-4">
				{#if closable}<div>
						<button
							class="bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 hover:bg-gray-400 transition-all rounded-xl md:p-2 p-1"
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
					<button
						class="bg-gray-400 dark:bg-gray-600 rounded-xl p-2"
						on:click={() => (showOptions = !showOptions)}><Icon.CogOutline /></button
					>
				</div>
			{/if}
		</div>
		{#if !closed}
			<div
				transition:slide={{ axis: 'y' }}
				class={`h-full ${scrollable ? 'overflow-scroll' : 'overflow-hidden'} `}
			>
				{#if showOptions}
					<slot name="options" />
				{/if}
				<slot />
			</div>
		{/if}
	</Card>
</div>
