import {z} from "zod";

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

export class Schema {
	name: string
	desc?: string
	numericDimensions: NumericDimension[]
	optionDimensions: OptionDimensions[]

	constructor({name, desc, numericDimensions, optionDimensions}: SchemaType) {
		this.name = name
		this.desc = desc
		this.numericDimensions = numericDimensions
		this.optionDimensions = optionDimensions
	}

	dimAmount(): DimensionAmount {
		const numeric = this.numericDimensions.length;
		const option = this.optionDimensions.map(dim => dim.options.length).reduce((a, b) => a + b, 0);
		return {
			numeric,
			option,
			total: numeric + option
		}
	}
}

export type DimensionAmount = {
	numeric: number;
	option: number;
	total: number;
}
