<script lang="ts">
	import { Tooltip } from 'flowbite-svelte';
	import type { Color } from '../../color/color';

	export let color: Color;
	export let selected: boolean = false;
	export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
	export let tooltip: boolean = true;
	export let offline: boolean = false;

	$: sizeRem = (
		{
			xs: 4,
			sm: 8,
			md: 16,
			lg: 32,
			xl: 64
		} as const
	)[size];

	$: sizeClass = `h-${sizeRem} w-${sizeRem}`;
</script>

<button
	class="transition-all"
	style={`background-color: ${color.rgb().css()}; border-radius: 10px; border: ${Math.min(
		sizeRem / 4,
		3
	)}px solid rgb(0,0,0,0.3); ${selected ? 'transform: scale(1.1); border-color: white' : ''}`}
	on:click
>
	<div class={sizeClass} />
</button>
{#if tooltip}
	{#if offline}
		<Tooltip>{color.css()}</Tooltip>
	{:else}
		{#await color.name() then meta}
			<Tooltip>{meta.name}</Tooltip>
		{/await}
	{/if}
{/if}
