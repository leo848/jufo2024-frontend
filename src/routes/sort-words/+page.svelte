<script lang="ts">
	import {Spinner} from "flowbite-svelte";
import Window from "../../components/Window.svelte";
	import {title} from "../../ui/navbar";
	import * as Icon from "flowbite-svelte-icons";
	import {registerCallback, sendWebsocket} from "../../server/websocket";
	import {serverOutputWordToVec} from "../../server/types";
	import AdjacencyMatrix from "../../components/AdjacencyMatrix.svelte";
	import {adjacencyMatrix} from "../../graph/adjacency";

	title.set("Wörter sortieren");

	type Word = {
		inner: string,
		vec: number[],
		error ?: string,
	}

	let words: Word[] = [];
	let input: string = "";
	let inputLoading = false;
	let inputError: null|string = null;
	$: input, inputError = null;
	let inputElement: HTMLInputElement;

	async function addInput() {
		if (input.length === 0 || inputLoading) {
			inputElement.focus();
			return;
		}

		inputLoading = true;

		const word = input.toLowerCase();

		sendWebsocket({
			type: "wordToVec",
			word,
		});
	}

	registerCallback(serverOutputWordToVec, (evt) => {
		inputLoading = false;

		if (evt.result.type === "unsupported") return;

		const word = evt.word;

		if (evt.result.type === "unknownWord") {
			inputError = `Unbekanntes Wort: ${word}`;
			return;
		}

		input = "";
		words = [...words, ({ inner: word, vec: evt.result.vec }) ];
	})
</script>

<div class="grid grid-cols-12 gap-8 mt-8 mx-10">
	<Window xlCol={4} title="Wörter">
		<div class="grid m-4 gap-2 overflow-auto">
			<form on:submit|preventDefault={addInput}>
			<div class="flex flex-row gap-4 mb-4">
					<input class="bg-gray-600 text-xl p-2 rounded text-white grow" bind:value={input} bind:this={inputElement} />
					<button class={ `bg-gray-600 hover:bg-gray-500 text-white p-4 rounded-full` } on:click={addInput} disabled={inputLoading}>
							<Icon.PlusSolid />
					</button>
			</div>
			{#if inputError}
				<div>{inputError}</div>
			{/if}
				</form>
			{#each words as word, index}
				<div class="p-2 rounded text-xl text-white bg-gray-700"><span class="text-gray-400">{index+1}.</span> {word.inner}</div>
			{/each}
		</div>
	</Window>

	<Window xlCol={8} title="Adjazenzmatrix">
		<AdjacencyMatrix values={adjacencyMatrix(words.map(w => w.vec))} vertexNames={words.map(w => w.inner)} />
	</Window>
</div>
