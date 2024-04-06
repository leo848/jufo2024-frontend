import {z} from 'zod';

type SpecificParameter =
	| {
		type: "number",
		min: number;
		max: number;
		default: number;
		logarithmic?: boolean;
	}
	| {
		type: "boolean",
		default: boolean;
	}
	| {
		type: "option",
		values: string[];
		default: string;
	};

type Parameter = {
	name: string;
	key: string;
	desc: string;
} & SpecificParameter;

export const poolOptions = {
	iterationCount: {
		type: "number",
		name: 'k',
		desc: 'Anzahl der Iterationen',
		default: 10 ** 10,
		key: 'iterationCount',
		max: 10 ** 15,
		min: 10 ** 5,
		logarithmic: true
	},
	milpSolver: {
		name: 'Solver-Bibliothek',
		desc: 'Die hinterlegende Bibliothek, die das ILP-Problem löst.',
		type: 'option',
		values: ['coinOrCbc'],
		default: 'coinOrCbc',
		key: 'milpSolver',
	}
} as const satisfies Partial<Record<string, Parameter>>;

export type ParameterKey = keyof typeof poolOptions;

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
