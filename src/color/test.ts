import type { Color } from './color';
import { RgbColor } from './colorSpaces';

export function randomColors(n: number): Color[] {
	return new Array(n)
		.fill(0)
		.map((_) => new RgbColor(Math.random(), Math.random(), Math.random()).color());
}
