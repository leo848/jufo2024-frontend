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
	return { type: 'status', status: states[websocket.readyState] };
}

let interval: null | number = null;
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
	latency: null
});
// updateConnectionData();

const onerror = (e: Event) => {
	statusCallback({
		type: 'status',
		status: 'offline'
	});
	console.error(e);
};
const onmessage = (input: MessageEvent<unknown>) => {
	statusCallback({
		type: 'interact',
		status: 'download'
	});
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

export function sendWebsocket(input: ServerInput) {
	const status = getStatus();
	if (status.status === 'offline') {
		reconnectWebsocket();
	}
	statusCallback(getStatus());
	websocket.send(JSON.stringify(input));
	statusCallback({
		type: 'interact',
		status: 'upload'
	});
}

export function reconnectWebsocket(): boolean {
	statusCallback({ type: 'status', status: 'loading' });
	try {
		websocket = new WebSocket(uri);
	} catch (e) {
		console.error(e);
		return false;
	}
	websocket.onerror = onerror;
	websocket.onmessage = onmessage;

	// updateConnectionData();

	return true;
}

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

export function updateConnectionData(): Writable<ConnectionData> {
	const unsub = connectionData.subscribe((c: ConnectionData) => {
		if (
			!c.latency ||
			new Date().getMilliseconds() - c.latency.requestTime.getMilliseconds() > 2000
		) {
			const beforeTime = new Date();
			sendWebsocket({
				type: 'latency'
			});

			const millis = (date: Date) => date.getTime() * 1000 + date.getMilliseconds();

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
		}
	});

	unsub();

	return connectionData;
}
