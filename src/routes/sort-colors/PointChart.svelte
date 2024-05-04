<script lang="ts">
	import { Canvas } from '@threlte/core';
	import type { ColorSpace } from '../../color/colorSpaces';
	import type { Color } from '../../color/color';
	import type { Point3 } from '../../geom/point';
	import PointChartScene from './PointChartScene.svelte';
	import type { TrueDistanceType } from '../../geom/dist';
	import { dark } from '../../ui/darkmode';

	export let space: ColorSpace;
	export let colors: Color[];
	export let colorsAnim: boolean = true;
	export let edges: [Point3, Point3, Color | undefined][];
	export let edgesAnim: boolean = true;
	export let projection: 'orthographic' | 'perspective' = 'orthographic';
	export let metric: TrueDistanceType;
	export let ballSize: number = 0.5;
	export let selectedIndex: number | null = null;
	export let animDuration: number;

	export let demo: boolean = false;

	let tryPick: (evt: MouseEvent) => void;
	let getHoveredIndex: (evt: MouseEvent) => number | null;

	let div: HTMLDivElement;
	$: canvas = div && div.getElementsByTagName('canvas')[0];

	let cursor: 'pointer' | 'default' = 'default';

	function updateCursor(evt: MouseEvent) {
		let selection = getHoveredIndex(evt) !== null;
		cursor = selection ? 'pointer' : 'default';
	}
</script>

<div
	class="chart cursor-default"
	on:click={tryPick}
	on:mousemove={updateCursor}
	style:cursor
	style={demo
		? 'position: fixed; width: 100vw; height: 100vh; left: 0; top: 0; z-index: 1; background: rgb(95% 95% 95%)'
		: undefined}
	bind:this={div}
	role="button"
	tabindex="0"
	on:keydown={() => {}}
>
	<Canvas>
		{#if canvas}
			<PointChartScene
				bind:tryPick
				bind:getHoveredIndex
				{space}
				{colors}
				{edges}
				{projection}
				{metric}
				{canvas}
				{ballSize}
				{selectedIndex}
				{edgesAnim}
				{colorsAnim}
				{animDuration}
				on:pick
			/>
		{/if}
	</Canvas>
</div>

<style>
	.chart {
		position: relative;
		width: 100%;
		height: 100%;
	}
</style>
