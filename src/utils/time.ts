const units: { unit: Intl.RelativeTimeFormatUnit; ms: number }[] = [
	{ unit: 'year', ms: 31536000000 },
	{ unit: 'month', ms: 2628000000 },
	{ unit: 'day', ms: 86400000 },
	{ unit: 'hour', ms: 3600000 },
	{ unit: 'minute', ms: 60000 },
	{ unit: 'second', ms: 1000 }
];
const rtf = new Intl.RelativeTimeFormat('de', { numeric: 'auto' });

/**
 * Get language-sensitive relative time message from Dates.
 * @param relative  - the relative dateTime, generally is in the past or future
 * @param pivot     - the dateTime of reference, generally is the current time
 */
export function relativeTimeFromDates(relative: Date | null, pivot: Date = new Date()): string {
	if (!relative) return '';
	const elapsed = relative.getTime() - pivot.getTime();
	return relativeTimeFromElapsed(elapsed);
}

/**
 * Get language-sensitive relative time message from elapsed time.
 * @param elapsed   - the elapsed time in milliseconds
 */
export function relativeTimeFromElapsed(elapsed: number): string {
	for (const { unit, ms } of units) {
		if (Math.abs(elapsed) >= ms || unit === 'second') {
			return rtf.format(Math.round(elapsed / ms), unit);
		}
	}
	return '';
}

export function formatTimespan(span: number | null): [string, string] {
	if (span === null) return ['', 'beliebig'];
	else if (span < 1) return ['<1', 'Sekunde'];
	else if (span < 60) return [span < 10 ? span.toFixed(1) : span.toFixed(0), 'Sekunden'];
	else if (span < 60 * 1.5) return ['1', 'Minute'];
	else if (span < 60 * 60) return [(span / 60).toFixed(), 'Minuten'];
	else if (span < 60 * 60 * 1.5) return ['1', 'Stunde'];
	else if (span < 60 * 60 * 24) return [(span / 60 / 60).toFixed(), 'Stunden'];
	else if (span < 60 * 60 * 24 * 1.5) return ['1', 'Tag'];
	else if (span < 60 * 60 * 24 * 365) return [(span / 60 / 60 / 24).toFixed(), 'Tage'];
	else if (span < 60 * 60 * 24 * 365 * 1.5) return ['1', 'Jahr'];
	else if (span < 60 * 60 * 24 * 365 * 100) return [(span / 60 / 60 / 24 / 365).toFixed(), 'Jahre'];
	else if (span < 60 * 60 * 24 * 365 * 100 * 1.5) return ['1', 'Jahrhundert'];
	else if (span < 60 * 60 * 24 * 365 * 100 * 10)
		return [(span / 60 / 60 / 24 / 365 / 100).toFixed(), 'Jahrhunderte'];
	else if (span < 60 * 60 * 24 * 365 * 100 * 10 * 1.5) return ['1', 'Jahrtausend'];
	else if (span < 60 * 60 * 24 * 365 * 100 * 10 * 1000)
		return [(span / 60 / 60 / 24 / 365 / 100 / 10).toFixed(), 'Jahrtausende'];
	else if (span < 60 * 60 * 24 * 365 * 100 * 10 * 1000 * 1.5) return ['1', 'Million Jahre'];
	else if (span < 60 * 60 * 24 * 365 * 100 * 10 * 1000 * 1000)
		return [(span / 60 / 60 / 24 / 365 / 100 / 10 / 1000).toFixed(), 'Millionen Jahre'];
	else if (span < 60 * 60 * 24 * 365 * 100 * 10 * 1000 * 1000 * 1.5)
		return ['1', 'Milliarde Jahre'];
	else if (span < 60 * 60 * 24 * 365 * 100 * 10 * 1000 * 1000 * 1000)
		return [(span / 60 / 60 / 24 / 365 / 100 / 10 / 1000 / 1000).toFixed(), 'Milliarden Jahre'];
	else if (span < 60 * 60 * 24 * 365 * 100 * 10 * 1000 * 1000 * 1000 * 1.5)
		return ['1', 'Billion Jahre'];
	else
		return [
			(span / 60 / 60 / 24 / 365 / 100 / 10 / 1000 / 1000 / 1000).toFixed(),
			'Billionen Jahre'
		];
}
