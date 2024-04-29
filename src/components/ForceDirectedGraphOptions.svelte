<script lang="ts">
	import * as Icon from 'flowbite-svelte-icons';
	import { slide, fly } from 'svelte/transition';

	let inner: {
		speedChange: -1 | 0 | 1;
	} = { speedChange: 0 };

	export let options: {
		speed: number;
	} = { speed: 3 };
	export let actions: {
		freeze: () => void;
	};
</script>

<div>
	<div
		class="flex flex-row justify-start gap-4 items-center py-2 text-2xl dark:text-white text-gray-900 threedoptions-parent p-2 border-transparent m-0"
		transition:slide={{ axis: 'y' }}
	>
		<div
			class="ball-setting bg-gray-200 dark:bg-gray-700 rounded-xl p-2 flex flex-row gap-2 overflow-hidden threedoptions-child"
		>
			<button
				class="transition dark:bg-gray-600 bg-gray-300 rounded-lg px-2 flex flex-row items-center gap-2"
				disabled
			>
				<span><Icon.RocketSolid /></span>
				<div class="grid overflow-hidden">
					{#key options.speed}
						<span
							class="row-[1/2] col-[1/2] tabular-nums"
							in:fly={{ y: -100 * inner.speedChange, duration: 200 }}
							out:fly={{ y: 100 * inner.speedChange, duration: 200 }}>{options.speed}</span
						>
					{/key}
				</div>
			</button>
			<button
				class="transition bg-orange-600 disabled:bg-gray-600 rounded-full p-2 text-white"
				disabled={options.speed <= 1}
				on:click={() => ((options.speed -= 1), (inner.speedChange = -1))}
			>
				<Icon.MinusSolid />
			</button>
			<button
				class="transition bg-orange-600 disabled:bg-gray-600 rounded-full p-2 text-white"
				disabled={options.speed >= 5}
				on:click={() => ((options.speed += 1), (inner.speedChange = 1))}
			>
				<Icon.PlusSolid />
			</button>
		</div>
		<button class={`dark:bg-gray-700 bg-gray-200 rounded-xl p-3`} on:click={actions.freeze}>
			Einfrieren
		</button>
	</div>
</div>

<style>
	.border-transparent {
		border: 1px solid transparent;
	}
</style>
