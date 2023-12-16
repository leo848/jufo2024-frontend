<script lang="ts">
	import { title } from '../../ui/navbar';
	import { Card } from 'flowbite-svelte';
	import * as Icon from 'flowbite-svelte-icons';
	import OpenLayersMap from '../../components/OpenLayersMap.svelte';
	import PathProperties from '../../components/PathProperties.svelte';
	import PathAlgorithms from '../../components/PathAlgorithms.svelte';

	title.set("Orte sortieren");

	type NamedPoint = {
		name: string;
		lat: number,
		lon: number,
	}

	let points: NamedPoint[] = [];

	let path: null | number[][] = [];
	let invalidateAlgorithms: () => {};
</script>

<div class="mt-4 pb-10 mx-10">
	<div
		class="mt-8 grid grid-cols-12 gap-8 auto-cols-max align-stretch justify-stretch justify-items-stretch"
	>
		<Card class="rounded-xl overflow-hidden col-span-12 xl:col-span-6 xl:row-span-2 max-w-none xl:p-0 mb-0">
			<div
				class="text-2xl xl:text-3xl dark:text-white bg-gray-700 p-4 rounded-t-xl flex flex-row justify-between items-center"
			>
				<div>Karte</div>
				<button class="bg-gray-600 rounded-xl p-2" disabled><Icon.CogOutline /></button>
			</div>
			<div class="h-full m-0">
				<OpenLayersMap />
			</div>
		</Card>

		<PathProperties {path} {length} horizontal />

		<PathAlgorithms
			on:deletePath={() => (path = null)}
			bind:invalidate={invalidateAlgorithms}
			dimensions={2}
			horizontal
			points={points.map((p) => [p.lat, p.lon])}
		/>
	</div>
</div>
