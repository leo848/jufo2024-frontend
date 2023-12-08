import type {Color} from "./color";
import {RgbColor} from "./colorSpaces";

const colorListCategories = [
	"default",
	"custom",
] as const;
type ColorListCategory = typeof colorListCategories[number];

type ColorList = { name: string, colors: Color[] };
type ColorListStorage = Record<ColorListCategory, ColorList[]>;

const defaultStorage: ColorListStorage = {
	"default": [
		{
			name: "pride",
			colors: [ 
		0xff1e26,
		0xfe941e,
		0xffff00,
		0x06bd00,
		0x001a98,
		0x760088,
			].map(num => RgbColor.fromNumeric(num).color())
		}
	],
	custom: [],
}

export function loadColorLists(): ColorListStorage {
	const raw: Partial<ColorListStorage> = JSON.parse(localStorage.getItem("color-list-values") ?? "{}");
	return Object.assign({}, defaultStorage, raw);
}

function saveColorLists(storage: Partial<ColorListStorage>) {
	const full = Object.assign({}, loadColorLists(), storage);
	localStorage.setItem("color-list-values", JSON.stringify(full));
}

export function saveColorList(list: ColorList) {
	const lists = loadColorLists();
	lists.custom.push(list);
	saveColorLists(lists);
}
