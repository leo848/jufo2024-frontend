<script lang="ts">
	import * as Icon from 'flowbite-svelte-icons';
	import Window from '../components/Window.svelte';
	import type { TrueDistanceType } from '../geom/dist';
	import { createEventDispatcher } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { sineIn } from 'svelte/easing';
	import type { ColorSpace } from '../color/colorSpaces';
	import OptionsButton from './OptionsButton.svelte';
	import OptionsSelect from './OptionsSelect.svelte';

	type State = 'default' | 'load' | 'store';
	let state: State = 'default';

	export let metric: TrueDistanceType;
	export let colorSpace: ColorSpace = 'rgb';

	type Module =
		| 'add'
		| 'delete'
		| 'lock'
		| 'norm'
		| 'modifiedNorm'
		| 'colorSpace'
		| 'load'
		| 'store'
		| 'asVector';

	const defaultShow = new Set([
		'add',
		'delete',
		'lock',
		'norm',
		'modifiedNorm',
		'load',
		'asVector'
	] as Module[]);
	export let show: Module[] = [];
	export let hide: Module[] = [];

	export let loadAmount: number = 0;

	export let xlCol: undefined | number;

	let display: Set<Module>;
	$: {
		display = new Set(Array.from(defaultShow).concat(show));
		for (const toHide of hide) {
			display.delete(toHide);
		}
	}

	const dispatch = createEventDispatcher<{
		add: null;
		delete: null;
		blowUp: null;
		asVectors: null;
		norm: TrueDistanceType;
	}>();

	let stateNames: Record<State, string> = {
		default: 'Optionen',
		load: 'Laden',
		store: 'Speichern'
	};

	let lockAnim = tweened(0, { duration: 1500, easing: sineIn });
	let lockIcon: HTMLElement;
	export let locked: boolean;

	export function invalidate<I>(
		callback: (i: I) => void,
		invalid?: (i: I) => void
	): (i: I) => void {
		return (i) => {
			if (locked) {
				lockAnim.update((l) => l + 1, { duration: 0 }).then(() => lockAnim.set(0, { delay: 250 }));
				lockIcon.scrollIntoView({ behavior: 'smooth' });
				if (invalid) invalid(i);
			} else {
				dispatch('blowUp');
				callback(i);
			}
		};
	}

	$: lockButtonStyle = $lockAnim
		? `filter: contrast(${$lockAnim * 5 + 1}) invert(${$lockAnim}); transform: scale(${
				$lockAnim / 3 + 1
		  })`
		: '';
</script>

<Window title={stateNames[state]} {xlCol} scrollable={state !== 'default'}>
	<div class="m-4 text-white">
		{#if state == 'default'}
			<div class="flex flex-row flex-wrap gap-4">
				<OptionsButton
					show={display.has('add')}
					on:click={() => dispatch('add')}
					icon={Icon.PlusSolid}
					title="Hinzufügen"
				/>
				<OptionsButton
					show={display.has('delete')}
					on:click={() => dispatch('delete')}
					icon={Icon.TrashBinSolid}
					title="Löschen"
				/>
				<OptionsButton
					bind:elt={lockIcon}
					show={display.has('lock')}
					on:click={() => (locked = !locked)}
					title={locked ? 'Entsperren' : 'Sperren'}
					icon={locked ? Icon.LockSolid : Icon.LockOpenSolid}
					iconStyle={lockButtonStyle}
				/>
			</div>
			<OptionsSelect
				show={display.has('norm')}
				icon={Icon.RulerCombinedSolid}
				title="Metrik"
				bind:value={metric.norm}
				options={['manhattan', 'euclidean', 'max']}
				optionNames={['Manhattan', 'Euklidisch', 'Maximum']}
				{invalidate}
			/>
			<OptionsSelect
				show={display.has('modifiedNorm')}
				icon={Icon.RulerCombinedSolid}
				title="Umkehren"
				bind:value={metric.invert}
				options={[false, true]}
				optionNames={['Nein', 'Ja']}
				{invalidate}
			/>
			<OptionsSelect
				show={display.has('colorSpace')}
				icon={Icon.PalleteSolid}
				title="Farbraum"
				bind:value={colorSpace}
				options={['rgb', 'lrgb', 'cmy', 'hsv', 'hsl', 'oklab', 'xyz', 'cielab']}
				optionNames={['RGB', 'lRGB', 'CMY', 'HSV', 'HSL', 'OKLAB', 'XYZ', 'CIELAB']}
				{invalidate}
			/>
			<div class="flex flex-row flex-wrap gap-4 mt-4">
				<OptionsButton
					on:click={invalidate(() => (state = 'load'))}
					show={display.has('load')}
					title={`Laden${loadAmount ? ' (' + loadAmount + ')' : ''}`}
					icon={Icon.DownloadSolid}
				/>
				<OptionsButton
					on:click={invalidate(() => (state = 'store'))}
					show={display.has('store')}
					title="Speichern"
					icon={Icon.UploadSolid}
				/>
				<OptionsButton
					show={display.has('asVector')}
					title="Als Vektoren"
					icon={Icon.ArrowRightBigOutline}
					on:click={() => dispatch('asVectors')}
				/>
			</div>
		{:else}
			{#if state === 'load'}
				<slot name="load">Nichts zu laden</slot>
			{/if}
			<div class="flex flex-row gap-4">
				<OptionsButton
					on:click={() => (state = 'default')}
					icon={Icon.ArrowLeftToBracketOutline}
					title="Zurück"
				/>
			</div>
		{/if}
	</div>
</Window>
