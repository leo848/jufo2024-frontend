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
	<p class="lg:text-3xl text-5xl dark:text-white mb-4">Farben sortieren</p>
	<div class="flex flex-row flex-wrap justify-start gap-8 items-stretch h-16">
		{#each colors as color, index}
			<ColorPicker bind:value={colors[index]}>
				<div slot="open-button">
					<div class="color-button w-full grow" style={'background-color:' + color.rgb().css()}>
						<div class="h-16 w-16" />
					</div>
				</div>
			</ColorPicker>
		{/each}
	</div>
</Container>

<style>
	.color-button {
		border-radius: 10px;
		border: 3px solid rgba(0, 0, 0, 0.3);
	}
</style>
