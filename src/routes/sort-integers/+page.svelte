<script lang="ts">
	import Container from '../../components/Container.svelte';
	import BarChart from '../../components/BarChart.svelte';
	import { registerCallback, sendWebsocket, unregisterCallback } from '../../server/websocket';
	import { type ServerInput, serverOutputSortedNumbers } from '../../server/types';

	import {
		Card,
		StepIndicator,
		Gallery,
		Input,
		Label,
		Button,
		Toast,
		GradientButton,
		Tabs,
		TabItem
	} from 'flowbite-svelte';

	import { onDestroy } from 'svelte';
	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import * as Icon from 'flowbite-svelte-icons';

	let _id = 0;
	function genId() {
		return _id++;
	}

	let numbers: { value: number; id: number; highlight?: 'compare' | 'swap' | 'correct' }[] =
		[]; /* [1, 2, 3, 4, 5, 6, 7, 8].map(
		(value) => ({ value, id: genId(), highlight: false })
	); */

	let currentStep = 1;
	let steps = ['Zahlen eingeben', 'Algorithmus auswählen', 'Sortieren'].map(
		(s, i) => `${i + 1}. ${s}`
	);

	const algorithms = [
		{
			key: 'bubbleSort',
			name: 'Bubble Sort',
			desc: 'Beim Bubble-Sort-Verfahren handelt es sich um einen simplen Sortieralgorithmus, der asymptotisch eine quadratische Laufzeit benötigt.',
			img: '/platinumportfolio-bubble.png'
		},
		{
			key: 'selectionSort',
			name: 'Selection Sort',
			desc: 'Beim Selection Sort wird wiederholt das minimale Element ausgewählt und so einsortiert, dass ein Teil der Liste sortiert bleibt.',
			img: '/victoriano-izquierdo-selection.png'
		},
		{
			key: 'insertionSort',
			name: 'Insertion Sort',
			desc: 'Beim Insertion Sort wird jeweils das nächste Element so lange in die links sortierte Teilliste eingefügt, bis diese sortiert ist.',
			img: '/pan-xiaozhen-insert.png'
		}
	] as const;
	let selectedAlgorithm: (ServerInput & {
		type: 'action';
		action: { type: 'sortNumbers' };
	})['action']['algorithm'] = algorithms[0].key;

	let funnyNumber = 0;
	$: {
		let funnyNumbers = [0, 69, 420, 37, 73];
		for (let i = 1; i < 20; i++) {
			funnyNumbers.push(Math.floor(Math.pow(Math.sqrt(2), i)));
		}
		for (let i = 1; i < 10; i++) {
			funnyNumbers.push(111 * i);
		}
		do {
			let rand = (Math.random() + numbers.length / 2) % 1;
			let idx = Math.floor(rand * funnyNumbers.length);
			funnyNumber = funnyNumbers[idx];
		} while (numbers.some((v) => v.value === funnyNumber));
	}

	let value: null | string = null;
	let error = false;

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
				algorithm: selectedAlgorithm,
				numbers
			}
		});
	}

	function shuffleNumbers() {
		for (let i = 0; i < numbers.length; i++) {
			for (let j = i + 1; j < numbers.length; j++) {
				if (Math.random() > 0.5) {
					let temp = numbers[i];
					numbers[i] = numbers[j];
					numbers[j] = temp;
				}
			}
		}
	}

	let redoable = true;

	let callbackId = registerCallback(serverOutputSortedNumbers, (so) => {
		numbers = so.numbers.map((value, index) => ({
			value,
			id: index,
			highlight: (so.highlight.find(([i]) => i === index) ?? [])[1]
		}));
		redoable = so.done;
	});

	onDestroy(() => unregisterCallback(callbackId));
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
					<Icon.TrashBinSolid class="mr-2" />
					Löschen</Button
				>
				<Button
					class="mt-2 text-md"
					color="green"
					on:click={() => currentStep++}
					disabled={numbers.length < 5}
				>
					<Icon.PlaySolid class="mr-2" />
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
						<Icon.PlusSolid class="mr-2" />
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
		<Gallery class="md:grid-cols-2 gap-4 mt-4">
			{#each algorithms as { key, name, desc, img }, index}
				<Card horizontal reverse={(((index + 1) / 2) | 0) % 2 === 1} {img}>
					<h2 class="text-2xl font-bold dark:text-white">{name}</h2>
					<div>{desc}</div>
					<Button
						color="alternative"
						class="w-fit mt-4 transition"
						on:click={() => {
							selectedAlgorithm = key;
							currentStep++;
						}}
						>Auswählen <Icon.ArrowRightSolid class="ml-4" />
					</Button>
				</Card>
			{/each}
		</Gallery>
	{:else if currentStep === 3}
		<GradientButton
			class="mt-2 mb-4 mx-4 text-xl"
			disabled={!redoable}
			on:click={() => serverSend(numbers.map((e) => e.value))}
			color="teal"
		>
			<Icon.ArrowSortLettersOutline class="mr-2" size="xl" />
			Sortieren
			<Icon.CloudArrowUpOutline class="ml-2" />
		</GradientButton>
		<GradientButton class="mt-2 text-xl" on:click={shuffleNumbers} color="cyan">
			<Icon.ShuffleSolid class="mr-2" size="xl" />
			Mischen</GradientButton
		>
		<Tabs
			style="full"
			defaultClass="flex rounded-lg divide-x divide-gray-200 shadow dark:divide-gray-700"
		>
			<TabItem open class="w-full">
				<div class="text-xl" slot="title">Karten</div>
				<Gallery class="gap-4 md:grid-cols-4 grid-cols-2 m-4">
					{#each numbers as { value, highlight } (value)}
						<div animate:flip={{ duration: 200 }}>
							<Card
								class={highlight === 'compare'
									? 'dark:bg-[orange]'
									: highlight === 'swap'
									? 'dark:bg-[violet]'
									: highlight === 'correct'
									? 'dark:bg-[green]'
									: 'dark:bg-gray-700'}
							>
								<h5
									class="px-0 mb-2 text-6xl font-light mx-auto tracking-tight text-gray-900 dark:text-white"
								>
									{value}
								</h5>
							</Card>
						</div>
					{/each}
				</Gallery>
			</TabItem>
			<TabItem class="w-full">
				<div class="text-xl" slot="title">Balkendiagramm</div>
				<div>
					<BarChart content={numbers} />
				</div>
			</TabItem>
		</Tabs>
	{/if}
</Container>
