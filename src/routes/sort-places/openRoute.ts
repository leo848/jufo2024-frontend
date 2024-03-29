import { z } from 'zod';
import { handleOpenRouteApiError } from '../../server/error';

export const LatLngArray = z.tuple([z.number(), z.number()]);
export type LatLngArray = [number, number];

export const OpenRouteMatrixInput = z.object({
	locations: z.array(LatLngArray)
});
export type OpenRouteMatrixInput = z.infer<typeof OpenRouteMatrixInput>;

export const OpenRouteMatrixResponse = z.object({
	durations: z.array(z.array(z.number())),
	metadata: z.object({
		query: OpenRouteMatrixInput
	})
});
export type OpenRouteMatrixResponse = z.infer<typeof OpenRouteMatrixResponse>;

export async function getDurationMatrix(
	input: OpenRouteMatrixInput
): Promise<OpenRouteMatrixResponse> {
	let response, json;
	try {
		response = await fetch('https://api.openrouteservice.org/v2/matrix/driving-car', {
			method: 'POST',
			body: JSON.stringify(input),
			headers: {
				Authorization: process.env.OPENROUTE_KEY as string
			}
		});
		json = await response.json();
	} catch (e) {
		handleOpenRouteApiError({ type: 'noResponse' });
		return Promise.reject();
	}

	const parse = OpenRouteMatrixResponse.safeParse(json);
	if (!parse.success) {
		handleOpenRouteApiError({
			type: 'serde',
			error: parse.error.toString(),
			original: JSON.stringify(json)
		});
		return Promise.reject();
	} else {
		return parse.data;
	}
}
