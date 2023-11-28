import * as THREE from 'three';

function floatsSimilar(a: number, b: number): boolean {
	return Math.abs(a - b) < 0.0001;
}

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

	static fromArray(array: number[]): Point3 {
		return new Point3(array[0], array[1], array[2]);
	}

	values(): [number, number, number] {
		return [this.x, this.y, this.z];
	}

	scale(factor: number): Point3 {
		return new Point3(this.x * factor, this.y * factor, this.z * factor);
	}

	delta(other: Point3): Vec3 {
		return new Vec3(other.x - this.x, other.y - this.y, other.z - this.z);
	}

	distanceTo(other: Point3): number {
		return Math.sqrt(
			(other.x - this.x) * (other.x - this.x) +
				(other.y - this.y) * (other.y - this.y) +
				(other.z - this.z) * (other.z - this.z)
		);
	}

	map(f: (comp: number, axis: 'x' | 'y' | 'z') => number): Point3 {
		return new Point3(f(this.x, 'x'), f(this.y, 'y'), f(this.z, 'z'));
	}

	vec(): Vec3 {
		return new Vec3(this.x, this.y, this.z);
	}

	add(vector: Vec3): Point3 {
		return new Point3(this.x + vector.x, this.y + vector.y, this.z + vector.z);
	}

	equals(other: Point3) {
		return (
			floatsSimilar(this.x, other.x) &&
			floatsSimilar(this.y, other.y) &&
			floatsSimilar(this.z, other.z)
		);
	}
}

export class Vec3 {
	x: number;
	y: number;
	z: number;

	constructor(x: number, y: number, z: number) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	values(): [number, number, number] {
		return [this.x, this.y, this.z];
	}

	magSq() {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}

	mag() {
		return Math.sqrt(this.magSq());
	}

	three() {
		return new THREE.Vector3(this.x, this.y, this.z);
	}

	rotationFromPoint(point: Point3): [number, number, number, THREE.EulerOrder | undefined] {
		const array = new THREE.ArrowHelper(this.normalized().three(), point.vec().three()).rotation
			.clone()
			.toArray();
		return [array[0], array[1], array[2], array[3]] as [
			number,
			number,
			number,
			THREE.EulerOrder | undefined
		];
	}

	point() {
		return new Point3(this.x, this.y, this.z);
	}

	add(other: Vec3): Vec3 {
		return new Vec3(this.x + other.x, this.y + other.y, this.z * other.z);
	}

	normalized(): Vec3 {
		return this.scale(1 / this.mag());
	}

	scale(factor: number): Vec3 {
		return new Vec3(this.x * factor, this.y * factor, this.z * factor);
	}
}
