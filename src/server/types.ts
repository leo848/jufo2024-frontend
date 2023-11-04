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
		numbers: z.array(z.number()),
		algorithm: z.enum(['bubbleSort'])
	})
]);

const serverInputLog = z.object({ type: z.literal('log'), message: z.string() });
const serverInputAction = z.object({ type: z.literal('action'), action });
const serverInput = z.discriminatedUnion('type', [serverInputLog, serverInputAction]);

export type ServerInput = z.infer<typeof serverInput>;

const serverOutputError = z.object({
	type: z.literal('error'),
	error: serverError
});
const serverOutputLog = z.object({
	type: z.literal('log'),
	message: z.string()
});
export const serverOutputSortedNumbers = z.object({
	type: z.literal('sortedNumbers'),
	done: z.boolean(),
	numbers: z.array(z.number())
});
export const serverOutput = z.discriminatedUnion('type', [
	serverOutputError,
	serverOutputLog,
	serverOutputSortedNumbers
]);

export type ServerOutput = z.infer<typeof serverOutput>;

export type ClientError = z.infer<typeof clientError>;

export function assertNever(ignored: never): never {
	throw new Error('If this function gets called, type safety has been compromised.', ignored);
}
