import {z} from 'zod';
import {handleOpenRouteApiError} from '../../server/error';

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
				Authorization: process.env.OPENROUTE_KEY as string,
				'Content-Type': 'application/json'
			}
		});
		json = await response.json();
	} catch (e) {
		handleOpenRouteApiError({type: 'noResponse'});
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

const ReverseGeocodeResponse = z.object({
	type: z.literal("FeatureCollection"),
	features: z.tuple([z.object({
		type: z.literal("Feature"),
		geometry: z.object({
			type: z.literal("Point"),
			coordinates: LatLngArray,
		}),
		properties: z.object({
			id: z.string(),
			distance: z.number(),
			name: z.string(),
		})
	})])
})

export async function getGeocodeName({
	lat, lng, zoomLevel
}: {lat: number, lng: number, zoomLevel: number}): Promise<{name: string, lat: number, lng: number}> {
	const url = new URL("https://api.openrouteservice.org/geocode/reverse");
	url.searchParams.append("api_key", process.env.OPENROUTE_KEY as string);
	url.searchParams.append("point.lon", lng.toString());
	url.searchParams.append("point.lat", lat.toString());
	url.searchParams.append("size", "1");

	const EARTH_CIRCUM_KM = 40_075.017;
	const PIXEL_DISTANCE = 20;
	const mapWidthPx = 256 * 2 ** zoomLevel;
	const kilometers = PIXEL_DISTANCE * EARTH_CIRCUM_KM / mapWidthPx;

	url.searchParams.append("boundary.circle.radius", kilometers.toString());

	const layers = ["country", "macroregion", "region",]

	if (zoomLevel >= 5) {
		layers.push("localadmin", "macrocounty");
	}
	if (zoomLevel >= 6) {
		layers.push("locality", "county");
	}
	if (zoomLevel >= 12) {
		layers.push("neighbourhood");
	}
	if (zoomLevel >= 14) {
		layers.push("street");
	}
	if (zoomLevel >= 15) {
		layers.push("address", "venue")
	}

	url.searchParams.append("layers", layers.join(","));


	let response, json;
	try {
		response = await fetch(url);
		json = await response.json();
	} catch {
		handleOpenRouteApiError({type: 'noResponse'});
		return Promise.reject();
	}

	const parse = ReverseGeocodeResponse.safeParse(json);
	if (!parse.success) {
		handleOpenRouteApiError({
			type: 'serde',
			error: parse.error.toString(),
			original: JSON.stringify(json)
		});
		return Promise.reject();
	} else {
		const feature = parse.data.features[0];
		return {
			lat: feature.geometry.coordinates[1],
			lng: feature.geometry.coordinates[0],
			name: feature.properties.name
		}
	}
}
