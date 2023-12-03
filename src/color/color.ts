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
}

export const rgbComponentSchema = z.enum(['r', 'g', 'b']);
export type RgbComponent = z.infer<typeof rgbComponentSchema>;
export const hsvComponentSchema = z.enum(['h', 's', 'v']);
export type HsvComponent = z.infer<typeof hsvComponentSchema>;
export const oklabComponentSchema = z.enum(['l', 'a', 'b']);
export type OklabComponent = z.infer<typeof oklabComponentSchema>;
export const cmyComponentSchema = z.enum(['c', 'm', 'y']);
export type CmyComponent = z.infer<typeof cmyComponentSchema>;
export type ColorComponent = RgbComponent | HsvComponent | OklabComponent | CmyComponent;
