<script lang="ts">
	import { title } from '../../ui/navbar';
	import { Card } from 'flowbite-svelte';
	import * as Icon from 'flowbite-svelte-icons';
	import OpenLayersMap from '../../components/OpenLayersMap.svelte';

	title.set("Orte sortieren");
</script>

<div class="mt-4 pb-10 mx-10">
	<div
		class="mt-8 grid grid-cols-12 gap-8 auto-cols-max align-stretch justify-stretch justify-items-stretch"
	>
		<Card class="rounded-xl overflow-hidden col-span-12 xl:col-span-5 max-w-none xl:p-0 mb-0">
			<div
				class="text-2xl xl:text-3xl dark:text-white bg-gray-700 p-4 rounded-t-xl flex flex-row justify-between items-center"
			>
				<div>Karte</div>
				<button class="bg-gray-600 rounded-xl p-2" disabled><Icon.CogOutline /></button>
			</div>
			<div class="h-full m-0 h-[420px]">
				<OpenLayersMap />
			</div>
		</Card>

		<!--<PathProperties {path} {length} />

		<PathAlgorithms
			on:deletePath={() => (path = null)}
			bind:invalidate={invalidateAlgorithms}
			dimensions={dim}
			points={points.map((p) => p.inner)}
		/>-->
	</div>
</div>
