<script lang="ts">
	import { onMount } from 'svelte';
	import { lerp, rangeMap } from '../utils/math';
	import { tweened, type Tweened } from 'svelte/motion';
	import { cubicOut, quadInOut } from 'svelte/easing';

	export let distances: number[];
	export let selectedIndex: number | null = null;

	let wrapperDiv: HTMLDivElement;
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null = null;
	let width = 0,
		height = 0;

	onMount(() => {
		width = canvas.width = wrapperDiv.offsetWidth;
		height = canvas.height = wrapperDiv.offsetHeight;
		const context = canvas.getContext('2d');
		if (!context) throw new Error('could not get canvas context');
		ctx = context;
	});

	let animDistances: Tweened<{ dist: number; color: string }[]> = tweened(
		distances.map((dist) => ({ dist, color: '#aaa' })),
		{
			duration: 500,
			easing: quadInOut,
			interpolate(a: { dist: number; color: string }[], b: { dist: number; color: string }[]) {
				if (a.length !== b.length) return () => b;
				const setB = new Set(b.map(({ dist }) => dist));
				return (t) => {
					return a.map((valueA, index) => {
						const valueB = b[index];
						if (valueA.dist === valueB.dist || setB.has(valueA.dist)) return valueB;
						return {
							dist: lerp([valueA.dist, valueB.dist], t),
							color: valueA.dist < valueB.dist ? '#faa' : '#afa'
						};
					});
				};
			}
		}
	);

	$: distances,
		($animDistances = distances.map((dist, index) => ({
			dist,
			color: index === selectedIndex || index + 1 === selectedIndex ? '#fff' : '#aaa'
		})));

	let max = tweened(distances[0], { duration: 1000, easing: cubicOut });
	let min = 0;

	$: if (ctx) {
		ctx.clearRect(0, 0, width, height);

		let localMax = distances[0];

		for (const { dist } of $animDistances) {
			if (dist > $max) {
				max.set(dist);
			}
			localMax = Math.max(dist, localMax);
			min = Math.min(dist, min);
		}
		if (localMax * 1.9 < $max) {
			max.set(localMax);
		}
		let maxBound = $max ?? localMax;

		ctx.beginPath();
		ctx.fillStyle = '#555';
		ctx.rect(0, height / 2 - 2, width, 4);
		ctx.fill();

		const logScale = Math.floor(Math.log10(maxBound - min) - 0.2);
		const scale = 10 ** logScale;
		let gridX = 0;
		while (gridX < maxBound) {
			gridX += scale;
			const x = rangeMap(gridX, [min, maxBound], [10, width - 10]);
			ctx.beginPath();
			ctx.font = '12px Inter';
			ctx.fillStyle = '#888';
			ctx.fillText(gridX.toFixed(1), x, height / 2 - 10);
		}

		const rectWidth = 4;

		for (const { dist, color } of $animDistances) {
			const x = rangeMap(dist, [min, maxBound], [10, width - 10]);
			ctx.beginPath();
			ctx.fillStyle = color;
			ctx.roundRect(x - rectWidth / 2, 12.5, rectWidth, height - 25, 6);
			ctx.fill();
		}
	}
</script>

<div class="w-full h-full rounded-xl" bind:this={wrapperDiv}>
	<canvas bind:this={canvas} class="rounded-xl" />
</div>
