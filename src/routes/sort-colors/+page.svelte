<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import ColorPicker from '../../components/ColorPicker.svelte';
	import { RgbColor, type ColorSpace } from '../../geom/colorSpaces';
	import { Point3 } from '../../geom/point';
	import { flip } from 'svelte/animate';
	import { fly, scale, slide } from 'svelte/transition';
	import * as Icon from 'flowbite-svelte-icons';
	import { onDestroy, type ComponentType } from 'svelte';
	import PointChart from '../../components/PointChart.svelte';
	import { registerCallback, sendWebsocket, unregisterCallback } from '../../server/websocket';
	import {serverOutputPathCreation} from '../../server/types';

	let space: ColorSpace = 'rgb';

	let colors = [
		RgbColor.fromNumeric(0xff1e26).color(),
		RgbColor.fromNumeric(0xfe941e).color(),
		RgbColor.fromNumeric(0xffff00).color(),
		RgbColor.fromNumeric(0x06bd00).color(),
		RgbColor.fromNumeric(0x001a98).color(),
		RgbColor.fromNumeric(0x760088).color()
	]; // pride flag

	let path: Point3[] = [];

	const constructionItems: {
		name: string;
		description: string;
		icon: ComponentType;
		index: number;
		expectedTime?: (n: number) => null | number,
		send: (() => void) | null;
	}[] = (
		[
			{
				name: 'Manuell',
				description: 'Manuelle Auswahl der Punkte in einer Reihenfolge',
				method: null,
				expectedTime: () => null,
				icon: Icon.AnnotationOutline,
			},
			{
				name: 'Greedy',
				description: 'Greedy-Algorithmus',
				method: null,
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
				method: null,
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
			(() => ({
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

	function addRandomColor() {
		colors = [...colors, new RgbColor(Math.random(), Math.random(), Math.random()).color()];
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

	let callbackId = registerCallback(serverOutputPathCreation, pc => {
	console.log(pc);
		path = pc.currentPath.map(vec => new Point3(vec[0], vec[1], vec[2]));
	})

	onDestroy(() => unregisterCallback(callbackId));
</script>

<div class="mx-10">
	<p class="text-3xl xl:text-5xl dark:text-white mb-4">Farben sortieren</p>
	<div class="flex flex-row justify-between align-center">
		<div class="flex flex-row flex-wrap justify-start gap-8 items-stretch h-16">
			{#each colors as color, index}
				<ColorPicker bind:value={colors[index]}>
					<div slot="open-button">
						<div class="color-button w-full grow" style={'background-color:' + color.rgb().css()}>
							<div class="h-16 w-16" />
						</div>
					</div>
				</ColorPicker>
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
				<PointChart {colors} {path} {ballSize} {space} />
			</div>
		</Card>
		<Card class="rounded-xl col-span-12 md:col-span-6 lg:col-span-5 xl:col-span-3 max-w-none">
			<p class="text-2xl xl:text-3xl dark:text-white bg-gray-700 p-4 -m-6 rounded-t-xl mb-4">
				Eigenschaften
			</p>
			<div class="text-xl">
				<div class="flex-col">
					<div>Anzahl: {colors.length}</div>
					<div>Weglänge: undefined</div>
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
								{#if expectedTime(colors.length) === null}
									<div>Erwartete Zeit: beliebig</div>
								{:else}
									<div>Erwartete Zeit: <b>{expectedTime(colors.length)}</b> Sekunden</div>
								{/if}
							{/if}
						</div>
						{#if send}
							<button on:click={send} class="rounded-xl text-white bg-primary-800 p-4"
								>Ausführen</button
							>
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
