<script lang="ts">
	export let text: string;
	export let value: string;
</script>

<button on:click={() => (value = text)}>{text}</button>
