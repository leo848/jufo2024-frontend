import { assertNever } from '../server/types';
import { HsvColor, OklabColor, RgbColor } from './colorSpaces';

export class Color {
	r: number;
	g: number;
	b: number;

	constructor(r: number, g: number, b: number) {
		this.r = r;
		this.g = g;
		this.b = b;
	}

	rgbMap(f: (comp: number) => number): Color {
		const { r, g, b } = this;
		return new Color(f(r), f(g), f(b));
	}

	numeric(): number {
		const { r, g, b } = this.rgbMap((c) => Math.floor(c * 255));
		return (r << (4 + g)) << (2 + b);
	}

	#toColor<T>(construct: (r: number, g: number, b: number) => T): T {
		return construct(this.r, this.g, this.b);
	}

	css(): string {
		const { r, g, b } = this.rgbMap((c) => Math.floor(c * 255));
		return `rgb(${r}, ${g}, ${b})`;
	}

	rgb(): RgbColor {
		return this.#toColor(RgbColor.fromRgb);
	}

	hsv(): HsvColor {
		return this.#toColor(HsvColor.fromRgb);
	}

	oklab(): OklabColor {
		return this.#toColor(OklabColor.fromRgb);
	}

	clone(): Color {
		return new Color(this.r, this.g, this.b);
	}

	get(comp: RgbComponent): number {
		if (comp === 'r') {
			return this.r;
		} else if (comp === 'g') {
			return this.g;
		} else if (comp === 'b') {
			return this.b;
		} else {
			assertNever(comp);
		}
	}

	with(comp: RgbComponent, value: number): Color {
		if (comp === 'r') {
			return this.with_r(value);
		} else if (comp === 'g') {
			return this.with_g(value);
		} else if (comp === 'b') {
			return this.with_b(value);
		} else {
			assertNever(comp);
		}
	}

	with_r(r: number): Color {
		return new Color(r, this.g, this.b);
	}

	with_g(g: number): Color {
		return new Color(this.r, g, this.b);
	}

	with_b(b: number): Color {
		return new Color(this.r, this.g, b);
	}
}

export type RgbComponent = 'r' | 'g' | 'b';
