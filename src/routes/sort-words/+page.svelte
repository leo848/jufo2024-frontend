<script lang="ts">
	import Window from '../../components/Window.svelte';
	import { title } from '../../ui/navbar';
	import * as Icon from 'flowbite-svelte-icons';
	import { registerCallback, sendWebsocket, unregisterCallback } from '../../server/websocket';
	import {
		serverOutputPathCreation,
		serverOutputPathImprovement,
		serverOutputWordToVec
	} from '../../server/types';
	import AdjacencyMatrix from '../../components/AdjacencyMatrix.svelte';
	import { adjacencyMatrix } from '../../graph/adjacency';
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
	import { fromUrlString, toUrlString } from './url';

	title.set('Wörter sortieren');

	type Word = {
		inner: string;
		vec: number[];
		index: number;
		error?: string;
	};

	let words: Word[] = [];
	let locked = false;
	let invalidate: (c: (arg0: any) => void) => (arg0: any) => void;

	let input: string = '';
	let inputLoading = false;
	let inputError: null | { type: 'unknown' | 'present' | 'unsupported'; word: string } = null;
	let unknownWords = new Set<string>();
	let knownWords = new Set<string>();
	$: input, (inputError = null);
	let inputElement: HTMLInputElement;

	let invalidateAlgorithms: () => void;

	let queryString = $page.url.searchParams.get('v');
	onMount(() => {
		if (queryString == null) return;
		let newData = fromUrlString(queryString);
		if (newData == null || newData.every(w => w.length === 0)) return;
		newData.forEach((string, idx) => {
			setTimeout(() => {
				sendWebsocket({
					type: 'wordToVec',
					word: string
				});
			}, idx * 10 + 100);
		})
	});

	$: {
		$page.url.searchParams.set('v', toUrlString(words.map(w => w.inner)));
		goto(`?${$page.url.searchParams.toString()}`, {
			keepFocus: true,
			replaceState: true,
			noScroll: true
		});
	}

	async function addInput() {
		if (input.length === 0 || inputLoading) {
			if (inputElement === document.activeElement) {
			} else {
				inputElement.focus();
				return;
			}
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

	function vecToColors(vec: number[]): Color[] {
		return vec
			.map((number) => {
				if (number > 0)
					return new RgbColor(0, 255, 0)
						.color()
						.space('hsv')
						.with('v', number * 3);
				else
					return new RgbColor(255, 0, 0)
						.color()
						.space('hsv')
						.with('v', -number * 3);
			})
			.map((hsl) => hsl.color());
	}

	function removeWord(trueIndex: number) {
		const word = words[trueIndex];
		words = words.toSpliced(trueIndex, 1);
		for (const word of words) {
			if (word.index > trueIndex) word.index--;
		}
		knownWords.delete(word.inner);
	}

	const callbacks = new Array(3);
	callbacks[0] = registerCallback(serverOutputWordToVec, (evt) => {
		inputLoading = false;

		const word = evt.word;

		if (evt.result.type === 'unsupported') {
			inputError = { type : "unsupported", word }
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
			{ inner: word, index: (words[words.length - 1]?.index ?? -1) + 1, vec: evt.result.vec }
		];
	});
	callbacks[1] = registerCallback(serverOutputPathCreation, (pc) => {
		console.log(pc);
		if (pc.donePath) {
			let newWords = [];
			for (const index of pc.donePath) {
				newWords.push(words[index]);
			}
			words = newWords;
		}
		locked = true;
	});
	callbacks[2] = registerCallback(serverOutputPathImprovement, (pi) => {
		console.log(pi);
		if (pi.done) {
			let newWords = [];
			for (const index of pi.currentPath) {
				newWords.push(words[index]);
			}
			words = newWords;
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
						class="bg-gray-600 text-xl p-2 rounded text-white grow"
						placeholder="Gib ein deutsches Wort ein..."
						bind:value={input}
						bind:this={inputElement}
						disabled={inputError && inputError.type === "unsupported"}
					/>
					<button
						class={`bg-gray-600 hover:bg-gray-500 text-white p-4 rounded-full`}
						on:click={invalidate(addInput)}
						disabled={inputLoading}
					>
						<Icon.PlusSolid />
					</button>
				</div>
				{#if inputError}
					{#if inputError.type === 'unsupported'}
						<div>Worteinbettung von Server nicht unterstützt<br>
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
					<div class="p-2 rounded text-xl text-white bg-gray-700 flex flex-row">
						<span class="text-gray-400">{word.index + 1}.&nbsp;</span>
						{word.inner}
						<div class="grow" />
						<button
							class="text-gray-400 hover:text-white transition-all"
							on:click={invalidate(() => removeWord(trueIndex))}><Icon.TrashBinSolid /></button
						>
					</div>
					<div style={`background: ${gradient(vecToColors(word.vec))}`} class="grow h-5" />
				</div>
			{/each}
		</div>
	</Window>

	<Options
		xlCol={4}
		bind:locked
		bind:invalidate
		hide={['norm']}
		on:add={invalidate(addInput)}
		on:delete={() => (words = [])}
	/>

	<PathAlgorithms
		dimensions={100}
		values={adjacencyMatrix(words.map((w) => w.vec))}
		bind:invalidate={invalidateAlgorithms}
		matrix
	/>

	<Window xlCol={8} title="Adjazenzmatrix" scrollable>
		<AdjacencyMatrix
			values={adjacencyMatrix(
				words.toSorted((w1, w2) => w1.index - w2.index).map((w) => w.vec),
				'cosine'
			)}
			vertexNames={words.toSorted((w1, w2) => w1.index - w2.index).map((w) => w.inner)}
			collapseNames
			digits={2}
			sort={false}
		/>
	</Window>

	<PathProperties length={words.length} path={words.map((w) => w.vec)} norm="cosine" xlCol={4} />
</div>
