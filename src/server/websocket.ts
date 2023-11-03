import { handleClientError, handleServerError } from './error';
import { assertNever, serverOutput, type ServerInput, type ServerOutput } from './types';

const port = 3141;
const websocket: WebSocket = new WebSocket(`ws://localhost:${port}`);
websocket.onerror = console.error;

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
	} else if (output.type === 'sortedNumbers') {
		console.log(output.numbers);
		return;
	}

	assertNever(output);
}
