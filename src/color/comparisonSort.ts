import type { Color } from './color';

type ColorKey = {
	name: string;
	keyExtractor: (color: Color) => number;
};

export const colorKeys: ColorKey[] = [
	{
		name: 'Buntwert',
		keyExtractor: (color) => color.hsv().h
	},
	{
		name: 'Helligkeit',
		keyExtractor: (color) => color.oklab().l
	},
	{
		name: 'Sättigung',
		keyExtractor: (color) => color.hsv().s
	},
	{
		name: 'Rot',
		keyExtractor: (color) => color.rgb().r
	},
	{
		name: 'Grün',
		keyExtractor: (color) => color.rgb().g
	},
	{
		name: 'Blau',
		keyExtractor: (color) => color.rgb().b
	}
];
