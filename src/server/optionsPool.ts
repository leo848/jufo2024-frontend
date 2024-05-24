import { z } from 'zod';

type SpecificParameter =
	| {
			type: 'number';
			min: number;
			max: number;
			step: number;
			default: number;
			transform?: (original: number) => number;
			display?: (n: number) => string;
	  }
	| {
			type: 'boolean';
			default: boolean;
	  }
	| {
			type: 'option';
			values: string[];
			default: string;
	  };

export type Parameter = {
	name: string;
	key: string;
	desc: string;
} & SpecificParameter;

export const poolOptions = {
	iterationCount: {
		type: 'number',
		name: 'k',
		desc: 'Anzahl der Iterationen bei t=1',
		default: 9.5,
		key: 'iterationCount',
		max: 15,
		min: 5,
		step: 0.5,
		transform: (n) => Math.floor(10 ** n),
		display: (n) => '10^' + Math.round(Math.log10(n) * 10) / 10
	},
	initialTemperature: {
		type: 'number',
		name: 't',
		desc: 'Initialtemperatur',
		default: 0.15,
		max: 1.0,
		min: 0.01,
		step: 0.01,
		key: 'initialTemperature'
	},
	milpSolver: {
		name: 'solver',
		desc: 'Die hinterlegende Bibliothek, die das ILP-Problem löst.',
		type: 'option',
		values: ['coinOrCbc'],
		default: 'coinOrCbc',
		key: 'milpSolver'
	},
	ilpMaxDuration: {
		name: 'ilpMaxDuration',
		desc: 'Wie lange maximal beim ILP gewartet wird, in Sekunden',
		type: 'number',
		max: 3600,
		min: 1,
		step: 1,
		default: 30,
		key: 'ilpMaxDuration'
	}
} as const satisfies Partial<Record<string, Parameter>>;

export type ParameterKey = keyof typeof poolOptions;

export const OptionsPool = z
	.object({
		iterationCount: z.number(),
		milpSolver: z.literal('coinOrCbc'),
		initialTemperature: z.number(),
		ilpMaxDuration: z.number()
	})
	.partial();
export type OptionsPool = z.infer<typeof OptionsPool>;

export function defaultPool(): OptionsPool {
	return Object.fromEntries(
		Object.values(poolOptions).map((obj) => [
			obj.key,
			(obj as any).transform !== undefined ? (obj as any).transform(obj.default) : obj.default
		])
	);
}
