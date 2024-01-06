<script lang="ts">
	import type { ComponentType } from 'svelte';
	import * as Icon from 'flowbite-svelte-icons';
	import { factorial } from '../utils/math';
	import { sendWebsocket, registerCallback, unregisterCallback } from '../server/websocket';
	import { serverOutputPathCreation, serverOutputPathImprovement } from '../server/types';
	import { Card, Spinner, Progressbar, Range } from 'flowbite-svelte';
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	import { createEventDispatcher, onDestroy } from 'svelte';
	import Window from './Window.svelte';

	export let points: number[][];
	export let dimensions = 3;

	export let horizontal: boolean = false;

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
			complexity?: string;
			expectedTime?: (n: number) => null | number;
			send: (() => void) | null;
		}[]
	> = {
		construction: (
			[
				{
					name: 'Aktuelle Anordnung',
					description: 'Die aktuelle Anordnung der Punkte wird als Pfad interpretiert.',
					method: 'transmute',
					complexity: 'O(1)',
					icon: Icon.CameraFotoOutline
				},
				{
					name: 'Zufällig',
					description:
						'Die Punkte werden zufällig nacheinander ausgewählt und so zu einem Pfad zusammengefügt.',
					method: 'random',
					complexity: 'O(n)',
					expectedTime: () => null,
					icon: Icon.ShuffleOutline
				},
				{
					name: 'Brute Force',
					description:
						'Alle möglichen Permutationen der Punkte werden ausprobiert und die minimale wird gewählt.',
					method: 'bruteForce',
					complexity: 'O(n!)',
					expectedTime: (n: number) => factorial(n) / 360,
					icon: Icon.HourglassOutline
				},
				{
					name: 'Nearest Neighbor',
					description:
						'Die Methode des nächsten Nachbarn beginnt mit dem Anfangspunkt und wählt stets den nächsten Punkt, der noch nicht besucht wurde, und baut so den Pfad auf.',
					method: 'nearestNeighbor',
					complexity: 'O(n³)',
					expectedTime: (n: number) => Math.min(n / 2, 5),
					icon: Icon.PhoneOutline
				},
				{
					name: 'Greedy',
					description:
						'Der Greedy-Algorithmus wählt stets die kürzeste Kante aus, bei deren Auswahl kein Zyklus entsteht.',
					method: 'greedy',
					complexity: 'O(n²)',
					icon: Icon.DollarOutline
				},
				{
					name: 'Christofides',
					description:
						'Der Christofides-Algorithmus baut zuerst den kürzesten Baum auf, der alle Knoten beinhaltet, und erstellt daraus mittels eines Eulerwegs einen Hamilton-Pfad.',
					method: 'christofides',
					complexity: 'O(n⁴)',
					icon: Icon.ShareNodesOutline
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
						latency,
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
					description: 'Der Pfad wird eindimensional rotiert und so das beste Ergebnis gefunden.',
					method: 'rotate',
					complexity: 'O(n)',
					icon: Icon.RotateOutline
				},
				{
					name: '2-opt',
					description:
						'Beim 2-opt-Verfahren werden Überkreuzungen zweier Kanten gesucht und durch Tauschen der Knoten behoben.',
					method: 'twoOpt',
					complexity: 'O(n²)',
					icon: Icon.SwatchbookOutline
				},
				{
					name: '3-opt',
					description: 'Beim 3-opt-Verfahren werden drei Kanten getauscht.',
					method: 'threeOpt',
					complexity: 'O(n³)',
					icon: Icon.SwatchbookSolid
				},
				{
					name: 'Simulated Annealing',
					description: 'Zu Beginn werden Knoten zufällig getauscht, zum Schluss hin nur noch taktisch.',
					method: null,
					complexity: null,
					icon: Icon.ChartSolid,
				}
			] as const
		).map((e, i) => {
			const payload =
				e.method &&
				(() =>
					({
						type: 'action',
						latency,
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

	let latencySlider = 1;
	$: latency = [0, 100, 250, 500, 1000, 2000][latencySlider];

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

	let callbackId2 = registerCallback(serverOutputPathImprovement, (pi) => {
		if (pi.done) {
			progress.ongoing = false;
		} else {
			progress.ongoing = true;
			progress.value = pi.progress ?? null;
		}
		path = pi.currentPath;
	});
	onDestroy(() => unregisterCallback(callbackId2));

	let dispatch = createEventDispatcher<{ deletePath: null }>();

	export function invalidate() {
		path = null;
		selectedItem = { construction: null, improvement: null };
	}

	let _tailwind = ['xl:col-span-4', 'xl:col-span-6'];
</script>

<Window title={name[currentAction]} mdCol={6} xlCol={horizontal ? 6 : 4}>
	<div
		class={`text-xl grid grid-cols-${
			horizontal && selectedItem[currentAction] === null ? 2 : 1
		} m-4`}
	>
		{#each displayItems[currentAction] as item (item.index)}
			<button
				animate:flip={{ duration: 200 }}
				in:scale
				class={`transition ${horizontal ? 'even:ml-2 odd:mr-2' : ''} mb-4 last:mb-0`}
				on:click={() => (selectedItem[currentAction] = open(currentAction) ? null : item.index)}
				disabled={progress.ongoing}
			>
				<div
					class="bg-gray-700 hover:bg-gray-600 transition-all p-2 rounded-xl border border-gray-600"
				>
					<div class="flex items-center justify-between">
						<Icon.AngleRightSolid
							class="transition"
							style={`transform: rotate(${open(currentAction) ? 90 : 0}deg)`}
						/>
						<span class="text-gray-100">
							{item.name}
						</span>
						<svelte:component this={item.icon} />
					</div>
				</div>
			</button>
		{/each}
		{#if selectedItemAction !== null}
			{@const { description, send, expectedTime, complexity } =
				items[currentAction][selectedItemAction]}
			<div class="flex flex-col justify-between grow">
				<div>
					<div class="rounded-xl mb-4" in:scale={{ delay: 150 }}>{description}</div>
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
					{#if complexity}
						<div>Komplexität: <b>{complexity}</b></div>
					{/if}
					<div class="mt-2">
						Latenz:
						{#if latency == 0}
							<b>keine</b>
						{:else if latency < 1000}
							<b>{latency}</b>ms
						{:else}
							<b>{(latency / 1000).toFixed(0)}</b>s
						{/if}
					</div>
					<input
						type="range"
						bind:value={latencySlider}
						min={0}
						max={5}
						class="w-full bg-transparent text-white grayscale"
					/>
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
</Window>
