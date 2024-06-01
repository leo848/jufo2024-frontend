<script lang="ts">
	import Window from '../../components/Window.svelte';
	import { title } from '../../ui/navbar';
	import * as Icon from 'flowbite-svelte-icons';
	import { registerCallback, sendWebsocket, unregisterCallback } from '../../server/websocket';
	import {
		serverOutputPathCreation,
		serverOutputPathImprovement,
		serverOutputRandomWord,
		serverOutputWordToVec
	} from '../../server/types';
	import AdjacencyMatrix from '../../components/AdjacencyMatrix.svelte';
	import { adjacencyMatrix, positiveAdjacencyMatrix } from '../../graph/adjacency';
	import { flip } from 'svelte/animate';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { gradient } from '../../ui/color';
	import { RgbColor } from '../../color/colorSpaces';
	import type { Color } from '../../color/color';
	import Options from '../../components/Options.svelte';
	import PathAlgorithms from '../../components/PathAlgorithms.svelte';
	import { onDestroy, onMount } from 'svelte';
	import PathProperties from '../../components/PathProperties.svelte';
	import ForceDirectedGraphOptions from '../../components/ForceDirectedGraphOptions.svelte';
	import ForceDirectedGraph from '../../components/ForceDirectedGraph.svelte';
	import { fromUrlString, toUrlString } from './url';
	import LoadWords from './LoadWords.svelte';
	import { presets } from './presets';
	import { dist, type TrueDistanceType } from '../../geom/dist';
	import { dark } from '../../ui/darkmode';

	title.set('Wörter sortieren');

	type Word = {
		inner: string;
		desc?: string;
		vec: number[];
		index: number;
		error?: string;
	};

	let words: Word[] = [];
	let locked = false;
	let metric: TrueDistanceType = { norm: 'cosine', invert: false };
	let invalidate: (c: (arg0: any) => void) => (arg0: any) => void;
	let edges: [number, number][] = []; // indices;
	// $: words, (edges = []);

	let input: string = '';
	let inputLoading = false;
	let inputError: null | { type: 'unknown' | 'present' | 'unsupported'; word: string } = null;
	let unknownWords = new Set<string>();
	let knownWords = new Set<string>();
	$: input, (inputError = null);
	let inputElement: HTMLInputElement;

	let invalidateAlgorithms: () => void;
	let latency: number;
	let redraw: () => void;

	let fdgOptions: {
		speed: number;
	};
	let fdgActions: {
		freeze(): void;
	};

	let queryString = $page.url.searchParams.get('v');
	onMount(() => {
		if (queryString == null) return;
		let newData = fromUrlString(queryString);
		if (newData == null || newData.every((w) => w.length === 0)) return;
		newData.forEach((string, idx) => {
			setTimeout(() => {
				sendWebsocket({
					type: 'wordToVec',
					word: string
				});
			}, idx * 10 + 100);
		});
	});

	$: if ($page.url.pathname.includes('sort-words')) {
		$page.url.searchParams.set('v', toUrlString(words.map((w) => w.inner)));
		goto(`?${$page.url.searchParams.toString()}`, {
			keepFocus: true,
			replaceState: true,
			noScroll: true
		});
	}

	async function addInput({ sendRandom }: { sendRandom?: boolean } = {}) {
		if (inputLoading) return;
		if (!input || input.length === 0) {
			if (inputElement === document.activeElement || sendRandom) {
				if (sendRandom !== false) {
					sendWebsocket({
						type: 'wordToVec',
						word: null
					});
				}
				inputLoading = true;
			}
			inputElement.focus();
			return;
		}

		const word = input.toLowerCase();

		if (unknownWords.has(word)) {
			setTimeout(() => (inputError = { type: 'unknown', word }));
			return;
		} else if (knownWords.has(word)) {
			setTimeout(() => (inputError = { type: 'present', word }));
			return;
		}

		input = '';
		inputLoading = true;

		sendWebsocket({
			type: 'wordToVec',
			word
		});
	}

	function array2<T>(value0: T, value1: T): [T, T] {
		return [value0, value1];
	}

	function vecToColors(vec: number[], dark: boolean): Color[] {
		return vec
			.map((number) => {
				let rgbColor = number > 0 ? new RgbColor(0, 1, 0) : new RgbColor(1, 0, 0);
				let hsvColor = rgbColor.color().space('hsv');
				if (dark) {
					hsvColor = hsvColor.with('v', Math.abs(number) * 3);
				} else {
					hsvColor = hsvColor.with('v', 1 - Math.abs(number)).with('s', Math.abs(number) * 3);
				}
				return hsvColor;
			})
			.map((hsv) => hsv.color());
	}

	function removeWord(trueIndex: number) {
		const word = words[trueIndex];
		words = words.toSpliced(trueIndex, 1);
		for (const word of words) {
			if (word.index > trueIndex) word.index--;
		}
		knownWords.delete(word.inner);
	}

	function blowUp() {
		edges = [];
		invalidateAlgorithms();
	}

	const callbacks = new Array(4);
	callbacks[0] = registerCallback(serverOutputWordToVec, (evt) => {
		inputLoading = false;

		const word = evt.word;

		if (evt.result.type === 'unsupported') {
			inputError = { type: 'unsupported', word };
			return;
		}

		if (evt.result.type === 'unknownWord') {
			input = word;
			unknownWords.add(word);
			setTimeout(() => (inputError = { type: 'unknown', word }));
			return;
		}

		knownWords.add(word);

		words = [
			...words,
			{
				inner: word,
				index: (words[words.length - 1]?.index ?? -1) + 1,
				vec: evt.result.vec,
				desc: evt.desc ?? undefined
			}
		];
	});
	callbacks[1] = registerCallback(serverOutputRandomWord, (rw) => {
		if (input.length === 0) input = rw.word;
		inputLoading = false;
		inputElement.select();
	});
	callbacks[2] = registerCallback(serverOutputPathCreation, (pc) => {
		edges = pc.currentEdges;
		if (pc.donePath) {
			let newWords: Word[] = [];
			let newEdges: [number, number][] = [];
			pc.donePath.forEach((index, pathIndex, arr) => {
				if (index < arr.length - 1) {
					newEdges.push([index, arr[pathIndex + 1]]);
				}
				newWords.push(words[index]);
			});
			words = newWords;
			setTimeout(() => (edges = new Array(words.length - 1).fill(null).map((_, i) => [i, i + 1])));
		}
		locked = true;
	});
	callbacks[3] = registerCallback(serverOutputPathImprovement, (pi) => {
		if (pi.better) {
			const newEdges: [number, number][] = [];
			pi.currentPath.forEach((_, index, arr) => {
				if (index < arr.length - 1) {
					newEdges.push([arr[index], arr[index + 1]]);
				}
			});
			edges = newEdges;
		}
		if (pi.done) {
			let newWords = [];
			for (const index of pi.currentPath) {
				newWords.push(words[index]);
			}
			words = newWords;
			setTimeout(() => (edges = new Array(words.length - 1).fill(null).map((_, i) => [i, i + 1])));
		}
		locked = true;
	});
	onDestroy(() => callbacks.forEach((c) => unregisterCallback(c)));
</script>

<div class="grid grid-cols-12 gap-8 mt-8 mx-10">
	<Window xlCol={4} row={1} title="Wörter" scrollable>
		<div class="grid m-4 gap-2">
			<form on:submit|preventDefault={invalidate(addInput)}>
				<div class="flex flex-row gap-4 mb-4">
					<input
						class="dark:bg-gray-600 bg-gray-100 text-xl p-2 rounded dark:text-white text-black grow"
						placeholder="Gib ein deutsches Wort ein..."
						bind:value={input}
						bind:this={inputElement}
						disabled={inputError && inputError.type === 'unsupported'}
					/>
					<button
						class={`dark:bg-gray-600 bg-gray-100 dark:hover:bg-gray-500 hover:bg-gray-200 dark:text-white text-black p-4 rounded-full`}
						on:click={invalidate(() => addInput())}
						disabled={inputLoading}
					>
						<Icon.PlusSolid />
					</button>
				</div>
				{#if inputError}
					{#if inputError.type === 'unsupported'}
						<div>
							Worteinbettung von Server nicht unterstützt<br />
							<a href="/" class="text-white underline text-xl">Zurück zur Startseite</a>
						</div>
					{:else}
						<div>
							{#if inputError.type === 'unknown'}
								Unbekanntes Wort:
							{:else if inputError.type === 'present'}
								Bereits eingegeben:
							{/if}
							&nbsp;<b>{inputError.word}</b>
						</div>
					{/if}
				{/if}
			</form>
			{#each words as word, trueIndex (word.inner)}
				<div animate:flip>
					<div
						class="p-2 rounded text-xl dark:text-white text-black dark:bg-gray-700 bg-gray-100 flex flex-row"
						title={word.desc}
					>
						<span class="text-gray-400">{word.index + 1}.&nbsp;</span>
						<span class="text-2xl -my-1">{word.inner}</span>
						<div class="grow" />
						<div class="flex flex-col text-sm opacity-50 items-end">
							<div class="-mb-1">
								{#if trueIndex !== 0}
									d(~, {words[trueIndex - 1].inner}) =
									<span class="tabular-nums"
										>{dist(word.vec, words[trueIndex - 1].vec, metric).toFixed(2)}</span
									>
								{:else}
									&nbsp;
								{/if}
							</div>
							<div class="-mb-1">
								{#if trueIndex !== words.length - 1}
									d(~, {words[trueIndex + 1].inner}) =
									<span class="tabular-nums"
										>{dist(word.vec, words[trueIndex + 1].vec, metric).toFixed(2)}</span
									>
								{:else}
									&nbsp;
								{/if}
							</div>
						</div>
						{#if edges.length === 0}
							<button
								class="text-gray-400 hover:text-white transition-all ml-8"
								on:click={invalidate(() => removeWord(trueIndex))}><Icon.TrashBinSolid /></button
							>
						{/if}
					</div>
					<div style={`background: ${gradient(vecToColors(word.vec, $dark))}`} class="grow h-5" />
				</div>
			{/each}
		</div>
	</Window>

	<Options
		xlCol={4}
		bind:locked
		bind:invalidate
		hide={['asVector', 'norm', 'downloadJSON']}
		show={['asGraph']}
		bind:metric
		loadAmount={Object.keys(presets).length}
		on:add={invalidate(() => addInput({ sendRandom: true }))}
		on:delete={() => (words = [])}
		on:asGraph={() =>
			goto(
				'/hamilton-path?v=' +
					adjacencyMatrix(
						words.map((w) => w.vec),
						metric
					)
						.map((row) => row.map((entry) => entry.toFixed(4)).join('i'))
						.join('o') +
					'&n=' +
					words.map((w) => w.inner).join('_')
			)}
		json={[]}
	>
		<LoadWords
			slot="load"
			bind:invalidate
			on:load={(e) => {
				words = [];
				edges = [];
				e.detail.values.forEach((word, index) => {
					setTimeout(() => {
						sendWebsocket({
							type: 'wordToVec',
							word: word.str.toLowerCase(),
							desc: word.desc
						});
					}, index * 8 + 100);
				});
			}}
		/>
	</Options>

	<PathAlgorithms
		dimensions={100}
		values={adjacencyMatrix(
			words.map((w) => w.vec),
			metric
		)}
		bind:invalidate={invalidateAlgorithms}
		bind:latency
		on:deletePath={invalidate(() => blowUp())}
		matrix
		matrixPath={new Array(words.length).fill(0).map((_, index) => index)}
	/>

	<Window xlCol={8} title="Adjazenzmatrix" scrollable>
		<AdjacencyMatrix
			values={positiveAdjacencyMatrix(
				words.toSorted((w1, w2) => w1.index - w2.index).map((w) => w.vec),
				metric
			)}
			vertexNames={words.toSorted((w1, w2) => w1.index - w2.index).map((w) => w.inner)}
			highlightEdges={edges
				.map(([from, to]) => array2(words[from]?.index, words[to]?.index))
				.filter(([from, to]) => from != null && to != null)}
			collapseNames
			digits={2}
			sort={false}
		/>
	</Window>

	<PathProperties length={words.length} path={words.map((w) => w.vec)} {metric} xlCol={4} />
	<Window title="Ansicht des Graphen (FDGD)" options xlCol={5}>
		<ForceDirectedGraphOptions slot="options" bind:options={fdgOptions} actions={fdgActions} />
		<div class="h-full m-0 min-h-[620px]">
			<ForceDirectedGraph
				bind:redraw
				values={positiveAdjacencyMatrix(
					words.map((w) => w.vec),
					{ norm: 'cosine', invert: false }
				)}
				names={words.map((w) => w.inner)}
				{edges}
				{metric}
				options={fdgOptions}
				animDuration={latency}
				bind:actions={fdgActions}
			/>
		</div>
	</Window>
</div>
