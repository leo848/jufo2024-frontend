<script lang="ts">
	import * as Icon from 'flowbite-svelte-icons';
	import { slide, fly } from 'svelte/transition';

	export let options: {
		ballSizeChange: -1 | 0 | 1;
		showOptions: boolean;
	};
	export let ballSize: number;
	export let projection: string;
</script>

<div>
	<div
		class="flex flex-row justify-start gap-4 items-center py-2 text-2xl text-white threedoptions-parent p-2 border-transparent m-0"
		transition:slide={{ axis: 'y' }}
	>
		<div
			class="ball-setting bg-gray-700 rounded-xl p-2 flex flex-row gap-2 overflow-hidden threedoptions-child"
		>
			<button
				class="transition bg-gray-600 rounded-lg px-2 flex flex-row items-center gap-2"
				disabled
			>
				<span><Icon.DribbbleSolid /></span>
				<div class="grid overflow-hidden">
					{#key ballSize}
						<span
							class="row-[1/2] col-[1/2] tabular-nums"
							in:fly={{ y: -100 * options.ballSizeChange, duration: 200 }}
							out:fly={{ y: 100 * options.ballSizeChange, duration: 200 }}
							>{Math.round(ballSize * 10)}</span
						>
					{/key}
				</div>
			</button>
			<button
				class="transition bg-orange-600 disabled:bg-gray-600 rounded-full p-2"
				disabled={ballSize <= 0.11}
				on:click={() => ((ballSize -= 0.1), (options.ballSizeChange = -1))}
			>
				<Icon.MinusSolid />
			</button>
			<button
				class="transition bg-orange-600 disabled:bg-gray-600 rounded-full p-2"
				disabled={ballSize >= 0.69}
				on:click={() => ((ballSize += 0.1), (options.ballSizeChange = 1))}
			>
				<Icon.PlusSolid />
			</button>
		</div>
		<div
			class="persp-setting bg-gray-700 rounded-xl flex flex-row text-base text-gray-300 threedoptions-child"
		>
			<button
				class={` bg-gray-${projection == 'perspective' ? 600 : 700} rounded-l-xl p-3`}
				on:click={() => (projection = 'perspective')}
			>
				PERS
			</button>
			<button
				class={` bg-gray-${projection == 'orthographic' ? 600 : 700} rounded-r-xl p-3`}
				on:click={() => (projection = 'orthographic')}
			>
				ORTH
			</button>
		</div>
	</div>
</div>

<style>
	.border-transparent {
		border: 1px solid transparent;
	}
</style>
