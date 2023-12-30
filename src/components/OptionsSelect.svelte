<script lang="ts" generics="Selection">
	import type { ComponentType } from 'svelte';

	export let show: boolean = true;
	export let icon: ComponentType;
	export let title: string;

	export let value: Selection;
	export let options: Selection[];
	export let optionNames: string[];

	export let invalidate: <T>(f: (t: T) => void) => (t: T) => void;
</script>

{#if show}
	<div
		class="mt-4 inline-flex flex-wrap gap-2 justify-start items-center bg-gray-700 rounded-xl"
	>
		<div class="bg-gray-600 p-2 rounded-xl"><svelte:component this={icon} size="md" /></div>
		<div>{title}</div>
		<div class="flex flex-row">
			{#each options as option, index}
				<button
					class={`bg-gray-${
						value == option ? 500 : 600
					} hover:bg-gray-500 text-base transition-all p-2 m-0 first:rounded-l-xl last:rounded-r-xl`}
					on:click={invalidate(() => (value = option))}
					>{optionNames[index]}
				</button>
			{/each}
		</div>
	</div>
{/if}
