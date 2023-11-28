<script lang="ts">
	import { Canvas } from '@threlte/core';
	import type { ColorSpace } from '../color/colorSpaces';
	import type { Color } from '../color/color';
	import type { Point3 } from '../geom/point';
	import PointChartScene from './PointChartScene.svelte';

	export let space: ColorSpace;
	export let colors: Color[];
	export let edges: [Point3, Point3, Color?][];
	export let ballSize: number = 0.5;
	export let selection: {
		index: number;
		colorPickerOpen?: boolean;
		position: { x: number; y: number };
	} | null = null;
	/*background={new THREE.Color(0x0c0c0c)}
		fog={new THREE.FogExp2(0x0c0c0c, 0.015)}
		antialias
		shadows*/

	let tryPick: (evt: MouseEvent) => void;
</script>

<div
	class="chart cursor-default"
	on:click={tryPick}
	role="button"
	tabindex="0"
	on:keydown={() => {}}
>
	<Canvas>
		<PointChartScene bind:tryPick {space} {colors} {edges} {ballSize} bind:selection />
	</Canvas>
</div>

<style>
	.chart {
		position: relative;
		width: 100%;
		height: 100%;
	}
</style>
