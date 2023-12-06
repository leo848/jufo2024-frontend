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

	type ActionKind = 'construction' | 'improvement';
	type ForAction<T> = Record<ActionKind, T>;
	const name = { construction: 'Konstruktion', improvement: 'Verbesserung' };

	let currentAction: ActionKind = 'construction';
	$: currentAction = path === null ? 'construction' : 'improvement';

	const items: ForAction<
		{
			name: string;
			description: string;
			icon: ComponentType;
			index: number;
			expectedTime?: (n: number) => null | number;
			send: (() => void) | null;
		}[]
	> = {
		construction: (
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
		}),
		improvement: (
			[
				{
					name: 'Rotieren',
					description: 'Den Pfad eindimensional rotieren',
					method: 'rotate',
					icon: Icon.RotateOutline
				},
				{
					name: '2-opt',
					description: 'Lokale Suche: 2-opt-Verfahren',
					method: 'twoOpt',
					icon: Icon.SwatchbookOutline,
				}
			] as const
		).map((e, i) => {
			const payload =
				e.method &&
				(() =>
					({
						type: 'action',
						action: {
							type: 'improvePath',
							method: { type: e.method },
							dimensions,
							path: points
						}
					} as const));
			const send = payload && (() => sendWebsocket(payload()));
			return Object.assign({}, e, { index: i, send });
		})
	};

	let selectedItem: ForAction<null | number> = { construction: null, improvement: null };
	$: selectedItemAction = selectedItem[currentAction];
	let displayItems = items;
	$: {
		displayItems = Object.fromEntries(
			Object.entries(items)
				.map(([key, arr]) => [
					key,
					arr,
					arr.find((e) => e.index === selectedItem[key as ActionKind])
				])
				.map(([key, arr, elem]) => [key, elem === undefined ? arr : [elem]])
		);
	}
	$: open = (kind: ActionKind) => selectedItem[kind] !== null;

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
		{name[currentAction]}
	</p>
	<div class="text-xl grow flex flex-col">
		{#each displayItems[currentAction] as item (item.index)}
			<button
				animate:flip={{ duration: 200 }}
				transition:scale
				class="transition"
				on:click={() => (selectedItem[currentAction] = open(currentAction) ? null : item.index)}
				disabled={progress.ongoing}
			>
				<div
					class="bg-gray-700 hover:bg-gray-600 transition-all p-4 mb-4 rounded-xl border border-gray-600"
				>
					<div class="flex items-center justify-between">
						<Icon.AngleRightSolid
							class="transition"
							style={`transform: rotate(${open(currentAction) ? 90 : 0}deg)`}
						/>
						<span class="font-bold text-2xl">
							{item.name}
						</span>
						<svelte:component this={item.icon} />
					</div>
				</div>
			</button>
		{/each}
		{#if selectedItemAction !== null}
			{@const { description, send, expectedTime } = items[currentAction][selectedItemAction]}
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
						<button
							on:click={send}
							class="rounded-xl text-white bg-gray-700 hover:bg-gray-600 transition-all p-4"
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
