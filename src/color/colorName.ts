import { z } from 'zod';
import type {RgbColor} from './colorSpaces';
import {handleColorNameApiError} from '../server/error';

const colorNameApiResponse = z.object({
	"colors": z.array(z.object({
		"name": z.string(),
		"rgb": z.object({r:z.string(),g:z.string(),b:z.string()}),
		distance: z.number().nonnegative(),
	})),
});

export type ColorNameMetadata = z.infer<typeof colorNameApiResponse>["colors"][0];

export async function getColorName(color: RgbColor): Promise<ColorNameMetadata> {
	let response, json;
	try {
		response = await fetch(`https://api.color.pizza/v1/?values=${color.numeric().toString(16)}`);
		json = await response.json();
	} catch (e) {
		handleColorNameApiError({ type: "noResponse" });
		return Promise.reject();
	}
	const parse = colorNameApiResponse.safeParse(json);
	if (!parse.success) {
		handleColorNameApiError({ type: "serde", error: parse.error.toString(), original: JSON.stringify(json) });
		return Promise.reject();
	} else {
		return parse.data.colors[0];
	}
}
