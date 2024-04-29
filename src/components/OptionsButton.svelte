<script lang="ts">
	import type { ComponentType } from 'svelte';

	export let show: boolean = true;
	export let icon: ComponentType;
	export let title: string;

	export let iconStyle: string = '';

	export let elt: HTMLElement | null = null;
</script>

{#if show}
	<button
		class="pr-2 inline-flex gap-2 justify-between items-center justify-items-center bg-gray-100 dark:bg-gray-700 hover:dark:bg-gray-600 hover:bg-gray-200 transition-all rounded-xl text-black dark:text-white"
		on:click
		bind:this={elt}
	>
		<div class="bg-gray-200 dark:bg-gray-600 p-2 rounded-xl" style={iconStyle}>
			<svelte:component this={icon} size="md" />
		</div>
		<div>{title}</div>
	</button>
{/if}
