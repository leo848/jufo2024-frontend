import { dist, type TrueDistanceType } from '../geom/dist';

export function adjacencyMatrix(vectors: number[][], metric: TrueDistanceType): number[][] {
	let matrix = new Array(vectors.length).fill(null);
	for (let i = 0; i < vectors.length; i++) {
		matrix[i] = new Array(vectors.length).fill(null);
		for (let j = 0; j < vectors.length; j++) {
			matrix[i][j] = dist(vectors[i], vectors[j], metric);
		}
	}
	return matrix;
}

export function positiveAdjacencyMatrix(vectors: number[][], metric: TrueDistanceType): number[][] {
	let rawMatrix = adjacencyMatrix(vectors, metric);
	let min = rawMatrix
		.map((row) => row.reduce((a, b) => Math.min(a, b), 0))
		.reduce((a, b) => Math.min(a, b), 0);
	if (min >= 0) return rawMatrix;
	return rawMatrix.map((row) => row.map((entry) => entry - min + 0.1));
}
