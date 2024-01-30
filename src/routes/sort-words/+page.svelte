<script lang="ts">
	import Window from '../../components/Window.svelte';
	import { title } from '../../ui/navbar';
	import * as Icon from 'flowbite-svelte-icons';
	import { registerCallback, sendWebsocket } from '../../server/websocket';
	import { serverOutputDistPathCreation, serverOutputWordToVec } from '../../server/types';
	import AdjacencyMatrix from '../../components/AdjacencyMatrix.svelte';
	import { adjacencyMatrix } from '../../graph/adjacency';
	import { flip } from 'svelte/animate';
	import { gradient } from '../../ui/color';
	import { RgbColor } from '../../color/colorSpaces';
	import type { Color } from '../../color/color';
	import Options from '../../components/Options.svelte';
	import PathAlgorithms from '../../components/PathAlgorithms.svelte';

	title.set('Wörter sortieren');

	type Word = {
		inner: string;
		vec: number[];
		index: number;
		error?: string;
	};

	let words: Word[] = [];
	let locked = false;
	let invalidate: <I>(c:(arg0:I)=>void)=>(arg0:I)=>void;

	let input: string = '';
	let inputLoading = false;
	let inputUnknownWord: null | string = null;
	let unknownWords = new Set<string>();
	$: input, (inputUnknownWord = null);
	let inputElement: HTMLInputElement;

	async function addInput() {
		if (input.length === 0 || inputLoading) {
			inputElement.focus();
			return;
		}

		const word = input.toLowerCase();

		if (unknownWords.has(word)) {
			setTimeout(() => (inputUnknownWord = word));
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

	function removeWord(index: number) {
		(words = words.toSpliced(index, 1));
		for (const word of words) {
			if (word.index > index) word.index--;
		}
	}

	const callbacks = new Array(3);
	callbacks[0] = registerCallback(serverOutputWordToVec, (evt) => {
		inputLoading = false;

		if (evt.result.type === 'unsupported') return;

		const word = evt.word;

		if (evt.result.type === 'unknownWord') {
			input = word;
			unknownWords.add(word);
			setTimeout(() => (inputUnknownWord = word));
			return;
		}

		words = [...words, { inner: word, index: (words[words.length-1]?.index ?? -1) + 1, vec: evt.result.vec }];
	});
	callbacks[1] = registerCallback(serverOutputDistPathCreation, pc => {
		console.log(pc);
	})
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
					/>
					<button
						class={`bg-gray-600 hover:bg-gray-500 text-white p-4 rounded-full`}
						on:click={invalidate(addInput)}
						disabled={inputLoading}
					>
						<Icon.PlusSolid />
					</button>
				</div>
				{#if inputUnknownWord}
					<div>Unbekanntes Wort: <b>{inputUnknownWord}</b></div>
				{/if}
			</form>
			{#each words as word (word.inner)}
				<div animate:flip>
					<div class="p-2 rounded text-xl text-white bg-gray-700 flex flex-row">
						<span class="text-gray-400">{word.index + 1}.&nbsp;</span>
						{word.inner}
						<div class="grow" />
						<button
							class="text-gray-400 hover:text-white transition-all"
							on:click={() => removeWord(word.index)}><Icon.TrashBinSolid /></button
						>
					</div>
					<div style={`background: ${gradient(vecToColors(word.vec))}`} class="grow h-5" />
				</div>
			{/each}
		</div>
	</Window>

	<Options xlCol={4} bind:locked bind:invalidate hide={["norm"]} on:add={invalidate(addInput)} on:delete={() => words = []} />

	<PathAlgorithms dimensions={100} points={words.map(w => w.vec)} />

	<Window xlCol={8} title="Adjazenzmatrix" scrollable>
		<AdjacencyMatrix
			values={adjacencyMatrix(
				words.map((w) => w.vec),
				'cosine'
			)}
			vertexNames={words.map((w) => w.inner)}
	  collapseNames
			digits={2}
			sort={false}
		/>
	</Window>
</div>
