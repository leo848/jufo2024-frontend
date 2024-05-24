// Adaptiert von: https://github.com/mcmath/deep-map/blob/master/src/deep-map.ts
//
// Siehe dessen Lizenz

type MapFn = (value: any, key: string | number | undefined) => any;

export function deepMap(object: any, mapFn: MapFn, leafCondition?: (v: any) => boolean): any {
	return new DeepMap(mapFn, leafCondition ?? (() => false)).map(object);
}

class DeepMap {
	private cache = new WeakMap<object, any>();

	constructor(private mapFn: MapFn, private leafCondition: (v: any) => boolean) {}

	public map(value: any, key?: string | number): any {
		return Array.isArray(value)
			? this.mapArray(value)
			: typeof value === 'object' && !this.leafCondition(value)
			? this.mapObject(value)
			: this.mapFn.call(undefined, value, key);
	}

	private mapArray(arr: any[]): any[] {
		if (this.cache.has(arr)) {
			return this.cache.get(arr);
		}

		let length = arr.length;
		let result: any[] = [];
		this.cache.set(arr, result);

		for (let i = 0; i < length; i++) {
			result[i] = this.map(arr[i], i);
		}

		return result;
	}

	private mapObject(obj: object): object {
		if (this.cache.has(obj)) {
			return this.cache.get(obj);
		}

		let result = {};
		this.cache.set(obj, result);

		for (let key in obj as any) {
			if (obj.hasOwnProperty(key)) {
				(result as any)[key] = this.map((obj as any)[key] as any, key);
			}
		}

		return result;
	}
}

type DeepCopyable = string | number | DeepCopyable[] | { [key: string]: DeepCopyable };
export function deepCopy<T extends DeepCopyable>(t: T): T {
	return JSON.parse(JSON.stringify(t));
}
