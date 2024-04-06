<script lang="ts">
	import type { ComponentType } from 'svelte';
	import * as Icon from 'flowbite-svelte-icons';
	import { sendWebsocket, registerCallback, unregisterCallback } from '../server/websocket';
	import {
		serverOutputDistPathCreation,
		serverOutputDistPathImprovement,
		serverOutputPathCreation,
		serverOutputPathImprovement
	} from '../server/types';
	import { Spinner, Progressbar } from 'flowbite-svelte';
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	import { createEventDispatcher, onDestroy } from 'svelte';
	import Window from './Window.svelte';
	import { DistanceType, distanceTypeToObject } from '../geom/dist';
	import { formatTimespan } from '../utils/time';
	import { constructionAlgorithms, improvementAlgorithms } from '../server/algorithms';

	export let values: number[][];
	export let dimensions = 3;
	export let matrix: boolean = false;
	export let metric: DistanceType = 'euclidean';

	export let matrixPath: number[] | null | undefined = undefined;
	$: if (matrix && matrixPath === undefined) {
		throw new Error('Matrix given, yet no matrix path defined');
	}

	export let horizontal: boolean = false;

	let progress = {
		ongoing: false,
		value: 0 as null | number,
		start: new Date(),
		preferStep: false,
		eta() {
			const { value, start, ongoing } = this;
			const now = new Date();
			const msPassed = now.getTime() - start.getTime();
			if (msPassed === 0 || value === null || value === 0 || !ongoing || msPassed < 100)
				return null;
			const estimatedTotalTime = msPassed / value;
			return estimatedTotalTime - msPassed;
		}
	};
	let path: number[][] | null | number[] = null;

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
			stepwise?: boolean;
			expectedTime?: (n: number, latency: number) => null | number;
			send: ((options?: { stepwise: boolean }) => void) | null;
		}[]
	> = {
		construction: constructionAlgorithms.map((e, i) => {
			let send;
			if (matrix) {
				const payload =
					e.method &&
					(() =>
						({
							type: 'action',
							latency,
							action: {
								type: 'createPath',
								method: { type: e.method },
								matrix: values
							}
						} as const));
				send =
					payload &&
					(() => {
						progress.start = new Date();
						progress.preferStep = false;
						sendWebsocket(payload());
					});
			} else {
				const payload =
					e.method &&
					(() =>
						({
							type: 'action',
							latency,
							action: {
								type: 'createDistPath',
								method: { type: e.method },
								metric: distanceTypeToObject(metric),
								dimensions,
								values
							}
						} as const));
				send =
					payload &&
					(() => {
						progress.start = new Date();
						progress.preferStep = false;
						sendWebsocket(payload());
					});
			}
			return Object.assign({}, e, { index: i, send });
		}),
		improvement: improvementAlgorithms.map((e, i) => {
			let send;
			if (matrix) {
				const payload =
					e.method &&
					((options: { stepwise: boolean } = { stepwise: false }) =>
						({
							type: 'action',
							latency,
							action: {
								type: 'improvePath',
								method: { type: e.method },
								path:
									matrixPath ??
									(() => {
										throw new Error('no matrix path given');
									})(),
								matrix: values,
								preferStep: options.stepwise
							}
						} as const));
				send =
					payload &&
					((options: { stepwise: boolean } = { stepwise: false }) => {
						progress.start = new Date();
						progress.preferStep = options.stepwise;
						sendWebsocket(payload(options));
					});
			} else {
				const payload =
					e.method &&
					((options: { stepwise: boolean } = { stepwise: false }) =>
						({
							type: 'action',
							latency,
							action: {
								type: 'improveDistPath',
								method: { type: e.method },
								metric: distanceTypeToObject(metric),
								dimensions,
								path: values,
								preferStep: options.stepwise
							}
						} as const));
				send =
					payload &&
					((options: { stepwise: boolean } = { stepwise: false }) => {
						progress.start = new Date();
						progress.preferStep = options.stepwise;
						sendWebsocket(payload(options));
					});
			}
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

	let latencySlider = 2;

	export let latency = 0;
	$: latency = [0, 50, 100, 250, 500, 1000, 2000][latencySlider];

	if (matrix) {
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
	} else {
		let callbackId = registerCallback(serverOutputDistPathCreation, (pc) => {
			if (pc.donePath) {
				progress.ongoing = false;
				path = pc.donePath;
				console.log('took ' + (new Date().getTime() - progress.start.getTime()) + 'ms');
			} else {
				progress.ongoing = true;
				progress.value = pc.progress ?? null;
				path = null;
			}
		});
		onDestroy(() => unregisterCallback(callbackId));

		let callbackId2 = registerCallback(serverOutputDistPathImprovement, (pi) => {
			if (pi.done) {
				progress.ongoing = false;
			} else {
				progress.ongoing = true;
				progress.value = pi.progress ?? null;
			}
			path = pi.currentPath;
		});
		onDestroy(() => unregisterCallback(callbackId2));
	}

	export function invalidate() {
		path = null;
		selectedItem = { construction: null, improvement: null };
	}

	const dispatch = createEventDispatcher<{ deletePath: null }>();

	function deletePath() {
		dispatch('deletePath');
	}

	let _tailwind = ['xl:col-span-4', 'xl:col-span-6'];
</script>

<Window title={name[currentAction]} mdCol={6} xlCol={horizontal ? 6 : 4}>
	<div class={`grid grid-cols-${horizontal && selectedItem[currentAction] === null ? 2 : 1} m-4`}>
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
			{@const { description, send, expectedTime, complexity, stepwise } =
				items[currentAction][selectedItemAction]}
			<div class="flex flex-col justify-between grow">
				<div>
					<div class="rounded-xl mb-4" in:scale={{ delay: 150 }}>{description}</div>
					{#if expectedTime}
						{@const time = expectedTime(values.length, latency)}
						{@const [amount, suffix] = formatTimespan(time)}
						<div>Erwartete Zeit: <b>{amount}</b> {suffix}</div>
					{/if}
					{#if complexity}
						<div>Komplexität: <b>{complexity}</b></div>
					{/if}
					<div class="mt-2">
						Minimallatenz:
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
						max={6}
						class="w-full bg-transparent text-white grayscale"
					/>
				</div>
				{#if send}
					{#if !progress.ongoing}
						<div class="flex flex-row justify-stretch gap-4">
							<button
								on:click={() => send({ stepwise: false })}
								class="flex flex-row justify-between p-4 grow rounded-xl text-white bg-gray-700 hover:bg-gray-600 transition-all p-4"
								><Icon.PlaySolid />
								<div>Ausführen</div>
								<div /></button
							>
							{#if stepwise}
								<button
									on:click={() => send({ stepwise: true })}
									class="flex flex-row justify-between p-4 grow rounded-xl text-white bg-gray-700 hover:bg-gray-600 transition-all p-4 items-center"
									><Icon.PlayOutline />
									<div>Schritt ausführen</div>
									<div /></button
								>
							{/if}
						</div>
					{:else if progress.value === null}
						<Spinner />
					{:else}
						{@const eta = progress.eta()}
						{#if eta !== null && (!stepwise || progress.preferStep)}
							{@const [amount, suffix] = formatTimespan(eta / 1000)}
							<div>
								{#if eta > 2000}ca. {/if}<b>{amount}</b>
								{suffix} verbleibend
							</div>
						{/if}
						<Progressbar progress={progress.value * 100} />
					{/if}
				{/if}
			</div>
		{:else if currentAction === 'improvement'}
			<div class="grow h-full" />
			<button
				class="text-gray-500 hover:text-gray-200 transition-all underline self-center"
				on:click={deletePath}>Pfad löschen</button
			>
		{/if}
	</div>
</Window>
