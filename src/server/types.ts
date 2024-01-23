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

export const colorNameApiError = z.discriminatedUnion('type', [
	z.object({
		type: z.literal('noResponse')
	}),
	z.object({
		type: z.literal('serde'),
		error: z.string(),
		original: z.string()
	}),
	z.object({
		type: z.literal('invalidKey'),
		key: z.string()
	})
]);

const action = z.discriminatedUnion('type', [
	z.object({
		type: z.literal('sortNumbers'),
		numbers: z.array(z.number()),
		algorithm: z.enum(['bubble', 'selection', 'insertion', 'quick', 'merge'])
	}),
	z.object({
		type: z.literal('createDistPath'),
		dimensions: z.number().positive().int().lt(256),
		values: z.array(z.array(z.number())),
		method: z.discriminatedUnion('type', [
			z.object({ type: z.literal('nearestNeighbor') }),
			z.object({ type: z.literal('bruteForce') }),
			z.object({ type: z.literal('greedy') }),
			z.object({ type: z.literal('christofides') }),
			z.object({ type: z.literal('random') }),
			z.object({ type: z.literal('transmute') })
		])
	}),
	z.object({
		type: z.literal('improveDistPath'),
		dimensions: z.number().positive().int().lt(256),
		path: z.array(z.array(z.number())),
		method: z.discriminatedUnion('type', [
			z.object({ type: z.literal('rotate') }),
			z.object({ type: z.literal('twoOpt') }),
			z.object({ type: z.literal('threeOpt') }),
			z.object({ type: z.literal('simulatedAnnealing') }),
			z.object({ type: z.literal('swap') })
		])
	})
]);

const serverInputLog = z.object({ type: z.literal('log'), message: z.string() });
const serverInputAction = z.object({
	type: z.literal('action'),
	action,
	latency: z.number().optional()
});
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
export const Highlight = z.enum([
	'compare',
	'swap',
	'correct',
	'consider',
	'smaller',
	'larger',
	'pivot'
]);
export const serverOutputSortedNumbers = z.object({
	type: z.literal('sortedNumbers'),
	done: z.boolean(),
	numbers: z.array(z.number()),
	highlight: z.array(z.tuple([z.number(), Highlight]))
});
export const serverOutputDistPathCreation = z.object({
	type: z.literal('distPathCreation'),
	donePath: z.optional(z.array(z.array(z.number()))),
	currentEdges: z.array(z.tuple([z.array(z.number()), z.array(z.number())])),
	progress: z.optional(z.number().gte(0).lte(1))
});
export const serverOutputDistPathImprovement = z.object({
	type: z.literal('distPathImprovement'),
	done: z.boolean(),
	better: z.boolean(),
	currentPath: z.array(z.array(z.number())),
	progress: z.optional(z.number().gte(0).lte(1))
});
export const serverOutput = z.discriminatedUnion('type', [
	serverOutputError,
	serverOutputLog,
	serverOutputSortedNumbers,
	serverOutputDistPathCreation,
	serverOutputLatency,
	serverOutputDistPathImprovement
]);

export type ServerOutput = z.infer<typeof serverOutput>;
export type Highlight = z.infer<typeof Highlight>;

export type ClientError = z.infer<typeof clientError>;
export type ColorNameApiError = z.infer<typeof colorNameApiError>;

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
	firstConnected: Date | null;
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
