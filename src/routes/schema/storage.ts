import { Schema, Schemas } from './types';

const KEY = 'sorting-schema-storage__schemas';

const defaultSchemas: Schemas = {
	'sort-colors-oklab': {
		name: 'sort-colors-oklab',
		desc: 'Farben im OKLAB-Farbraum sortieren',
		numericDimensions: [
			{ name: 'Helligkeit', min: 0, max: 1, weight: 1 },
			{ name: 'Farbwert a', min: -0.4, max: 0.4, weight: 1 },
			{ name: 'Farbwert b', min: -0.4, max: 0.4, weight: 1 }
		],
		optionDimensions: []
	},
	'sort-colors-rgb': {
		name: 'sort-colors-rgb',
		desc: 'Farben im RGB-Farbraum sortieren',
		numericDimensions: [
			{ name: 'Rot', min: 0, max: 255, weight: 1, step: 1 },
			{ name: 'Grün', min: 0, max: 255, weight: 1, step: 1 },
			{ name: 'Blau', min: 0, max: 255, weight: 1, step: 1 }
		],
		optionDimensions: []
	},
	'sort-places': {
		name: 'sort-places',
		desc: 'Geografische Orte sortieren',
		numericDimensions: [
			{ name: 'Breitengrad', weight: 1, min: -180, max: 180, default: 0 },
			{ name: 'Längengrad', weight: 1, min: -90, max: 90, default: 0 }
		],
		optionDimensions: []
	},
	'sort-german-places': {
		name: 'sort-german-places',
		desc: 'Deutsche Städte unter Berücksichtigung des Bundeslands sortieren',
		numericDimensions: [
			{ name: 'Breitengrad (Süd -> Nord)', weight: 1, min: 47, max: 56 },
			{ name: 'Längengrad (West -> Ost)', weight: 1, min: 5, max: 16 }
		],
		optionDimensions: [
			{
				name: 'Bundesland',
				weight: 1,
				default: 'Nordrhein-Westfalen',
				options: [
					'Baden-Württemberg',
					'Bayern',
					'Berlin',
					'Brandenburg',
					'Bremen',
					'Hamburg',
					'Hessen',
					'Mecklenburg-Vorpommern',
					'Niedersachsen',
					'Nordrhein-Westfalen',
					'Rheinland-Pfalz',
					'Saarland',
					'Sachsen',
					'Sachsen-Anhalt',
					'Schleswig-Holstein',
					'Thüringen'
				]
			}
		]
	},
	'sort-integer-grid': {
		name: 'sort-integer-grid',
		desc: 'Punkte auf ganzzahligem Raster sortieren',
		numericDimensions: [
			{ name: 'X-Koordinate', weight: 1, step: 1 },
			{ name: 'Y-Koordinate', weight: 1, step: 1 }
		],
		optionDimensions: []
	},
	'sort-floats': {
		name: 'sort-floats',
		desc: 'Gleitkommazahlen sortieren',
		numericDimensions: [{ name: 'Zahlwert', weight: 1 }],
		optionDimensions: []
	}
};

function loadSchemasRaw(): Schemas {
	const item = localStorage.getItem(KEY);
	let value;
	try {
		value = JSON.parse(item ?? '{any:-1}');
	} catch {
		saveSchemas(defaultSchemas);
		return defaultSchemas;
	}
	const result = Schemas.safeParse(value);
	if (result.success) {
		return result.data;
	} else {
		saveSchemas(defaultSchemas);
		return defaultSchemas;
	}
}

export function loadSchemas(): Schema[] {
	return Object.values(loadSchemasRaw()).flatMap((t) => {
		const result = Schema.fromSchemaType(t);
		if (result.success) return [result.value];
		else return [];
	});
}

function saveSchemas(schemas: Schemas) {
	localStorage.setItem(KEY, JSON.stringify(schemas));
}

export function saveSchema(schema: Schema) {
	const schemas = Object.assign({}, loadSchemasRaw(), { [schema.name]: schema.deserialize() });
	saveSchemas(schemas);
}

export function loadSchema(key: string): Schema | null {
	const raw = loadSchemasRaw()[key];
	if (raw == null) return null;
	const result = Schema.fromSchemaType(raw);
	if (!result.success) return null;
	return result.value;
}

export function deleteSchema(key: string) {
	const raw = loadSchemasRaw();
	delete raw[key];
	saveSchemas(raw);
}
