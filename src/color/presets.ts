import { Color, NamedColor } from '../color/color';
import { OklabColor, RgbColor } from '../color/colorSpaces';

function chunks<T>(array: T[], n: number): T[][] {
	const chunks: T[][] = [];
	for (let i = 0; i < array.length; i += n) {
		chunks.push(array.slice(i, i + n));
	}
	return chunks;
}

function transpose<T>(mat: T[][]): T[][] {
	return mat[0].map((_col, i) => mat.map((row) => row[i]));
}

function mapBuntstifte(input: [number, number, number][]): NamedColor[] {
	return input
		.map(([r, g, b], index) => ({ r, g, b, index }))
		.map(({ r, g, b, index }) => ({
			color: new RgbColor(r / 255, g / 255, b / 255).color(),
			index
		}))
		.slice(0, 100)
		.toSorted(({ color: c1 }, { color: c2 }) => {
			let o1 = c1.space('oklab');
			let o2 = c2.space('oklab');
			//let chromaSquared1 = o1.a * o1.a + o1.b * o1.b;
			//let chromaSquared2 = o2.a * o2.a + o2.b * o2.b;
			let hue1 = Math.atan2(o1.b, o1.a);
			let hue2 = Math.atan2(o2.b, o2.a);
			return hue2 - hue1;
		})
		.filter(({ index }) => index % 2 == 0)
		.map(({ color, index }) => NamedColor.fromColor(color, leftPadZeroes(3, index + 1)));
}

function rgb(hex: string): Color {
	return RgbColor.fromNumeric(Number.parseInt(hex.substring(1), 16)).color();
}
function leftPadZeroes(len: number, num: number): string {
	let str = '' + num;
	while (str.length < len) str = '0' + str;
	return str;
}

function arrange<T>(array: T[], indices: number[]): T[] {
	let vs: T[] = [];
	for (const index of indices) {
		vs.push(array[index]);
	}
	return vs;
}

const books = {
	name: 'Mathematikbücher',
	colors: (
		[
			['mit der eins fängt alles an', 245, 242, 241],
			['mathe macciato', 212, 188, 0],
			['rechnen und raten', 240, 198, 33],
			['mathematisches problemlösen und beweisen', 230, 109, 0],
			['von ziffern zahlen und zeichen', 185, 112, 29],
			['mathe magie für durchblicker', 217, 73, 51],
			['nullen machen einsen groß', 191, 44, 38],
			['damit hatte keiner gerechnet', 190, 34, 39],
			['eine null im alltag', 211, 57, 37],
			['Zahlen, bitte!', 203, 83, 113],
			['rechnen mit dem weltmeister', 72, 4, 54],
			['mathematische detektivgeschichten', 188, 225, 244],
			['zahlen spiralen und magische quadrate', 133, 184, 213],
			['schülerduden mathematik ii', 93, 167, 245],
			['rechnen ohne taschenrechner', 0, 144, 147],
			['100 great problems of elementary mathematics', 57, 57, 112],
			['dtv atlas schulmathematik', 0, 37, 107],
			['fünf minuten mathematik', 6, 3, 2],
			['von der pflicht zur kür', 20, 22, 33],
			['nikola teslas rätseluniversum', 51, 64, 94],
			['mathematische knobeleien', 1, 60, 24],
			['fit im kopf', 96, 116, 46],
			['mathematik durch die hintertür', 164, 184, 58],
			['1089 oder das wunder der zahlen', 180, 191, 52],
			['enigma', 231, 175, 114],
			['mathe in 30 sekunden', 202, 173, 117]
		] as const
	)
		.map(([name, r, g, b]) => {
			const rgb = new RgbColor(r / 255, g / 255, b / 255);
			return NamedColor.fromColor(rgb.color(), name);
		})
		.toSorted(() => Math.random() - 0.5)
};
const presets = {
	buntstifte: {
		name: 'Buntstifte',
		colors: mapBuntstifte([
			[248, 213, 174],
			[192, 155, 124],
			[185, 145, 90],
			[159, 87, 74],
			[21, 15, 11],
			[37, 26, 19],
			[111, 82, 66],
			[81, 58, 42],
			[140, 108, 86],
			[22, 19, 21],
			[27, 28, 30],
			[36, 26, 36],
			[30, 31, 36],
			[45, 82, 113],
			[89, 139, 160],
			[56, 108, 136],
			[37, 50, 71],
			[35, 34, 60],
			[39, 41, 51],
			[61, 95, 115],
			[181, 187, 164],
			[39, 36, 26],
			[41, 55, 36],
			[37, 42, 24],
			[49, 45, 23],
			[56, 59, 23],
			[58, 59, 31],
			[54, 115, 109],
			[101, 153, 83],
			[47, 69, 36],
			[44, 67, 45],
			[56, 107, 88],
			[175, 189, 163],
			[61, 95, 57],
			[76, 139, 99],
			[68, 114, 99],
			[61, 108, 128],
			[122, 156, 139],
			[69, 87, 63],
			[103, 136, 58],
			[61, 107, 52],
			[97, 131, 43],
			[221, 201, 66],
			[148, 161, 56],
			[189, 192, 67],
			[253, 210, 97],
			[254, 215, 110],
			[254, 209, 56],
			[254, 217, 105],
			[254, 205, 47],
			[250, 215, 70],
			[254, 198, 41],
			[254, 205, 47],
			[254, 189, 42],
			[253, 180, 42],
			[254, 167, 24],
			[253, 137, 27],
			[234, 127, 31],
			[244, 80, 23],
			[226, 55, 23],
			[238, 84, 25],
			[211, 60, 24],
			[232, 58, 25],
			[230, 69, 51],
			[211, 45, 32],
			[141, 21, 17],
			[178, 34, 16],
			[185, 28, 17],
			[123, 19, 13],
			[147, 29, 9],
			[151, 25, 20],
			[149, 32, 22],
			[126, 28, 11],
			[114, 23, 13],
			[186, 34, 30],
			[251, 194, 135],
			[253, 173, 78],
			[253, 117, 53],
			[253, 143, 41],
			[252, 150, 59],
			[254, 188, 134],
			[235, 158, 136],
			[252, 86, 90],
			[253, 128, 105],
			[253, 71, 93],
			[249, 60, 86],
			[219, 55, 61],
			[233, 72, 95],
			[125, 48, 65],
			[168, 51, 59],
			[68, 39, 22],
			[86, 51, 56],
			[71, 41, 44],
			[99, 47, 41],
			[67, 52, 48],
			[74, 72, 84],
			[71, 49, 83],
			[75, 60, 70],
			[147, 102, 102],
			[57, 50, 45],
			[69, 45, 37],
			[135, 89, 34],
			[205, 113, 37],
			[213, 129, 25],
			[130, 70, 28],
			[130, 30, 9],
			[196, 100, 41],
			[162, 57, 33],
			[185, 40, 42],
			[168, 54, 36],
			[92, 46, 51],
			[144, 53, 36],
			[102, 41, 26],
			[107, 42, 16],
			[73, 42, 38],
			[155, 50, 25],
			[115, 51, 29],
			[93, 49, 22],
			[84, 39, 18],
			[137, 92, 31],
			[253, 151, 68],
			[253, 126, 69],
			[252, 127, 34],
			[206, 59, 27],
			[221, 70, 45],
			[254, 197, 126],
			[126, 81, 87],
			[160, 70, 39],
			[132, 64, 71],
			[216, 140, 52],
			[174, 85, 33],
			[137, 45, 43],
			[254, 205, 79],
			[98, 83, 48],
			[121, 64, 34],
			[135, 119, 31],
			[169, 132, 110],
			[140, 160, 160],
			[106, 62, 68],
			[59, 59, 58],
			[38, 33, 27],
			[86, 48, 24],
			[72, 43, 27],
			[209, 142, 26],
			[56, 51, 47],
			[194, 65, 18],
			[50, 34, 26],
			[117, 62, 28],
			[186, 154, 120],
			[101, 130, 53],
			[142, 48, 29],
			[241, 195, 123],
			[238, 196, 114],
			[154, 144, 123],
			[128, 132, 115],
			[129, 139, 135],
			[79, 52, 33],
			[154, 156, 129],
			[187, 126, 102],
			[166, 158, 96]
		])
	},
	books,
	pride: {
		name: 'Pride-Flagge',
		colors: [0xff1e26, 0xfe941e, 0xffff00, 0x06bd00, 0x001a98, 0x760088].map((num) =>
			RgbColor.fromNumeric(num).color()
		)
	},
	pearls: {
		name: 'Perlen',
		colors: transpose(
			chunks(
				[
					[79, 10, 17],
					[95, 33, 21],
					[96, 52, 15],
					[100, 50, 20],
					[96, 64, 43],
					[93, 82, 25],
					[91, 88, 39],
					[91, 85, 73],
					[37, 76, 64],
					[2, 56, 50],
					[1, 67, 49],
					[89, 90, 92],
					[22, 55, 80],
					[2, 73, 94],
					[34, 77, 78],
					[55, 84, 90],
					[36, 13, 48],
					[46, 25, 61],
					[63, 55, 76],
					[49, 50, 56],
					[95, 54, 70],
					[96, 66, 73],
					[98, 79, 76],
					[97, 75, 82]
				].map((arr) => {
					let ns = arr.map((n) => n / 100);
					return new RgbColor(ns[0], ns[1], ns[2]).color();
				}),
				4
			)
		).flat()
	},
	langfassung: {
		name: 'Langfassung',
		colors: [
			[0.6, 0.2],
			[0.1, 0.7],
			[0.9, 0.4],
			[0.2, 0.2],
			[0.5, 0.5],
			[0.8, 0.7]
		].map(([r, b]) => new RgbColor(r, 0, b).color())
	},
	rgbcube: {
		name: 'RGB-Würfel',
		colors: [0, 25, 50, 75, 100]
			.map((r) =>
				[0, 25, 50, 75, 100].map((g) =>
					[0, 25, 50, 75, 100].map((b) => new RgbColor(r / 100, g / 100, b / 100).color())
				)
			)
			.flat(3)
	},
	rgbcubedark: {
		name: 'RGB-Würfel dunkel',
		colors: [0, 25, 50, 75, 100]
			.map((r) =>
				[0, 25, 50, 75, 100].map((g) =>
					[0, 25, 50, 75, 100].map((b) => new RgbColor(r / 100, g / 100, b / 100).color())
				)
			)
			.flat(3)
			.filter((c) => c.oklab().l < 0.5)
	},
	nailpolish: {
		name: 'Nagellack',
		colors: (
			[
				['120 Black', 0, 0, 0],
				['190 Blue', 8, 47, 163],
				['170 Blue', 138, 216, 242],
				['115 Polish Purple', 194, 76, 158],
				['420 Red', 204, 14, 12],
				['110 White', 242, 242, 242],
				['320 Pink', 255, 94, 180],
				['160 Pearl-Orange', 255, 154, 145],
				['235 Polish lilac', 224, 173, 222],
				['400 Taupe', 184, 174, 171]
			] satisfies [string, number, number, number][]
		)
			.map(([name, r, g, b]) =>
				NamedColor.fromColor(new RgbColor(r / 255, g / 255, b / 255).color(), name)
			)
			.toSorted((c1, c2) => {
				let [h1, h2] = [c1, c2].map((c) => c.hsv().h);
				return h1 - h2;
			})
	},
	brightness: {
		name: 'Helligkeit',
		colors: new Array(21)
			.fill(0)
			.map((_, i) => new OklabColor(i / 20, 0.5, 0.5).color())
			.slice(1)
	},
	plakatRgb: {
		name: 'Plakat 1: RGB',
		colors: [
			rgb('#2ecc40'),
			rgb('#ff851b'),
			rgb('#b10dc9'),
			rgb('#000000'),
			rgb('#42024c'),
			rgb('#00ff00'),
			rgb('#ff4136'),
			rgb('#aaaaaa'),
			rgb('#888888'),
			rgb('#383bcd'),
			rgb('#bada55'),
			rgb('#b00b1e'),
			rgb('#ffb3af'),
			rgb('#97c077')
		]
	},
	plakatOklab1: {
		name: 'Plakat 2: Farbauswahl',
		colors: arrange(
			[
				[0.5914011514502124, 0.5089514143761735, 0.2800511762481829],
				[0.5954890470450107, 0.6499999956547772, 0.30000002476520615],
				[0.5992255875279227, 0.7084398938005532, 0.5107491709806289],
				[0.6014743717301569, 0.3951406652495834, 0.6555694740127327],
				[0.5972363098110967, 0.5022584746631034, 0.38425468781633987],
				[0.5977745295536842, 0.5543966560544072, 0.5103997991555596],
				[0.6127855390025474, 0.4322250656412217, 0.4648790413151119],
				[0.6039260630241432, 0.7099999971813594, 0.41000127790815133],
				[0.5947573915601344, 0.6296113775112827, 0.44709120742109115],
				[0.602952859903856, 0.4493045658603685, 0.5562660136451636],
				[0.5988702788536409, 0.6229923792086761, 0.6516486786222625],
				[0.5978289947272879, 0.7420338474263394, 0.6350007363296681]
			].map(([_, a, b]) => new OklabColor(0.6, a, b).color()),
			[3, 12, 11, 4, 8, 9, 6, 10, 2, 1, 5, 7].map((n) => n - 1)
		).map((c, i) => NamedColor.fromColor(c, 'l_' + (i + 1)))
	}
} satisfies Partial<Record<string, { name: string; colors: Color[] }>>;

export default presets;
