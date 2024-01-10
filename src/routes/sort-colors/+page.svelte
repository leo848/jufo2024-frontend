<script lang="ts">
	import { Spinner } from 'flowbite-svelte';
	import ColorPicker from './ColorPicker.svelte';
	import { RgbColor, type ColorSpace } from '../../color/colorSpaces';
	import { Point3 } from '../../geom/point';
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	import * as Icon from 'flowbite-svelte-icons';
	import { onDestroy } from 'svelte';
	import PointChart from './PointChart.svelte';
	import { registerCallback, unregisterCallback } from '../../server/websocket';
	import { serverOutputPathCreation, serverOutputPathImprovement } from '../../server/types';
	import type { Color } from '../../color/color';
	import { title } from '../../ui/navbar';
	import { gradient } from '../../ui/color';
	import PointChartOptions from './PointChartOptions.svelte';
	import PathAlgorithms from '../../components/PathAlgorithms.svelte';
	import ColorDisplay from './ColorDisplay.svelte';
	import PathProperties from '../../components/PathProperties.svelte';
	import { goto } from '$app/navigation';
	import type { DistanceType } from '../../geom/dist';
	import Window from '../../components/Window.svelte';
	import Options from '../../components/Options.svelte';
	import presets from './presets';

	title.set('Farben sortieren');

	let space: ColorSpace = 'rgb';

	/*let colors = [
		RgbColor.fromNumeric(0xff1e26).color(),
		RgbColor.fromNumeric(0xfe941e).color(),
		RgbColor.fromNumeric(0xffff00).color(),
		RgbColor.fromNumeric(0x06bd00).color(),
		RgbColor.fromNumeric(0x001a98).color(),
		RgbColor.fromNumeric(0x760088).color()
	];*/ // pride flag
	/*let colors = [
		[.6,.2],
		[.1,.7],
		[.9,.4],
		[.2,.2],
		[.5,.5],
		[.8,.7]
	].map(([r, b]) => new RgbColor(r, 0, b).color()); // langfassung*/
	// let colors = new Array(40).fill(null).map(() => new RgbColor(Math.random(), Math.random(), Math.random()).color()); // random
	/*let colors = [
		"79, 10, 17",
		"95, 33, 21",
		"96, 52, 15",
		"87, 78, 88",
		"96, 64, 43",
		"93, 82, 25",
		"91, 88, 39",
		"91, 85, 73",
		"37, 76, 64",
		"2, 56, 50",
		"1, 67, 49",
		"89, 90, 92",
		"22, 55, 80",
		"2, 73, 94",
		"34, 77, 78",
		"27, 74, 87",
		"55, 84, 90",
		"36, 13, 48",
		"46, 25, 61",
		"63, 55, 76",
		"49, 50, 56",
		"95, 54, 70",
		"96, 66, 73",
		"98, 79, 76",
		"97, 75, 82",
	].map(str => { let ns =str.split(", ").map(Number).map(n=>n/100); return new RgbColor(ns[0],ns[1],ns[2]).color() });*/ // perlen
	let colors = presets['buntstifte']!.colors;
	let colorsLocked = false;
	let invalidate: <T>(callback: (t: T) => void) => (t: T) => void;
	let colorsAnim = true;
	let edgesAnim = true;

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
	let norm: DistanceType = 'euclidean';

	let edges: [Point3, Point3, Color | undefined][] = [];

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

	function pathToEdges(path: number[][]): [Point3, Point3, undefined][] {
		let edges = [];
		for (let i = 0; i < path.length - 1; i++) {
			let arr: [Point3, Point3, undefined] = [
				Point3.fromArray(path[i]),
				Point3.fromArray(path[i + 1]),
				undefined
			];
			edges.push(arr);
		}
		return edges;
	}

	function setColorsFromPath(path: number[][]) {
		colorsLocked = true;
		colorsAnim = false;
		colors = path.map(
			(arr) =>
				colors.find((color) => color.space(space).point().equals(Point3.fromArray(arr))) ??
				(() => {
					throw new Error('Invalid: returned invalid color not in list');
				})()
		);
		setTimeout(() => (colorsAnim = true));
	}

	{
		let callbackIdCreation = registerCallback(serverOutputPathCreation, (pc) => {
			path = null;
			colorsLocked = true;
			if (pc.donePath) {
				path = pc.donePath.map(Point3.fromArray);
				edgesAnim = false;
				edges = pathToEdges(pc.donePath);
				setTimeout(() => (edgesAnim = true));
				setColorsFromPath(pc.donePath);
			} else {
				edges = pc.currentEdges.map(([from, to]) => [
					Point3.fromArray(from),
					Point3.fromArray(to),
					undefined
				]);
			}
		});
		onDestroy(() => unregisterCallback(callbackIdCreation));

		let callbackIdImprovement = registerCallback(serverOutputPathImprovement, (pi) => {
			if (pi.better) {
				edges = pathToEdges(pi.currentPath);
				path = pi.currentPath.map(Point3.fromArray);
			}
			if (pi.done) {
				setColorsFromPath(pi.currentPath);
			}
		});
		onDestroy(() => unregisterCallback(callbackIdImprovement));
	}
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
		class="p-2 bg-clip-padding bg-gray-300 backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-700 text-white rounded-lg z-20 flex flex-col px-4"
		transition:scale
		style={`position: fixed; left: ${selection.position.x}px; top: ${selection.position.y}px`}
	>
		<div>
			{#key selection.index}
				{#await (colors[selection.index] ?? { name() {} }).name()}
					<Spinner />
				{:then meta}
					{#if meta}
						<div class="text-3xl">{meta.name}</div>
					{/if}
				{/await}
			{/key}
		</div>
		<div class="my-2">
			<ColorDisplay
				color={colors[selection.index]}
				on:click={() => {
					if (selection) {
						selection.colorPickerOpen = true;
					}
				}}
				size="xs"
			/>
			l<sub>{selection.index + 1}</sub> =
			{colors[selection.index].space(space).point()}
		</div>
		{#if selection.index !== 0}
			<div>
				d(
				<ColorDisplay
					color={colors[selection.index - 1]}
					on:click={() => {
						if (selection) {
							selection.index -= 1;
							selection.colorPickerOpen = true;
						}
					}}
					size="xs"
				/>
				l<sub>{selection.index}</sub>,
				<ColorDisplay
					color={colors[selection.index]}
					on:click={() => {
						if (selection) {
							selection.colorPickerOpen = true;
						}
					}}
					size="xs"
				/>
				l<sub>{selection.index + 1}</sub>) =
				{colors[selection.index - 1]
					.space(space)
					.point()
					.distanceTo(colors[selection.index].space(space).point(), norm)
					.toFixed(2)}
			</div>
		{/if}
		{#if selection.index !== colors.length - 1}
			<div>
				d(
				<ColorDisplay
					color={colors[selection.index]}
					on:click={() => {
						if (selection) {
							selection.colorPickerOpen = true;
						}
					}}
					size="xs"
				/>
				l<sub>{selection.index + 1}</sub>,
				<ColorDisplay
					color={colors[selection.index + 1]}
					on:click={() => {
						if (selection) {
							selection.index += 1;
							selection.colorPickerOpen = true;
						}
					}}
					size="xs"
				/>
				l<sub>{selection.index + 2}</sub>) =
				{colors[selection.index]
					.space(space)
					.point()
					.distanceTo(colors[selection.index + 1].space(space).point(), norm)
					.toFixed(2)}
			</div>
		{/if}
		<div class="flex flew-row mt-4 gap-2 -mx-2">
			<button
				class="text-base p-2 bg-white bg-opacity-10 hover:bg-gray-400 transition-all rounded-lg"
				on:click={invalidate(() => {
					if (selection) {
						selection.colorPickerOpen = true;
					}
				})}
			>
				<Icon.PenNibOutline size="xl" />
			</button>
			<button
				class="text-base p-2 bg-white bg-opacity-10 rounded-lg hover:bg-gray-400 transition-all"
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
				class="text-base p-2 bg-white bg-opacity-10 rounded-lg hover:bg-gray-400 transition-all"
				on:click={invalidate(() => {
					if (selection && colors.length > selection.index) {
						colors = colors.toSpliced(selection.index, 1);
					}
				})}
			>
				<Icon.TrashBinOutline size="xl" />
			</button>
			{#if selection.index !== 0}
				<button
					class="text-base p-2 bg-white bg-opacity-10 rounded-lg hover:bg-gray-400 transition-all"
					on:click={invalidate(() => {
						if (selection && colors.length > selection.index) {
							[colors[selection.index], colors[selection.index - 1]] = [
								colors[selection.index - 1],
								colors[selection.index]
							];
							selection = selection;
						}
					})}
				>
					<Icon.ArrowLeftSolid size="xl" />
				</button>
			{/if}
			{#if selection.index !== colors.length - 1}
				<button
					class="text-base p-2 bg-white bg-opacity-10 rounded-lg hover:bg-gray-400 transition-all"
					on:click={invalidate(() => {
						if (selection && colors.length > selection.index) {
							[colors[selection.index], colors[selection.index + 1]] = [
								colors[selection.index + 1],
								colors[selection.index]
							];
							selection = selection;
						}
					})}
				>
					<Icon.ArrowRightSolid size="xl" />
				</button>
			{/if}
		</div>
	</div>
{/if}

<div class="w-full h-2 hover:h-28 transition-all" style={`background: ${gradient(colors)}`} />
<div class="mx-10">
	<div
		class="mt-8 grid grid-cols-12 gap-8 auto-cols-max align-stretch justify-stretch justify-items-stretch"
	>
		<div class="flex flex-row col-span-12 xl:col-span-8 justify-between align-center gap-4">
			<div class="flex flex-row flex-wrap justify-start gap-2 items-stretch h-16">
				{#each colors as color, index (color)}
					<div animate:flip>
						<ColorDisplay
							{color}
							selected={selection?.index === index}
							on:click={(evt) => {
								selectCard(evt, index);
							}}
							size="md"
							tooltip={selection?.index !== index}
						/>
					</div>
				{/each}
			</div>
		</div>
		<Window title="Optionen" xlCol={4}>
			<Options
				show={['colorSpace']}
				on:blowUp={blowUp}
				bind:invalidate
				bind:locked={colorsLocked}
				on:add={invalidate(addColor)}
				on:delete={invalidate(() => (colors = []))}
				bind:norm
				bind:colorSpace={space}
				on:asVectors={invalidate(() => {
					goto(
						'/sort-vectors?v=' +
							colors
								.map((c) =>
									c
										.space(space)
										.point()
										.values()
										.map((n) => Math.floor(n * 255))
										.join('i')
								)
								.join('o')
					);
				})}
			/>
		</Window>
		<Window
			title="3D-Darstellung"
			options
			on:optionClick={() => (threeDOptions.showOptions = !threeDOptions.showOptions)}
			mdCol={12}
			xlCol={5}
		>
			{#if threeDOptions.showOptions}
				<PointChartOptions bind:options={threeDOptions} bind:projection bind:ballSize />
			{/if}
			<div class="h-full m-0 min-h-[420px]">
				<PointChart
					{colors}
					{colorsAnim}
					{edges}
					{ballSize}
					{projection}
					{space}
					{norm}
					on:pick={(evt) => (selection = evt.detail)}
					selectedIndex={selection?.index}
				/>
			</div>
		</Window>

		<PathProperties path={path?.map((point) => point.values())} length={colors.length} {norm} />

		<PathAlgorithms
			on:deletePath={() => (path = null)}
			bind:invalidate={invalidateAlgorithms}
			points={colors.map((color) => color.space(space).point().values())}
		/>
	</div>
</div>
