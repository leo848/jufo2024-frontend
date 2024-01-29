import { assertNever } from '../server/types';
import { rangeMap } from '../utils/math';

export type DistanceType = 'euclidean' | 'manhattan' | 'max' | 'cosine';

export function dist(a: number[], b: number[], dist: DistanceType): number {
	if (dist == 'euclidean') return euclideanDist(a, b);
	else if (dist == 'manhattan') return manhattanDist(a, b);
	else if (dist == 'max') return maxDist(a, b);
	else if (dist == 'cosine') return cosineDist(a, b);
	else {
		assertNever(dist);
	}
}

export function euclideanDist(a: number[], b: number[]): number {
	const dim = Math.min(a.length, b.length);
	let distSq = 0;
	for (let i = 0; i < dim; i++) {
		distSq += (a[i] - b[i]) * (a[i] - b[i]);
	}
	return Math.sqrt(distSq);
}

export function manhattanDist(a: number[], b: number[]): number {
	const dim = Math.min(a.length, b.length);
	let dist = 0;
	for (let i = 0; i < dim; i++) {
		dist += Math.abs(a[i] - b[i]);
	}
	return dist;
}

export function maxDist(a: number[], b: number[]): number {
	const dim = Math.min(a.length, b.length);
	let dist = 0;
	for (let i = 0; i < dim; i++) {
		dist = Math.max(dist, Math.abs(a[i] - b[i]));
	}
	return dist;
}

export function cosineDist(a: number[], b: number[]): number {
	const dim = Math.min(a.length, b.length);
	let dot = 0;
	for (let i = 0; i < dim; i++) {
		dot += a[i] * b[i];
	}
	let magA = euclideanDist(a, new Array(dim).fill(0));
	let magB = euclideanDist(b, new Array(dim).fill(0));
	const trueCosine = dot / (magA * magB);
	const normal = rangeMap(trueCosine, [1, 0], [0, 1]); // Graph-Kante: kürzer ist ähnlicher
	return normal;
}
