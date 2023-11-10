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

	rgb(): RgbColor {
		return RgbColor.fromRgb(this.r, this.g, this.b);
	}
}
