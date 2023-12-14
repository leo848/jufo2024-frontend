import { Color } from './color';
import { RgbColor } from './colorSpaces';
import { deepMap } from '../utils/deepMap';

export const colorListCategories = ['default', 'custom'] as const;
export type ColorListCategory = (typeof colorListCategories)[number];

export type ColorList = { name: string; description?: string; colors: Color[] };
export type ColorListStorage = Record<ColorListCategory, Record<string, ColorList>>;

const defaultStorage: ColorListStorage = {
	default: {
		pride: {
			name: 'pride',
			colors: [0xff1e26, 0xfe941e, 0xffff00, 0x06bd00, 0x001a98, 0x760088].map((num) =>
				RgbColor.fromNumeric(num).color()
			)
		}
	},
	custom: {}
};

export function loadColorLists(): ColorListStorage {
	const rawLoad: Partial<ColorListStorage> = JSON.parse(
		localStorage.getItem('color-list-values') ?? '{}'
	);
	const leafCond = (value: any) =>
		value &&
		typeof value === 'object' &&
		typeof value.r === 'number' &&
		typeof value.g === 'number' &&
		typeof value.b === 'number';
	const colorClasses: ColorListStorage = deepMap(
		rawLoad,
		(value: any) => {
			if (leafCond(value)) {
				return new Color(value.r, value.g, value.b);
			} else return value;
		},
		leafCond
	);
	console.log(colorClasses);
	return Object.assign({}, defaultStorage, colorClasses);
}

function saveColorLists(storage: Partial<ColorListStorage>) {
	const full = Object.assign({}, loadColorLists(), storage);
	localStorage.setItem('color-list-values', JSON.stringify(full));
}

export function saveColorList(list: ColorList) {
	const lists = loadColorLists();
	lists.custom[list.name] = list;
	saveColorLists(lists);
}
