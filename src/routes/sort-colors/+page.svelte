<script lang="ts">
	import { Card, Progressbar, Spinner } from 'flowbite-svelte';
	import ColorPicker from '../../components/ColorPicker.svelte';
	import { RgbColor, type ColorSpace } from '../../color/colorSpaces';
	import { Point3 } from '../../geom/point';
	import { factorial } from '../../utils/math';
	import { flip } from 'svelte/animate';
	import { fly, scale, slide } from 'svelte/transition';
	import * as Icon from 'flowbite-svelte-icons';
	import { onDestroy, type ComponentType } from 'svelte';
	import PointChart from '../../components/PointChart.svelte';
	import { registerCallback, sendWebsocket, unregisterCallback } from '../../server/websocket';
	import { serverOutputPathCreation } from '../../server/types';
	import { tweened } from 'svelte/motion';
	import type { Color } from '../../color/color';
	import { title } from '../../ui/navbar';

	title.set('Farben sortieren');

	let space: ColorSpace = 'oklab';

	let colors = [
		RgbColor.fromNumeric(0xff1e26).color(),
		RgbColor.fromNumeric(0xfe941e).color(),
		RgbColor.fromNumeric(0xffff00).color(),
		RgbColor.fromNumeric(0x06bd00).color(),
		RgbColor.fromNumeric(0x001a98).color(),
		RgbColor.fromNumeric(0x760088).color()
	]; // pride flag

	let selection: {
		index: number;
		colorPickerOpen?: boolean;
		position: { x: number; y: number };
	} | null = null;
	$: colors, (selection = null);
	function selectCard(evt: MouseEvent, index: number) {
		if (!evt.target) return;
		if (selection?.index === index) {
			selection = null;
			return;
		}
		const target = evt.target as HTMLElement;
		const { left: x, bottom: y } = target.getBoundingClientRect();
		selection = {
			index,
			position: { x, y }
		};
	}

	let path: Point3[] | null = null;
	let edges: [Point3, Point3, Color?][] = [];
	let chainLength = tweened(0);
	$: if (path !== null) {
		let lengthAcc = 0;
		for (let i = 0; i < path.length - 1; i++) {
			lengthAcc += path[i].distanceTo(path[i + 1]);
		}
		chainLength.set(lengthAcc);
	}

	const constructionItems: {
		name: string;
		description: string;
		icon: ComponentType;
		index: number;
		expectedTime?: (n: number) => null | number;
		send: (() => void) | null;
	}[] = (
		[
			{
				name: 'Manuell',
				description: 'Manuelle Auswahl der Punkte in einer Reihenfolge',
				method: null,
				expectedTime: () => null,
				icon: Icon.AnnotationOutline
			},
			{
				name: 'Greedy',
				description: 'Greedy-Algorithmus',
				method: 'greedy',
				icon: Icon.DollarOutline
			},
			{
				name: 'Nearest Neighbor',
				description: 'Nächster Nachbar',
				method: 'nearestNeighbor',
				expectedTime: (n: number) => Math.min(n / 2, 5),
				icon: Icon.PhoneOutline
			},
			{
				name: 'Brute Force',
				description: 'Teste alle möglichen Kombinationen',
				method: 'bruteForce',
				expectedTime: (n: number) => factorial(n) / 360,
				icon: Icon.HourglassOutline
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
					action: {
						type: 'createPath',
						method: { type: e.method },
						dimensions: 3,
						values: colors.map((color) => color.space(space).point().values())
					}
				} as const));
		const send = payload && (() => sendWebsocket(payload()));
		return Object.assign({}, e, { index: i, send });
	});
	let selectedConstructionItem: null | number = null;
	let displayConstructionItems = constructionItems;
	$: {
		let find = constructionItems.find((e) => e.index === selectedConstructionItem);
		displayConstructionItems = find === undefined ? constructionItems : [find];
	}
	$: constructionOpen = selectedConstructionItem !== null;

	let progress = { ongoing: false, value: 0 as null | number };

	function addRandomColor() {
		colors = [...colors, new RgbColor(Math.random(), Math.random(), Math.random()).color()];
	}

	function assertColor(n: unknown): Color {
		return n as Color;
	}

	function gradient(colors: Color[]) {
		let str = 'linear-gradient(90deg, ';
		for (let i = 0; i < colors.length; i++) {
			const v = i / colors.length;
			const v2 = (i + 1) / colors.length;
			str += colors[i].rgb().css() + ' ' + v * 100 + '%, ';
			str += colors[i].rgb().css() + ' ' + v2 * 100 + '%, ';
		}
		str = str.substring(0, str.length - 2) + ')';
		return str;
	}

	let ballSize = 0.4;
	let threeDOptions: {
		ballSizeChange: 0 | -1 | 1;
		showOptions: boolean;
		// ballSizeShowControls: boolean,
	} = {
		ballSizeChange: 0,
		showOptions: false
		// ballSizeShowControls: true,
	};

	let callbackId = registerCallback(serverOutputPathCreation, (pc) => {
		path = null;
		if (pc.donePath) {
			progress.ongoing = false;
			path = pc.donePath.map(Point3.fromArray);
			edges = [];
			for (let i = 0; i < pc.donePath.length - 1; i++) {
				edges.push([Point3.fromArray(pc.donePath[i]), Point3.fromArray(pc.donePath[i + 1])]);
			}
			console.log(pc);
			colors = pc.donePath.map(
				(arr) =>
					colors.find((color) => color.space(space).point().equals(Point3.fromArray(arr))) ||
					(() => {
						throw new Error('Invalid: returned invalid color not in list');
					})()
			);
		} else {
			progress.ongoing = true;
			progress.value = pc.progress ?? null;
			edges = pc.currentEdges.map(([from, to]) => [Point3.fromArray(from), Point3.fromArray(to)]);
		}
	});

	onDestroy(() => unregisterCallback(callbackId));
</script>

{#if selection !== null && selection.colorPickerOpen}
	<ColorPicker
		value={colors[selection.index]}
		on:choose={(color) => {
			console.log(color);
			if (selection && selection.index !== null) {
				colors[selection.index] = assertColor(color.detail);
			}
		}}
	/>
{/if}

{#if selection !== null}
	<div
		class="p-2 bg-clip-padding bg-gray-300 backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-700 text-white rounded-lg z-20 flex flex-col"
		transition:scale
		style={`position: fixed; left: ${selection.position.x}px; top: ${selection.position.y}px`}
	>
		{#await colors[selection.index].name()}
			<Spinner />
		{:then meta}
			<div class="text-3xl px-2">{meta.name}</div>
		{/await}
		<div class="flex flew-row mt-4 gap-4">
			<button
				class="text-base p-2 bg-gray-500 rounded-lg"
				on:click={() => {
					if (selection) {
						selection.colorPickerOpen = true;
					}
				}}
			>
				<Icon.PenNibOutline size="xl" />
			</button>
			<button
				class="text-base p-2 bg-gray-500 rounded-lg"
				on:click={() => {
					if (selection) {
						colors = colors.toSpliced(selection.index, 1);
					}
				}}
			>
				<Icon.TrashBinOutline size="xl" />
			</button>
		</div>
	</div>
{/if}

<div class="w-full h-2 hover:h-28 transition-all" style={`background: ${gradient(colors)}`} />
<div class="mx-10">
	<div class="flex flex-row justify-between align-center mt-8">
		<div class="flex flex-row flex-wrap justify-start 2xl:gap-8 gap-2 items-stretch h-16">
			{#each colors as color, index (color)}
				<div animate:flip>
					<button
						class="color-button w-full grow transition-all"
						style={`background-color: ${color.rgb().css()}; ${
							selection?.index === index ? 'transform: scale(1.1); border-color: white' : ''
						}`}
						on:click={(evt) => {
							selectCard(evt, index);
						}}
					>
						<div class="h-16 w-16" />
					</button>
				</div>
			{/each}
		</div>
		<div class="stretch" />
		<div>
			<div
				class="color-button h-16 w-16 bg-white text-6xl flex align-baseline justify-center items-center"
				on:click={addRandomColor}
				role="button"
				tabindex="0"
				on:keypress={addRandomColor}
			>
				+
			</div>
		</div>
	</div>
	<div
		class="mt-8 grid grid-cols-12 gap-8 auto-cols-max align-stretch justify-stretch justify-items-stretch"
	>
		<Card class="rounded-xl col-span-12 xl:col-span-5 max-w-none xl:p-0 mb-0">
			<div
				class="text-2xl xl:text-3xl dark:text-white bg-gray-700 p-4 rounded-t-xl flex flex-row justify-between items-center"
			>
				<div>3D-Darstellung</div>
				<button
					class="bg-gray-600 rounded-xl p-2"
					on:click={() => (threeDOptions.showOptions = !threeDOptions.showOptions)}
					><Icon.CogOutline /></button
				>
			</div>
			{#if threeDOptions.showOptions}
				<div>
					<div
						class="flex flex-row justify-between items-center py-2 text-2xl text-white threedoptions-parent p-2 border-transparent m-0"
						transition:slide={{ axis: 'y' }}
					>
						<div
							class="ball-setting bg-gray-700 rounded-xl p-2 flex flex-row gap-2 overflow-hidden threedoptions-child"
						>
							<button
								class="transition bg-gray-600 rounded-lg px-2 flex flex-row items-center gap-2"
								disabled
							>
								<span><Icon.DribbbleSolid /></span>
								<div class="grid overflow-hidden">
									{#key ballSize}
										<span
											class="row-[1/2] col-[1/2] tabular-nums"
											in:fly={{ y: -100 * threeDOptions.ballSizeChange, duration: 200 }}
											out:fly={{ y: 100 * threeDOptions.ballSizeChange, duration: 200 }}
											>{Math.round(ballSize * 10)}</span
										>
									{/key}
								</div>
							</button>
							<button
								class="transition bg-orange-600 disabled:bg-gray-600 rounded-full p-2"
								disabled={ballSize <= 0.11}
								on:click={() => ((ballSize -= 0.1), (threeDOptions.ballSizeChange = -1))}
							>
								<Icon.MinusSolid />
							</button>
							<button
								class="transition bg-orange-600 disabled:bg-gray-600 rounded-full p-2"
								disabled={ballSize >= 0.69}
								on:click={() => ((ballSize += 0.1), (threeDOptions.ballSizeChange = 1))}
							>
								<Icon.PlusSolid />
							</button>
						</div>
					</div>
				</div>
			{/if}
			<div class="h-full m-0 min-h-[420px]">
				<PointChart
					{colors}
					{edges}
					{ballSize}
					{space}
					on:pick={(evt) => (selection = evt.detail)}
					selectedIndex={selection?.index}
				/>
			</div>
		</Card>
		<Card class="rounded-xl col-span-12 md:col-span-6 lg:col-span-5 xl:col-span-3 max-w-none">
			<p class="text-2xl xl:text-3xl dark:text-white bg-gray-700 p-4 -m-6 rounded-t-xl mb-4">
				Eigenschaften
			</p>
			<div class="text-xl">
				<div class="flex-col">
					<div>Anzahl: {colors.length}</div>
					<div>Kettenlänge: {$chainLength.toFixed(2)}</div>
				</div>
			</div>
		</Card>
		<Card class="rounded-xl col-span-12 md:col-span-6 lg:col-span-7 xl:col-span-4 max-w-none">
			<p class="text-2xl xl:text-3xl dark:text-white bg-gray-700 p-4 -m-6 rounded-t-xl mb-4">
				Konstruktion
			</p>
			<div class="text-xl grow flex flex-col">
				{#each displayConstructionItems as { name, icon, index } (index)}
					<div
						animate:flip={{ duration: 200 }}
						transition:scale
						class="transition"
						on:click={() => (selectedConstructionItem = constructionOpen ? null : index)}
						role="button"
						on:keydown={() => {}}
						tabindex="0"
					>
						<div class="bg-gray-700 p-4 mb-4 rounded-xl border border-gray-600">
							<div class="flex items-center justify-between">
								<Icon.AngleRightSolid
									class="transition"
									style={`transform: rotate(${constructionOpen ? 90 : 0}deg)`}
								/>
								<span class="font-bold text-2xl">
									{name}
								</span>
								<svelte:component this={icon} />
							</div>
						</div>
					</div>
				{/each}
				{#if selectedConstructionItem !== null}
					{@const { description, send, expectedTime } = constructionItems[selectedConstructionItem]}
					<div class="flex flex-col justify-between grow">
						<div>
							<div class="rounded-xl" in:scale={{ delay: 150 }}>{description}</div>
							{#if expectedTime}
								{@const time = expectedTime(colors.length)}
								{#if time === null}
									<div>Erwartete Zeit: beliebig</div>
								{:else if time < 1}
									<div>Erwartete Zeit: <b>&lt;1</b> Sekunde</div>
								{:else}
									<div>Erwartete Zeit: <b>{expectedTime(colors.length)}</b> Sekunden</div>
								{/if}
							{/if}
						</div>
						{#if send}
							{#if !progress.ongoing}
								<button on:click={send} class="rounded-xl text-white bg-primary-800 p-4"
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
		</Card>
	</div>
</div>

<style>
	.border-transparent {
		border: 1px solid transparent;
	}
	.color-button {
		border-radius: 10px;
		border: 3px solid rgba(0, 0, 0, 0.3);
	}
</style>
