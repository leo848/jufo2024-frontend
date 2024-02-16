const sep = "_"

export function fromUrlString(s: string): string[] | null {
	let result = s.split(sep);
	if (result.some(v => v == null)) return null;
	else return result;
}

export function toUrlString(words: string[]): string {
	return words.join(sep);
}
