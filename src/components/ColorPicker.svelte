<script lang="ts">
	import { Button, ButtonGroup, Modal, TabItem, Tabs } from 'flowbite-svelte';
	import { Color } from '../geom/color';
	import { blur, fly } from 'svelte/transition';
	import { HsvColor, OklabColor, RgbColor, type ColorSpace } from '../geom/colorSpaces';
	import GradientRange from './GradientRange.svelte';

	export let value: Color;
	let modal = false;

	let modalColor = value.clone();

	let space: ColorSpace = 'rgb';

	const comps = {
		rgb: ['r', 'g', 'b'],
		hsv: ['h', 's', 'v'],
		oklab: ['l', 'a', 'b']
	} as const;

	const compNames = {
		rgb: { r: 'Rot', g: 'Grün', b: 'Blau' },
		hsv: { h: 'Farbton (Hue)', s: 'Sättigung', v: 'Farbwert' },
		oklab: { l: 'Helligkeit (Lightness)', a: 'Farbwert A', b: 'Farbwert B' }
	} as const;

	$: proxies = {
		rgb: modalColor.proxy(RgbColor),
		hsv: modalColor.proxy(HsvColor),
		oklab: modalColor.proxy(OklabColor)
	} as const;

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

	function nicerHex(color: Color) {
		let [r, g, b] = color
			.rgb()
			.values()
			.map((c: number) => Math.floor(c * 255));
		let str = [r, g, b]
			.map((comp, index) => {
				let str = comp.toString(16);
				if (str.length === 1) str = '0' + str;
				let color = ['red', 'green', 'blue'][index];
				return `<span class="text-${color}-300">${str}</span>`;
			})
			.reduce((s1, s2) => s1 + s2);
		return '#' + str;
	}

	function fancyCss(color: Color) {
		return color.space(space).fancyCss();
	}
</script>

<div class="inline-block transition color-picker">
	<div
		class="open-button inline-block transition"
		style={'background-color: ' + value.rgb().css()}
		on:click={() => (modal = true)}
		role="button"
		tabindex="0"
		on:keypress={() => {}}
	/>
	<Modal
		bind:open={modal}
		transition={(elt) => fly(elt, { y: -300 })}
		backdropClass="modal-background"
		class="backdrop-blur"
	>
		<svelte:fragment slot="header">
			<p class="text-4xl text-bold my-2 text-white">Farbauswahl</p>
		</svelte:fragment>
		<div class="flex flex-row gap-8">
			<div class="color-preview" style={'background-color: ' + modalColor.rgb().css()} />
			<div class="flex flex-col grow justify-between">
				<div class="flex justify-start">
					<h3 class="text-4xl">farbname</h3>
				</div>
				<div class="flex flex-row justify-start gap-4">
					<!-- eslint-disable -->
					<code class="text-2xl">{@html nicerHex(modalColor)}</code>
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
				<div class="text-xl" slot="title">RGB</div>
				<ButtonGroup class="space-x-px transition">
					<Button pill on:click={randomColor}>Zufällig</Button>
					<Button pill on:click={complement}>Komplementär</Button>
					<Button pill on:click={compoSwap}>Komponententausch</Button>
					<Button pill on:click={gray}>Grauwert</Button>
				</ButtonGroup>
				{#each comps.rgb as comp (comp)}
					<div class="h-10 mt-4">
						<GradientRange bind:value={proxies.rgb[comp]} space="rgb" {comp} color={modalColor} />
					</div>
					<div>{compNames.rgb[comp]} = {Math.round(proxies.rgb[comp] * 100)}%</div>
				{/each}
			</TabItem>
			<TabItem class="w-full" on:click={() => (space = 'hsv')}>
				<div class="text-xl" slot="title">HSV</div>
				{#each comps.hsv as comp (comp)}
					<div class="h-10 mt-4">
						<GradientRange bind:value={proxies.hsv[comp]} space="hsv" {comp} color={modalColor} />
					</div>
					<div>{compNames.hsv[comp]} = {Math.round(proxies.hsv[comp] * 100)}%</div>
				{/each}
			</TabItem>
			<TabItem class="w-full" on:click={() => (space = 'oklab')}>
				<div class="text-xl" slot="title">OKLAB</div>
				{#each comps.oklab as comp (comp)}
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
			</TabItem>
		</Tabs>
		<svelte:fragment slot="footer">
			<Button
				on:click={() => {
					value = modalColor;
					modal = false;
				}}>Auswählen</Button
			>
			<Button color="alternative" on:click={() => (modal = false)}>Abbrechen</Button>
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

	.open-button,
	.color-preview {
		border-width: 3px;
		border-style: solid;
		border-left-color: rgba(0, 0, 0, 0.3);
		border-top-color: rgba(0, 0, 0, 0.3);
		border-right-color: rgba(1, 1, 1, 0.3);
		border-bottom-color: rgba(1, 1, 1, 0.3);
	}

	.open-button {
		height: 60px;
		width: 60px;
		border-radius: 10px;
	}
	.color-preview {
		height: 100px;
		width: 100px;
		border-radius: 20px;
	}
</style>
