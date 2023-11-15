import type { ColorComponent } from './color';
import type { AbstractColor } from './colorSpaces';

export function linearGradient<
	SpacedColor extends AbstractColor<SpacedColor, Comp>,
	Comp extends ColorComponent
>(defaultColor: SpacedColor, component: Comp): HTMLCanvasElement {
	const amount = defaultColor.neededGradientPoints(component);
	const gradientPoints: string[] = new Array(amount);
	for (let i = 0; i < amount; i++) {
		const testValue = i / (amount - 1);
		gradientPoints[i] = defaultColor.with(component, testValue).css();
	}
	return canvas(gradientPoints);
}

function canvas(points: string[]): HTMLCanvasElement {
	const size = 255;
	const canvas = document.createElement('canvas');
	canvas.width = canvas.height = size;
	const ctx = canvas.getContext('2d');
	if (!ctx) throw new Error('could not get context');
	ctx.rect(0, 0, size, size);
	const gradient = ctx?.createLinearGradient(0, size, 0, 0);
	for (let i = 0; i < points.length; i++) {
		gradient.addColorStop(i / (points.length - 1), points[i]);
	}
	ctx.fillStyle = gradient;
	ctx.fill();
	return canvas;
}
