export type CoordPoint = {
	lat: number;
	lng: number;
};

export type NamedPoint = {
	name: string;
	desc ?: string;
} & CoordPoint;

export function coordSimilar(a: CoordPoint, b: CoordPoint): boolean {
	return Math.abs(a.lat - b.lat) < 0.0001 && Math.abs(a.lng - b.lng) < 0.0001;
}
