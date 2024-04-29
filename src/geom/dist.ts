import { z } from 'zod';
import { rangeMap } from '../utils/math';

export const Norm = z.enum(['euclidean', 'manhattan', 'max', 'cosine']);
export type Norm = z.infer<typeof Norm>;
export const DistanceType = z.object({
	norm: Norm,
	invert: z.boolean()
});
export type TrueDistanceType = z.infer<typeof DistanceType>;
export type DistanceType = TrueDistanceType | Norm;

export function distanceTypeToObject(dist: DistanceType): z.infer<typeof DistanceType> {
	if (typeof dist === 'string') dist = { norm: dist, invert: false };
	return dist;
}

export function dist(a: number[], b: number[], dist: DistanceType): number {
	dist = distanceTypeToObject(dist);
	const norm = dist.norm;
	let normed: number;
	if (norm == 'euclidean') normed = euclideanDist(a, b);
	else if (norm == 'manhattan') normed = manhattanDist(a, b);
	else if (norm == 'max') normed = maxDist(a, b);
	else if (norm == 'cosine') normed = cosineDist(a, b);
	else {
		assertNever(norm);
	}
	if (dist.invert) normed *= -1;
	return normed;
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

function assertNever(ignored: never): never {
	throw new Error('If this function gets called, type safety has been compromised.', ignored);
}

export function chainLength(path: number[][], distanceType: DistanceType = 'euclidean'): number {
	let cL = 0;
	for (let i = 0; i < path.length - 1; i++) {
		cL += dist(path[i], path[i + 1], distanceType);
	}
	return cL;
}
