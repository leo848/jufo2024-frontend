import type {Color} from "../../color/color";
import {RgbColor} from "../../color/colorSpaces";

const sep = "_"

export function fromUrlString(s: string): Color[] | null {
	let result = s.split(sep).map(s => {
		let number = Number.parseInt(s, 16);
		if (isNaN(number)) return null;
		return RgbColor.fromNumeric(number).color();
	});
	if (result.some(v => v == null)) return null;
	else return result as Color[];
}

export function toUrlString(colors: Color[]): string {
	return colors.map(c => c.rgb().numeric().toString(16)).join(sep);
}
