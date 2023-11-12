// Konvertiere ein Element einer linear enkodierten Farbe
// zur nichtlinearen sRGB-Repräsentation.
export function toGamma(u: number): number {
	if (u >= 0.0031308) {
		return 1.055 * Math.pow(u, 1.0 / 2.4) - 0.055;
	} else {
		return 12.92 * u;
	}
}

// Konvertiere ein Element einer sRGB-enkodierten Farbe
// zur linearen Repräsentation.
// Sollte nur zu temporären Konversionszwecken genutzt und nicht gespeichert werden.
export function toLinear(u: number): number {
	if (u >= 0.04045) {
		return Math.pow((u + 0.055) / (1 + 0.055), 2.4);
	} else {
		return u / 12.92;
	}
}
