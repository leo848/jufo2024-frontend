<script lang="ts">
	import type { ComponentType } from 'svelte';
	import * as Icon from 'flowbite-svelte-icons';
	import { factorial } from '../utils/math';
	import { sendWebsocket, registerCallback, unregisterCallback } from '../server/websocket';
	import { serverOutputPathCreation } from '../server/types';
	import { Card, Spinner, Progressbar } from 'flowbite-svelte';
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	import { onDestroy } from 'svelte';

	export let points: number[][];
	export let dimensions = 3;

	let progress = { ongoing: false, value: 0 as null | number };
	let path: number[][] | null = null;

	const constructionItems: {
		name: string;
		description: string;
		icon: ComponentType;
		index: number;
		expectedTime?: (n: number) => null | number;
		send: (() => void) | null;
	}[] = (
		[
			{
				name: 'Manuell',
				description: 'Manuelle Auswahl der Punkte in einer Reihenfolge',
				method: null,
				expectedTime: () => null,
				icon: Icon.AnnotationOutline
			},
			{
				name: 'Greedy',
				description: 'Greedy-Algorithmus',
				method: 'greedy',
				icon: Icon.DollarOutline
			},
			{
				name: 'Nearest Neighbor',
				description: 'Nächster Nachbar',
				method: 'nearestNeighbor',
				expectedTime: (n: number) => Math.min(n / 2, 5),
				icon: Icon.PhoneOutline
			},
			{
				name: 'Brute Force',
				description: 'Teste alle möglichen Kombinationen',
				method: 'bruteForce',
				expectedTime: (n: number) => factorial(n) / 360,
				icon: Icon.HourglassOutline
			},
			{
				name: 'Optimal (Concorde)',
				description: 'Finde die optimale Lösung mittels des externen Tools Concorde',
				method: null,
				icon: Icon.WandMagicSparklesOutline
			}
		] as const
	).map((e, i) => {
		const payload =
			e.method &&
			(() =>
				({
					type: 'action',
					action: {
						type: 'createPath',
						method: { type: e.method },
						dimensions,
						values: points
					}
				} as const));
		const send = payload && (() => sendWebsocket(payload()));
		return Object.assign({}, e, { index: i, send });
	});

	let selectedConstructionItem: null | number = null;
	let displayConstructionItems = constructionItems;
	$: {
		let find = constructionItems.find((e) => e.index === selectedConstructionItem);
		displayConstructionItems = find === undefined ? constructionItems : [find];
	}
	$: constructionOpen = selectedConstructionItem !== null;

	let callbackId = registerCallback(serverOutputPathCreation, (pc) => {
		if (pc.donePath) {
			progress.ongoing = false;
			path = pc.donePath;
		} else {
			progress.ongoing = true;
			progress.value = pc.progress ?? null;
			path = null;
		}
	});
	onDestroy(() => unregisterCallback(callbackId));
</script>

<Card class="rounded-xl col-span-12 md:col-span-6 lg:col-span-7 xl:col-span-4 max-w-none">
	<p class="text-2xl xl:text-3xl dark:text-white bg-gray-700 p-4 -m-6 rounded-t-xl mb-4">
		Konstruktion
	</p>
	<div class="text-xl grow flex flex-col">
		{#each displayConstructionItems as { name, icon, index } (index)}
			<button
				animate:flip={{ duration: 200 }}
				transition:scale
				class="transition"
				on:click={() => (selectedConstructionItem = constructionOpen ? null : index)}
				disabled={progress.ongoing}
			>
				<div class="bg-gray-700 hover:bg-gray-600 transition-all p-4 mb-4 rounded-xl border border-gray-600">
					<div class="flex items-center justify-between">
						<Icon.AngleRightSolid
							class="transition"
							style={`transform: rotate(${constructionOpen ? 90 : 0}deg)`}
						/>
						<span class="font-bold text-2xl">
							{name}
						</span>
						<svelte:component this={icon} />
					</div>
				</div>
			</button>
		{/each}
		{#if selectedConstructionItem !== null}
			{@const { description, send, expectedTime } = constructionItems[selectedConstructionItem]}
			<div class="flex flex-col justify-between grow">
				<div>
					<div class="rounded-xl" in:scale={{ delay: 150 }}>{description}</div>
					{#if expectedTime}
						{@const time = expectedTime(points.length)}
						{#if time === null}
							<div>Erwartete Zeit: beliebig</div>
						{:else if time < 1}
							<div>Erwartete Zeit: <b>&lt;1</b> Sekunde</div>
						{:else}
							<div>Erwartete Zeit: <b>{time}</b> Sekunden</div>
						{/if}
					{/if}
				</div>
				{#if send}
					{#if !progress.ongoing}
						<button on:click={send} class="rounded-xl text-white bg-gray-700 hover:bg-gray-600 transition-all p-4"
							>Ausführen</button
						>
					{:else if progress.value === null}
						<Spinner />
					{:else}
						<Progressbar progress={progress.value * 100} />
					{/if}
				{/if}
			</div>
		{/if}
	</div>
</Card>
