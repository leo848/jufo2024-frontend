export function sortByKey<T>(array: T[], key: (value: T) => number): T[] {
	return array.toSorted((elem1: T, elem2: T) => key(elem1) - key(elem2));
}
