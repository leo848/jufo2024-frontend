import { assertNever } from '../server/types';

export type DistanceType = 'euclidean' | 'manhattan' | 'max';

export function dist(a: number[], b: number[], dist: DistanceType): number {
	if (dist == 'euclidean') return euclideanDist(a, b);
	else if (dist == 'manhattan') return manhattanDist(a, b);
	else if (dist == 'max') return maxDist(a, b);
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
