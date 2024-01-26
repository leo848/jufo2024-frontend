<script lang="ts">
	import OptionsButton from './OptionsButton.svelte';
	import * as Icon from 'flowbite-svelte-icons';
	import { fly } from 'svelte/transition';
	import { copyphore } from '../ui/copyphore';

	export let text: string;
	export let title: string = 'Kopieren';

	function copy(text: string) {
		navigator.clipboard.writeText(text).then(() => {
			copyphore.update((n) => n + 1);
			setTimeout(() => (copied = true));
		});
	}

	let copied = false;
	$: text, $copyphore, (copied = false);
</script>

{#if !copied}
	<div in:fly={{ x: -30, duration: 400 }}>
		<OptionsButton on:click={() => copy(text)} {title} icon={Icon.ClipboardSolid} />
	</div>
{:else}
	<div in:fly={{ x: 30, duration: 900 }}>
		<OptionsButton on:click={() => copy(text)} icon={Icon.CheckSolid} title="Kopiert" />
	</div>
{/if}
