import { constrain, matrixVectorMultiplication, rangeMap } from '../utils/math';
import {
	Color,
	type ColorComponent,
	type CmyComponent,
	type HsvComponent,
	type LabComponent,
	type RgbComponent,
	type HslComponent,
	type XyzComponent
} from './color';
import { linearGradient } from './gradient';
import { toGamma, toLinear } from './linearity';
import { Point3 } from '../geom/point';

export abstract class AbstractColor<
	Self extends AbstractColor<Self, Component>,
	Component extends ColorComponent
> {
	abstract color(): Color;
	point(): Point3 {
		const xyzComponents = this.xyzComponents();
		if (xyzComponents.some((c) => c == null))
			return new Point3(this.values()[0], this.values()[1], this.values()[2]);
		const [x, y, z] = xyzComponents.map((key) => this.get(key!));
		return new Point3(x, y, z);
	}
	abstract components(): Component[];
	xyzComponents(): [Component | null, Component | null, Component | null] {
		const comps = this.components();
		if (comps.length !== 3) throw new Error('Invalid color');
		const [x, y, z] = comps;
		return [x, y, z];
	}
	abstract with(key: Component, value: number): Self;
	abstract get(key: Component): number;
	abstract neededGradientPoints(key: Component): number;
	abstract clone(): Self;
	abstract gradientTexture(key: Component): HTMLCanvasElement;
	css(): string {
		return this.color().rgb().css();
	}
	values(): [number, number, number] {
		const comps = this.components();
		return [this.get(comps[0]), this.get(comps[1]), this.get(comps[2])];
	}
	isComponent(maybeComponent: ColorComponent): maybeComponent is Component {
		return (this.components() as ColorComponent[]).includes(maybeComponent);
	}
	fancyCss(): string | null {
		return null;
	}
	approxEqualsValues(other: [number, number, number], threshold: number = 0.01) {
		return (
			this.values()
				.map((v, i) => Math.abs(v - other[i]))
				.reduce((a, b) => a + b) < threshold
		);
	}
}

export class RgbColor extends AbstractColor<RgbColor, RgbComponent> {
	r: number;
	g: number;
	b: number;

	constructor(r: number, g: number, b: number) {
		super();
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

	fancyCss(): string {
		const [r, g, b] = this.values().map((c) => Math.floor(c * 255));
		return `rgb(<span class="text-red-300">${r}</span>, <span class="text-green-300">${g}</span>, <span class="text-blue-300">${b}</span>)`;
	}

	hex(): string {
		const [r, g, b] = this.values().map((c: number) => Math.floor(c * 255));
		const str = [r, g, b]
			.map((comp) => {
				let str = comp.toString(16);
				if (str.length === 1) str = '0' + str;
				return str;
			})
			.reduce((s1, s2) => s1 + s2);
		return str;
	}

	fancyHex(): string {
		const [r, g, b] = this.values().map((c: number) => Math.floor(c * 255));
		const str = [r, g, b]
			.map((comp, index) => {
				let str = comp.toString(16);
				if (str.length === 1) str = '0' + str;
				const color = ['red', 'green', 'blue'][index];
				return `<span class="text-${color}-300">${str}</span>`;
			})
			.reduce((s1, s2) => s1 + s2);
		return '#' + str;
	}

	get(key: 'r' | 'g' | 'b'): number {
		return this[key];
	}

	neededGradientPoints(): number {
		return 2;
	}

	components(): ['r', 'g', 'b'] {
		return ['r', 'g', 'b'];
	}

	numeric(): number {
		const [r, g, b] = this.values().map((c) => Math.floor(c * 255));
		return (r << 16) + (g << 8) + b;
	}

	static fromNumeric(hex: number): RgbColor {
		const b = hex & 0xff;
		hex /= 0x100;
		const g = hex & 0xff;
		hex /= 0x100;
		const r = hex & 0xff;
		return new RgbColor(r / 255, g / 255, b / 255);
	}

	gradientTexture(key: 'r' | 'g' | 'b'): HTMLCanvasElement {
		return linearGradient(new RgbColor(0, 0, 0), key);
	}
}

export class HsvColor extends AbstractColor<HsvColor, HsvComponent> {
	h: number; // 0..1
	s: number; // 0..1
	v: number; // 0..1

	constructor(h: number, s: number, v: number) {
		super();
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
		let h = delta < 0.001 ? 0 : HsvColor.#calculateHue(r, g, b, max, delta);
		if (h > 1) h -= 1;
		if (h < 0) h += 1;
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

		return new Point3(
			(radius * Math.cos(angle)) / 2 + 0.5,
			height,
			(radius * Math.sin(angle)) / 2 + 0.5
		);
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
		else return 3;
	}

	gradientTexture(key: 'h' | 's' | 'v'): HTMLCanvasElement {
		return linearGradient(new HsvColor(0, 1, 1), key);
	}

	components(): ['h', 's', 'v'] {
		return ['h', 's', 'v'];
	}

	xyzComponents(): [null, 'v', null] {
		return [null, 'v', null];
	}
}

export class HslColor extends AbstractColor<HslColor, HslComponent> {
	h: number;
	s: number;
	l: number;

	constructor(h: number, s: number, l: number) {
		super();
		this.h = h;
		this.s = s;
		this.l = l;
	}

	static fromRgb(r: number, g: number, b: number): HslColor {
		const { abs } = Math;
		const [max, min] = [Math.max(r, g, b), Math.min(r, g, b)];
		const delta = max - min;
		let h = delta < 0.001 ? 0 : HslColor.#calculateHue(r, g, b, max, delta);
		if (h > 1) h -= 1;
		if (h < 0) h += 1;
		const l = (max + min) / 2;
		const s = max < 0.001 ? 0 : delta / (1 - abs(2 * l - 1));
		return new HslColor(h, s, l);
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

	point(): Point3 {
		const { h, s, l } = this;
		const angle = h * 2 * Math.PI;
		const radius = s;
		const height = l;

		return new Point3(
			(radius * Math.cos(angle)) / 2 + 0.5,
			height,
			(radius * Math.sin(angle)) / 2 + 0.5
		);
	}

	color(): Color {
		const { abs } = Math;
		const sixty_deg = 1 / 6;
		const { h, s, l } = this;
		const chroma = s * (1 - abs(2 * l - 1));
		const normalHue = h / sixty_deg;
		const x = chroma * (1 - Math.abs((normalHue % 2) - 1));
		const min = l - chroma / 2;
		const [r1, g1, b1] = HslColor.#calculateRgb(normalHue, chroma, x);
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

	components(): ['h', 's', 'l'] {
		return ['h', 's', 'l'];
	}

	get(key: 'h' | 's' | 'l'): number {
		return this[key];
	}

	with(key: 'h' | 's' | 'l', value: number): HslColor {
		const color = this.clone();
		color[key] = value;
		return color;
	}

	clone(): HslColor {
		return new HslColor(this.h, this.s, this.l);
	}

	values(): [number, number, number] {
		return [this.h, this.s, this.l];
	}

	xyzComponents(): [null, 'l', null] {
		return [null, 'l', null];
	}

	gradientTexture(key: 'h' | 's' | 'l'): HTMLCanvasElement {
		return linearGradient(new HslColor(0, 1, 0.5), key);
	}

	neededGradientPoints(key: 'h' | 's' | 'l'): number {
		if (key === 'h') return 38;
		else return 3;
	}

	fancyCss(): string {
		const h = Math.round(this.h * 360) + '';
		const s = Math.round(this.s * 100) + '%';
		const l = Math.round(this.l * 100) + '%';
		const hStyle = `color: color-mix(in oklab, #ccc, hsl(${h} 100% 50%))`;
		const sStyle = `color: color-mix(in oklab, #ccc, hsl(0 ${s} 50%))`;
		const lStyle = `color: color-mix(in oklab, #ccc 60%, hsl(0 0% ${l}))`;
		return `hsl(<span style="${hStyle}">${h}</span> <span style="${sStyle}">${s}</span> <span style="${lStyle}">${l}</span>)`;
	}
}

export class OklabColor extends AbstractColor<OklabColor, LabComponent> {
	l: number;
	a: number;
	b: number;

	constructor(l: number, a: number, b: number) {
		super();
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
		return new Point3(a, l, b);
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

	with(comp: LabComponent, value: number): OklabColor {
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

	gradientTexture(key: 'l' | 'a' | 'b'): HTMLCanvasElement {
		return linearGradient(new OklabColor(0.5, 0.5, 0.5), key);
	}

	components(): ['l', 'a', 'b'] {
		return ['l', 'a', 'b'];
	}

	xyzComponents(): ['a', 'l', 'b'] {
		return ['a', 'l', 'b'];
	}

	lerp(other: OklabColor, t: number): OklabColor {
		return new OklabColor(
			this.l + (other.l - this.l) * t,
			this.a + (other.a - this.a) * t,
			this.b + (other.b - this.b) * t
		);
	}
}

export class XyzColor extends AbstractColor<XyzColor, XyzComponent> {
	x: number;
	y: number;
	z: number;

	constructor(x: number, y: number, z: number) {
		super();
		this.x = constrain(x);
		this.y = constrain(y);
		this.z = constrain(z);
	}

	static fromRgb(gammaR: number, gammaG: number, gammaB: number): XyzColor {
		const { r, g, b } = LinearRgbColor.fromRgb(gammaR, gammaG, gammaB);

		const matrix = [
			[0.4124564, 0.3575761, 0.1804375],
			[0.2126729, 0.7151522, 0.072175],
			[0.0193339, 0.119192, 0.9503041]
		];

		const [x, y, z] = matrixVectorMultiplication(matrix, [r, g, b]);

		return new XyzColor(x, y, z);
	}

	color(): Color {
		const { x, y, z } = this;

		const invMatrix = [
			[3.2404542, -1.5371385, -0.4985314],
			[-0.969266, 1.8760108, 0.041556],
			[0.0556434, -0.2040259, 1.0572252]
		];

		const [r, g, b] = matrixVectorMultiplication(invMatrix, [x, y, z]);

		return new LinearRgbColor(r, g, b).color();
	}

	components(): ('x' | 'y' | 'z')[] {
		return ['x', 'y', 'z'];
	}

	get(key: 'x' | 'y' | 'z'): number {
		return this[key];
	}

	with(key: 'x' | 'y' | 'z', value: number): XyzColor {
		const c = this.clone();
		c[key] = value;
		return c;
	}

	clone(): XyzColor {
		return new XyzColor(this.x, this.y, this.z);
	}

	neededGradientPoints(_key: 'y' | 'x' | 'z'): number {
		return 20;
	}

	gradientTexture(key: 'y' | 'x' | 'z'): HTMLCanvasElement {
		return linearGradient(new XyzColor(0.5, 0.5, 0.5), key);
	}
}

export class CielabColor extends AbstractColor<CielabColor, LabComponent> {
	l: number;
	a: number;
	b: number;

	static κ = 24389 / 27;
	static ϵ = 216 / 24389;
	static d65 = [0.9504, 1, 1.0888];

	constructor(l: number, a: number, b: number) {
		super();
		this.l = l;
		this.a = a;
		this.b = b;
	}

	static fromRgb(r: number, g: number, b: number): CielabColor {
		const {
			κ,
			ϵ,
			d65: [Xr, Yr, Zr]
		} = CielabColor;
		const xyz = XyzColor.fromRgb(r, g, b);
		const [xr, yr, zr] = [xyz.x / Xr, xyz.y / Yr, xyz.z / Zr];
		const [fx, fy, fz] = [
			xr > ϵ ? Math.cbrt(xr) : (κ * xr + 16) / 116,
			yr > ϵ ? Math.cbrt(yr) : (κ * yr + 16) / 116,
			zr > ϵ ? Math.cbrt(zr) : (κ * zr + 16) / 116
		];
		const [l, valueA, valueB] = [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
		const [normalL, normalA, normalB] = [
			rangeMap(l, [0, 120], [0, 1]),
			rangeMap(valueA, [-100, 100], [0, 1]),
			rangeMap(valueB, [-100, 100], [0, 1])
		];
		return new CielabColor(normalL, normalA, normalB);
	}

	color(): Color {
		const { l: normalL, a: normalA, b: normalB } = this;
		const [l, a, b] = [
			rangeMap(normalL, [0, 1], [0, 120]),
			rangeMap(normalA, [0, 1], [-100, 100]),
			rangeMap(normalB, [0, 1], [-100, 100])
		];
		const {
			κ,
			ϵ,
			d65: [Xr, Yr, Zr]
		} = CielabColor;
		const fy = (l + 16) / 116;
		const fz = fy - b / 200;
		const fx = a / 500 + fy;
		const [xr, yr, zr] = [
			Math.pow(fx, 3) > ϵ ? Math.pow(fx, 3) : (116 * fx - 16) / κ,
			l > κ * ϵ ? Math.pow((l + 16) / 116, 3) : l / κ,
			Math.pow(fz, 3) > ϵ ? Math.pow(fz, 3) : (116 * fx - 16) / κ
		];
		const [x, y, z] = [xr * Xr, yr * Yr, zr * Zr];
		return new XyzColor(x, y, z).color();
	}

	clone(): CielabColor {
		return new CielabColor(this.l, this.a, this.b);
	}

	with(key: 'l' | 'a' | 'b', value: number): CielabColor {
		let c = this.clone();
		c[key] = value;
		return c;
	}

	get(key: 'l' | 'a' | 'b'): number {
		return this[key];
	}

	xyzComponents(): ['a', 'l', 'b'] {
		return ['a', 'l', 'b'];
	}

	components(): ('b' | 'l' | 'a')[] {
		return ['l', 'a', 'b'];
	}

	neededGradientPoints(_key: 'b' | 'l' | 'a'): number {
		return 20;
	}
	gradientTexture(key: 'b' | 'l' | 'a'): HTMLCanvasElement {
		return linearGradient(new CielabColor(0.5, 0.0, 0.0), key);
	}
}

export class LinearRgbColor extends AbstractColor<LinearRgbColor, RgbComponent> {
	r: number;
	g: number;
	b: number;

	constructor(r: number, g: number, b: number) {
		super();
		this.r = r;
		this.g = g;
		this.b = b;
	}

	clone(): LinearRgbColor {
		return new LinearRgbColor(this.r, this.g, this.b);
	}

	color(): Color {
		return new Color(toGamma(this.r), toGamma(this.g), toGamma(this.b));
	}

	components(): ['r', 'g', 'b'] {
		return ['r', 'g', 'b'];
	}

	static fromRgb(r: number, g: number, b: number): LinearRgbColor {
		return new LinearRgbColor(toLinear(r), toLinear(g), toLinear(b));
	}

	neededGradientPoints(_key: 'r' | 'g' | 'b'): number {
		return 10;
	}

	get(key: 'r' | 'g' | 'b'): number {
		return this[key];
	}

	with(key: 'r' | 'g' | 'b', value: number): LinearRgbColor {
		const color = this.clone();
		color[key] = value;
		return color;
	}

	point(): Point3 {
		return new Point3(this.r, this.g, this.b);
	}

	gradientTexture(key: 'r' | 'g' | 'b'): HTMLCanvasElement {
		return linearGradient(new LinearRgbColor(0, 0, 0), key);
	}
}

export class CmyColor extends AbstractColor<CmyColor, CmyComponent> {
	c: number;
	m: number;
	y: number;

	constructor(c: number, m: number, y: number) {
		super();
		this.c = c;
		this.m = m;
		this.y = y;
	}

	components(): ['c', 'm', 'y'] {
		return ['c', 'm', 'y'];
	}

	clone(): CmyColor {
		return new CmyColor(this.c, this.m, this.y);
	}

	get(key: 'c' | 'm' | 'y'): number {
		return this[key];
	}

	with(key: 'c' | 'm' | 'y', value: number): CmyColor {
		const col = this.clone();
		col[key] = value;
		return col;
	}

	gradientTexture(key: 'c' | 'm' | 'y'): HTMLCanvasElement {
		return linearGradient(new CmyColor(0, 0, 0), key);
	}

	neededGradientPoints(_key: 'c' | 'm' | 'y'): number {
		return 15;
	}

	color(): Color {
		return new Color(1 - this.c, 1 - this.m, 1 - this.y);
	}

	static fromRgb(r: number, g: number, b: number): CmyColor {
		return new CmyColor(1 - r, 1 - g, 1 - b);
	}
}

export const colorSpaces = ['rgb', 'hsv', 'hsl', 'oklab', 'lrgb', 'cmy', 'xyz', 'cielab'] as const;

export type ColorSpace = (typeof colorSpaces)[number];

export const colorSpaceClasses = {
	rgb: RgbColor,
	hsv: HsvColor,
	hsl: HslColor,
	oklab: OklabColor,
	lrgb: LinearRgbColor,
	cmy: CmyColor,
	xyz: XyzColor,
	cielab: CielabColor
} as const satisfies Record<ColorSpace, {}>;
