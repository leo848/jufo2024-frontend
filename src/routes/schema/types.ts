import {ZodSchema, z} from "zod";
import {deepCopy} from "../../utils/deepMap";

export const NumericDimension = z.object({
	name: z.string().max(128),
	min: z.optional(z.number()),
	max: z.optional(z.number()),
	step: z.optional(z.number()),
	weight: z.number(),
})
type NumericDimension = z.infer<typeof NumericDimension>

export const OptionDimensions = z.object({
	name: z.string().max(128),
	options: z.array(z.string()),
	weight: z.number(),
})
type OptionDimensions = z.infer<typeof OptionDimensions>

export const SchemaType = z.object({
	name: z.string().max(128),
	desc: z.optional(z.string()),
	numericDimensions: z.array(NumericDimension),
	optionDimensions: z.array(OptionDimensions),
});
export type SchemaType = z.infer<typeof SchemaType>

export const Schemas = z.record(z.string(), SchemaType)
export type Schemas = z.infer<typeof Schemas>

export const PossibleDataPoint = z.object({
	numericDimensions: z.array(z.number()),
	optionDimensions: z.array(z.string()),
})
export type PossibleDataPoint = z.infer<typeof PossibleDataPoint>

export class Schema {
	#name: string
	#desc?: string
	#numericDimensions: NumericDimension[]
	#optionDimensions: OptionDimensions[]

	constructor({name, desc, numericDimensions, optionDimensions}: SchemaType) {
		this.#name = name
		this.#desc = desc
		this.#numericDimensions = numericDimensions
		this.#optionDimensions = optionDimensions
	}

	public get name(): string {return this.name}
	public get desc(): string | null {return this.#desc ?? null}
	public get numericDimensions(): NumericDimension[] {return deepCopy(this.#numericDimensions)}
	public get optionDimensions(): OptionDimensions[] {return deepCopy(this.#optionDimensions)}

	dimAmount(): DimensionAmount {
		const numeric = this.#numericDimensions.length;
		const option = this.#optionDimensions.map(dim => dim.options.length).reduce((a, b) => a + b, 0);
		return {
			numeric,
			option,
			total: numeric + option
		}
	}

	validateDataPoint(possibleDataPoint: PossibleDataPoint): DataPoint | {error: string} {
		if (possibleDataPoint.numericDimensions.length != this.numericDimensions.length) {return {error: "Wrong amount of numeric dimensions"}}
		if (possibleDataPoint.optionDimensions.length != this.optionDimensions.length) {return {error: "Wrong amount of option dimensions"};}
		for (let i = 0; i < this.numericDimensions.length; i++) {
			const dimensionSchema = this.numericDimensions[i];
			const providedValue = possibleDataPoint.numericDimensions[i];
			if (dimensionSchema.min !== undefined && providedValue < dimensionSchema.min) {
				return {error: "Value less than minimum"}
			} else if (dimensionSchema.max !== undefined && providedValue > dimensionSchema.max) {
				return {error: "Value more than maximum"}
			} else if (dimensionSchema.step !== undefined) {
				const shouldBeInt = (providedValue - (dimensionSchema.min ?? 0)) / dimensionSchema.step;
				const integer = Math.round(shouldBeInt)
				if (Math.abs(shouldBeInt - integer) > 0.0001) {
					return {error: "Step size not respected"}
				}
			}
		}
		for (let i = 0; i < this.optionDimensions.length; i++) {
			const dimensionSchema = this.optionDimensions[i];
			const providedValue = possibleDataPoint.optionDimensions[i];
			if (!dimensionSchema.options.includes(providedValue)) {
				return {error: "Invalid value"}
			}
		}
		return new DataPoint(this, possibleDataPoint)
	}
}

export class DataPoint {
	#validFor: Schema
	#numericDimensions: number[]
	#optionDimensions: string[]

	constructor(schema: Schema, {numericDimensions, optionDimensions}: PossibleDataPoint) {
		this.#validFor = schema
		this.#numericDimensions = numericDimensions;
		this.#optionDimensions = optionDimensions;

	}

	public get validFor(): Schema {return this.#validFor}
	public get numericDimensions(): number[] {return deepCopy(this.#numericDimensions)}
	public get optionDimensions(): string[] {return deepCopy(this.#optionDimensions)}

}


export type DimensionAmount = {
	numeric: number;
	option: number;
	total: number;
}
