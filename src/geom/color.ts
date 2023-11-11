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

	set(color: Color): Color {
		this.r = color.r;
		this.g = color.g;
		this.b = color.b;
		return this;
	}
}

export type RgbComponent = 'r' | 'g' | 'b';
