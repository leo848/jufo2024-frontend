// Ein Punkt im dreidimensionalen Raum.
export class Point3 {
	// x-Koordinate: vom Ursprung aus nach rechts.
	x: number;
	// y-Koordinate: vom Ursprung aus nach oben.
	y: number;
	// z-Koordinate: vom Ursprung aus nach vorn, in Richtung des Betrachters.
	z: number;

	constructor(x: number, y: number, z: number) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	position(): [number, number, number] {
		return [this.x, this.y, this.z];
	}

	scale(factor: number): Point3 {
		return new Point3(this.x * factor, this.y * factor, this.z * factor);
	}
}
