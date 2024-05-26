import {z} from 'zod';
import {deepCopy} from '../../utils/deepMap';
import {UsefulSet} from '../../utils/set'
import type {ComponentType} from 'svelte';
import * as Icon from 'flowbite-svelte-icons';

export const NumericDimension = z.object({
	name: z.string().max(128),
	min: z.optional(z.number()),
	max: z.optional(z.number()),
	step: z.optional(z.number()),
	default: z.optional(z.number()),
	weight: z.number()
});
export type NumericDimension = z.infer<typeof NumericDimension>;

export const OptionDimensions = z.object({
	name: z.string().max(128),
	options: z.array(z.string()),
	default: z.optional(z.string()),
	weight: z.number()
});
export type OptionDimensions = z.infer<typeof OptionDimensions>;

export const SchemaType = z.object({
	name: z.string().max(128),
	desc: z.optional(z.string()),
	numericDimensions: z.array(NumericDimension),
	optionDimensions: z.array(OptionDimensions)
});
export type SchemaType = z.infer<typeof SchemaType>;

export const Schemas = z.record(z.string(), SchemaType);
export type Schemas = z.infer<typeof Schemas>;

export const PossibleDataPoint = z.object({
	name: z.string(),
	numericDimensions: z.array(z.number()),
	optionDimensions: z.array(z.string())
});
export type PossibleDataPoint = z.infer<typeof PossibleDataPoint>;

export class Schema {
	#name: string;
	#desc?: string;
	#numericDimensions: NumericDimension[];
	#optionDimensions: OptionDimensions[];

	private constructor({name, desc, numericDimensions, optionDimensions}: SchemaType) {
		this.#name = name;
		this.#desc = desc;
		this.#numericDimensions = numericDimensions;
		this.#optionDimensions = optionDimensions;
	}

	public static fromSchemaType({
		name,
		desc,
		numericDimensions,
		optionDimensions
	}: SchemaType): {success: true; value: Schema} | {success: false; error: string} {
		if (name.length == 0) return {success: false, error: 'Fehlender Name'};
		if (encodeURIComponent(name) != name) return {success: false, error: 'Name nicht URL-sicher'};
		if (numericDimensions.length == 0 && optionDimensions.length == 0)
			return {success: false, error: 'Mindestens eine Dimension benötigt'};
		if (numericDimensions.some((dim) => dim.max && dim.min && dim.max < dim.min))
			return {success: false, error: 'Maximum geringer als Minimum'};
		const allDimensions = [...numericDimensions, ...optionDimensions];
		if (allDimensions.some((dim) => dim.weight < 0))
			return {success: false, error: 'Gewicht darf nicht negativ sein'};
		if (new Set(allDimensions.map((dim) => dim.name)).size < allDimensions.length)
			return {success: false, error: 'Doppelt vorkommender Name'};

		return {
			success: true,
			value: new Schema({name, desc, numericDimensions, optionDimensions})
		};
	}

	public get name(): string {
		return this.#name;
	}
	public get desc(): string | null {
		return this.#desc ?? null;
	}
	public get numericDimensions(): NumericDimension[] {
		return deepCopy(this.#numericDimensions);
	}
	public get optionDimensions(): OptionDimensions[] {
		return deepCopy(this.#optionDimensions);
	}

	deserialize(): SchemaType {
		return {
			name: this.name,
			numericDimensions: this.numericDimensions,
			optionDimensions: this.optionDimensions,
			desc: this.desc ?? undefined
		};
	}

	dimAmount(): DimensionAmount {
		const numeric = this.#numericDimensions.length;
		const option = this.#optionDimensions
			.map((dim) => dim.options.length)
			.reduce((a, b) => a + b, 0);
		return {
			numeric,
			option,
			total: numeric + option
		};
	}

	validateDataPoint(
		possibleDataPoint: PossibleDataPoint
	): {success: true; value: DataPoint} | {success: false; error: string} {
		if (possibleDataPoint.numericDimensions.length != this.numericDimensions.length) {
			return {
				success: false,
				error: `Erwartete ${this.numericDimensions.length} numerische Komponenten, erhielt ${possibleDataPoint.numericDimensions.length}`
			};
		}
		if (possibleDataPoint.optionDimensions.length != this.optionDimensions.length) {
			return {
				success: false,
				error: `Erwartete ${this.optionDimensions.length} numerische Komponenten, erhielt ${possibleDataPoint.optionDimensions.length}`
			};
		}
		for (let i = 0; i < this.numericDimensions.length; i++) {
			const dimensionSchema = this.numericDimensions[i];
			const providedValue = possibleDataPoint.numericDimensions[i];
			if (dimensionSchema.min !== undefined && providedValue < dimensionSchema.min) {
				return {
					success: false,
					error: `Wert ${providedValue} geringer als Minimum ${dimensionSchema.min}`
				};
			} else if (dimensionSchema.max !== undefined && providedValue > dimensionSchema.max) {
				return {
					success: false,
					error: `Wert ${providedValue} höher als Maximum ${dimensionSchema.max}`
				};
			} else if (dimensionSchema.step !== undefined) {
				const shouldBeInt = (providedValue - (dimensionSchema.min ?? 0)) / dimensionSchema.step;
				const integer = Math.round(shouldBeInt);
				if (Math.abs(shouldBeInt - integer) > 0.0001) {
					return {
						success: false,
						error: `Wert ${providedValue} passt nicht zur Schrittgröße ${dimensionSchema.step}`
					};
				}
			}
		}
		for (let i = 0; i < this.optionDimensions.length; i++) {
			const dimensionSchema = this.optionDimensions[i];
			const providedValue = possibleDataPoint.optionDimensions[i];
			if (!dimensionSchema.options.includes(providedValue)) {
				return {
					success: false,
					error: `Ungültiger Wert: ${providedValue}. Möglich sind: ${new Intl.ListFormat(
						'de'
					).format(dimensionSchema.options)}`
				};
			}
		}
		return {success: true, value: new DataPoint(this, possibleDataPoint)};
	}

	stubPossibleDataPoint(): PossibleDataPoint {
		return {
			name: 'Datenpunkt ' + new Date().toISOString(),
			numericDimensions: new Array(this.numericDimensions.length)
				.fill(0)
				.map((_, i) => this.numericDimensions[i].default ?? this.numericDimensions[i].min ?? 0),
			optionDimensions: new Array(this.optionDimensions.length)
				.fill(0)
				.map((_, i) => this.optionDimensions[i].default ?? this.optionDimensions[i].options[0])
		};
	}

	dataPointFromJSON(
		json: any
	): {success: true; value: DataPoint} | {success: false; error: string} {
		const name = json.name;
		if (!name) return {success: false, error: 'Datenpunkt ohne Name'};
		const data = json.data;
		if (!data) return {success: false, error: 'Datenpunkt ohne Daten'};
		const numericDimensions = [];
		for (let i = 0; i < this.numericDimensions.length; i++) {
			const dimensionSchema = this.numericDimensions[i];
			const dataElement = json.data[dimensionSchema.name];
			if (dataElement == null)
				return {success: false, error: `Kein Wert für ${dimensionSchema.name}`};
			if (typeof dataElement !== 'number')
				return {
					success: false,
					error: `Erwartete Zahl für ${dimensionSchema.name}, erhielt ${dataElement}`
				};
			numericDimensions.push(dataElement);
		}
		const optionDimensions = [];
		for (let i = 0; i < this.optionDimensions.length; i++) {
			const dimensionSchema = this.optionDimensions[i];
			const dataElement = json.data[dimensionSchema.name];
			if (dataElement == null)
				return {success: false, error: `Kein Wert für ${dimensionSchema.name}`};
			if (typeof dataElement !== 'string')
				return {
					success: false,
					error: `Erwartete Zahl für ${dimensionSchema.name}, erhielt ${dataElement}`
				};
			optionDimensions.push(dataElement);
		}
		return this.validateDataPoint({
			name,
			numericDimensions,
			optionDimensions
		});
	}

	compatibility(otherSchema: Schema): Compatibility {
		function toMapBy<K extends string, V>(values: V[], key: (input: V) => K): Record<K, V> {
			const output: Partial<Record<K, V>> = {};
			for (const value of values) {
				output[key(value)] = value;
			}
			return output as Record<K, V>;
		}

		let compatibility = Compatibility.Full;

		const myDims = new UsefulSet([...this.numericDimensions, ...this.optionDimensions].map(dim => dim.name));
		const theirDims = new UsefulSet([...otherSchema.numericDimensions, ...otherSchema.optionDimensions].map(dim => dim.name));
		if (myDims.isSubsetIncomparable(theirDims)) {
			compatibility = compatibility.and(Compatibility.None);
		} else if (myDims.isProperSubsetOf(theirDims)) {
			compatibility = compatibility.and(Compatibility.Subset);
		} else if (myDims.isProperSupersetOf(theirDims)) {
			compatibility = compatibility.and(Compatibility.Superset);
		}

		const myNumericDims = new UsefulSet(this.numericDimensions.map((dim) => dim.name));
		const myNumericMap = toMapBy(this.numericDimensions, (dim) => dim.name);
		const theirNumericDims = new UsefulSet(otherSchema.numericDimensions.map((dim) => dim.name));
		const theirNumericMap = toMapBy(otherSchema.numericDimensions, (dim) => dim.name);
		if (myNumericDims.isSubsetIncomparable(theirNumericDims)) {
			compatibility = compatibility.and(Compatibility.None);
		} else if (myNumericDims.isProperSubsetOf(theirNumericDims)) {
			compatibility = compatibility.and(Compatibility.Subset);
		} else if (myNumericDims.isProperSupersetOf(theirNumericDims)) {
			compatibility = compatibility.and(Compatibility.Superset);
		}
		for (const key of myNumericDims.intersection(theirNumericDims)) {
			const comparisonKeys: {
				key: 'min' | 'max';
				superset: (a: number | undefined, b: number) => boolean;
				subset: (a: number, b: number | undefined) => boolean;
			}[] = [
					{key: 'min', superset: (a, b) => a === undefined || a < b, subset: (a, b) => b === undefined || a > b},
					{key: 'max', superset: (a, b) => a === undefined || a > b, subset: (a, b) => b === undefined || a < b}
				];
			const myDim = myNumericMap[key];
			const theirDim = theirNumericMap[key];
			for (const cKey of comparisonKeys) {
				const myValue = myDim[cKey.key];
				const theirValue = theirDim[cKey.key];
				if (myValue == undefined && theirValue == undefined) {
					compatibility = compatibility.and(Compatibility.Full);
					continue;
				}
				if (theirValue !== undefined && cKey.superset(myValue, theirValue)) {
					compatibility = compatibility.and(Compatibility.Superset);
				}
				if (myValue !== undefined && cKey.subset(myValue, theirValue)) {
					compatibility = compatibility.and(Compatibility.Subset);
				}
			}
		}

		const myOptionDims = new UsefulSet(this.optionDimensions.map((dim) => dim.name));
		const myOptionMap = toMapBy(this.optionDimensions, (dim) => dim.name);
		const theirOptionDims = new UsefulSet(otherSchema.optionDimensions.map((dim) => dim.name));
		const theirOptionMap = toMapBy(otherSchema.optionDimensions, (dim) => dim.name);
		if (myOptionDims.isSubsetIncomparable(theirOptionDims)) {
			compatibility = compatibility.and(Compatibility.None);
		} else if (myOptionDims.isProperSubsetOf(theirOptionDims)) {
			compatibility = compatibility.and(Compatibility.Subset);
		} else if (myOptionDims.isProperSupersetOf(theirOptionDims)) {
			compatibility = compatibility.and(Compatibility.Superset);
		}

		for (const key of myOptionDims.intersection(theirOptionDims)) {
			const myDim = myOptionMap[key];
			const theirDim = theirOptionMap[key];

			const myOptions = new UsefulSet(myDim.options);
			const theirOptions = new UsefulSet(theirDim.options);

			if (myOptions.isSubsetIncomparable(theirOptions)) {
				compatibility = compatibility.and(Compatibility.None)
			} else if (myOptions.isProperSubsetOf(theirOptions)) {
				compatibility = compatibility.and(Compatibility.Subset)
			} else if (myOptions.isProperSupersetOf(theirOptions)) {
				compatibility = compatibility.and(Compatibility.Superset)
			}
		}

		return compatibility;
	}
}

export class DataPoint {
	#validFor: Schema;
	#numericDimensions: number[];
	#optionDimensions: string[];
	name: string;

	constructor(schema: Schema, {numericDimensions, optionDimensions, name}: PossibleDataPoint) {
		this.#validFor = schema;
		this.#numericDimensions = numericDimensions;
		this.#optionDimensions = optionDimensions;
		this.name = name;
	}

	public get validFor(): Schema {
		return this.#validFor;
	}
	public get numericDimensions(): number[] {
		return deepCopy(this.#numericDimensions);
	}
	public get optionDimensions(): string[] {
		return deepCopy(this.#optionDimensions);
	}

	public toVector() {
		const numericVector = [];
		for (let i = 0; i < this.validFor.numericDimensions.length; i++) {
			const dimensionSchema = this.validFor.numericDimensions[i];
			const providedValue = this.#numericDimensions[i];
			numericVector.push(dimensionSchema.weight * providedValue);
		}
		const optionVector = [];
		for (let i = 0; i < this.validFor.optionDimensions.length; i++) {
			const dimensionSchema = this.validFor.optionDimensions[i];
			const providedValue = this.#optionDimensions[i];
			for (const option of dimensionSchema.options) {
				if (providedValue == option) {
					optionVector.push(dimensionSchema.weight);
				} else {
					optionVector.push(0);
				}
			}
		}
		return numericVector.concat(optionVector);
	}

	public toInvalidated(): PossibleDataPoint {
		return {
			name: this.name,
			numericDimensions: this.numericDimensions,
			optionDimensions: this.optionDimensions
		};
	}

	public toSelfContainedJSON(): {name: string; data: Record<string, string | number>} {
		const data: Record<string, string | number> = {};
		for (let i = 0; i < this.validFor.numericDimensions.length; i++) {
			const dimensionSchema = this.validFor.numericDimensions[i];
			const providedValue = this.#numericDimensions[i];
			data[dimensionSchema.name] = providedValue;
		}
		for (let i = 0; i < this.validFor.optionDimensions.length; i++) {
			const dimensionSchema = this.validFor.optionDimensions[i];
			const providedValue = this.#optionDimensions[i];
			data[dimensionSchema.name] = providedValue;
		}
		return {
			name: this.name,
			data
		};
	}
}

export class Compatibility {
	static Full = new Compatibility('full');
	static Subset = new Compatibility('subset');
	static Superset = new Compatibility('superset');
	static Mixed = new Compatibility('mixed');
	static None = new Compatibility('none');

	#value: string;

	private constructor(value: string) {
		this.#value = value;
	}

	public and(other: Compatibility) {
		if (this === Compatibility.Full) {
			return other;
		} else if (other === Compatibility.Full) {
			return this;
		} else if (this === Compatibility.None) {
			return this;
		} else if (other === Compatibility.None) {
			return other;
		} else if (this === other) {
			return this;
		} else return Compatibility.Mixed;
	}

	public numericValue(): number {
		if (this === Compatibility.Full) {
			return 4;
		} else if (this === Compatibility.Superset) {
			return 3;
		} else if (this === Compatibility.Subset) {
			return 2;
		} else if (this === Compatibility.Mixed) {
			return 1;
		} else if (this === Compatibility.None) {
			return 0;
		} else return -1;
	}

	public toString(): string {
		return [
			"Keine Kompatibilität",
			"Gemischte Kompatibilität",
			"Teilmenge von",
			"Obermenge von",
			"Vollständige Kompatibilität"
		][this.numericValue()]
	}

	public description(): string {
		return [
			"Die Schemata sind vollständig inkompatibel, d.h., kein für ein Schema gültiges Dokument ist auch für ein anderes anwendbar.",
			"Die Kompatibilität kann sich von Dokument zu Dokument unterscheiden.",
			"Das neu erstellte Schema ist eine Teilmenge dieser Schemata, also kann jedes Dokument des anderen Schemas auf das neue angewandt werden, aber nicht zwangsläufig auch andersherum.",
			"Das neu erstellte Schema ist eine Übermenge dieser Schemata, also kann jedes Dokument des neuen Schemas auf ein hier aufgeführtes angewandt werden, aber nicht zwangsläufig auch andersherum.",
			"Die beiden Schemata sind vollständig kompatibel."
		][this.numericValue()]
	}

	public icon(): ComponentType {
		return [
			Icon.CloseSolid,
			Icon.ShuffleSolid,
			Icon.ArrowLeftSolid,
			Icon.ArrowRightSolid,
			Icon.CheckSolid,
		][this.numericValue()]
	}
}

export type DimensionAmount = {
	numeric: number;
	option: number;
	total: number;
};
