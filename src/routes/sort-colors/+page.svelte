<script lang="ts">
	import ColorPicker from '../../components/ColorPicker.svelte';
	import Container from '../../components/Container.svelte';
	import { RgbColor } from '../../geom/colorSpaces';

	let colors = [
		new RgbColor(0.5, 0.2, 0.1).color(),
		new RgbColor(0.2, 0.8, 0.0).color(),
		new RgbColor(0.5, 0.0, 1.0).color()
	];
</script>

<Container>
	<p class="text-5xl dark:text-white mb-4">Farben sortieren</p>
	<ColorPicker bind:value={colors[0]} />
	<ColorPicker bind:value={colors[1]} />
	<ColorPicker bind:value={colors[2]} />
</Container>
