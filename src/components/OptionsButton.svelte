<script lang="ts">
	import type { ComponentType } from 'svelte';

	export let show: boolean = true;
	export let icon: ComponentType;
	export let title: string;

	export let iconStyle: string = '';
</script>

{#if show}
	<button
		class="pr-2 inline-flex gap-2 justify-between items-center justify-items-center bg-gray-700 hover:bg-gray-600 transition-all rounded-xl text-white"
		on:click
	>
		<div class="bg-gray-600 p-2 rounded-xl" style={iconStyle}>
			<svelte:component this={icon} size="md" />
		</div>
		<div>{title}</div>
	</button>
{/if}
