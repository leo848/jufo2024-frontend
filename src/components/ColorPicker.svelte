<script lang="ts">
	import { Button, ButtonGroup, Modal, TabItem, Tabs } from 'flowbite-svelte';
	import { Color } from '../geom/color';
	import { scale } from 'svelte/transition';
	import { HsvColor, OklabColor, RgbColor, colorSpaces } from '../geom/colorSpaces';

	let selectedColor = new Color(0.5, 0.1, 0.0);
	let modal = false;

	let modalColor = selectedColor.clone();

	const comps = {
		rgb: ['r', 'g', 'b'],
		hsv: ['h', 's', 'v'],
		oklab: ['l', 'a', 'b']
	} as const;

	type Grad = { elt?: HTMLElement; nopple?: HTMLElement };
	let gradients: { [Key in keyof typeof comps]: Record<(typeof comps)[Key][number], Grad> } = {
		rgb: { r: {}, g: {}, b: {} },
		hsv: { h: {}, s: {}, v: {} },
		oklab: { l: {}, a: {}, b: {} }
	};

	const compNames = {
		rgb: { r: 'Rot', g: 'Grün', b: 'Blau' },
		hsv: { h: 'Farbton (Hue)', s: 'Sättigung', v: 'Farbwert' },
		oklab: { l: 'Helligkeit (Lightness)', a: 'Farbwert A', b: 'Farbwert B' }
	} as const;
	$: for (const space of colorSpaces) {
		let colorSpace = modalColor.space(space);
		for (const rawKey of comps[space]) {
			const key = rawKey as keyof (typeof gradients)[typeof space];
			if (!gradients[space] || !gradients[space][key]) continue;
			const gradient = gradients[space][key] as Grad;
			if (!(gradient.elt && gradient.nopple)) continue;

			const neededAmount = colorSpace.neededGradientPoints(key);
			const gradientPoints = new Array(neededAmount);
			for (let i = 0; i < neededAmount; i++) {
				const value = i / (neededAmount - 1);
				gradientPoints[i] = colorSpace.with(key, value).css();
			}
			gradient.elt.style.background = `linear-gradient(111deg, ${gradientPoints.join(', ')})`;

			gradient.nopple.style.left = `${colorSpace.get(key) * 100}%`;
		}
	}

	$: proxies = {
		rgb: modalColor.proxy(RgbColor),
		hsv: modalColor.proxy(HsvColor),
		oklab: modalColor.proxy(OklabColor)
	} as const;

	function complement() {
		modalColor = modalColor.rgbMap((c: number) => 1 - c);
	}

	function compoSwap() {
		const temp = modalColor.r;
		modalColor.r = modalColor.b;
		modalColor.b = modalColor.g;
		modalColor.g = temp;
	}

	function gray() {
		const avg = (modalColor.r + modalColor.g + modalColor.b) / 3;
		modalColor = new Color(avg, avg, avg);
	}

	function randomColor() {
		modalColor = new Color(Math.random(), Math.random(), Math.random());
	}

	function nicerHex(color: Color) {
		let { r, g, b } = color.rgbMap((c) => Math.floor(c * 255));
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
</script>

<div>
	<div
		class="open-button"
		style={'background-color: ' + selectedColor.rgb().css()}
		on:click={() => (modal = true)}
		role="button"
		tabindex="0"
		on:keypress={() => {}}
	/>
	<Modal bind:open={modal} transition={scale}>
		<svelte:fragment slot="header">
			<p class="text-4xl text-bold my-2 text-white">Farbauswahl</p>
		</svelte:fragment>
		<div class="color-preview" style={'background-color: ' + modalColor.rgb().css()} />
		<Tabs
			style="full"
			class="grow ml-8"
			defaultClass="flex rounded-lg divide-x divide-gray-200 shadow dark:divide-gray-700"
			inactiveClasses="dark:bg-gray-600"
		>
			<TabItem open class="w-full">
				<div class="text-xl" slot="title">RGB</div>
				<div class="mb-4 text-2xl flex flex-row justify-around">
					<!-- eslint-disable -->
					<code>{@html modalColor.space("rgb").fancyCss()}</code>
					<!-- eslint-disable -->
					<code>{@html nicerHex(modalColor)}</code>
				</div>
				<ButtonGroup class="space-x-px transition">
					<Button pill on:click={randomColor}>Zufällig</Button>
					<Button pill on:click={complement}>Komplementär</Button>
					<Button pill on:click={compoSwap}>Komponententausch</Button>
					<Button pill on:click={gray}>Grauwert</Button>
				</ButtonGroup>
				{#each comps.rgb as comp (comp)}
					<input
						type="range"
						min="0"
						max="1"
						step="0.001"
						class="gr-range -mb-8"
						bind:value={proxies.rgb[comp]}
					/>
					<div bind:this={gradients.rgb[comp].elt} class="gradient">
						<div class="gr-nopple" bind:this={gradients.rgb[comp].nopple} />
					</div>
					<div>{compNames.rgb[comp]} = {Math.round(proxies.rgb[comp] * 100)}%</div>
				{/each}
			</TabItem>
			<TabItem class="w-full">
				<div class="text-xl" slot="title">HSV</div>
				{#each comps.hsv as comp (comp)}
					<input
						type="range"
						min="0"
						max="1"
						step="0.001"
						class="gr-range -mb-8"
						bind:value={proxies.hsv[comp]}
					/>
					<div bind:this={gradients.hsv[comp].elt} class="gradient">
						<div class="gr-nopple" bind:this={gradients.hsv[comp].nopple} />
					</div>
					<div>{compNames.hsv[comp]} = {Math.round(proxies.hsv[comp] * 100)}%</div>
				{/each}
			</TabItem>
			<TabItem class="w-full">
				<div class="text-xl" slot="title">OKLAB</div>
				{#each comps.oklab as comp (comp)}
					<input
						type="range"
						min="0"
						max="1"
						step="0.001"
						class="gr-range -mb-8"
						bind:value={proxies.oklab[comp]}
					/>
					<div bind:this={gradients.oklab[comp].elt} class="gradient">
						<div class="gr-nopple" bind:this={gradients.oklab[comp].nopple} />
					</div>
					<div>{compNames.oklab[comp]} = {Math.round(proxies.oklab[comp] * 100)}%</div>
				{/each}
			</TabItem>
		</Tabs>
		<svelte:fragment slot="footer">
			<Button
				on:click={() => {
					selectedColor = modalColor;
					modal = false;
				}}>Auswählen</Button
			>
			<Button color="alternative" on:click={() => (modal = false)}>Abbrechen</Button>
		</svelte:fragment>
	</Modal>
</div>

<style>
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
		height: 75px;
		width: 75px;
		border-radius: 20px;
	}

	.gradient {
		width: 100%;
		height: 30px;
		border-radius: 20px;
		transition: 0.5s all;
	}

	.gr-range {
		width: 100%;
		opacity: 0;
		z-index: 2;
		position: relative;
		height: 35px;
	}

	.gr-nopple {
		background-color: transparent;
		backdrop-filter: blur(20px);
		border: 5px solid rgba(0, 0, 0, 0.5);
		border-radius: 50%;
		position: relative;
		height: 35px;
		width: 35px;
		transform: translate(-50%, -3px);
		transition: 0.1s all;
	}
</style>
