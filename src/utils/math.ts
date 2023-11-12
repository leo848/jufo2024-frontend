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
