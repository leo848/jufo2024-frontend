import { z } from 'zod';
import {
	AbstractColor,
	HsvColor,
	OklabColor,
	RgbColor,
	type ColorSpace,
	colorSpaceClasses
} from './colorSpaces';
import { getColorName, type ColorNameMetadata, type ColorNameList } from './colorName';

export type PlainColor = {
	r: number;
	g: number;
	b: number;
};

export class Color {
	#r: number;
	#g: number;
	#b: number;

	#cached: {
		colorNameMetadata: Partial<Record<ColorNameList, ColorNameMetadata>>;
	};

	constructor(r: number, g: number, b: number) {
		this.#r = r;
		this.#g = g;
		this.#b = b;

		this.#cached = {
			colorNameMetadata: {}
		};
	}

	rgbMap(f: (comp: number) => number): Color {
		const { r, g, b } = this.rgb();
		return new Color(f(r), f(g), f(b));
	}

	#toColor<T>(construct: (r: number, g: number, b: number) => T): T {
		return construct(this.#r, this.#g, this.#b);
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

	space<Space extends ColorSpace>(space: Space): InstanceType<(typeof colorSpaceClasses)[Space]> {
		// Typensicherheit:
		// - colorSpaceClasses[space] gibt die space zugehörige Klasse zurück
		// - Die Klasse hat die statische Methode `fromRgb`, die eine Instanz erstellt
		// - Diese ist eine Instanz ebendieser Klasse, sodass der Cast valide ist
		return colorSpaceClasses[space].fromRgb(this.#r, this.#g, this.#b) as InstanceType<
			(typeof colorSpaceClasses)[Space]
		>;
	}

	clone(): Color {
		return new Color(this.#r, this.#g, this.#b);
	}

	plain(): PlainColor {
		return { r: this.#r, g: this.#g, b: this.#b };
	}

	proxy<
		Color extends AbstractColor<Color, Comp>,
		Comp extends ColorComponent,
		T extends AbstractColor<Color, Comp>
	>(colorClass: { fromRgb: (r: number, g: number, b: number) => T }): T {
		const proxy = new Proxy(this, {
			get(target, p, receiver) {
				const conv = colorClass.fromRgb(target.#r, target.#g, target.#b);
				if (typeof p === 'string' && p in conv) {
					const value: number = (conv as unknown as Record<string, number>)?.[p];
					return value;
				} else return Reflect.get(target, p, receiver);
			},
			set(target, p, newValue, receiver) {
				const conv = colorClass.fromRgb(target.#r, target.#g, target.#b);
				if (typeof p === 'string' && p in conv) {
					Object.assign(conv, { [p]: newValue });
					target.set(conv.color());
					return true;
				} else {
					return Reflect.set(target, p, newValue, receiver);
				}
			}
		});
		// Woher wissen wir, dass proxy ein T ist?
		// - Für jede Property p von T gibt proxy[p] T[p] zurück.
		// Somit ist proxy ein T.
		return proxy as unknown as T;
	}

	set(color: Color): Color {
		this.#r = color.#r;
		this.#g = color.#g;
		this.#b = color.#b;
		this.#cached = {
			colorNameMetadata: {}
		};
		return this;
	}

	async name(nameList?: ColorNameList): Promise<ColorNameMetadata> {
		const list = nameList || 'default';
		const cacheItem = this.#cached.colorNameMetadata[list];
		if (cacheItem) return cacheItem;
		const meta = await getColorName(this.rgb(), { list: nameList });
		if (nameList) this.#cached.colorNameMetadata[nameList] = meta;
		return meta;
	}

	approxEquals(other: Color): boolean {
		return this.rgb().numeric() == other.rgb().numeric();
	}

	toJSON(): PlainColor {
		return this.plain();
	}
}

export class NamedColor extends Color {
	#name: string;

	constructor(r: number, g: number, b: number, name: string) {
		super(r, g, b);
		this.#name = name;
	}

	static fromColor(color: Color, name: string): NamedColor {
		let rgb = color.rgb();
		return new NamedColor(rgb.r, rgb.g, rgb.b, name);
	}

	async name(list?: ColorNameList): Promise<ColorNameMetadata> {
		const meta = await super.name(list);
		meta.name = this.#name;
		return meta;
	}
}

export const rgbComponentSchema = z.enum(['r', 'g', 'b']);
export type RgbComponent = z.infer<typeof rgbComponentSchema>;
export const hsvComponentSchema = z.enum(['h', 's', 'v']);
export type HsvComponent = z.infer<typeof hsvComponentSchema>;
export const hslComponentSchema = z.enum(['h', 's', 'l']);
export type HslComponent = z.infer<typeof hslComponentSchema>;
export const oklabComponentSchema = z.enum(['l', 'a', 'b']);
export type LabComponent = z.infer<typeof oklabComponentSchema>;
export const cmyComponentSchema = z.enum(['c', 'm', 'y']);
export type CmyComponent = z.infer<typeof cmyComponentSchema>;
export const xyzComponentSchema = z.enum(['x','y','z']);
export type XyzComponent = z.infer<typeof xyzComponentSchema>;
export type ColorComponent = RgbComponent | HsvComponent | LabComponent | CmyComponent | XyzComponent;
