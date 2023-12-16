export type CoordPoint = {
	lat: number;
	lng: number;
};

export type NamedPoint = {
	name: string;
} & CoordPoint;
