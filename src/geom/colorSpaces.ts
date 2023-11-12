import { constrain, rangeMap } from '../utils/math';
import {
	Color,
	type ColorComponent,
	type HsvComponent,
	type OklabComponent,
	type RgbComponent
} from './color';
import { toGamma, toLinear } from './linearity';
import { Point3 } from './point';

export abstract class AbstractColor<
	Self extends AbstractColor<Self, Component>,
	Component extends ColorComponent
> {
	abstract color(): Color;
	abstract point(): Point3;
	abstract css(): string;
	abstract fancyCss(): string | null;
	abstract with(key: Component, value: number): Self;
	abstract get(key: Component): number;
	abstract neededGradientPoints(key: Component): number;
	abstract values(): [number, number, number];
	abstract clone(): Self;
}

export class RgbColor implements AbstractColor<RgbColor, RgbComponent> {
	r: number;
	g: number;
	b: number;

	constructor(r: number, g: number, b: number) {
		this.r = constrain(r);
		this.g = constrain(g);
		this.b = constrain(b);
	}

	clone() {
		return new RgbColor(this.r, this.g, this.b);
	}

	static fromRgb(r: number, g: number, b: number): RgbColor {
		return new RgbColor(r, g, b);
	}

	color(): Color {
		return new Color(this.r, this.g, this.b);
	}

	point(): Point3 {
		return new Point3(this.r, this.g, this.b);
	}

	with(comp: RgbComponent, value: number): RgbColor {
		const color = this.clone();
		color[comp] = value;
		return color;
	}

	css(): string {
		const [r, g, b] = this.values().map((c) => Math.floor(c * 255));
		return `rgb(${r}, ${g}, ${b})`;
	}

	get(key: 'r' | 'g' | 'b'): number {
		return this[key];
	}

	neededGradientPoints(): number {
		return 2;
	}

	fancyCss(): string {
		const [r, g, b] = this.values().map((c) => Math.floor(c * 255));
		return `rgb(<span class="text-red-300">${r}</span>, <span class="text-green-300">${g}</span>, <span class="text-blue-300">${b}</span>)`;
	}

	values(): [number, number, number] {
		return [this.r, this.g, this.b];
	}
}

export class HsvColor implements AbstractColor<HsvColor, HsvComponent> {
	h: number; // 0..1
	s: number; // 0..1
	v: number; // 0..1

	constructor(h: number, s: number, v: number) {
		this.h = constrain(h);
		this.s = constrain(s);
		this.v = constrain(v);
	}

	clone(): HsvColor {
		return new HsvColor(this.h, this.s, this.v);
	}

	static fromRgb(r: number, g: number, b: number): HsvColor {
		const [max, min] = [Math.max(r, g, b), Math.min(r, g, b)];
		const delta = max - min;
		const h = delta < 0.001 ? 0 : HsvColor.#calculateHue(r, g, b, max, delta);
		const s = max < 0.001 ? 0 : delta / max;
		const v = max;
		return new HsvColor(h, s, v);
	}

	static #calculateHue(r: number, g: number, b: number, max: number, delta: number) {
		const sixty_deg = 1 / 6;
		if (max === r) {
			return sixty_deg * (((g - b) / delta) % 6);
		} else if (max === g) {
			return sixty_deg * ((b - r) / delta + 2);
		} else if (max === b) {
			return sixty_deg * ((r - g) / delta + 4);
		} else throw new Error('Invalid value for max');
	}

	color(): Color {
		const sixty_deg = 1 / 6;
		const { h, s, v } = this;
		const max = v;
		const chroma = s * v;
		const min = max - chroma;
		const normalHue = h / sixty_deg;
		const x = chroma * (1 - Math.abs((normalHue % 2) - 1));
		const [r1, g1, b1] = HsvColor.#calculateRgb(normalHue, chroma, x);
		const [r, g, b] = [r1 + min, g1 + min, b1 + min];
		return new Color(r, g, b);
	}

	static #calculateRgb(hue: number, c: number, x: number): [number, number, number] {
		if (hue >= 0 && hue < 1) {
			return [c, x, 0];
		} else if (hue < 2) {
			return [x, c, 0];
		} else if (hue < 3) {
			return [0, c, x];
		} else if (hue < 4) {
			return [0, x, c];
		} else if (hue < 5) {
			return [x, 0, c];
		} else if (hue <= 6) {
			return [c, 0, x];
		} else {
			throw new Error('Invalid hue: ' + hue);
		}
	}

	point(): Point3 {
		const { h, s, v } = this;
		const angle = h * 2 * Math.PI;
		const radius = s;
		const height = v;

		return new Point3(radius * Math.cos(angle), radius * Math.sin(angle), height);
	}

	css(): string {
		return this.color().rgb().css();
	}

	fancyCss(): null {
		return null;
	}

	with(comp: HsvComponent, value: number): HsvColor {
		const color = this.clone();
		color[comp] = value;
		return color;
	}

	get(key: 'h' | 's' | 'v'): number {
		return this[key];
	}

	neededGradientPoints(key: 'h' | 's' | 'v'): number {
		if (key === 'h') return 38;
		else return 2;
	}

	values(): [number, number, number] {
		return [this.h, this.s, this.v];
	}
}

export class OklabColor implements AbstractColor<OklabColor, OklabComponent> {
	l: number;
	a: number;
	b: number;

	constructor(l: number, a: number, b: number) {
		this.l = constrain(l);
		this.a = constrain(a);
		this.b = constrain(b);
	}

	clone(): OklabColor {
		return new OklabColor(this.l, this.a, this.b);
	}

	static fromRgb(r: number, g: number, b: number): OklabColor {
		const [linearR, linearG, linearB] = [r, g, b].map(toLinear);

		const l = Math.cbrt(0.4122214708 * linearR + 0.5363325363 * linearG + 0.0514459929 * linearB);
		const m = Math.cbrt(0.2119034982 * linearR + 0.6806995451 * linearG + 0.1073969566 * linearB);
		const s = Math.cbrt(0.0883024619 * linearR + 0.2817188376 * linearG + 0.6299787005 * linearB);

		const l1 = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
		const a1 = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
		const b1 = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;

		return new OklabColor(l1, rangeMap(a1, [-0.4, 0.4], [0, 1]), rangeMap(b1, [-0.4, 0.4], [0, 1]));
	}

	color(): Color {
		const l0 = this.l;
		const a0 = rangeMap(this.a, [0, 1], [-0.4, 0.4]);
		const b0 = rangeMap(this.b, [0, 1], [-0.4, 0.4]);

		const cube = (x: number) => x * x * x;
		const l = cube(l0 + 0.3963377774 * a0 + 0.2158037573 * b0);
		const m = cube(l0 - 0.1055613458 * a0 - 0.0638541728 * b0);
		const s = cube(l0 - 0.0894841775 * a0 - 1.291485548 * b0);

		const linearR = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
		const linearG = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
		const linearB = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

		const [r, g, b] = [linearR, linearG, linearB].map(toGamma);

		return new Color(r, g, b);
	}

	point(): Point3 {
		const { l, a, b } = this;
		return new Point3(a + 0.5, l, b + 0.5);
	}

	css(): string {
		// const l = this.l;
		// const a = rangeMap(this.a, [0, 1], [-100, 100]);
		// const b = rangeMap(this.b, [0, 1], [-100, 100]);
		// return `oklab(${l} ${a}% ${b}%)`;
		return this.color().rgb().css();
	}

	fancyCss(): string {
		const l = Math.floor(this.l * 100);
		const a = rangeMap(this.a, [0, 1], [-0.4, 0.4]).toFixed(2);
		const b = rangeMap(this.b, [0, 1], [-0.4, 0.4]).toFixed(2);
		// const aColor = this.a >= 0.5 ? "red-300" : "green-300";
		// const bColor = this.b >= 0.5 ? "amber-300": "blue-300";
		const aStyle = `color: color-mix(in oklab, white, oklab(0.5 ${a} 0))`;
		const bStyle = `color: color-mix(in oklab, white, oklab(0.5 0 ${b}))`;
		return `oklab(${l}% <span style="${aStyle}">${a}</span> <span style="${bStyle}">${b}</span>)`;
	}

	with(comp: OklabComponent, value: number): OklabColor {
		const color = this.clone();
		color[comp] = value;
		return color;
	}

	get(key: 'l' | 'a' | 'b'): number {
		return this[key];
	}

	neededGradientPoints(): number {
		return 20;
	}

	values(): [number, number, number] {
		return [this.l, this.a, this.b];
	}
}

export const colorSpaces = ['rgb', 'hsv', 'oklab'] as const;

export type ColorSpace = (typeof colorSpaces)[number];

export const colorSpaceClasses = {
	rgb: RgbColor,
	hsv: HsvColor,
	oklab: OklabColor
} as const;
