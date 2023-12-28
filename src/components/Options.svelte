<script lang="ts">
	import * as Icon from 'flowbite-svelte-icons';
	import type { DistanceType } from '../geom/dist';
	import { createEventDispatcher } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { sineIn } from 'svelte/easing';

	export let norm: DistanceType = 'euclidean';

	const dispatch = createEventDispatcher<{
		add: null;
		delete: null;
		blowUp: null;
		norm: DistanceType;
	}>();

	let lockAnim = tweened(0, { duration: 1500, easing: sineIn });
	export let locked: boolean;

	export function invalidate<I>(
		callback: (i: I) => void,
		invalid?: (i: I) => void
	): (i: I) => void {
		return (i) => {
			if (locked) {
				lockAnim.update((l) => l + 1, { duration: 0 }).then(() => lockAnim.set(0, { delay: 250 }));
				if (invalid) invalid(i);
			} else {
				dispatch('blowUp');
				callback(i);
			}
		};
	}

	$: lockButtonStyle = $lockAnim
		? `filter: contrast(${$lockAnim * 5 + 1}) invert(${$lockAnim}); transform: scale(${
				$lockAnim / 3 + 1
		  })`
		: '';
</script>

<div class="m-4 text-white">
	<div class="flex flex-row gap-4">
		<button
			class="p-2 inline-flex gap-4 justify-between items-center justify-items-center bg-gray-700 hover:bg-gray-600 transition-all rounded-xl mb-4"
			on:click={() => dispatch('add')}
		>
			<div class="bg-gray-600 p-2 rounded-xl"><Icon.PlusSolid size="md" /></div>
			<div>Hinzufügen</div>
		</button>
		<button
			class="p-2 inline-flex gap-4 justify-between items-center justify-items-center bg-gray-700 hover:bg-gray-600 transition-all rounded-xl mb-4"
			on:click={() => dispatch('delete')}
		>
			<div class="bg-gray-600 p-2 rounded-xl"><Icon.TrashBinSolid size="md" /></div>
			<div>Löschen</div>
		</button>
		<button
			class="p-2 inline-flex gap-4 justify-between items-center justify-items-center bg-gray-700 hover:bg-gray-600 transition-all rounded-xl mb-4"
			on:click={() => (locked = !locked)}
		>
			<div class="bg-gray-600 p-2 rounded-xl" style={lockButtonStyle}>
				{#if locked}
					<Icon.LockSolid size="md" />
				{:else}
					<Icon.LockOpenSolid size="md" />
				{/if}
			</div>
			<div>
				{#if locked}
					Entsperren
				{:else}
					Sperren
				{/if}
			</div>
		</button>
	</div>
	<div
		class="p-2 inline-flex flex-wrap gap-4 justify-start items-center bg-gray-700 rounded-xl"
	>
		<div class="bg-gray-600 p-2 rounded-xl"><Icon.RulerCombinedSolid size="md" /></div>
		<div>Distanz</div>
		<div class="flex flex-row">
			<button
				class={`bg-gray-${
					norm == 'manhattan' ? 500 : 600
				} hover:bg-gray-500 text-base transition-all p-2 m-0 rounded-l-xl`}
				on:click={invalidate(() => (norm = 'manhattan'))}>Manhattan</button
			>
			<button
				class={`bg-gray-${
					norm == 'euclidean' ? 500 : 600
				} hover:bg-gray-500 text-base transition-all p-2 m-0`}
				on:click={invalidate(() => (norm = 'euclidean'))}>Euklidisch</button
			>
			<button
				class={`bg-gray-${
					norm == 'max' ? 500 : 600
				} hover:bg-gray-500 transition-all text-base p-2 m-0 rounded-r-xl`}
				on:click={invalidate(() => (norm = 'max'))}>Maximum</button
			>
		</div>
	</div>
	<div class="flex flex-row gap-4 mt-4">
		<button
			class="p-2 inline-flex gap-4 justify-between items-center justify-items-center bg-gray-700 hover:bg-gray-600 transition-all rounded-xl"
		>
			<div class="bg-gray-600 p-2 rounded-xl"><Icon.DownloadSolid size="md" /></div>
			<div>Laden</div>
		</button>
		<button
			class="p-2 inline-flex gap-4 justify-between items-center justify-items-center bg-gray-700 hover:bg-gray-600 transition-all rounded-xl"
		>
			<div class="bg-gray-600 p-2 rounded-xl"><Icon.UploadSolid size="md" /></div>
			<div>Speichern</div>
		</button>
	</div>
</div>
