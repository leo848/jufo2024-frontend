<script lang="ts">
	import BarChart from './BarChart.svelte';
	import { registerCallback, sendWebsocket, unregisterCallback } from '../../server/websocket';
	import {
		type ServerInput,
		type Highlight,
		serverOutputSortedNumbers,
		assertNever
	} from '../../server/types';

	import { GradientButton, Progressbar } from 'flowbite-svelte';

	import { onDestroy } from 'svelte';
	import { flip } from 'svelte/animate';
	import * as Icon from 'flowbite-svelte-icons';
	import { title } from '../../ui/navbar';
	import { scale, slide } from 'svelte/transition';
	import Window from '../../components/Window.svelte';
	import Options from '../../components/Options.svelte';
	import { goto } from '$app/navigation';
	import { formatTimespan } from '../../utils/time';
	import { defaultPool } from '../../server/optionsPool';

	title.set('Zahlen sortieren');

	let _id = 0;
	function genId() {
		return _id++;
	}

	let numbers: { value: number; id: number; highlight?: Highlight }[] = [];

	let latencySlider = 3;
	$: latency = [0, 100, 250, 500, 1000, 2000][latencySlider];

	const algorithms = [
		{
			key: 'bubble',
			name: 'Bubble Sort',
			desc: 'Beim Bubble-Sort-Verfahren handelt es sich um einen simplen Sortieralgorithmus, der asymptotisch eine quadratische Laufzeit benötigt.',
			expectedTime: (n: number) => ((latency * n * n) / 2 / 1000) * 1.5
		},
		{
			key: 'selection',
			name: 'Selection Sort',
			desc: 'Beim Selection Sort wird wiederholt das minimale Element ausgewählt und so einsortiert, dass ein Teil der Liste sortiert bleibt.',
			expectedTime: (n: number) => ((latency * n * n) / 2 / 1000) * 1.5
		},
		{
			key: 'insertion',
			name: 'Insertion Sort',
			desc: 'Beim Insertion Sort wird jeweils das nächste Element so lange in die links sortierte Teilliste eingefügt, bis diese sortiert ist.',
			expectedTime: (n: number) => ((latency * n * n) / 4 / 1000) * 1.5
		},
		{
			key: 'quick',
			name: 'Quick Sort',
			desc: 'Die Liste wird in zwei Teillisten nach Vergleich zu einem Pivotelement partitioniert, und der Algorithmus auf diesen Teillisten wiederholt.',
			expectedTime: (n: number) => (latency * n * Math.log2(n)) / 1000
		},
		{
			key: 'merge',
			name: 'Merge Sort',
			desc: 'Zwei Teillisten werden mittels Merge Sort sortiert und dann in linearer Zeit zusammengefügt.',
			expectedTime: (n: number) => (latency * n * Math.log2(n)) / 1000
		}
	] as const;
	let selectedAlgorithm: (ServerInput & {
		type: 'action';
		action: { type: 'sortNumbers' };
	})['action']['algorithm'] = algorithms[0].key;
	let expectedTime: [string, string];
	$: latency,
		(expectedTime = formatTimespan(
			algorithms.find((c) => c.key === selectedAlgorithm)?.expectedTime(numbers.length) ?? 0
		));

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
			if (numbers.length > 20) {
				funnyNumber = Math.floor(rand * 1000);
			} else {
				let idx = Math.floor(rand * funnyNumbers.length);
				funnyNumber = funnyNumbers[idx];
			}
		} while (numbers.some((v) => v.value === funnyNumber));
	}

	let value: null | string = null;
	let error: 'range' | 'duplicate' | null = null;
	let flexWrap = true;

	let numberInput: HTMLInputElement;
	function addNumber() {
		let num = !value ? funnyNumber : Number(value);
		value = null;
		error = null;
		if (num > 9999 || num < -9999 || isNaN(num)) {
			error = 'range';
			return;
		} else if (numbers.find((obj) => obj.value == num) !== undefined) {
			error = 'duplicate';
			return;
		}
		numbers = [{ value: num, id: genId() }, ...numbers];
		numberInput.focus();
	}

	function serverSend(numbers: number[]) {
		sendWebsocket({
			type: 'action',
			latency,
			action: {
				type: 'sortNumbers',
				algorithm: selectedAlgorithm,
				numbers
			},
			pool: defaultPool()
		});
	}

	function shuffleNumbers() {
		let currentIndex = numbers.length;
		while (currentIndex > 0) {
			let randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			[numbers[currentIndex], numbers[randomIndex]] = [numbers[randomIndex], numbers[currentIndex]];
		}
	}

	function colorClass(highlight: Highlight | undefined): string {
		if (highlight === undefined) {
			return 'dark:bg-[#484848] bg-[#cecece]';
		} else if (highlight == 'compare') {
			return 'dark:bg-[#5f4f30] bg-[#efcfa0]';
		} else if (highlight === 'swap') {
			return 'dark:bg-[#3e305f] bg-[#aea0cf]';
		} else if (highlight === 'correct') {
			return 'dark:bg-[#355f30] bg-[#a5efa0]';
		} else if (highlight === 'consider') {
			return 'dark:bg-[#6a6a6a] bg-[#bababa]';
		} else if (highlight === 'smaller') {
			return 'dark:bg-[#456484] bg-[#a5c4f4]';
		} else if (highlight === 'larger') {
			return 'dark:bg-[#223141] bg-[#92a1b1]';
		} else if (highlight === 'pivot') {
			return 'dark:bg-[#1c4773] bg-[#4c97b3]';
		} else {
			return assertNever(highlight);
		}
	}

	let progress = {
		ongoing: false,
		value: 0,
		start: new Date(),
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

	let callbackId = registerCallback(serverOutputSortedNumbers, (so) => {
		numbers = so.numbers.map((value, index) => ({
			value,
			id: index,
			highlight: (so.highlight.find(([i]) => i === index) ?? [])[1]
		}));
		if (so.progress) {
			progress.value = so.progress;
		}
		progress.ongoing = !so.done;
	});

	onDestroy(() => unregisterCallback(callbackId));
</script>

<div class="md:mx-10 mx-4 mt-4 grid grid-cols-12 gap-4">
	<Window title="Zahlen" xlCol={7}>
		{#if error}
			<div
				class="mx-0 dark:bg-gray-500 bg-gray-100 p-2 dark:text-white text-black flex flex-row justify-between"
				transition:slide={{ axis: 'y' }}
			>
				{#if error == 'range'}
					<div>Gib bitte eine Zahl zwischen -9999 und 9999 ein.</div>
				{:else if error == 'duplicate'}
					<div>Bereits eingegeben.</div>
				{/if}
				<button
					class="dark:text-gray-400 hover:text-white transition-all"
					on:click={() => (error = null)}><Icon.CloseCircleSolid /></button
				>
			</div>
		{/if}
		<div class={`ml-2 flex flex-row overflow-scroll my-2 ${flexWrap ? 'flex-wrap' : ''}`}>
			{#if !progress.ongoing}
				<button class="md:p-6 p-2 my-2 mx-2 dark:bg-gray-700 bg-gray-200 rounded-xl">
					<form on:submit|preventDefault={addNumber}>
						<input
							bind:value
							bind:this={numberInput}
							placeholder={String(funnyNumber)}
							class="md:w-20 w-8 px-0 mb-2 md:text-xl lg:text-3xl font-light mx-auto tracking-tight dark:text-white dark:bg-gray-700 bg-gray-200 focus:outline-0"
						/>
					</form>
				</button>
			{/if}
			{#each numbers as number, index (number.value)}
				<div
					animate:flip={{
						duration: Math.min(latency, 200),
						delay: (progress.ongoing ? 0 : 1) * index * 10
					}}
					transition:scale
				>
					<button
						disabled={progress.ongoing}
						on:click={() => {
							numbers.splice(index, 1);
							numbers = numbers;
						}}
						class={colorClass(number.highlight) + ' md:p-6 p-2 m-2 rounded-xl'}
					>
						<h5
							class="px-0 mb-2 md:text-xl lg:text-3xl font-light mx-auto tracking-tight dark:text-white"
						>
							{number.value}
						</h5>
					</button>
				</div>
			{/each}
		</div>
	</Window>
	<Options
		on:add={() => numberInput.focus()}
		on:delete={() => (numbers = [])}
		on:asVectors={() => goto('/sort-vectors?v=' + numbers.map((n) => n.value).join('o'))}
		json={numbers.map((n) => ({
			name: n.value.toString(),
			data: {
				Zahlwert: n.value
			}
		}))}
		hide={['norm', 'lock', 'load']}
		metric={{ norm: 'manhattan', invert: false }}
		xlCol={5}
		locked={false}
	/>
	<Window title="Balkendiagramm" row={2}>
		<div>
			<BarChart content={numbers} />
		</div>
	</Window>
	<Window title="Algorithmen" row={1}>
		<div class="flex flex-row overflow-scroll gap-4 m-4">
			{#each algorithms as { key, name, desc }}
				<button
					class={` p-2 dark:bg-gray-${selectedAlgorithm === key ? 600 : 700} bg-gray-${
						selectedAlgorithm === key ? 200 : 100
					} flex flex-col justify-between rounded-xl transition-all md:min-w-64 min-w-32`}
					disabled={progress.ongoing}
					on:click={() => (selectedAlgorithm = key)}
				>
					<h2 class="text-xl md:text-2xl font-bold dark:text-white">{name}</h2>
					<div class="dark:text-gray-400 text-gray-600 max-sm:text-xs">{desc}</div>
				</button>
			{/each}
		</div>
	</Window>
	<Window title="Aktionen">
		<div class="h-full m-4 grow">
			<GradientButton
				class="mt-2 mb-4 mx-4 text-xl"
				disabled={progress.ongoing}
				on:click={() => {
					progress.start = new Date();
					serverSend(numbers.map((e) => e.value));
				}}
				color="teal"
			>
				<Icon.ArrowSortLettersOutline class="mr-2" size="xl" />
				Sortieren
				<Icon.CloudArrowUpOutline class="ml-2" />
			</GradientButton>
			<GradientButton
				class="mt-2 text-xl"
				disabled={progress.ongoing}
				on:click={shuffleNumbers}
				color="cyan"
			>
				<Icon.ShuffleSolid class="mr-2" size="xl" />
				Mischen</GradientButton
			>
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
				max={5}
				class="w-full bg-transparent text-white grayscale"
			/>
			{#if !progress.ongoing}
				<div class="mt-2">
					Erwartete Zeit: <b>{expectedTime[0]}</b>
					{expectedTime[1]}
				</div>
			{:else}
				{@const eta = progress.eta()}
				<div class="mt-2">
					{#if eta !== null}
						{@const [amount, suffix] = formatTimespan(eta / 1000)}
						<div>
							{#if eta > 2000}ca. {/if}<b>{amount}</b>
							{suffix} verbleibend
						</div>
					{/if}
					{#if progress.value}
						<Progressbar progress={progress.value * 100} />
					{/if}
				</div>
			{/if}
		</div>
	</Window>
</div>
