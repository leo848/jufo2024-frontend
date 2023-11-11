<script lang="ts">
	import { Button, ButtonGroup, Modal, TabItem, Tabs } from 'flowbite-svelte';
	import { Color } from '../geom/color';
	import { scale } from 'svelte/transition';

	let selectedColor = new Color(0.5, 0.1, 0.0);
	let modal = false;

	let modalColor = selectedColor.clone();

	let gradients: {
		r: { elt?: HTMLElement; nopple?: HTMLElement };
		g: { elt?: HTMLElement; nopple?: HTMLElement };
		b: { elt?: HTMLElement; nopple?: HTMLElement };
	} = { r: {}, g: {}, b: {} };
	const comps = ['r', 'g', 'b'] as const;
	const compNames = { r: 'Rot', g: 'Grün', b: 'Blau' } as const;
	$: for (const key of comps) {
		const gradient = gradients[key];
		if (!(gradient.elt && gradient.nopple)) break;
		const from = modalColor.with(key, 0).css();
		const to = modalColor.with(key, 1).css();
		gradient.elt.style.background = `linear-gradient(111deg, ${from} 0%, ${to} 100%)`;
		gradient.nopple.style.left = `${modalColor.get(key) * 100}%`;
	}

	function complement() {
		modalColor = modalColor.rgbMap((c) => 1 - c);
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
</script>

<div>
	<div
		class="open-button"
		style={'background-color: ' + selectedColor.css()}
		on:click={() => (modal = true)}
		role="button"
		tabindex="0"
		on:keypress={() => {}}
	/>
	<Modal bind:open={modal} transition={scale}>
		<svelte:fragment slot="header">
			<p class="text-4xl text-bold my-2 text-white">Farbauswahl</p>
		</svelte:fragment>
		<div class="color-preview" style={'background-color: ' + modalColor.css()} />
		<Tabs
			style="full"
			class="grow ml-8"
			defaultClass="flex rounded-lg divide-x divide-gray-200 shadow dark:divide-gray-700"
			inactiveClasses="dark:bg-gray-600"
		>
			<TabItem open class="w-full">
				<div class="text-xl" slot="title">RGB</div>
				<div class="mb-3 text-xl">
					<code>{modalColor.css()}</code>
				</div>
				<ButtonGroup size="xl">
					<Button on:click={complement}>Komplementär</Button>
					<Button on:click={compoSwap}>Komponententausch</Button>
					<Button on:click={gray}>Grauwert</Button>
				</ButtonGroup>
				{#each comps as comp (comp)}
					<input
						type="range"
						min="0"
						max="1"
						step="0.001"
						class="gr-range -mb-8"
						bind:value={modalColor[comp]}
					/>
					<div bind:this={gradients[comp].elt} class="gradient">
						<div class="gr-nopple" bind:this={gradients[comp].nopple} />
					</div>
					<div>{compNames[comp]} = {Math.round(modalColor[comp] * 100)}%</div>
				{/each}
			</TabItem>
			<TabItem class="w-full">
				<div class="text-xl" slot="title">HSV</div>
			</TabItem>
			<TabItem class="w-full">
				<div class="text-xl" slot="title">OKLAB</div>
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
