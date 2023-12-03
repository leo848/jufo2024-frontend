import { z } from 'zod';
import { RgbColor } from './colorSpaces';
import { handleColorNameApiError } from '../server/error';
import type { Color } from './color';

const colorNameApiResponse = z
	.object({
		colors: z.array(
			z
				.object({
					name: z.string(),
					rgb: z.object({ r: z.number(), g: z.number(), b: z.number() }),
					distance: z.number().nonnegative()
				})
				.strip()
		)
	})
	.strip();

export type ColorNameMetadata = z.infer<typeof colorNameApiResponse>['colors'][0] & {
	color: Color;
};

export const availableColorNameLists = [
	'default',
	'bestOf',
	'wikipedia',
	'french',
	'ridgway',
	'risograph',
	'basic',
	'chineseTraditional',
	'html',
	'japaneseTraditional',
	'leCorbusier',
	'nbsIscc',
	'ntc',
	'osxcrayons',
	'ral',
	'sanzoWadaI',
	'thesaurus',
	'werner',
	'windows',
	'x11',
	'xkcd'
] as const;

const colorNameListSchema = z.enum(availableColorNameLists);

export const colorNameListNames: Record<ColorNameList, string> = {
	basic: 'Einfach',
	html: 'HTML',
	japaneseTraditional: 'Traditionell Japanisch',
	leCorbusier: 'Le Corbusier',
	nbsIscc: 'Universelle Farbsprache',
	ntc: 'NTC.js',
	osxcrayons: 'macOS-Farben',
	ral: 'RAL',
	sanzoWadaI: 'Wada Sanzō',
	thesaurus: 'Farbthesaurus',
	werner: 'Werners Nomenklatur',
	windows: 'Windows',
	wikipedia: 'Wikipedia',
	french: 'Französisch',
	x11: 'X11',
	xkcd: 'XKCD',
	risograph: 'Risograph',
	chineseTraditional: 'Traditionell Chinesisch',
	default: 'Standard',
	bestOf: 'Best-of',
	ridgway: 'Ridgways Nomenklatur'
};

export type ColorNameList = z.infer<typeof colorNameListSchema>;

const colorNameListsApiResponse = z.object({
	availableColorNameLists: z.array(z.string()),
	listDescriptions: z.record(
		colorNameListSchema,
		z.object({
			title: z.string(),
			description: z.string(),
			source: z.string(),
			key: colorNameListSchema,
			license: z.optional(z.string()),
			colorCount: z.number(),
			url: z.string()
		})
	)
});

export type ColorNameListsMetadata = z.infer<typeof colorNameListsApiResponse>;
export type ColorNameListMetadata = ColorNameListsMetadata['listDescriptions'][ColorNameList];

let cachedColorNameLists: null | ColorNameListsMetadata = null;

export async function getColorNameLists(): Promise<ColorNameListsMetadata> {
	if (cachedColorNameLists != null) return cachedColorNameLists;
	let response, json;
	try {
		response = await fetch(`https://api.color.pizza/v1/lists/`);
		json = await response.json();
	} catch (e) {
		handleColorNameApiError({ type: 'noResponse' });
		return Promise.reject();
	}
	const parse = colorNameListsApiResponse.safeParse(json);
	if (!parse.success) {
		handleColorNameApiError({
			type: 'serde',
			error: parse.error.toString(),
			original: JSON.stringify(json)
		});
		return Promise.reject();
	} else {
		const data = parse.data;
		for (const key of availableColorNameLists) {
			data.listDescriptions[key]!.title = colorNameListNames[key];
		}
		cachedColorNameLists = parse.data;
		return parse.data;
	}
}

export async function getColorNameListInfo(
	colorNameList: ColorNameList
): Promise<ColorNameListMetadata> {
	const lists = await getColorNameLists();
	return lists.listDescriptions[colorNameList];
}

export async function getColorName(
	color: RgbColor,
	options?: { list?: ColorNameList }
): Promise<ColorNameMetadata> {
	const listKey = options?.list ?? 'default';
	let list: ColorNameList;
	try {
		const colorLists = await getColorNameLists();
		if (!colorLists.availableColorNameLists.includes(listKey)) {
			handleColorNameApiError({ type: 'invalidKey', key: listKey });
			return Promise.reject();
		} else {
			list = listKey;
		}
	} catch (e) {
		return Promise.reject();
	}

	let response, json;
	try {
		response = await fetch(`https://api.color.pizza/v1/?list=${list}&values=${color.hex()}`);
		json = await response.json();
	} catch (e) {
		handleColorNameApiError({ type: 'noResponse' });
		return Promise.reject();
	}
	const parse = colorNameApiResponse.safeParse(json);
	if (!parse.success) {
		handleColorNameApiError({
			type: 'serde',
			error: parse.error.toString(),
			original: JSON.stringify(json)
		});
		return Promise.reject();
	} else {
		const data = parse.data.colors[0];
		return Object.assign({}, data, {
			color: new RgbColor(data.rgb.r / 255, data.rgb.g / 255, data.rgb.b / 255).color()
		});
	}
}
