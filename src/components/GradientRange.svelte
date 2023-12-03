<script lang="ts">
	import { onMount } from 'svelte';
	import { rangeMap } from '../utils/math';
	import type { Color, ColorComponent } from '../color/color';
	import type { ColorSpace } from '../color/colorSpaces';
	import { tweened } from 'svelte/motion';
	import { sineIn } from 'svelte/easing';

	let wrapperDiv: HTMLDivElement;
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null = null;
	let width = 0,
		height = 0;

	export let value = 0.5;
	export let space: ColorSpace;
	export let comp: ColorComponent;
	export let color: Color;

	const observer = new ResizeObserver(initialize);

	const displayValue = tweened(value, { duration: 200, easing: sineIn });
	$: displayValue.set(value);

	function getGradient(): { points: string[]; current: string } {
		const spaced = color.space(space);
		if (!spaced.isComponent(comp)) {
			throw new Error(`invalid component ${comp} for ${space}`);
		}

		// eslint-disable-next-line
		const amount = spaced.neededGradientPoints(comp as never);
		const gradientPoints = new Array(amount);
		for (let i = 0; i < amount; i++) {
			const testValue = i / (amount - 1);
			gradientPoints[i] = spaced.with(comp as never, testValue).css();
		}
		return { points: gradientPoints, current: spaced.with(comp as never, value).css() };
	}

	function initialize() {
		observer.observe(wrapperDiv);

		width = canvas.width = wrapperDiv.offsetWidth;
		height = canvas.height = wrapperDiv.offsetHeight;
		const context = canvas.getContext('2d');
		if (!context) throw new Error('could not get canvas context');
		ctx = context;

		let mouseDown = false;
		function mouseDownEvent(evt: { offsetX: number }) {
			mouseDown = true;
			value = evt.offsetX / width;
		}
		function touchMoveEvent(evt: TouchEvent) {
			mouseDown = true;
			mouseMoveEvent({ offsetX: evt.changedTouches[0].clientX - canvas.getBoundingClientRect().x });
			mouseDown = false;
			evt.preventDefault();
		}
		function mouseUpEvent() {
			mouseDown = false;
		}
		function mouseMoveEvent(evt: { offsetX: number }) {
			if (mouseDown) {
				value = evt.offsetX / width;
				displayValue.set(value, { duration: 0 });
			}
		}
		canvas.addEventListener('mousedown', mouseDownEvent, false);
		canvas.addEventListener('mousedown', mouseDownEvent, false);
		canvas.addEventListener('mouseup', mouseUpEvent, false);
		canvas.addEventListener('mousemove', mouseMoveEvent, false);
		canvas.addEventListener('mouseleave', mouseUpEvent);
		canvas.addEventListener('touchmove', touchMoveEvent);
	}

	onMount(initialize);

	const rectPad = { x: 0, y: 5 };
	$: if (color && ctx) {
		ctx.clearRect(0, 0, width, height);

		const gradient = ctx.createLinearGradient(0, 0, width, 0);
		const { points, current } = getGradient();
		for (let i = 0; i < points.length; i++) {
			gradient.addColorStop(i / (points.length - 1), points[i]);
		}

		ctx.beginPath();
		ctx.fillStyle = gradient;
		ctx.roundRect(rectPad.x, rectPad.y, width - rectPad.x * 2, height - rectPad.y * 2, 20);
		ctx.fill();

		let x = rangeMap($displayValue, [0, 1], [height / 2, width - height / 2]);

		ctx.beginPath();
		ctx.arc(x, height / 2, height / 2, 0, Math.PI * 2);
		ctx.fillStyle = 'black';
		ctx.fill();
		ctx.beginPath();
		ctx.arc(x, height / 2, height / 2 - 3, 0, Math.PI * 2);
		ctx.fillStyle = 'white';
		ctx.fill();
		ctx.beginPath();
		ctx.arc(x, height / 2, height / 2 - 5, 0, Math.PI * 2);
		ctx.fillStyle = current;
		ctx.fill();
	}
</script>

<div class="w-full h-full" bind:this={wrapperDiv}>
	<canvas bind:this={canvas} />
</div>
