import type { ComponentType } from 'svelte';
import { assertNever } from './types';

import * as Icon from 'flowbite-svelte-icons';
import type { ServerError, ClientError, ColorNameApiError, OpenRouteApiError } from './types';

export type DisplayError = {
	title: string;
	description: string;
	origin: 'client' | 'server' | 'api';
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

export function handleColorNameApiError(err: ColorNameApiError) {
	handleError(colorNameApiToDisplayError(err));
}

export function handleOpenRouteApiError(err: OpenRouteApiError) {
	handleError(openRouteApiToDisplayError(err));
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
		icon: Icon.CodeSolid
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
			icon: Icon.FileZipOutline
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
			icon: Icon.FileZipOutline
		};
	} else if (type === 'serde') {
		return serdeError(error.original, error.error);
	}
	assertNever(error);
}

function colorNameApiToDisplayError(error: ColorNameApiError): DisplayError {
	return {
		...colorNameApiToDisplayErrorRaw(error),
		origin: 'api'
	};
}

function openRouteApiToDisplayError(error: OpenRouteApiError): DisplayError {
	return {
		...openRouteApiToDisplayErrorRaw(error),
		origin: 'api'
	};
}

function colorNameApiToDisplayErrorRaw(error: ColorNameApiError): Omit<DisplayError, 'origin'> {
	const type = error.type;
	if (type === 'noResponse') {
		return {
			title: 'Keine Antwort erhalten',
			description: 'Der Server zur Bestimmung des Farbwerts hat keine Antwort zurückgegeben.'
		};
	} else if (type === 'serde') {
		return serdeError(error.original, error.error);
	} else if (type === 'invalidKey') {
		return {
			title: `Keine Liste: ${error.key}`,
			description: `Angefragt wurde, eine Farbe nach der Liste "${error.key}" zu benennen. Zu dieser Liste wurde kein Eintrag gefunden.`
		};
	}
	assertNever(error);
}

function openRouteApiToDisplayErrorRaw(error: OpenRouteApiError): Omit<DisplayError, 'origin'> {
	const type = error.type;
	if (type === 'noResponse') {
		return {
			title: 'Keine Antwort erhalten',
			description: 'Der Server zur Bestimmung der Zeitmatrix hat keine Antwort zurückgegeben.',
			icon: Icon.GiftBoxSolid
		};
	} else if (type === 'serde') {
		return serdeError(error.original, error.error);
	}
	assertNever(error);
}
