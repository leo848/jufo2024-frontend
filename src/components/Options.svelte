<script lang="ts">
	import * as Icon from "flowbite-svelte-icons";
	import type {DistanceType} from "../geom/dist";
	import {createEventDispatcher} from "svelte";

	export let norm: DistanceType = "euclidean";

	const dispatch = createEventDispatcher<{delete: null}>();
</script>

<div class="m-4 text-white">
	<div class="flex flex-row gap-4">
		<button
			class="p-2 inline-flex text-xl gap-4 justify-between items-center justify-items-center bg-gray-700 hover:bg-gray-600 transition-all rounded-xl mb-4"
		   on:click={() => dispatch("delete")}
		>
			<div class="bg-gray-600 p-2 rounded-xl"><Icon.TrashBinSolid size="xl" /></div>
			<div>Löschen</div>
		</button>
		<button
			class="p-2 inline-flex text-xl gap-4 justify-between items-center justify-items-center bg-gray-700 hover:bg-gray-600 transition-all rounded-xl mb-4"
		>
			<div class="bg-gray-600 p-2 rounded-xl"><Icon.LockOpenSolid size="xl" /></div>
			<div>Sperren</div>
		</button>
	</div>
	<div
		class="p-2 inline-flex flex-wrap text-xl gap-4 justify-start items-center bg-gray-700 rounded-xl"
	>
		<div class="bg-gray-600 p-2 rounded-xl"><Icon.RulerCombinedSolid size="xl" /></div>
		<div>Distanz</div>
		<div class="flex flex-row">
			<button
				class={`bg-gray-${
					norm == 'manhattan' ? 500 : 600
				} hover:bg-gray-500 text-base transition-all p-2 m-0 rounded-l-xl`}
				on:click={() => (norm = 'manhattan')}>Manhattan</button
			>
			<button
				class={`bg-gray-${
					norm == 'euclidean' ? 500 : 600
				} hover:bg-gray-500 text-base transition-all p-2 m-0`}
				on:click={() => (norm = 'euclidean')}>Euklidisch</button
			>
			<button
				class={`bg-gray-${
					norm == 'max' ? 500 : 600
				} hover:bg-gray-500 transition-all text-base p-2 m-0 rounded-r-xl`}
				on:click={() => (norm = 'max')}>Maximum</button
			>
		</div>
	</div>
</div>
