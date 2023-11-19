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
		algorithm: z.enum(['bubbleSort', 'selectionSort', 'insertionSort'])
	}),
	z.object({
		type: z.literal('createPath'),
		dimensions: z.number().positive().int().lt(256),
		values: z.array(z.array(z.number())),
		method: z.discriminatedUnion('type', [
			z.object({ type: z.literal('nearestNeighbor') }),
			z.object({ type: z.literal('bruteForce') })
		])
	})
]);

const serverInputLog = z.object({ type: z.literal('log'), message: z.string() });
const serverInputAction = z.object({ type: z.literal('action'), action });
const serverInputLatency = z.object({ type: z.literal('latency') });
const serverInput = z.discriminatedUnion('type', [
	serverInputLog,
	serverInputAction,
	serverInputLatency
]);

export type ServerInput = z.infer<typeof serverInput>;

const serverOutputError = z.object({
	type: z.literal('error'),
	error: serverError
});
const serverOutputLog = z.object({
	type: z.literal('log'),
	message: z.string()
});
export const serverOutputLatency = z.object({
	type: z.literal('latency'),
	timeMillis: z.number()
});
export const serverOutputSortedNumbers = z.object({
	type: z.literal('sortedNumbers'),
	done: z.boolean(),
	numbers: z.array(z.number()),
	highlight: z.array(z.tuple([z.number(), z.enum(['compare', 'swap', 'correct'])]))
});
export const serverOutputPathCreation = z.object({
	type: z.literal('pathCreation'),
	done: z.boolean(),
	currentPath: z.array(z.array(z.number()))
});
export const serverOutput = z.discriminatedUnion('type', [
	serverOutputError,
	serverOutputLog,
	serverOutputSortedNumbers,
	serverOutputPathCreation,
	serverOutputLatency
]);

export type ServerOutput = z.infer<typeof serverOutput>;

export type ClientError = z.infer<typeof clientError>;

export const serverStatus = z.discriminatedUnion('type', [
	z.object({
		type: z.literal('status'),
		status: z.enum(['offline', 'loading', 'online'])
	}),
	z.object({
		type: z.literal('interact'),
		status: z.enum(['upload', 'download'])
	})
]);

export type ServerStatus = z.infer<typeof serverStatus>;

export type ConnectionData = {
	firstConnected: Date;
	lastRequest: Date | null;
	lastResponse: Date | null;
	latency: {
		clientToServer: number;
		serverToClient: number;
		requestTime: Date;
	} | null;
};

export function assertNever(ignored: never): never {
	throw new Error('If this function gets called, type safety has been compromised.', ignored);
}
