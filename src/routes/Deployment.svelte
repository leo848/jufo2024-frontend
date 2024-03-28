<script lang="ts">
	const isDeployed = process.env.VERCEL;

	const fullCommitHash = process.env.VERCEL_GIT_COMMIT_SHA;
	const commitHash = fullCommitHash?.slice(0, 7);
	const commitMsg = process.env.VERCEL_GIT_COMMIT_MESSAGE;

	const commitLink = `https://github.com/leo848/jufo2024-frontend/commit/${fullCommitHash}`;
</script>

{#if isDeployed}
	<div class="mt-4">
		<div class="flex flex-row gap-2 items-center">
			<div class="h-4 w-4 rounded-full opacity-40" style:background-color="#0a0" />
			<div class="opacity-50">{commitHash}</div>
			<div class="opacity-90">
				<a href={commitLink}>{commitMsg}</a>
			</div>
		</div>
	</div>
{/if}
