import type {Color} from '../color/color';

export function gradient(
	colors: Color[],
	options: {smooth?: boolean; gradientFunction?: string} = {
		smooth: false,
		gradientFunction: 'linear-gradient'
	}
) {
	let str = `${options.gradientFunction ?? 'linear-gradient'}(90deg, `;
	for (let i = 0; i < colors.length; i++) {
		const v = i / colors.length;
		const v2 = (i + 1) / colors.length;
		str += colors[i].rgb().css() + ' ' + v * 100 + '%, ';
		if (!options?.smooth) {
			str += colors[i].rgb().css() + ' ' + v2 * 100 + '%, ';
		}
	}
	str = str.substring(0, str.length - 2) + ')';
	return str;
}
