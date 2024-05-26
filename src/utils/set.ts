type Setty<T> = UsefulSet<T> | Set<T>;

function toSet<T>(s: Setty<T>): Set<T> {
	return s instanceof UsefulSet ? s.inner : s;
}

class UsefulSet<T> {
	#inner: Set<T>;

	constructor(inner: Setty<T>) {
		this.#inner = toSet(inner);
	}

	public get inner(): Set<T> {
		return new Set(this.#inner);
	}

	isSubsetOf(other: Setty<T>): boolean {
		const otherSet = toSet(other);
		for (const elem of this.inner) {
			if (!otherSet.has(elem)) {
				return false;
			}
		}
		return true;
	}

	isSupersetOf(other: Setty<T>): boolean {
		return new UsefulSet(other).isSubsetOf(this);
	}

	union(other: Setty<T>): UsefulSet<T> {
		const otherSet = toSet(other);
		const resultSet = new Set(this.inner);
		for (const elem of otherSet) {
			resultSet.add(elem);
		}
		return new UsefulSet(resultSet);
	}

	intersection(other: Setty<T>): UsefulSet<T> {
		const otherSet = toSet(other);
		const resultSet = new Set<T>();
		for (const elem of this.inner) {
			if (otherSet.has(elem)) {
				resultSet.add(elem);
			}
		}
		return new UsefulSet(resultSet);
	}

	difference(other: Setty<T>): UsefulSet<T> {
		const otherSet = toSet(other);
		const resultSet = new Set<T>();
		for (const elem of this.inner) {
			if (!otherSet.has(elem)) {
				resultSet.add(elem);
			}
		}
		return new UsefulSet(resultSet);
	}

	symmetricDifference(other: Setty<T>): UsefulSet<T> {
		const otherSet = toSet(other);
		const resultSet = new Set<T>();

		for (const elem of this.inner) {
			if (!otherSet.has(elem)) {
				resultSet.add(elem);
			}
		}

		for (const elem of otherSet) {
			if (!this.inner.has(elem)) {
				resultSet.add(elem);
			}
		}

		return new UsefulSet(resultSet);
	}

	isDisjointFrom(other: Setty<T>): boolean {
		return this.intersection(other).inner.size === 0;
	}
}
