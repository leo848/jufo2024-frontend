<script lang="ts">
	import { fly } from 'svelte/transition';
	export let refresh = '';
</script>

{#key refresh}
	<div in:fly={{ x: -100, duration: 250, delay: 300 }} out:fly={{ x: -100, duration: 250 }}>
		<slot />
	</div>
{/key}
