<script lang="ts">
	import { Canvas } from '@threlte/core';
	import type { ColorSpace } from '../../color/colorSpaces';
	import type { Color } from '../../color/color';
	import type { Point3 } from '../../geom/point';
	import PointChartScene from './PointChartScene.svelte';
	import type { TrueDistanceType } from '../../geom/dist';

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
