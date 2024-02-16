<script lang="ts">
	import { Button, Modal, Spinner, TabItem, Tabs } from 'flowbite-svelte';
	import { Color } from '../../color/color';
	import { blur, scale } from 'svelte/transition';
	import {
		HsvColor,
		HslColor,
		OklabColor,
		RgbColor,
		LinearRgbColor,
		CmyColor,
		type ColorSpace,

		XyzColor,

		CielabColor


	} from '../../color/colorSpaces';
	import { type ColorNameList, getColorNameListInfo } from '../../color/colorName';
	import GradientRange from './GradientRange.svelte';
	import GradientDiagram from './GradientDiagram.svelte';
	import DeltaBadge from './DeltaBadge.svelte';
	import { createEventDispatcher, type EventDispatcher } from 'svelte';
	import NumericMappedInput from '../../components/NumericMappedInput.svelte';
	import ColorNameListPopover from './ColorNameListPopover.svelte';
	import { ExclamationCircleOutline } from 'flowbite-svelte-icons';
	import WarningGamutPopover from './WarningGamutPopover.svelte';

	export let value: Color;
	// export const open = () => (modal = true);

	let modal = true;
	let modalColor = value.clone();

	export let defaultSpace: ColorSpace = 'rgb';
	let space: ColorSpace = defaultSpace;

	export let defaultColorNameList: ColorNameList = 'default';
	let colorNameList = defaultColorNameList;

	export let valid: (color: Color) => boolean = () => true;

	const compNames = {
		rgb: { r: 'Rot', g: 'Grün', b: 'Blau' },
		lrgb: { r: 'Rot', g: 'Grün', b: 'Blau' },
		cmy: { c: 'Cyan', m: 'Magenta', y: 'Gelb (Yellow)' },
		hsv: { h: 'Farbton (Hue)', s: 'Sättigung', v: 'Farbwert' },
		hsl: { h: 'Farbton (Hue)', s: 'Sättigung', l: 'Helligkeit (Lightness)' },
		oklab: { l: 'Helligkeit (Lightness)', a: 'Farbwert A', b: 'Farbwert B' },
		xyz: { x: 'X', y: 'Y', z: 'Z' },
		cielab: { l: 'Helligkeit (Lightness)', a: 'Farbwert A', b: 'Farbwert B' },
	} as const satisfies Record<ColorSpace, {}>;

	$: proxies = {
		rgb: modalColor.proxy(RgbColor),
		hsv: modalColor.proxy(HsvColor),
		hsl: modalColor.proxy(HslColor),
		oklab: modalColor.proxy(OklabColor),
		lrgb: modalColor.proxy(LinearRgbColor),
		cmy: modalColor.proxy(CmyColor),
		xyz: modalColor.proxy(XyzColor),
		cielab: modalColor.proxy(CielabColor),
	} as const satisfies Record<ColorSpace, {}>;

	$: colorMetadata = modalColor.name(colorNameList);

	const dispatch: EventDispatcher<{ choose: Color; cancel: undefined }> = createEventDispatcher();

	function complement() {
		modalColor = modalColor.rgbMap((c: number) => 1 - c);
	}

	function compoSwap() {
		const rgb = modalColor.rgb();
		modalColor = new RgbColor(rgb.b, rgb.r, rgb.g).color();
	}

	function gray() {
		let { r, g, b } = modalColor.rgb();
		const avg = (r + g + b) / 3;
		modalColor = new Color(avg, avg, avg);
	}

	function randomColor() {
		modalColor = new Color(Math.random(), Math.random(), Math.random());
	}

	function fancyCss(color: Color) {
		return color.space(space).fancyCss();
	}
</script>

<div class="inline-block transition color-picker h-n4 m-0 p-0">
	<Modal
		bind:open={modal}
		backdropClass="modal-background"
		size="xl"
		defaultClass="dark:bg-black dark:backdrop-blur dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-xl dark:bg-opacity-10 dark:border dark:border-gray-800"
	>
		<svelte:fragment slot="header">
			<p class="text-2xl 2xl:text-4xl text-bold 2xl:my-2 text-white">Farbauswahl</p>
		</svelte:fragment>
		<div class="flex flex-row gap-8">
			<div class="color-preview" style={'background-color: ' + modalColor.rgb().css()}>
				{#if !proxies[space].approxEqualsValues(proxies[space]
						.color()
						.rgb()
						.color()
						.space(space)
						.values(), 0.05)}
					<button
						transition:scale
						id="warning-gamut"
						class="rounded-full bg-red-600 text-red-200 self-center mr-4"
					>
						<ExclamationCircleOutline size="xl" />
					</button>
					<WarningGamutPopover
						triggeredBy="#warning-gamut"
						color={modalColor}
						on:limit={() => {
							modalColor = proxies[space].color().rgb().color();
						}}
					/>
				{/if}
			</div>
			<div class="flex flex-col grow justify-between">
				<div class="flex justify-start">
					{#await colorMetadata}
						<Spinner />
					{:then meta}
						<div class="text-3xl 2xl:text-4xl text-white">
							{meta.name}
						</div>
						<button
							id="color-picker-title-thing"
							class="border border-2 border-gray-700 hover:border-gray-500 transition-all rounded-xl text-white px-2 ml-4 mr-n2 text-base self-end opacity-50 flex flex-row items-center"
						>
							{#await getColorNameListInfo(colorNameList)}
								<Spinner size="sm" />
							{:then info}
								{info.title}
							{/await}
						</button>
						<ColorNameListPopover
							color={modalColor}
							bind:value={colorNameList}
							triggeredBy="#color-picker-title-thing"
						/>
						<DeltaBadge
							type="pos"
							value={meta.distance}
							on:click={() =>
								(modalColor = new RgbColor(
									meta.rgb.r / 255,
									meta.rgb.g / 255,
									meta.rgb.b / 255
								).color())}
						/>
					{:catch}
						<h3 class="text-4xl text-red">Farbname unbekannt</h3>
					{/await}
				</div>
				<div class="flex flex-row justify-start gap-4">
					<!-- eslint-disable -->
					<code class="text-2xl">{@html modalColor.rgb().fancyHex()}</code>
					{#key [space, fancyCss(modalColor)]}
						{#if fancyCss(modalColor)}
							<code class="text-2xl" out:blur={{ duration: 500 }}>{@html fancyCss(modalColor)}</code
							>
						{/if}
					{/key}
				</div>
			</div>
		</div>
		<Tabs
			style="full"
			class="grow ml-8 border-solid border-gray-500 border-2"
			defaultClass="flex rounded-lg divide-x divide-gray-200 shadow dark:divide-gray-700"
			inactiveClasses="dark:bg-gray-600"
		>
			<TabItem open={space == 'rgb'} class="w-full" on:click={() => (space = 'rgb')}>
				<div class="text-xl" slot="title">sRGB</div>
				<div class="flex flex-row justify-between gap-8 h-full">
					<div class="stretch w-full">
						{#each proxies.rgb.components() as comp (comp)}
							<div class="h-10 mt-4 flex flex-row gap-4">
								<GradientRange
									bind:value={proxies.rgb[comp]}
									space="rgb"
									{comp}
									color={modalColor}
								/>
								{#key proxies.rgb[comp]}
									<NumericMappedInput
										on:set={(n) => (proxies.rgb[comp] = n.detail)}
										bind:value={proxies.rgb[comp]}
										mapDisplay={(n) => Math.round(n * 100)}
										mapValue={(n) => n / 100}
									/>
								{/key}
							</div>
							<div>{compNames.rgb[comp]} = {Math.round(proxies.rgb[comp] * 100)}%</div>
						{/each}
					</div>
					<div class="flex flex-col justify-around align-stretch">
						<Button color="alternative" on:click={randomColor}>Zufällig</Button><br />
						<Button color="alternative" on:click={complement}>Komplementär</Button><br />
						<Button color="alternative" on:click={compoSwap}>Komponententausch</Button><br />
						<Button color="alternative" on:click={gray}>Grauwert</Button><br />
					</div>
					<div>
						<div class="h-64 w-64">
							<GradientDiagram
								bind:valueX={proxies.rgb.r}
								bind:valueY={proxies.rgb.g}
								space="rgb"
								compX="r"
								compY="g"
								color={modalColor}
							/>
						</div>
					</div>
				</div>
			</TabItem>
			<TabItem open={space == 'lrgb'} class="w-full" on:click={() => (space = 'lrgb')}>
				<div class="text-xl" slot="title">linear RGB</div>
				<div class="flex flex-row justify-between gap-8 h-full">
					<div class="stretch w-full">
						{#each proxies.lrgb.components() as comp (comp)}
							<div class="h-10 mt-4 flex flex-row gap-4">
								<GradientRange
									bind:value={proxies.lrgb[comp]}
									space="lrgb"
									{comp}
									color={modalColor}
								/>
								{#key proxies.rgb[comp]}
									<NumericMappedInput
										on:set={(n) => (proxies.lrgb[comp] = n.detail)}
										bind:value={proxies.lrgb[comp]}
										mapDisplay={(n) => Math.round(n * 100)}
										mapValue={(n) => n / 100}
									/>
								{/key}
							</div>
							<div>{compNames.lrgb[comp]} = {Math.round(proxies.lrgb[comp] * 100)}%</div>
						{/each}
					</div>
					<div>
						<div class="h-64 w-64">
							<GradientDiagram
								bind:valueX={proxies.lrgb.r}
								bind:valueY={proxies.lrgb.g}
								space="lrgb"
								compX="r"
								compY="g"
								color={modalColor}
							/>
						</div>
					</div>
				</div>
			</TabItem>
			<TabItem open={space == 'cmy'} class="w-full" on:click={() => (space = 'cmy')}>
				<div class="text-xl" slot="title">CMY</div>
				<div class="flex flex-row justify-between gap-8 h-full">
					<div class="stretch w-full">
						{#each proxies.cmy.components() as comp (comp)}
							<div class="h-10 mt-4 flex flex-row gap-4">
								<GradientRange
									bind:value={proxies.cmy[comp]}
									space="cmy"
									{comp}
									color={modalColor}
								/>
								{#key proxies.cmy[comp]}
									<NumericMappedInput
										on:set={(n) => (proxies.cmy[comp] = n.detail)}
										bind:value={proxies.cmy[comp]}
										mapDisplay={(n) => Math.round(n * 100)}
										mapValue={(n) => n / 100}
									/>
								{/key}
							</div>
							<div>{compNames.cmy[comp]} = {Math.round(proxies.cmy[comp] * 100)}%</div>
						{/each}
					</div>
					<div>
						<div class="h-64 w-64">
							<GradientDiagram
								bind:valueX={proxies.cmy.c}
								bind:valueY={proxies.cmy.m}
								space="cmy"
								compX="c"
								compY="m"
								color={modalColor}
							/>
						</div>
					</div>
				</div>
			</TabItem>
			<TabItem open={space == 'hsv'} class="w-full" on:click={() => (space = 'hsv')}>
				<div class="text-xl" slot="title">HSV</div>
				<div class="flex flex-row justify-between gap-8 h-full">
					<div class="stretch w-full">
						{#each proxies.hsv.components() as comp (comp)}
							<div class="h-10 mt-4 flex flex-row gap-4">
								<GradientRange
									bind:value={proxies.hsv[comp]}
									space="hsv"
									{comp}
									color={modalColor}
								/>
								{#key proxies.hsv[comp]}
									<NumericMappedInput
										on:set={(n) => (proxies.hsv[comp] = n.detail)}
										bind:value={proxies.hsv[comp]}
										mapDisplay={(n) => Math.round(n * 100)}
										mapValue={(n) => n / 100}
									/>
								{/key}
							</div>
							<div>{compNames.hsv[comp]} = {Math.round(proxies.hsv[comp] * 100)}%</div>
						{/each}
					</div>
					<div>
						<div class="h-64 w-64">
							<GradientDiagram
								bind:valueX={proxies.hsv.h}
								bind:valueY={proxies.hsv.v}
								space="hsv"
								compX="h"
								compY="v"
								color={modalColor}
							/>
						</div>
					</div>
				</div>
			</TabItem>
			<TabItem open={space == 'hsl'} class="w-full" on:click={() => (space = 'hsl')}>
				<div class="text-xl" slot="title">HSL</div>
				<div class="flex flex-row justify-between gap-8 h-full">
					<div class="stretch w-full">
						{#each proxies.hsl.components() as comp (comp)}
							<div class="h-10 mt-4 flex flex-row gap-4">
								<GradientRange
									bind:value={proxies.hsl[comp]}
									space="hsl"
									{comp}
									color={modalColor}
								/>
								{#key proxies.hsl[comp]}
									<NumericMappedInput
										on:set={(n) => (proxies.hsl[comp] = n.detail)}
										bind:value={proxies.hsl[comp]}
										mapDisplay={(n) => Math.round(n * 100)}
										mapValue={(n) => n / 100}
									/>
								{/key}
							</div>
							<div>{compNames.hsl[comp]} = {Math.round(proxies.hsl[comp] * 100)}%</div>
						{/each}
					</div>
					<div>
						<div class="h-64 w-64">
							<GradientDiagram
								bind:valueX={proxies.hsl.h}
								bind:valueY={proxies.hsl.s}
								space="hsl"
								compX="h"
								compY="s"
								color={modalColor}
							/>
						</div>
					</div>
				</div>
			</TabItem>
			<TabItem open={space == 'oklab'} class="w-full" on:click={() => (space = 'oklab')}>
				<div class="text-xl" slot="title">OKLAB</div>
				<div class="flex flex-row justify-between gap-8 h-full">
					<div class="stretch w-full">
						{#each proxies.oklab.components() as comp (comp)}
							<div class="h-10 mt-4 flex flex-row gap-4">
								<GradientRange
									bind:value={proxies.oklab[comp]}
									space="oklab"
									{comp}
									color={modalColor}
								/>
								{#key proxies.oklab[comp]}
									<NumericMappedInput
										on:set={(n) => (proxies.oklab[comp] = n.detail)}
										bind:value={proxies.oklab[comp]}
										mapDisplay={(n) => Math.round(n * 100)}
										mapValue={(n) => n / 100}
									/>
								{/key}
							</div>
							<div>{compNames.oklab[comp]} = {Math.round(proxies.oklab[comp] * 100)}%</div>
						{/each}
					</div>
					<div>
						<div class="h-64 w-64">
							<GradientDiagram
								bind:valueX={proxies.oklab.a}
								bind:valueY={proxies.oklab.b}
								space="oklab"
								compX="a"
								compY="b"
								color={modalColor}
							/>
						</div>
					</div>
				</div>
			</TabItem>
			<TabItem open={space == 'xyz'} class="w-full" on:click={() => (space = 'xyz')}>
				<div class="text-xl" slot="title">XYZ</div>
				<div class="flex flex-row justify-between gap-8 h-full">
					<div class="stretch w-full">
						{#each proxies.xyz.components() as comp (comp)}
							<div class="h-10 mt-4 flex flex-row gap-4">
								<GradientRange
									bind:value={proxies.xyz[comp]}
									space="xyz"
									{comp}
									color={modalColor}
								/>
								{#key proxies.xyz[comp]}
									<NumericMappedInput
										on:set={(n) => (proxies.xyz[comp] = n.detail)}
										bind:value={proxies.xyz[comp]}
										mapDisplay={(n) => Math.round(n * 100)}
										mapValue={(n) => n / 100}
									/>
								{/key}
							</div>
							<div>{compNames.xyz[comp]} = {Math.round(proxies.xyz[comp] * 100)}%</div>
						{/each}
					</div>
					<div>
						<div class="h-64 w-64">
							<GradientDiagram
								bind:valueX={proxies.xyz.x}
								bind:valueY={proxies.xyz.y}
								space="xyz"
								compX="x"
								compY="y"
								color={modalColor}
							/>
						</div>
					</div>
				</div>
			</TabItem>
			<TabItem open={space == 'cielab'} class="w-full" on:click={() => (space = 'cielab')}>
				<div class="text-xl" slot="title">CIELAB</div>
				<div class="flex flex-row justify-between gap-8 h-full">
					<div class="stretch w-full">
						{#each proxies.cielab.components() as comp (comp)}
							<div class="h-10 mt-4 flex flex-row gap-4">
								<GradientRange
									bind:value={proxies.cielab[comp]}
									space="cielab"
									{comp}
									color={modalColor}
								/>
								{#key proxies.cielab[comp]}
									<NumericMappedInput
										on:set={(n) => (proxies.cielab[comp] = n.detail)}
										bind:value={proxies.cielab[comp]}
										mapDisplay={(n) => Math.round(n * 100)}
										mapValue={(n) => n / 100}
									/>
								{/key}
							</div>
							<div>{compNames.cielab[comp]} = {Math.round(proxies.cielab[comp] * 100)}%</div>
						{/each}
					</div>
					<div>
						<div class="h-64 w-64">
							<GradientDiagram
								bind:valueX={proxies.cielab.a}
								bind:valueY={proxies.cielab.b}
								space="cielab"
								compX="a"
								compY="b"
								color={modalColor}
							/>
						</div>
					</div>
				</div>
			</TabItem>
		</Tabs>
		<svelte:fragment slot="footer">
			<Button
				disabled={!valid(modalColor)}
				on:click={() => {
					value = modalColor;
					modal = false;
					dispatch('choose', value);
				}}>Auswählen</Button
			>
			<Button
				color="alternative"
				on:click={() => {
					modal = false;
					dispatch('cancel');
				}}>Abbrechen</Button
			>
		</svelte:fragment>
	</Modal>
</div>

<style>
	:global(.color-picker .modal-background) {
		z-index: 40;
		inset: 0;
		position: fixed;
		background: #111;
		opacity: 0.5;
	}

	.color-preview {
		border-width: 3px;
		border-style: solid;
		border-left-color: rgba(0, 0, 0, 0.3);
		border-top-color: rgba(0, 0, 0, 0.3);
		border-right-color: rgba(1, 1, 1, 0.3);
		border-bottom-color: rgba(1, 1, 1, 0.3);
	}

	.color-preview {
		height: 100px;
		width: 100px;
		border-radius: 20px;
	}
</style>
