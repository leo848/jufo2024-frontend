<script lang="ts">
	import { Card, Spinner } from 'flowbite-svelte';
	import ColorPicker from '../../components/ColorPicker.svelte';
	import { RgbColor, type ColorSpace } from '../../color/colorSpaces';
	import { Point3 } from '../../geom/point';
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	import * as Icon from 'flowbite-svelte-icons';
	import { onDestroy } from 'svelte';
	import PointChart from '../../components/PointChart.svelte';
	import { registerCallback, unregisterCallback } from '../../server/websocket';
	import { serverOutputPathCreation, serverOutputPathImprovement } from '../../server/types';
	import { tweened } from 'svelte/motion';
	import type { Color } from '../../color/color';
	import { title } from '../../ui/navbar';
	import { gradient } from '../../ui/color';
	import PointChartOptions from '../../components/PointChartOptions.svelte';
	import PathAlgorithms from '../../components/PathAlgorithms.svelte';
	import ColorAddPopover from '../../components/ColorAddPopover.svelte';
	import ColorsLock from '../../components/ColorsLock.svelte';

	title.set('Farben sortieren');

	let space: ColorSpace = 'rgb';

	let colors = [
		RgbColor.fromNumeric(0xff1e26).color(),
		RgbColor.fromNumeric(0xfe941e).color(),
		RgbColor.fromNumeric(0xffff00).color(),
		RgbColor.fromNumeric(0x06bd00).color(),
		RgbColor.fromNumeric(0x001a98).color(),
		RgbColor.fromNumeric(0x760088).color()
	]; // pride flag
	let colorsLocked = false;
	let invalidate: (callback: () => void) => () => void;

	let selection: {
		index: number;
		appendIndex?: number | null;
		color?: Color;
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
			appendIndex: null,
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
	} else {
		chainLength.set(0);
	}

	let invalidateAlgorithms: () => void;
	function blowUp() {
		path = null;
		edges = [];
		invalidateAlgorithms();
	}

	function assertColor(n: unknown): Color {
		return n as Color;
	}

	function addColor() {
		selection = {
			index: colors.length - 1,
			color: new RgbColor(Math.random(), Math.random(), Math.random()).color(),
			appendIndex: colors.length,
			position: { x: -1000, y: -1000 },
			colorPickerOpen: true
		};
	}

	let ballSize = 0.4;
	let projection: 'perspective' | 'orthographic' = 'perspective';
	let threeDOptions: {
		ballSizeChange: 0 | -1 | 1;
		showOptions: boolean;
		// ballSizeShowControls: boolean,
	} = {
		ballSizeChange: 0,
		showOptions: false
		// ballSizeShowControls: true,
	};

	function pathToEdges(path: number[][]): [Point3, Point3][] {
		let edges = [];
		for (let i = 0; i < path.length - 1; i++) {
			edges.push([Point3.fromArray(path[i]), Point3.fromArray(path[i + 1])] as [Point3, Point3]);
		}
		return edges;
	}

	function setColorsFromPath(path: number[][]) {
		colorsLocked = true;
		colors = path.map(
			(arr) =>
				colors.find((color) => color.space(space).point().equals(Point3.fromArray(arr))) ||
				(() => {
					throw new Error('Invalid: returned invalid color not in list');
				})()
		);
	}

	let callbackIdCreation = registerCallback(serverOutputPathCreation, (pc) => {
		path = null;
		colorsLocked = true;
		if (pc.donePath) {
			path = pc.donePath.map(Point3.fromArray);
			edges = pathToEdges(pc.donePath);
			setColorsFromPath(pc.donePath);
		} else {
			edges = pc.currentEdges.map(([from, to]) => [Point3.fromArray(from), Point3.fromArray(to)]);
		}
	});
	onDestroy(() => unregisterCallback(callbackIdCreation));

	let callbackIdImprovement = registerCallback(serverOutputPathImprovement, (pi) => {
		console.log(pi);
		edges = pathToEdges(pi.currentPath);
		if (pi.done) {
			path = pi.currentPath.map(Point3.fromArray);
			setColorsFromPath(pi.currentPath);
		}
	});
	onDestroy(() => unregisterCallback(callbackIdImprovement));
</script>

{#if selection !== null && selection.colorPickerOpen && colors.length > selection.index}
	<ColorPicker
		valid={(color) => !colors.some((storedColor) => storedColor.approxEquals(color))}
		defaultSpace={space}
		value={selection.color ?? colors[selection.index]}
		on:choose={(color) => {
			if (selection) {
				if (selection.appendIndex != null) {
					colors = colors.toSpliced(selection.appendIndex + 1, 0, color.detail);
				} else if (selection.index != null && selection.index in colors) {
					colors[selection.index] = assertColor(color.detail);
				}
			}
			selection = null;
		}}
		on:cancel={() => (selection = null)}
	/>
{/if}

{#if selection !== null && colors.length > selection.index && selection.index !== -1}
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
		<div class="flex flew-row mt-4 gap-2">
			<button
				class="text-base p-2 bg-gray-500 hover:bg-gray-400 transition-all rounded-lg"
				on:click={invalidate(() => {
					if (selection) {
						selection.colorPickerOpen = true;
					}
				})}
			>
				<Icon.PenNibOutline size="xl" />
			</button>
			<button
				class="text-base p-2 bg-gray-500 rounded-lg hover:bg-gray-400 transition-all"
				on:click={invalidate(() => {
					if (selection) {
						selection.appendIndex = selection.index;
						selection.colorPickerOpen = true;
					}
				})}
			>
				<Icon.FolderDuplicateOutline size="xl" />
			</button>
			<button
				class="text-base p-2 bg-gray-500 rounded-lg hover:bg-gray-400 transition-all"
				on:click={invalidate(() => {
					if (selection && colors.length > selection.index) {
						colors = colors.toSpliced(selection.index, 1);
					}
				})}
			>
				<Icon.TrashBinOutline size="xl" />
			</button>
		</div>
	</div>
{/if}

<div class="w-full h-2 hover:h-28 transition-all" style={`background: ${gradient(colors)}`} />
<div class="mx-10">
	<div class="flex flex-row justify-between align-center mt-8 gap-4">
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
		<div class="grow" />
		<div class="flex flex-row gap-4">
			<ColorsLock on:blowUp={blowUp} bind:invalidate bind:locked={colorsLocked} />
			<button
				class="color-button h-16 w-16 bg-gray-600 hover:bg-gray-500 transition-all text-6xl flex align-baseline justify-center items-center"
				on:click={invalidate(addColor)}
			>
				<Icon.PlusSolid size="xl" color="white" />
			</button>
			<button
				id="tooltip-color-edit"
				class="color-button h-16 w-16 bg-gray-600 hover:bg-gray-500 transition-all flex align-baseline justify-center items-center"
			>
				<Icon.DotsHorizontalOutline size="xl" color="white" />
			</button>
			<ColorAddPopover {invalidate} bind:colors triggeredBy="#tooltip-color-edit" />
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
				<PointChartOptions bind:options={threeDOptions} bind:projection bind:ballSize />
			{/if}
			<div class="h-full m-0 min-h-[420px]">
				<PointChart
					{colors}
					{edges}
					{ballSize}
					{projection}
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

		<PathAlgorithms
			on:deletePath={() => (path = null)}
			bind:invalidate={invalidateAlgorithms}
			points={colors.map((color) => color.space(space).point().values())}
		/>
	</div>
</div>

<style>
	.color-button {
		border-radius: 10px;
		border: 3px solid rgba(0, 0, 0, 0.3);
	}
</style>
