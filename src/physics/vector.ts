import { dist, type DistanceType } from '../geom/dist';

export class Vec2 {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	static zero(): Vec2 {
		return new Vec2(0, 0);
	}

	static random(): Vec2 {
		return new Vec2(Math.random() - 0.5, Math.random() - 0.5).setMag(1);
	}

	add(other: Vec2): Vec2 {
		return new Vec2(this.x + other.x, this.y + other.y);
	}

	sub(other: Vec2): Vec2 {
		return new Vec2(this.x - other.x, this.y - other.y);
	}

	mul(factor: number): Vec2 {
		return new Vec2(this.x * factor, this.y * factor);
	}

	div(factor: number): Vec2 {
		return this.mul(1 / factor);
	}

	dist(other: Vec2, measure: DistanceType = 'euclidean'): number {
		return dist(this.array(), other.array(), measure);
	}

	magSq() {
		return this.x * this.x + this.y * this.y;
	}

	mag() {
		return Math.sqrt(this.magSq());
	}

	normalize() {
		return this.div(this.mag());
	}

	setMag(mag: number) {
		return this.normalize().mul(mag);
	}

	array(): [number, number] {
		return [this.x, this.y];
	}
}

export type NamedVector = { inner: number[]; name: string };
