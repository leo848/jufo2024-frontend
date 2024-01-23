import { dist, type DistanceType } from '../geom/dist';

export function adjacencyMatrix(vectors: number[][], norm: DistanceType = 'euclidean'): number[][] {
	let matrix = new Array(vectors.length).fill(null);
	for (let i = 0; i < vectors.length; i++) {
		matrix[i] = new Array(vectors.length).fill(null);
		for (let j = 0; j < vectors.length; j++) {
			matrix[i][j] = dist(vectors[i], vectors[j], norm);
		}
	}
	return matrix;
}
