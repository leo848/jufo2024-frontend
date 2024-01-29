<script lang="ts">
	import {Spinner} from "flowbite-svelte";
import Window from "../../components/Window.svelte";
	import {title} from "../../ui/navbar";
	import * as Icon from "flowbite-svelte-icons";
	import {registerCallback, sendWebsocket} from "../../server/websocket";
	import {serverOutputWordToVec} from "../../server/types";
	import AdjacencyMatrix from "../../components/AdjacencyMatrix.svelte";
	import {adjacencyMatrix} from "../../graph/adjacency";
	import {flip} from "svelte/animate";
	import {gradient} from "../../ui/color";
	import {rangeMap} from "../../utils/math";
	import {HslColor, RgbColor} from "../../color/colorSpaces";
	import type {Color} from "../../color/color";

	title.set("Wörter sortieren");

	type Word = {
		inner: string,
		vec: number[],
		error ?: string,
	}

	let words: Word[] = [];
	let input: string = "";
	let inputLoading = false;
	let inputUnknownWord: null|string = null;
	$: input, inputUnknownWord = null;
	let inputElement: HTMLInputElement;

	async function addInput() {
		if (input.length === 0 || inputLoading) {
			inputElement.focus();
			return;
		}

		inputLoading = true;

		const word = input.toLowerCase();
input = "";

		sendWebsocket({
			type: "wordToVec",
			word,
		});

	}

	function vecToColors(vec: number[]): Color[] {
		return vec.map(number => {
		if (number > 0) return new RgbColor(0, 255, 0).color().space("hsv").with("v", number * 3);
		else return new RgbColor(255, 0, 0).color().space("hsv").with("v", -number * 3);
		}).map(hsl => hsl.color());
	}

	registerCallback(serverOutputWordToVec, (evt) => {
		inputLoading = false;

		if (evt.result.type === "unsupported") return;

		const word = evt.word;

		if (evt.result.type === "unknownWord") {
			input = word;
			setTimeout(() => inputUnknownWord = word);
			return;
		}

		input = "";
		words = [...words, ({ inner: word, vec: evt.result.vec }) ];
	})
</script>

<div class="grid grid-cols-12 gap-8 mt-8 mx-10">
	<Window xlCol={4} row={2} title="Wörter" scrollable>
		<div class="grid m-4 gap-2">
			<form on:submit|preventDefault={addInput}>
			<div class="flex flex-row gap-4 mb-4">
					<input class="bg-gray-600 text-xl p-2 rounded text-white grow" placeholder="Gib ein deutsches Wort ein..." bind:value={input} bind:this={inputElement} />
					<button class={ `bg-gray-600 hover:bg-gray-500 text-white p-4 rounded-full` } on:click={addInput} disabled={inputLoading}>
							<Icon.PlusSolid />
					</button>
			</div>
			{#if inputUnknownWord}
				<div>Unbekanntes Wort: <b>{inputUnknownWord}</b></div>
			{/if}
				</form>
			{#each words as word, index (word.inner)}
				<div>
				<div class="p-2 rounded text-xl text-white bg-gray-700 flex flex-row"><span class="text-gray-400">{index+1}. </span> {word.inner}
				</div>
				<div style={`background: ${gradient(vecToColors(word.vec))}`} class="grow h-5" />
				</div>
			{/each}
		</div>
	</Window>

	<Window xlCol={8} title="Adjazenzmatrix" scrollable>
		<AdjacencyMatrix values={adjacencyMatrix(words.map(w => w.vec), "cosine")} vertexNames={words.map(w => w.inner)} digits={2} />
	</Window>
</div>
