<script lang="ts">
	const isDeployed = process.env.VERCEL;

	const commitHash = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7);
	const commitMsg = process.env.VERCEL_GIT_COMMIT_MESSAGE;
</script>

{#if isDeployed}
<div class="mt-4">
	<div class="flex flex-row gap-2 items-center">
		<div class="h-4 w-4 rounded-full opacity-40" style:background-color="#0a0"/>
		<div class="opacity-50">{commitHash}</div>
		<div class="opacity-90">{commitMsg}</div>
	</div>
</div>
{/if}
