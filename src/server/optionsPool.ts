import { z } from 'zod';

export const OptionsPool = z
	.object({
		iterationCount: z.number(),
		milpSolver: z.literal('coinOrCbc')
	})
	.partial();
export type OptionsPool = z.infer<typeof OptionsPool>;

export function defaultPool(): OptionsPool {
	return {};
}
