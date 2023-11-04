import type { ZodSchema } from 'zod';
import { handleClientError, handleServerError } from './error';
import { serverOutput, type ServerInput, type ServerOutput } from './types';

const port = 3141;
const websocket: WebSocket = new WebSocket(`ws://localhost:${port}`);
websocket.onerror = console.error;

let callbacks: { f: (so: ServerOutput) => void; id: number }[] = [];

export function sendWebsocket(input: ServerInput) {
	websocket.send(JSON.stringify(input));
}

websocket.onmessage = (input) => {
	if (typeof input.data !== 'string') {
		handleClientError({
			type: 'binaryData'
		});
		return;
	}
	let object;
	try {
		object = JSON.parse(input.data);
	} catch (e) {
		handleClientError({
			type: 'serde',
			stage: 'json',
			original: input.data,
			error: (e as Error).toString()
		});
		return;
	}
	const parseResult = serverOutput.safeParse(object);
	let parsed;
	if (parseResult.success) {
		parsed = parseResult.data;
	} else {
		handleClientError({
			type: 'serde',
			stage: 'zod',
			original: input.data,
			error: parseResult.error.toString()
		});
		return;
	}

	handleServerOutput(parsed);
};

function handleServerOutput(output: ServerOutput) {
	if (output.type === 'error') {
		handleServerError(output.error);
		return;
	} else if (output.type === 'log') {
		console.log(output.message);
		return;
	} else {
		for (const { f } of callbacks) {
			f(output);
		}
	}
}

let _id = 0;
function genId() {
	return _id++;
}

export function registerCallback<T extends ServerOutput>(
	schema: ZodSchema<T>,
	f: (so: T) => void
): number {
	const id = genId();
	callbacks.push({
		id,
		f: (so: ServerOutput) => {
			const parsed = schema.safeParse(so);
			if (parsed.success) {
				f(parsed.data);
			}
		}
	});
	return id;
}

export function unregisterCallback(id: number) {
	callbacks = callbacks.filter((e) => e.id !== id);
}
