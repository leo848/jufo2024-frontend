<script lang="ts">
	const letters = 'sorting the colors'.split('');
</script>

<span class="self-center whitespace-nowrap text-3xl font-semibold text-white"
	><a href="/" class="flex-row flex">
		{#each letters as letter}
			<div>
				{#if letter === ' '}&nbsp;{:else}{letter}{/if}
			</div>
		{/each}
	</a></span
>
