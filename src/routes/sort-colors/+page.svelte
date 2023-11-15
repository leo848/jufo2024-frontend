<script lang="ts">
	import ColorPicker from '../../components/ColorPicker.svelte';
	import Container from '../../components/Container.svelte';
	import { RgbColor } from '../../geom/colorSpaces';

	let colors = [
		RgbColor.fromNumeric(0xff1e26).color(),
		RgbColor.fromNumeric(0xfe941e).color(),
		RgbColor.fromNumeric(0xffff00).color(),
		RgbColor.fromNumeric(0x06bd00).color(),
		RgbColor.fromNumeric(0x001a98).color(),
		RgbColor.fromNumeric(0x760088).color()
	];
</script>

<Container>
	<p class="text-5xl dark:text-white mb-4">Farben sortieren</p>
	<div class="flex flex-row justify-stretch">
		{#each colors as _, index}
			<ColorPicker bind:value={colors[index]} />
		{/each}
	</div>
</Container>
