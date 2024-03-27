import { lerp, rangeMap } from '../utils/math';
import type { Color } from './color';
import { OklabColor, RgbColor } from './colorSpaces';

function rgb(hex: string): Color {
	return RgbColor.fromNumeric(parseInt(hex.substring(1), 16)).color();
}

export class PerceptualGradient {
	static Icefire: PerceptualGradient = new PerceptualGradient(
		rgb('#bde7db'),
		rgb('#bae5da'),
		rgb('#b7e3d9'),
		rgb('#b4e1d9'),
		rgb('#b2dfd8'),
		rgb('#afddd7'),
		rgb('#acdbd7'),
		rgb('#a9d9d6'),
		rgb('#a7d7d5'),
		rgb('#a4d5d5'),
		rgb('#a1d3d4'),
		rgb('#9ed1d3'),
		rgb('#9bcfd3'),
		rgb('#98cdd2'),
		rgb('#95cbd2'),
		rgb('#93cad1'),
		rgb('#90c8d1'),
		rgb('#8dc6d0'),
		rgb('#8ac4d0'),
		rgb('#87c2cf'),
		rgb('#84c1cf'),
		rgb('#81bfcf'),
		rgb('#7ebdce'),
		rgb('#7bbbce'),
		rgb('#78b9ce'),
		rgb('#75b8ce'),
		rgb('#72b6ce'),
		rgb('#6eb4cd'),
		rgb('#6bb2cd'),
		rgb('#68b0cd'),
		rgb('#65afcd'),
		rgb('#63adcd'),
		rgb('#60abcd'),
		rgb('#5da9cd'),
		rgb('#5aa7cd'),
		rgb('#58a5cd'),
		rgb('#55a3cd'),
		rgb('#53a2cd'),
		rgb('#50a0cd'),
		rgb('#4e9ecd'),
		rgb('#4c9ccd'),
		rgb('#499ace'),
		rgb('#4798ce'),
		rgb('#4596ce'),
		rgb('#4394ce'),
		rgb('#4192ce'),
		rgb('#3f90ce'),
		rgb('#3e8ecf'),
		rgb('#3c8ccf'),
		rgb('#3a89cf'),
		rgb('#3987cf'),
		rgb('#3885d0'),
		rgb('#3783d0'),
		rgb('#3781d0'),
		rgb('#377fd0'),
		rgb('#377cd0'),
		rgb('#377ad0'),
		rgb('#3878cf'),
		rgb('#3975cf'),
		rgb('#3a73ce'),
		rgb('#3b71cd'),
		rgb('#3d6ecc'),
		rgb('#3e6ccb'),
		rgb('#3f69c9'),
		rgb('#4167c7'),
		rgb('#4265c5'),
		rgb('#4363c3'),
		rgb('#4560c1'),
		rgb('#465ebe'),
		rgb('#475cbc'),
		rgb('#475ab9'),
		rgb('#4858b6'),
		rgb('#4956b3'),
		rgb('#4954b0'),
		rgb('#4952ad'),
		rgb('#4a50a9'),
		rgb('#4a4fa5'),
		rgb('#494da1'),
		rgb('#494c9e'),
		rgb('#494a9a'),
		rgb('#484996'),
		rgb('#474792'),
		rgb('#47468e'),
		rgb('#46458a'),
		rgb('#454386'),
		rgb('#444282'),
		rgb('#43417f'),
		rgb('#42407b'),
		rgb('#413e77'),
		rgb('#3f3d74'),
		rgb('#3e3c70'),
		rgb('#3d3b6d'),
		rgb('#3c3a69'),
		rgb('#3b3866'),
		rgb('#393763'),
		rgb('#38365f'),
		rgb('#37355c'),
		rgb('#363459'),
		rgb('#343356'),
		rgb('#333153'),
		rgb('#323050'),
		rgb('#312f4d'),
		rgb('#302e4a'),
		rgb('#2e2d48'),
		rgb('#2d2c45'),
		rgb('#2c2b42'),
		rgb('#2b2a40'),
		rgb('#2a293d'),
		rgb('#29283b'),
		rgb('#282739'),
		rgb('#272636'),
		rgb('#262534'),
		rgb('#252532'),
		rgb('#242430'),
		rgb('#24232e'),
		rgb('#23222d'),
		rgb('#22222b'),
		rgb('#222129'),
		rgb('#212028'),
		rgb('#212026'),
		rgb('#202025'),
		rgb('#201f24'),
		rgb('#1f1f23'),
		rgb('#1f1f21'),
		rgb('#1f1e21'),
		rgb('#1f1e20'),
		rgb('#1f1e1f'),
		rgb('#1f1e1e'),
		rgb('#1f1e1e'),
		rgb('#201e1e'),
		rgb('#211e1e'),
		rgb('#221e1e'),
		rgb('#231e1e'),
		rgb('#251e1f'),
		rgb('#261e1f'),
		rgb('#271e1f'),
		rgb('#291e20'),
		rgb('#2a1e20'),
		rgb('#2c1e21'),
		rgb('#2d1f21'),
		rgb('#2f1f22'),
		rgb('#311f23'),
		rgb('#332023'),
		rgb('#352024'),
		rgb('#372025'),
		rgb('#392126'),
		rgb('#3b2127'),
		rgb('#3d2228'),
		rgb('#3f2228'),
		rgb('#412329'),
		rgb('#43232a'),
		rgb('#46242b'),
		rgb('#48242c'),
		rgb('#4a252e'),
		rgb('#4d252f'),
		rgb('#4f2630'),
		rgb('#522731'),
		rgb('#542732'),
		rgb('#572833'),
		rgb('#5a2834'),
		rgb('#5c2935'),
		rgb('#5f2936'),
		rgb('#622937'),
		rgb('#642a38'),
		rgb('#672a39'),
		rgb('#6a2b3a'),
		rgb('#6d2b3b'),
		rgb('#702b3c'),
		rgb('#722c3d'),
		rgb('#752c3e'),
		rgb('#782c3f'),
		rgb('#7b2d40'),
		rgb('#7e2d40'),
		rgb('#812d41'),
		rgb('#842d42'),
		rgb('#872d42'),
		rgb('#8a2e43'),
		rgb('#8d2e43'),
		rgb('#902e44'),
		rgb('#932e44'),
		rgb('#962e44'),
		rgb('#992e44'),
		rgb('#9c2f45'),
		rgb('#9f2f44'),
		rgb('#a22f44'),
		rgb('#a52f44'),
		rgb('#a83044'),
		rgb('#ab3043'),
		rgb('#ae3143'),
		rgb('#b13242'),
		rgb('#b33341'),
		rgb('#b63441'),
		rgb('#b93540'),
		rgb('#bb363f'),
		rgb('#be373e'),
		rgb('#c0393d'),
		rgb('#c33a3c'),
		rgb('#c53c3c'),
		rgb('#c73d3b'),
		rgb('#c93f3a'),
		rgb('#cc4139'),
		rgb('#ce4338'),
		rgb('#d04537'),
		rgb('#d24737'),
		rgb('#d34936'),
		rgb('#d54b35'),
		rgb('#d74e35'),
		rgb('#d95034'),
		rgb('#da5334'),
		rgb('#dc5534'),
		rgb('#de5733'),
		rgb('#df5a33'),
		rgb('#e15c33'),
		rgb('#e25f33'),
		rgb('#e36233'),
		rgb('#e56433'),
		rgb('#e66734'),
		rgb('#e76a34'),
		rgb('#e86d35'),
		rgb('#e96f36'),
		rgb('#ea7238'),
		rgb('#eb753a'),
		rgb('#ec783b'),
		rgb('#ed7b3e'),
		rgb('#ed7e40'),
		rgb('#ee8142'),
		rgb('#ef8445'),
		rgb('#ef8748'),
		rgb('#f0894b'),
		rgb('#f18c4e'),
		rgb('#f18f51'),
		rgb('#f29255'),
		rgb('#f29558'),
		rgb('#f3985b'),
		rgb('#f39a5f'),
		rgb('#f49d63'),
		rgb('#f5a066'),
		rgb('#f5a36a'),
		rgb('#f6a56d'),
		rgb('#f6a871'),
		rgb('#f7ab75'),
		rgb('#f7ae79'),
		rgb('#f8b07c'),
		rgb('#f8b380'),
		rgb('#f9b684'),
		rgb('#fab887'),
		rgb('#fabb8b'),
		rgb('#fbbe8f'),
		rgb('#fbc192'),
		rgb('#fcc396'),
		rgb('#fcc69a'),
		rgb('#fdc99e'),
		rgb('#fdcca1'),
		rgb('#fecea5'),
		rgb('#fed1a9'),
		rgb('#ffd4ac')
	);

	stops: OklabColor[];

	constructor(...stops: Color[]) {
		this.stops = stops.map((color) => color.oklab());
	}

	sample(p: number): OklabColor | null {
		if (isNaN(p)) return null;
		let unit = 1 / (this.stops.length - 1);
		let idxLeft = Math.floor(p / unit);
		let idxRight = idxLeft + 1;
		let innerP = rangeMap(p, [idxLeft * unit, idxRight * unit], [0, 1]);

		let colorLeft = this.stops[idxLeft];
		let colorRight = this.stops[idxRight];

		if (innerP < 0.001) return colorLeft;
		if (innerP > 0.999) return colorRight;

		let l = lerp([colorLeft.l, colorRight.l], innerP);
		let a = lerp([colorLeft.a, colorRight.a], innerP);
		let b = lerp([colorLeft.b, colorRight.b], innerP);

		return new OklabColor(l, a, b);
	}

	css(stops: number = Math.max(this.stops.length, 10)): string {
		let string = 'linear-gradient(to right, ';
		for (let i = 0; i < stops; i++) {
			const v = i / stops;
			let sampleP = i / (stops - 1);
			let color = this.sample(sampleP);
			string += color!.color().rgb().css() + ' ' + v * 100 + '%, ';
		}
		string = string.substring(0, string.length - 2) + ')';
		return string;
	}
}
export function distColor(dist: number, [min, max]: [number, number]): Color | null {
	/*let [minColor, maxColor] = [new RgbColor(0, 255, 0), new RgbColor(255, 0, 0)].map((rgb) => {
		return rgb.color().space('hsl').with('s', 0.2).color().oklab().with('l', 0.3);
	});*/
	function unease(t: number): number {
		// Inverse cbrt ease.
		return Math.sqrt(t);
	}

	function symmetrify(unease: (t: number) => number): (t: number) => number {
		return (t: number) => {
			if (t < 0.5) {
				return unease(t) / (2 * unease(0.5));
			} else {
				return -(unease(1 - t) / (2 * unease(0.5))) + 1;
			}
		};
	}

	let t = symmetrify(unease)(rangeMap(dist, [min - 0.001, max + 0.001], [0, 0.8]));
	let sample = PerceptualGradient.Icefire.sample(t);
	if (!sample) return null;
	return readableIcefire(sample.color());
}

export function readableIcefire(sample: Color) {
	let sampleDarker = sample.oklab().with('l', rangeMap(sample.oklab().l, [0, 1], [0.3, 0.6]));
	let sampleHsl = sampleDarker.color().space('hsl');
	let color = sampleHsl.with('s', Math.min(sampleHsl.s, 0.4));
	return color.color();
}
