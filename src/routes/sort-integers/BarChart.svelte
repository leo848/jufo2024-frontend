<script lang="ts">
	import * as THREE from 'three';
	import { Canvas, T } from '@threlte/core';
	import BarChartScene from './BarChartScene.svelte';
	import type { Highlight } from '../../server/types';

	export let content: { value: number; highlight?: Highlight }[];
</script>

<div class="chart">
	<Canvas shadows>
		<T is={THREE.FogExp2} args={['papayawhip', 0.05]} />
		<BarChartScene {content} />
	</Canvas>
</div>

<style>
	.chart {
		position: relative;
		width: 100%;
		height: 500px;
	}
</style>
