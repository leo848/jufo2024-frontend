<script lang="ts">
	import { onMount } from 'svelte';
	import { rangeMap } from '../../utils/math';
	import type { Color, ColorComponent } from '../../color/color';
	import type { ColorSpace } from '../../color/colorSpaces';
	import { tweened } from 'svelte/motion';

	let wrapperDiv: HTMLDivElement;
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null = null;
	let width = 0,
		height = 0;

	export let valueX = 0.5;
	export let valueY = 0.5;
	export let space: ColorSpace;
	export let compX: ColorComponent;
	export let compY: ColorComponent;
	export let color: Color;

	const displayValueX = tweened(valueX, { duration: 200 });
	const displayValueY = tweened(valueY, { duration: 200 });
	$: {
		displayValueX.set(valueX);
		displayValueY.set(valueY);
	}

	const lastUpdate = { timeout: null as null|NodeJS.Timeout, grad: new Date().getTime(), render: new Date().getTime() };
	let points: CanvasGradient[] = [];
	function getCurrent(): { current: string } {
		return {
			current: color
				.space(space)
				.with(compX as never, valueX)
				.css()
		};
	}
	function getGradient(ctx: CanvasRenderingContext2D): {
		gradients: CanvasGradient[];
		current: string;
	} {
		const spaced = color.space(space);
		if (!spaced.isComponent(compX)) {
			throw new Error(`invalid component ${compX} for ${space}`);
		}
		if (!spaced.isComponent(compY)) {
			throw new Error(`invalid component ${compY} for ${space}`);
		}
		const current = spaced.with(compX as never, valueX).css();
		if (points.length > 0 && new Date().getTime() - lastUpdate.grad < 1000) {
			lastUpdate.timeout && clearTimeout(lastUpdate.timeout);
			lastUpdate.timeout = setTimeout(() => (ctx = ctx), 1000);
			return { gradients: points, current };
		}
		lastUpdate.grad = new Date().getTime();

		// eslint-disable-next-line
		const amount = spaced.neededGradientPoints(compX as never);
		const yCount = 15;
		const gradients: CanvasGradient[] = new Array(yCount);
		for (let y = 0; y < yCount; y++) {
			const testValueY = y / (yCount - 1);
			gradients[y] = ctx.createLinearGradient(0, 0, width, 0);
			for (let x = 0; x < amount; x++) {
				const testValueX = x / (amount - 1);
				gradients[y].addColorStop(
					x / (amount - 1),
					spaced
						.with(compX as never, testValueX)
						.with(compY as never, testValueY)
						.css()
				);
			}
		}
		points = gradients;
		return { gradients, current };
	}

	let lastGradientUpdate = {
		timeout: null as null | NodeJS.Timeout,
		grad: new Date().getTime(),
		render: new Date().getTime(),
		imageData: null as null | ImageData
	};
	function get2DRgbGradient(ctx: CanvasRenderingContext2D): ImageData {
		if (
			lastGradientUpdate.imageData != null &&
			new Date().getTime() - lastGradientUpdate.grad < 1000
		) {
			lastGradientUpdate.timeout && clearTimeout(lastGradientUpdate.timeout);
			lastGradientUpdate.timeout = setTimeout(() => (ctx = ctx), 1000);
			return lastGradientUpdate.imageData;
		}
		lastGradientUpdate.grad = new Date().getTime();
		const imageData = ctx.getImageData(0, 0, width, height);
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				imageData.data[(y * width + x) * 4] =
					compX === 'r' ? x : compY === 'r' ? y : color.rgb().r * 255;
				imageData.data[(y * width + x) * 4 + 1] =
					compX === 'g' ? x : compY === 'g' ? y : color.rgb().g * 255;
				imageData.data[(y * width + x) * 4 + 2] =
					compX === 'b' ? x : compY === 'b' ? y : color.rgb().b * 255;
				imageData.data[(y * width + x) * 4 + 3] = 255;
			}
		}
		lastGradientUpdate.imageData = imageData;
		return imageData;
	}

	onMount(() => {
		width = canvas.width = wrapperDiv.offsetWidth;
		height = canvas.height = wrapperDiv.offsetHeight;
		const context = canvas.getContext('2d');
		if (!context) throw new Error('could not get canvas context');
		ctx = context;

		let mouseDown = false;
		function mouseDownEvent(evt: { offsetX: number; offsetY: number }) {
			mouseDown = true;
			valueX = evt.offsetX / width;
			valueY = evt.offsetY / width;
		}
		function touchMoveEvent(evt: TouchEvent) {
			mouseDown = true;
			mouseMoveEvent({
				offsetX: evt.changedTouches[0].clientX - canvas.getBoundingClientRect().x,
				offsetY: evt.changedTouches[0].clientY - canvas.getBoundingClientRect().y
			});
			mouseDown = false;
			evt.preventDefault();
		}
		function mouseUpEvent() {
			mouseDown = false;
		}
		function mouseMoveEvent(evt: { offsetX: number; offsetY: number }) {
			if (mouseDown) {
				valueX = evt.offsetX / width;
				displayValueX.set(valueX, { duration: 0 });
				valueY = evt.offsetY / height;
				displayValueY.set(valueY, { duration: 0 });
			}
		}
		canvas.addEventListener('mousedown', mouseDownEvent, false);
		canvas.addEventListener('mousedown', mouseDownEvent, false);
		canvas.addEventListener('mouseup', mouseUpEvent, false);
		canvas.addEventListener('mousemove', mouseMoveEvent, false);
		canvas.addEventListener('mouseleave', mouseUpEvent);
		canvas.addEventListener('touchmove', touchMoveEvent);
	});

	$: if (color && ctx) {
		ctx.clearRect(0, 0, width, height);

		const { current } = getCurrent();
		if (space !== 'rgb') {
			const { gradients } = getGradient(ctx);

			for (let y = 0; y < gradients.length; y++) {
				ctx.beginPath();
				ctx.fillStyle = gradients[y];
				ctx.rect(0, (height * y) / points.length, width, height / points.length + 1);
				ctx.fill();
			}
		} else {
			ctx.putImageData(get2DRgbGradient(ctx), 0, 0);
		}

		let x = rangeMap($displayValueX, [0, 1], [20, width - 20]);
		let y = rangeMap($displayValueY, [0, 1], [20, height - 20]);

		ctx.beginPath();
		ctx.arc(x, y, 20, 0, Math.PI * 2);
		ctx.fillStyle = 'black';
		ctx.fill();
		ctx.beginPath();
		ctx.arc(x, y, 17, 0, Math.PI * 2);
		ctx.fillStyle = 'white';
		ctx.fill();
		ctx.beginPath();
		ctx.arc(x, y, 15, 0, Math.PI * 2);
		ctx.fillStyle = current;
		ctx.fill();
	}
</script>

<div class="w-full h-full rounded-xl" bind:this={wrapperDiv}>
	<canvas bind:this={canvas} class="rounded-xl" />
</div>
