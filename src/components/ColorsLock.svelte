<script lang="ts">
	import * as Icon from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';
	import { sineIn } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	export let locked: boolean;

	let anim = tweened(0, { duration: 1500, easing: sineIn });

	type Callback = () => void;

	const dispatch = createEventDispatcher<{ blowUp: null }>();

	export function invalidate(callback: Callback): () => void {
		return () => {
			if (!locked) {
				dispatch('blowUp');
				callback();
			} else {
				anim.set(1, { duration: 0 }).then(() => anim.set(0, { delay: 250 }));
			}
		};
	}

	$: buttonStyle = $anim
		? `filter: contrast(${$anim * 5 + 1}) invert(${$anim}); transform: scale(${$anim / 3 + 1})`
		: '';
</script>

<button
	class="color-button h-16 w-16 bg-gray-600 hover:bg-gray-500 transition-all text-6xl flex align-baseline justify-center items-center"
	on:click={() => (locked = !locked)}
	style={buttonStyle}
>
	{#if locked}
		<Icon.LockSolid size="xl" color="white" />
	{:else}
		<Icon.LockOpenSolid size="xl" color="white" />
	{/if}
</button>

<style>
	.color-button {
		border-radius: 10px;
		border: 3px solid rgba(0, 0, 0, 0.3);
	}
</style>
