import { z } from 'zod';

export const serverError = z.discriminatedUnion('type', [
	z.object({
		type: z.literal('binaryData')
	}),
	z.object({
		type: z.literal('serde'),
		error: z.string(),
		original: z.string()
	})
]);

export type ServerError = z.infer<typeof serverError>;

export const clientError = z.discriminatedUnion('type', [
	z.object({
		type: z.literal('binaryData')
	}),
	z.object({
		type: z.literal('serde'),
		stage: z.enum(['json', 'zod']),
		original: z.string(),
		error: z.string()
	})
]);

const action = z.discriminatedUnion('type', [
	z.object({
		type: z.literal('sortNumbers'),
		numbers: z.array(z.number())
	})
]);

const inputType = z.discriminatedUnion('type', [
	z.object({
		type: z.literal('log'),
		message: z.string()
	}),
	z.object({
		type: z.literal('action'),
		action
	})
]);

export type ServerInput = z.infer<typeof inputType>;

export const serverOutput = z.discriminatedUnion('type', [
	z.object({
		type: z.literal('error'),
		error: serverError
	}),
	z.object({
		type: z.literal('log'),
		message: z.string()
	}),
	z.object({
		type: z.literal('sortedNumbers'),
		numbers: z.array(z.number())
	})
]);

export type ServerOutput = z.infer<typeof serverOutput>;

export type ClientError = z.infer<typeof clientError>;

export function assertNever(ignored: never): never {
	throw new Error('If this function gets called, type safety has been compromised.', ignored);
}
