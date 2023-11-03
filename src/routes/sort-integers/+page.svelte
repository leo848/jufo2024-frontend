<script lang="ts">
	import Container from '../../components/Container.svelte';
	import { sendWebsocket } from '../../server/websocket';

	import { Card, StepIndicator, Gallery, Input, Label, Button, Toast } from 'flowbite-svelte';

	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { CloudArrowUpOutline, PlaySolid, PlusSolid, TrashBinSolid } from 'flowbite-svelte-icons';

	let currentStep = 1;
	let steps = ['Zahlen eingeben', 'Algorithmus auswählen', 'Sortieren'].map(
		(s, i) => `${i + 1}. ${s}`
	);

	let numbers: { value: number; id: number }[] = [];

	let funnyNumber = 0;
	$: {
		let funnyNumbers = [0, 69, 420, 37, 73];
		for (let i = 1; i < 20; i++) {
			funnyNumbers.push(Math.floor(Math.pow(Math.sqrt(2), i)));
		}
		for (let i = 1; i < 10; i++) {
			funnyNumbers.push(111 * i);
		}
		let rand = (Math.random() + numbers.length / 2) % 1;
		let idx = Math.floor(rand * funnyNumbers.length);
		funnyNumber = funnyNumbers[idx];
	}

	let value: null | string = null;
	let error = false;

	let _id = 0;
	function genId() {
		return _id++;
	}

	function addNumber() {
		let num = !value ? funnyNumber : Number(value);
		value = null;
		if (num > 999 || num < 0 || isNaN(num)) {
			error = true;
			return;
		}
		numbers = [{ value: num, id: genId() }, ...numbers];
	}

	function serverSend(numbers: number[]) {
		sendWebsocket({
			type: 'action',
			action: {
				type: 'sortNumbers',
				numbers: numbers.map((n) => n.toString())
			}
		});
	}
</script>

<Container>
	<h1 class="text-6xl dark:text-gray-300">Zahlen sortieren</h1>

	<StepIndicator class="mt-4 mb-8" {currentStep} {steps} glow />

	{#if currentStep == 1}
		<Gallery class="gap-4 md:grid-cols-4 grid-cols-2 mx-4 my-4">
			<Card transition={scale} size="lg" class="col-span-1">
				<Button
					class="mt-2 text-md"
					color="red"
					on:click={() => (numbers = [])}
					disabled={numbers.length == 0}
				>
					<TrashBinSolid class="mr-2" />
					Löschen</Button
				>
				<Button
					class="mt-2 text-md"
					color="green"
					on:click={() => currentStep++}
					disabled={numbers.length < 5}
				>
					<PlaySolid class="mr-2" />
					Fortfahren</Button
				>
			</Card>
			<Card transition={scale} size="lg" class="col-span-2">
				<Toast class="mx-0" bind:open={error}>Gib bitte eine Zahl zwischen 0 und 999 ein.</Toast>
				<Gallery class="gap-6 grid-cols-2">
					<div>
						<Label for="num-input">Zahl eingeben</Label>
						<Input id="num-input" class="text-3xl" bind:value placeholder={funnyNumber} />
					</div>
					<Button class="mt-2 text-xl" on:click={addNumber}>
						<PlusSolid class="mr-2" />
						Hinzufügen
					</Button>
				</Gallery>
			</Card>
			{#each numbers as number, index (number.id)}
				<div animate:flip={{ duration: 200, delay: index * 50 }}>
					<Card
						transition={scale}
						on:click={() => {
							numbers.splice(index, 1);
							numbers = numbers;
						}}
					>
						<h5
							class="px-0 mb-2 text-8xl font-light mx-auto tracking-tight text-gray-900 dark:text-white"
						>
							{number.value}
						</h5>
					</Card>
				</div>
			{/each}
		</Gallery>
	{:else if currentStep === 2}
		<Card transition={scale} size="lg" class="col-span-1">
			<Button
				class="mt-2 text-xl"
				on:click={() => serverSend(numbers.map((e) => e.value))}
				disabled={numbers.length == 0}
			>
				<CloudArrowUpOutline class="mr-2" />
				An Server senden</Button
			>
		</Card>
	{/if}
</Container>
