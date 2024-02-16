export function rangeMap(
	value: number,
	[start1, stop1]: [number, number],
	[start2, stop2]: [number, number]
) {
	return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

export function constrain(x: number, low: number = 0.0, high: number = 1.0) {
	if (x <= low) return low;
	else if (x >= high) return high;
	else return x;
}

export function factorial(n: number): number {
	if (n <= 1) return 1;
	else return n * factorial(n - 1);
}

export function lerp([start, stop]: [number, number], t: number) {
	return start + (stop - start) * t;
}

export function matrixVectorMultiplication(matrix: number[][], vector: number[]): number[] {
    if (matrix[0].length !== vector.length) {
        throw new Error("Matrix columns must match the vector length for multiplication.");
    }

    return matrix.map(row =>
        row.reduce((acc, value, index) => acc + value * vector[index], 0)
    );
}
