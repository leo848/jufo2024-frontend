export function groupBy<K, V>(array: V[], predicate: (item: V) => K): {key: K; values: V[]}[] {
	const groups: Map<K, V[]> = new Map();

	for (const item of array) {
		const key = predicate(item);
		if (!groups.get(key)) {
			groups.set(key, []);
		}
		groups.get(key)!.push(item);
	}

	return [...groups.entries()].map(([key, values]) => ({
		key,
		values
	}));
}
