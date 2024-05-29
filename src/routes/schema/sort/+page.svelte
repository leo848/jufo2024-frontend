<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import * as Icon from 'flowbite-svelte-icons';
	import Window from '../../../components/Window.svelte';
	import { title } from '../../../ui/navbar';
	import { loadSchema } from '../storage';
	import type { DataPoint, Schema } from '../types';
	import SchemaDisplay from '../SchemaDisplay.svelte';
	import DataPointPicker from '../DataPointPicker.svelte';
	import { flip } from 'svelte/animate';
	import { dark } from '../../../ui/darkmode';
	import { adjacencyMatrix } from '../../../graph/adjacency';
	import { registerCallback, sendWebsocket, unregisterCallback } from '../../../server/websocket';
	import { serverOutputPathCreation } from '../../../server/types';
	import { Spinner, Tooltip } from 'flowbite-svelte';
	import { onDestroy, type ComponentType } from 'svelte';
	import { download, upload } from '../../../utils/download';
	import { slide } from 'svelte/transition';
	import { shuffle } from '../../../utils/array';

	title.set('Eigenes Schema');

	let aborted = false;

	function abort(pkey: null | string): any {
		const url = pkey !== null ? '/schema/list?invalid=' + pkey : '/schema/list';
		goto(url, { replaceState: true });
		aborted = true;
	}

	let schema: Schema;

	let key = $page.url.searchParams.get('pkey') ?? abort(null);
	if (!aborted) {
		let schemathere = loadSchema(key) ?? abort(key || null);
		if (schemathere) {
			schema = schemathere;
			title.set(schema.name);
		}
	}

	let dataPoints: DataPoint[] = [];

	let picker:
		| null
		| { type: 'append' }
		| { type: 'edit'; index: number }
		| { type: 'insert'; index: number } = null;

	function downloadJSON() {
		const json = dataPoints.map((point) => point.toSelfContainedJSON());
		const text = JSON.stringify(json, undefined, 4);
		download(schema.name + '.json', text);
	}

	let error: string | null = null;
	$: dataPoints, (error = null);

	function uploadJSON() {
		upload('application/json', (content) => {
			const json = JSON.parse(content);
			if (!Array.isArray(json)) {
				error = 'Erwartete Liste von Daten, erhielt Objekt';
				return;
			}
			const results = json.map((entry) => schema.dataPointFromJSON(entry));
			const result: { value: DataPoint[]; success: true } | { error: string; success: false } =
				results.reduce(
					(acc, item) => {
						if (!acc.success && item.success) return acc;
						else if (!acc.success && !item.success) {
							let error = acc.error;
							if (!error.includes(item.error)) {
								error += ' • ' + item.error;
							}
							return {
								error,
								success: false
							};
						} else if (acc.success && !item.success) {
							return {
								error: item.error,
								success: false
							};
						} else if (acc.success && item.success) {
							return {
								value: [...acc.value, item.value],
								success: true
							};
						} else return acc;
					},
					{ value: [], success: true } as
						| { value: DataPoint[]; success: true }
						| { error: string; success: false }
				);
			if (result.success) {
				dataPoints = result.value;
			} else {
				error = result.error;
			}
		});
	}

	const actionButtons = [
		{
			icon: Icon.PlusSolid,
			action: () => {
				picker = { type: 'append' };
			},
			desc: 'Datenpunkt hinzufügen'
		},
		{
			icon: Icon.DownloadSolid,
			action: downloadJSON,
			desc: 'Schema-JSON herunterladen'
		},
		{
			icon: Icon.UploadSolid,
			action: uploadJSON,
			desc: 'Schema-JSON hochladen'
		},
		{
			icon: Icon.TrashBinSolid,
			action: () => {
				dataPoints = [];
			},
			desc: 'Alle Datenpunkte löschen'
		},
		{
			icon: Icon.ShuffleSolid,
			action: () => {
				dataPoints = shuffle(dataPoints);
			},
			desc: 'Datenpunkte mischen'
		}
	];

	const itemActionButtons: {
		icon: ComponentType;
		action: (index: number) => void;
		desc: string;
	}[] = [
		{
			icon: Icon.EditOutline,
			action: (index) => {
				picker = { type: 'edit', index };
				console.log(picker);
			},
			desc: 'Datenpunkt bearbeiten'
		},
		{
			icon: Icon.CopySolid,
			action: (index) => {
				picker = { type: 'insert', index };
			},
			desc: 'Datenpunkt kopieren'
		},
		{
			icon: Icon.TrashBinOutline,
			action: (index) => (dataPoints = dataPoints.toSpliced(index, 1)),
			desc: 'Datenpunkt löschen'
		}
	];

	let sortingOngoing = false;
	function sort() {
		const matrix = adjacencyMatrix(
			dataPoints.map((d) => d.toVector()),
			{ norm: 'euclidean', invert: false }
		);
		sendWebsocket({
			type: 'action',
			action: {
				type: 'createPath',
				matrix,
				method: { type: 'ilp' }
			},
			pool: {
				ilpMaxDuration: 60
			}
		});
		sortingOngoing = true;
	}

	const callback = registerCallback(serverOutputPathCreation, (pc) => {
		if (pc.donePath) {
			sortingOngoing = false;
			dataPoints = pc.donePath.map((idx) => dataPoints[idx]);
		}
	});
	onDestroy(() => unregisterCallback(callback));
</script>

<div class="md:mx-8 mx-4 mt-4 grid grid-cols-12 gap-8">
	<Window title="Datenpunkte" scrollable>
		{#if error}
			<div
				class="mx-0 dark:bg-gray-500 bg-gray-100 p-2 dark:text-white text-black flex flex-row justify-between"
				transition:slide={{ axis: 'y' }}
			>
				<div>{error}</div>
				<button
					class="dark:text-gray-400 hover:text-white transition-all"
					on:click={() => (error = null)}><Icon.CloseCircleSolid /></button
				>
			</div>
		{/if}
		<div class="m-4">
			<div class="flex flex-row gap-4">
				{#each actionButtons as btn}
					<button
						class="p-4 mb-4 dark:bg-gray-600 bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-400 transition-all rounded-full"
						on:click={btn.action}
					>
						<svelte:component this={btn.icon} size="xl" />
					</button>
					<Tooltip type="auto">
						{btn.desc}
					</Tooltip>
				{/each}
			</div>
			<div class="flex flex-col gap-2">
				{#each dataPoints as dataPoint, index (dataPoint.name)}
					<div
						class="p-2 dark:bg-gray-700 bg-gray-200 rounded flex flex-row gap-2 align-center items-center"
						animate:flip
					>
						<span class="dark:text-white">{dataPoint.name}</span>
						<span class="flex-grow" />
						{#each itemActionButtons as btn}
							<button
								class="p-2 bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 hover:bg-gray-400 rounded-full transition-all"
								on:click={() => btn.action(index)}><svelte:component this={btn.icon} /></button
							>
							<Tooltip>
								{btn.desc}
							</Tooltip>
						{/each}
					</div>
				{/each}
			</div>
		</div>
	</Window>
	<Window title="Schema">
		{#if schema}
			<SchemaDisplay {schema} showDetails />
		{/if}
	</Window>
	<div class="col-span-12 lg:col-span-6">
		{#if dataPoints.length < 3}
			<div
				class="p-4 text-black text-xl md:text-2xl lg:text-6xl w-full rounded-xl transition-all"
				style={`background: linear-gradient(to right, ${$dark ? '#ccc' : '#666'} 0%, ${
					$dark ? '#ccc' : '#666'
				} ${(dataPoints.length / 3) * 100}%, ${$dark ? '#666' : '#ccc'} ${
					(dataPoints.length / 3) * 100
				}%, ${$dark ? '#666' : '#ccc'} 100%)`}
			>
				{dataPoints.length} / 3
			</div>
		{:else}
			<button
				class="p-4 text-black text-2xl md:text-3xl lg:text-6xl w-full rounded-xl transition-all sort-btn"
				on:click={sort}
				disabled={sortingOngoing}
			>
				{#if sortingOngoing}
					<Spinner />
				{:else}
					Sortieren
				{/if}
			</button>
		{/if}
	</div>
</div>

{#if picker != null}
	<DataPointPicker
		{schema}
		on:create={(evt) => {
			if (picker == null) return;
			const newDataPoint = evt.detail;
			if (picker.type != 'edit') {
				while (dataPoints.map((p) => p.name).includes(newDataPoint.name)) {
					const matches = /\(\d+\)/.exec(newDataPoint.name);
					if (matches === null) {
						newDataPoint.name = newDataPoint.name + ' (2)';
					} else {
						const match = matches[0].substring(1, matches[0].length - 1);
						if (!Number.isNaN(+match)) {
							newDataPoint.name = newDataPoint.name.replace(
								'(' + match + ')',
								'(' + (+match + 1) + ')'
							);
						}
					}
				}
			}
			if (picker.type === 'append') {
				dataPoints = [...dataPoints, newDataPoint];
			} else if (picker.type === 'edit') {
				dataPoints[picker.index] = newDataPoint;
			} else if (picker.type === 'insert') {
				dataPoints = dataPoints.toSpliced(picker.index + 1, 0, newDataPoint);
			}
			picker = null;
		}}
		on:cancel={() => (picker = null)}
		initialValue={picker.type === 'edit' || picker.type === 'insert'
			? dataPoints[picker.index]
			: undefined}
	/>
{/if}
