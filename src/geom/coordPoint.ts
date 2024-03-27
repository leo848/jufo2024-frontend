export type CoordPoint = {
	lat: number;
	lng: number;
};

export type NamedPoint = {
	name: string;
	desc?: string;
} & CoordPoint;

export function coordSimilar(a: CoordPoint, b: CoordPoint): boolean {
	return Math.abs(a.lat - b.lat) < 0.0001 && Math.abs(a.lng - b.lng) < 0.0001;
}

export function coordScale(p: CoordPoint, scalar: number): CoordPoint {
	const { lat, lng } = p;
	return { lat: lat * scalar, lng: lng * scalar };
}

export function coordDelta(a: CoordPoint, b: CoordPoint): CoordPoint {
	return { lat: b.lat - a.lat, lng: b.lng - a.lng };
}

export function coordAdd(a: CoordPoint, b: CoordPoint): CoordPoint {
	return { lat: a.lat + b.lat, lng: a.lng + b.lng };
}
