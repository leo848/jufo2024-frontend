<script lang="ts">
	import { Button, Modal, Spinner, TabItem, Tabs } from 'flowbite-svelte';
	import { Color } from '../color/color';
	import { blur } from 'svelte/transition';
	import { HsvColor, OklabColor, RgbColor, LinearRgbColor, type ColorSpace } from '../color/colorSpaces';
	import GradientRange from './GradientRange.svelte';
	import GradientDiagram from './GradientDiagram.svelte';
	import DeltaBadge from './DeltaBadge.svelte';
	import { createEventDispatcher, type EventDispatcher } from 'svelte';

	export let value: Color;
	// export const open = () => (modal = true);

	let modal = true;
	let modalColor = value.clone();

	let space: ColorSpace = 'rgb';

	const compNames = {
		rgb: { r: 'Rot', g: 'Grün', b: 'Blau' },
		lrgb: { r: 'Rot', g: 'Grün', b: 'Blau' },
		hsv: { h: 'Farbton (Hue)', s: 'Sättigung', v: 'Farbwert' },
		oklab: { l: 'Helligkeit (Lightness)', a: 'Farbwert A', b: 'Farbwert B' }
	} as const;

	$: proxies = {
		rgb: modalColor.proxy(RgbColor),
		hsv: modalColor.proxy(HsvColor),
		oklab: modalColor.proxy(OklabColor),
		lrgb: modalColor.proxy(LinearRgbColor),
	} as const;

	$: colorMetadata = modalColor.name();

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

<div class="inline-block transition color-picker">
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
			<div class="color-preview" style={'background-color: ' + modalColor.rgb().css()} />
			<div class="flex flex-col grow justify-between">
				<div class="flex justify-start">
					{#await colorMetadata}
						<Spinner />
					{:then meta}
						<h3 class="text-3xl 2xl:text-4xl text-white">
							{meta.name}
						</h3>
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
			<TabItem open class="w-full" on:click={() => (space = 'rgb')}>
				<div class="text-xl" slot="title">sRGB</div>
				<div class="flex flex-row justify-between gap-8 h-full">
					<div class="stretch w-full">
						{#each proxies.rgb.components() as comp (comp)}
							<div class="h-10 mt-4">
								<GradientRange
									bind:value={proxies.rgb[comp]}
									space="rgb"
									{comp}
									color={modalColor}
								/>
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
			<TabItem class="w-full" on:click={() => (space = 'lrgb')}>
				<div class="text-xl" slot="title">linear RGB</div>
				<div class="flex flex-row justify-between gap-8 h-full">
					<div class="stretch w-full">
						{#each proxies.lrgb.components() as comp (comp)}
							<div class="h-10 mt-4">
								<GradientRange
									bind:value={proxies.lrgb[comp]}
									space="lrgb"
									{comp}
									color={modalColor}
								/>
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
			<TabItem class="w-full" on:click={() => (space = 'hsv')}>
				<div class="text-xl" slot="title">HSV</div>
				<div class="flex flex-row justify-between gap-8 h-full">
					<div class="stretch w-full">
						{#each proxies.hsv.components() as comp (comp)}
							<div class="h-10 mt-4">
								<GradientRange
									bind:value={proxies.hsv[comp]}
									space="hsv"
									{comp}
									color={modalColor}
								/>
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
			<TabItem class="w-full" on:click={() => (space = 'oklab')}>
				<div class="text-xl" slot="title">OKLAB</div>
				<div class="flex flex-row justify-between gap-8 h-full">
					<div class="stretch w-full">
						{#each proxies.oklab.components() as comp (comp)}
							<div class="h-10 mt-4">
								<GradientRange
									bind:value={proxies.oklab[comp]}
									space="oklab"
									{comp}
									color={modalColor}
								/>
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
		</Tabs>
		<svelte:fragment slot="footer">
			<Button
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
