import type { ZodSchema } from 'zod';
import { handleClientError, handleServerError } from './error';
import {
	serverOutput,
	type ServerInput,
	type ServerOutput,
	type ServerStatus,
	type ConnectionData,
	serverOutputLatency
} from './types';
import { writable, type Writable } from 'svelte/store';

let statusCallback: (ss: ServerStatus) => void = () => {};

export function getStatus(): ServerStatus & { type: 'status' } {
	const states = ['loading', 'online', 'offline', 'offline'] as const;
	const status = states[websocket.readyState];
	if (status != 'online') {
		connectionData.set({
			firstConnected: null,
			lastRequest: null,
			lastResponse: null,
			latency: null
		});
	}
	return { type: 'status', status };
}

let interval: null | NodeJS.Timeout = null;
export function setStatusCallback(callback: (ss: ServerStatus) => void) {
	statusCallback = callback;

	if (interval) clearInterval(interval);
	interval = setInterval(() => statusCallback(getStatus()), 1000);
}

const port = 3141;
const url = `localhost:${port}`;
const uri = `ws://${url}`;

let websocket: WebSocket = new WebSocket(uri);
export const connectionData: Writable<ConnectionData> = writable({
	firstConnected: new Date(),
	lastRequest: null,
	lastResponse: null,
	latency: null
});
setTimeout(() => updateConnectionData(), 1000);

const onerror = (e: Event) => {
	statusCallback({
		type: 'status',
		status: 'offline'
	});
	console.error(e);
};
const onmessage = (input: MessageEvent<unknown>) => {
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
websocket.onerror = onerror;
websocket.onmessage = onmessage;

let callbacks: { f: (so: ServerOutput) => void; id: number }[] = [];

export function sendWebsocket(input: ServerInput, options?: { noLog?: boolean }) {
	const noLog = options?.noLog;
	const status = getStatus();
	if (status.status === 'offline') {
		reconnectWebsocket();
	}
	statusCallback(getStatus());
	websocket.send(JSON.stringify(input));
	if (!noLog) {
		connectionData.update((cd) => ({ ...cd, lastRequest: new Date() }));
		statusCallback({
			type: 'interact',
			status: 'upload'
		});
	}
}

export function reconnectWebsocket(): boolean {
	statusCallback({ type: 'status', status: 'loading' });
	try {
		websocket = new WebSocket(uri);
	} catch (e) {
		connectionData.update((cd) => ({
			...cd,
			firstConnected: null,
			lastRequest: null,
			lastResponse: null
		}));
		console.error(e);
		return false;
	}
	websocket.onerror = onerror;
	websocket.onmessage = onmessage;

	connectionData.update((cd) => ({
		...cd,
		firstConnected: new Date(),
		lastRequest: null,
		lastResponse: null
	}));

	setTimeout(() => updateConnectionData(), 1000);

	return true;
}

function handleServerOutput(output: ServerOutput) {
	if (output.type !== 'latency') {
		statusCallback({
			type: 'interact',
			status: 'download'
		});
	}
	if (output.type === 'error') {
		handleServerError(output.error);
		return;
	} else if (output.type === 'log') {
		console.log(output.message);
		return;
	} else {
		if (output.type !== 'latency') {
			connectionData.update((cd) => ({
				...cd,
				lastResponse: new Date()
			}));
		}
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

export function updateConnectionData(): Writable<ConnectionData> {
	const beforeTime = new Date();
	sendWebsocket(
		{
			type: 'latency'
		},
		{
			noLog: true
		}
	);

	const millis = (date: Date) => date.getTime();

	const id = registerCallback(serverOutputLatency, (l) => {
		const afterTime = new Date();
		connectionData.update((c) => ({
			...c,
			latency: {
				requestTime: beforeTime,
				serverToClient: millis(afterTime) - l.timeMillis,
				clientToServer: l.timeMillis - millis(beforeTime)
			}
		}));

		unregisterCallback(id);
	});

	return connectionData;
}
