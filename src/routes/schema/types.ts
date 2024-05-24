import {z} from 'zod';
import {deepCopy} from '../../utils/deepMap';

export const NumericDimension = z.object({
	name: z.string().max(128),
	min: z.optional(z.number()),
	max: z.optional(z.number()),
	step: z.optional(z.number()),
	default: z.optional(z.number()),
	weight: z.number()
});
type NumericDimension = z.infer<typeof NumericDimension>;

export const OptionDimensions = z.object({
	name: z.string().max(128),
	options: z.array(z.string()),
	default: z.optional(z.string()),
	weight: z.number()
});
type OptionDimensions = z.infer<typeof OptionDimensions>;

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

	constructor({name, desc, numericDimensions, optionDimensions}: SchemaType) {
		this.#name = name;
		this.#desc = desc;
		this.#numericDimensions = numericDimensions;
		this.#optionDimensions = optionDimensions;
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
			return {success: false, error: `Erwartete ${this.numericDimensions.length} numerische Komponenten, erhielt ${possibleDataPoint.numericDimensions.length}`};
		}
		if (possibleDataPoint.optionDimensions.length != this.optionDimensions.length) {
			return {success: false, error: `Erwartete ${this.optionDimensions.length} numerische Komponenten, erhielt ${possibleDataPoint.optionDimensions.length}`};
		}
		for (let i = 0; i < this.numericDimensions.length; i++) {
			const dimensionSchema = this.numericDimensions[i];
			const providedValue = possibleDataPoint.numericDimensions[i];
			if (dimensionSchema.min !== undefined && providedValue < dimensionSchema.min) {
				return {success: false, error: `Wert ${providedValue} geringer als Minimum ${dimensionSchema.min}`};
			} else if (dimensionSchema.max !== undefined && providedValue > dimensionSchema.max) {
				return {success: false, error: `Wert ${providedValue} höher als Maximum ${dimensionSchema.max}`};
			} else if (dimensionSchema.step !== undefined) {
				const shouldBeInt = (providedValue - (dimensionSchema.min ?? 0)) / dimensionSchema.step;
				const integer = Math.round(shouldBeInt);
				if (Math.abs(shouldBeInt - integer) > 0.0001) {
					return {success: false, error: `Wert ${providedValue} passt nicht zur Schrittgröße ${dimensionSchema.step}`};
				}
			}
		}
		for (let i = 0; i < this.optionDimensions.length; i++) {
			const dimensionSchema = this.optionDimensions[i];
			const providedValue = possibleDataPoint.optionDimensions[i];
			if (!dimensionSchema.options.includes(providedValue)) {
				return {success: false, error: `Ungültiger Wert: ${providedValue}. Möglich sind: ${new Intl.ListFormat("de").format(dimensionSchema.options)}`};
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

	toVector() {
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

	toInvalidated(): PossibleDataPoint {
		return {
			name: this.name,
			numericDimensions: this.numericDimensions,
			optionDimensions: this.optionDimensions
		};
	}
}

export type DimensionAmount = {
	numeric: number;
	option: number;
	total: number;
};
