<script lang="ts">
	import * as Icon from 'flowbite-svelte-icons';
	import type { DistanceType } from '../geom/dist';
	import { createEventDispatcher } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { sineIn } from 'svelte/easing';
	import type {ColorSpace} from '../color/colorSpaces';

	export let norm: DistanceType = 'euclidean';
	export let colorSpace: ColorSpace = 'rgb';

	type Module = 'add' | 'delete' | 'lock' | 'norm' | 'colorSpace' | 'load' | 'store' | 'asVector';

	const defaultShow = new Set([
		'add',
		'delete',
		'lock',
		'norm',
		'colorSpace',
		'load',
		'store',
		'asVector'
	] as Module[]);
	export let show: Module[] = [];
	export let hide: Module[] = [];

	let display: Set<Module>;
	$: {
		display = new Set(Array.from(defaultShow).concat(show));
		for (const toHide of hide) {
			display.delete(toHide);
		}
	}

	const dispatch = createEventDispatcher<{
		add: null;
		delete: null;
		blowUp: null;
		asVectors: null;
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
		{#if display.has('add')}
			<button
				class="p-2 inline-flex gap-4 justify-between items-center justify-items-center bg-gray-700 hover:bg-gray-600 transition-all rounded-xl mb-4"
				on:click={() => dispatch('add')}
			>
				<div class="bg-gray-600 p-2 rounded-xl"><Icon.PlusSolid size="md" /></div>
				<div>Hinzufügen</div>
			</button>
		{/if}
		{#if display.has('delete')}
			<button
				class="p-2 inline-flex gap-4 justify-between items-center justify-items-center bg-gray-700 hover:bg-gray-600 transition-all rounded-xl mb-4"
				on:click={() => dispatch('delete')}
			>
				<div class="bg-gray-600 p-2 rounded-xl"><Icon.TrashBinSolid size="md" /></div>
				<div>Löschen</div>
			</button>
		{/if}
		{#if display.has('lock')}
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
		{/if}
	</div>
	{#if display.has('norm')}
		<div class="p-2 inline-flex flex-wrap gap-4 justify-start items-center bg-gray-700 rounded-xl">
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
	{/if}
	{#if display.has('colorSpace')}
		<div class="p-2 mt-4 inline-flex flex-wrap gap-4 justify-start items-center bg-gray-700 rounded-xl">
			<div class="bg-gray-600 p-2 rounded-xl"><Icon.PalleteSolid size="md" /></div>
			<div>Farbraum</div>
			<div class="flex flex-row">
				<button
					class={`bg-gray-${
						colorSpace == 'rgb' ? 500 : 600
					} hover:bg-gray-500 text-base transition-all p-2 m-0 rounded-l-xl`}
					on:click={invalidate(() => (colorSpace = 'rgb'))}>RGB</button
				>
				<button
					class={`bg-gray-${
						colorSpace == 'hsv' ? 500 : 600
					} hover:bg-gray-500 text-base transition-all p-2 m-0`}
					on:click={invalidate(() => (colorSpace = 'hsv'))}>HSV</button
				>
				<button
					class={`bg-gray-${
						colorSpace == 'oklab' ? 500 : 600
					} hover:bg-gray-500 transition-all text-base p-2 m-0 rounded-r-xl`}
					on:click={invalidate(() => (colorSpace = 'oklab'))}>oklab</button
				>
			</div>
		</div>
	{/if}
	<div class="flex flex-row gap-4 mt-4">
		{#if display.has('load')}
			<button
				class="p-2 inline-flex gap-4 justify-between items-center justify-items-center bg-gray-700 hover:bg-gray-600 transition-all rounded-xl"
			>
				<div class="bg-gray-600 p-2 rounded-xl"><Icon.DownloadSolid size="md" /></div>
				<div>Laden</div>
			</button>
		{/if}
		{#if display.has('store')}
			<button
				class="p-2 inline-flex gap-4 justify-between items-center justify-items-center bg-gray-700 hover:bg-gray-600 transition-all rounded-xl"
			>
				<div class="bg-gray-600 p-2 rounded-xl"><Icon.UploadSolid size="md" /></div>
				<div>Speichern</div>
			</button>
		{/if}
		{#if display.has('asVector')}
			<button
				class="p-2 inline-flex gap-4 justify-between items-center justify-items-center bg-gray-700 hover:bg-gray-600 transition-all rounded-xl"
				on:click={() => dispatch('asVectors')}
			>
				<div class="bg-gray-600 p-2 rounded-xl"><Icon.ArrowsRepeat1Solid size="md" /></div>
				<div>Als Vektoren</div>
			</button>
		{/if}
	</div>
</div>
