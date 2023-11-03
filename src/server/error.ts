import type { ComponentType } from 'svelte';
import { assertNever } from './types';

import { CodeSolid, FileZipOutline } from 'flowbite-svelte-icons';
import type { ServerError, ClientError } from './types';

export type DisplayError = {
	title: string;
	description: string;
	origin: 'client' | 'server';
	icon?: ComponentType;
};

let _globalErrorHandler: (err: DisplayError) => void = console.error;

export function setGlobalErrorHandler(handler: (err: DisplayError) => void) {
	_globalErrorHandler = handler;
}

function handleError(err: DisplayError) {
	_globalErrorHandler(err);
}

export function handleServerError(err: ServerError) {
	handleError(serverToDisplayError(err));
}

export function handleClientError(err: ClientError) {
	handleError(clientToDisplayError(err));
}

function escapeHtml(html: string): string {
	return new Option(html).innerHTML;
}

const serdeError = (original: string, error: string) => {
	original = escapeHtml(original);
	error = escapeHtml(error);
	return {
		title: 'Serialisierung fehlgeschlagen',
		description: `Die folgende Nachricht konnte nicht in eine Datenstruktur gelesen werden:<br><code>${original}</code><br>Dieser Fehler wurde zurückgegeben:<br><code>${error}</code>`,
		icon: CodeSolid
	};
};

function serverToDisplayError(error: ServerError): DisplayError {
	return {
		...serverToDisplayErrorRaw(error),
		origin: 'server'
	};
}

function serverToDisplayErrorRaw(error: ServerError): Omit<DisplayError, 'origin'> {
	const type = error.type;
	if (type === 'serde') {
		return serdeError(error.original, error.error);
	} else if (type === 'binaryData') {
		return {
			title: 'Binäre Daten versandt',
			description: 'Der Server hat binäre Daten erhalten, aber kann diese nicht nutzen.',
			icon: FileZipOutline
		};
	}
	assertNever(error);
}

function clientToDisplayError(error: ClientError): DisplayError {
	return {
		...clientToDisplayErrorRaw(error),
		origin: 'client'
	};
}

function clientToDisplayErrorRaw(error: ClientError): Omit<DisplayError, 'origin'> {
	const type = error.type;
	if (type === 'binaryData') {
		return {
			title: 'Binäre Daten erhalten',
			description: 'Die Anwendung hat binäre Daten erhalten, aber kann diese nicht nutzen.',
			icon: FileZipOutline
		};
	} else if (type === 'serde') {
		return serdeError(error.original, error.error);
	}
	assertNever(error);
}
