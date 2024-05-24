import type {NamedPoint} from '../../geom/coordPoint';

function wikiCoord(coord: string): number {
	let deg, min, sec;
	if (coord.endsWith('″')) {
		[deg, min, sec] = coord
			.split(' ')
			.map((s) => s.substring(0, s.length - 1))
			.map(Number);
	} else {
		[deg, min, sec] = coord.split('/').slice(0, 3).map(Number);
	}
	return deg + min / 60 + sec / 3600;
}

export type PointList = {
	name: string;
	aiGenerated?: boolean;
	rotation?: number;
	values: NamedPoint[];
	desc?: string;
	weird?: boolean;
};

export const presets = {
	hamburg: {
		name: 'Stadtteile Hamburgs',
		// prettier-ignore
		values: [
			{"name": "Hamburg-Altstadt", "lat": wikiCoord("53° 33′ 0″"), "lng": wikiCoord("10° 0′ 0″")},
			{"name": "HafenCity", "lat": wikiCoord("53° 32′ 28″"), "lng": wikiCoord("10° 0′ 1″")},
			{"name": "Neustadt", "lat": wikiCoord("53° 33′ 7″"), "lng": wikiCoord("9° 59′ 8″")},
			{"name": "St. Pauli", "lat": wikiCoord("53° 33′ 25″"), "lng": wikiCoord("9° 57′ 50″")},
			{"name": "St. Georg", "lat": wikiCoord("53° 33′ 18″"), "lng": wikiCoord("10° 0′ 44″")},
			{"name": "Hammerbrook", "lat": wikiCoord("53° 32′ 43″"), "lng": wikiCoord("10° 1′ 50″")},
			{"name": "Borgfelde", "lat": wikiCoord("53° 33′ 17″"), "lng": wikiCoord("10° 2′ 4″")},
			{"name": "Hamm", "lat": wikiCoord("53° 33′ 39″"), "lng": wikiCoord("10° 3′ 28″")},
			{"name": "Horn", "lat": wikiCoord("53° 33′ 14″"), "lng": wikiCoord("10° 5′ 24″")},
			{"name": "Billstedt", "lat": wikiCoord("53° 32′ 26″"), "lng": wikiCoord("10° 6′ 4″")},
			{"name": "Billbrook", "lat": wikiCoord("53° 31′ 40″"), "lng": wikiCoord("10° 5′ 10″")},
			{"name": "Rothenburgsort", "lat": wikiCoord("53° 32′ 6″"), "lng": wikiCoord("10° 2′ 27″")},
			{"name": "Veddel", "lat": wikiCoord("53° 31′ 0″"), "lng": wikiCoord("10° 2′ 0″")},
			{"name": "Wilhelmsburg", "lat": wikiCoord("53° 29′ 42″"), "lng": wikiCoord("10° 0′ 40″")},
			{"name": "Kleiner Grasbrook", "lat": wikiCoord("53° 31′ 52″"), "lng": wikiCoord("9° 59′ 37″")},
			{"name": "Steinwerder", "lat": wikiCoord("53° 32′ 4″"), "lng": wikiCoord("9° 57′ 26″")},
			{"name": "Waltershof", "lat": wikiCoord("53° 31′ 40″"), "lng": wikiCoord("9° 54′ 2″")},
			{"name": "Finkenwerder", "lat": wikiCoord("53° 31′ 38″"), "lng": wikiCoord("9° 51′ 58″")},
			{"name": "Altona-Altstadt", "lat": wikiCoord("53° 32′ 56″"), "lng": wikiCoord("9° 56′ 52″")},
			{"name": "Sternschanze", "lat": wikiCoord("53° 33′ 42″"), "lng": wikiCoord("9° 57′ 44″")},
			{"name": "Altona-Nord", "lat": wikiCoord("53° 33′ 47″"), "lng": wikiCoord("9° 56′ 43″")},
			{"name": "Ottensen", "lat": wikiCoord("53° 33′ 14″"), "lng": wikiCoord("9° 55′ 4″")},
			{"name": "Bahrenfeld", "lat": wikiCoord("53° 34′ 26″"), "lng": wikiCoord("9° 53′ 33″")},
			{"name": "Groß Flottbek", "lat": wikiCoord("53° 33′ 55″"), "lng": wikiCoord("9° 52′ 39″")},
			{"name": "Othmarschen", "lat": wikiCoord("53° 33′ 10″"), "lng": wikiCoord("9° 53′ 40″")},
			{"name": "Lurup", "lat": wikiCoord("53° 35′ 35″"), "lng": wikiCoord("9° 52′ 58″")},
			{"name": "Osdorf", "lat": wikiCoord("53° 34′ 22″"), "lng": wikiCoord("9° 50′ 48″")},
			{"name": "Nienstedten", "lat": wikiCoord("53° 33′ 18″"), "lng": wikiCoord("9° 50′ 41″")},
			{"name": "Blankenese", "lat": wikiCoord("53° 33′ 30″"), "lng": wikiCoord("9° 48′ 40″")},
			{"name": "Iserbrook", "lat": wikiCoord("53° 34′ 35″"), "lng": wikiCoord("9° 49′ 24″")},
			{"name": "Sülldorf", "lat": wikiCoord("53° 35′ 6″"), "lng": wikiCoord("9° 47′ 39″")},
			{"name": "Rissen", "lat": wikiCoord("53° 34′ 59″"), "lng": wikiCoord("9° 45′ 13″")},
			{"name": "Eimsbüttel", "lat": wikiCoord("53° 34′ 33″"), "lng": wikiCoord("9° 57′ 6″")},
			{"name": "Rotherbaum", "lat": wikiCoord("53° 34′ 5″"), "lng": wikiCoord("9° 59′ 18″")},
			{"name": "Harvestehude", "lat": wikiCoord("53° 34′ 40″"), "lng": wikiCoord("9° 59′ 20″")},
			{"name": "Hoheluft-West", "lat": wikiCoord("53° 34′ 48″"), "lng": wikiCoord("9° 58′ 2″")},
			{"name": "Lokstedt", "lat": wikiCoord("53° 36′ 11″"), "lng": wikiCoord("9° 57′ 23″")},
			{"name": "Niendorf", "lat": wikiCoord("53° 37′ 4″"), "lng": wikiCoord("9° 57′ 1″")},
			{"name": "Schnelsen", "lat": wikiCoord("53° 38′ 0″"), "lng": wikiCoord("9° 55′ 0″")},
			{"name": "Eidelstedt", "lat": wikiCoord("53° 36′ 25″"), "lng": wikiCoord("9° 54′ 22″")},
			{"name": "Stellingen", "lat": wikiCoord("53° 35′ 32″"), "lng": wikiCoord("9° 55′ 43″")},
			{"name": "Hoheluft-Ost", "lat": wikiCoord("53° 35′ 5″"), "lng": wikiCoord("9° 58′ 34″")},
			{"name": "Eppendorf", "lat": wikiCoord("53° 35′ 44″"), "lng": wikiCoord("9° 59′ 2″")},
			{"name": "Groß Borstel", "lat": wikiCoord("53° 36′ 49″"), "lng": wikiCoord("9° 58′ 57″")},
			{"name": "Alsterdorf", "lat": wikiCoord("53° 36′ 39″"), "lng": wikiCoord("10° 0′ 47″")},
			{"name": "Winterhude", "lat": wikiCoord("53° 36′ 0″"), "lng": wikiCoord("10° 0′ 0″")},
			{"name": "Uhlenhorst", "lat": wikiCoord("53° 34′ 21″"), "lng": wikiCoord("10° 1′ 7″")},
			{"name": "Hohenfelde", "lat": wikiCoord("53° 33′ 42″"), "lng": wikiCoord("10° 1′ 15″")},
			{"name": "Barmbek-Süd", "lat": wikiCoord("53° 34′ 48″"), "lng": wikiCoord("10° 2′ 26″")},
			{"name": "Dulsberg", "lat": wikiCoord("53° 34′ 0″"), "lng": wikiCoord("10° 3′ 0″")},
			{"name": "Barmbek-Nord", "lat": wikiCoord("53° 36′ 19″"), "lng": wikiCoord("10° 2′ 24″")},
			{"name": "Ohlsdorf", "lat": wikiCoord("53° 37′ 33″"), "lng": wikiCoord("10° 1′ 53″")},
			{"name": "Fuhlsbüttel", "lat": wikiCoord("53° 38′ 4″"), "lng": wikiCoord("10° 0′ 58″")},
			{"name": "Langenhorn", "lat": wikiCoord("53° 39′ 56″"), "lng": wikiCoord("10° 0′ 5″")},
			{"name": "Eilbek", "lat": wikiCoord("53° 34′ 4″"), "lng": wikiCoord("10° 2′ 44″")},
			{"name": "Wandsbek", "lat": wikiCoord("53° 34′ 55″"), "lng": wikiCoord("10° 5′ 3″")},
			{"name": "Marienthal", "lat": wikiCoord("53° 34′ 8″"), "lng": wikiCoord("10° 5′ 9″")},
			{"name": "Jenfeld", "lat": wikiCoord("53° 34′ 20″"), "lng": wikiCoord("10° 8′ 10″")},
			{"name": "Tonndorf", "lat": wikiCoord("53° 35′ 10″"), "lng": wikiCoord("10° 7′ 29″")},
			{"name": "Farmsen-Berne", "lat": wikiCoord("53° 36′ 23″"), "lng": wikiCoord("10° 7′ 11″")},
			{"name": "Bramfeld", "lat": wikiCoord("53° 36′ 31″"), "lng": wikiCoord("10° 4′ 21″")},
			{"name": "Steilshoop", "lat": wikiCoord("53° 36′ 37″"), "lng": wikiCoord("10° 3′ 33″")},
			{"name": "Wellingsbüttel", "lat": wikiCoord("53° 38′ 16″"), "lng": wikiCoord("10° 4′ 52″")},
			{"name": "Sasel", "lat": wikiCoord("53° 39′ 14″"), "lng": wikiCoord("10° 6′ 43″")},
			{"name": "Poppenbüttel", "lat": wikiCoord("53° 39′ 33″"), "lng": wikiCoord("10° 5′ 5″")},
			{"name": "Hummelsbüttel", "lat": wikiCoord("53° 38′ 52″"), "lng": wikiCoord("10° 2′ 29″")},
			{"name": "Lemsahl-Mellingstedt", "lat": wikiCoord("53° 41′ 24″"), "lng": wikiCoord("10° 5′ 47″")},
			{"name": "Duvenstedt", "lat": wikiCoord("53° 42′ 29″"), "lng": wikiCoord("10° 6′ 16″")},
			{"name": "Wohldorf-Ohlstedt", "lat": wikiCoord("53° 41′ 34″"), "lng": wikiCoord("10° 7′ 52″")},
			{"name": "Bergstedt", "lat": wikiCoord("53° 40′ 16″"), "lng": wikiCoord("10° 7′ 37″")},
			{"name": "Volksdorf", "lat": wikiCoord("53° 38′ 59″"), "lng": wikiCoord("10° 11′ 3″")},
			{"name": "Rahlstedt", "lat": wikiCoord("53° 36′ 7″"), "lng": wikiCoord("10° 9′ 24″")},
			{"name": "Lohbrügge", "lat": wikiCoord("53° 30′ 34″"), "lng": wikiCoord("10° 10′ 56″")},
			{"name": "Bergedorf", "lat": wikiCoord("53° 29′ 17″"), "lng": wikiCoord("10° 12′ 45″")},
			{"name": "Curslack", "lat": wikiCoord("53° 27′ 31″"), "lng": wikiCoord("10° 12′ 57″")},
			{"name": "Altengamme", "lat": wikiCoord("53° 25′ 29″"), "lng": wikiCoord("10° 15′ 45″")},
			{"name": "Neuengamme", "lat": wikiCoord("53° 26′ 47″"), "lng": wikiCoord("10° 13′ 19″")},
			{"name": "Kirchwerder", "lat": wikiCoord("53° 25′ 11″"), "lng": wikiCoord("10° 12′ 6″")},
			{"name": "Ochsenwerder", "lat": wikiCoord("53° 28′ 25″"), "lng": wikiCoord("10° 4′ 50″")},
			{"name": "Reitbrook", "lat": wikiCoord("53° 28′ 4″"), "lng": wikiCoord("10° 8′ 54″")},
			{"name": "Allermöhe", "lat": wikiCoord("53° 29′ 10″"), "lng": wikiCoord("10° 9′ 15″")},
			{"name": "Billwerder", "lat": wikiCoord("53° 30′ 10″"), "lng": wikiCoord("10° 8′ 20″")},
			{"name": "Moorfleet", "lat": wikiCoord("53° 30′ 5″"), "lng": wikiCoord("10° 4′ 45″")},
			{"name": "Tatenberg", "lat": wikiCoord("53° 29′ 15″"), "lng": wikiCoord("10° 4′ 45″")},
			{"name": "Spadenland", "lat": wikiCoord("53° 30′ 0″"), "lng": wikiCoord("10° 14′ 0″")},
			{"name": "Neuallermöhe", "lat": wikiCoord("53° 29′ 0″"), "lng": wikiCoord("10° 10′ 0″")},
			{"name": "Harburg", "lat": wikiCoord("53° 27′ 33″"), "lng": wikiCoord("9° 58′ 58″")},
			{"name": "Neuland", "lat": wikiCoord("53° 28′ 16″"), "lng": wikiCoord("10° 1′ 29″")},
			{"name": "Gut Moor", "lat": wikiCoord("53° 26′ 57″"), "lng": wikiCoord("10° 0′ 55″")},
			{"name": "Wilstorf", "lat": wikiCoord("53° 26′ 37″"), "lng": wikiCoord("9° 59′ 3″")},
			{"name": "Rönneburg", "lat": wikiCoord("53° 26′ 15″"), "lng": wikiCoord("10° 0′ 16″")},
			{"name": "Langenbek", "lat": wikiCoord("53° 26′ 14″"), "lng": wikiCoord("9° 59′ 10″")},
			{"name": "Sinstorf", "lat": wikiCoord("53° 25′ 26″"), "lng": wikiCoord("9° 58′ 50″")},
			{"name": "Marmstorf", "lat": wikiCoord("53° 26′ 9″"), "lng": wikiCoord("9° 58′ 7″")},
			{"name": "Eißendorf", "lat": wikiCoord("53° 27′ 21″"), "lng": wikiCoord("9° 57′ 16″")},
			{"name": "Heimfeld", "lat": wikiCoord("53° 27′ 50″"), "lng": wikiCoord("9° 57′ 22″")},
			{"name": "Moorburg", "lat": wikiCoord("53° 29′ 21″"), "lng": wikiCoord("9° 56′ 37″")},
			{"name": "Altenwerder", "lat": wikiCoord("53° 30′ 25″"), "lng": wikiCoord("9° 55′ 4″")},
			{"name": "Hausbruch", "lat": wikiCoord("53° 28′ 0″"), "lng": wikiCoord("9° 53′ 0″")},
			{"name": "Neugraben-Fischbek", "lat": wikiCoord("53° 29′ 0″"), "lng": wikiCoord("9° 51′ 0″")},
			{"name": "Francop", "lat": wikiCoord("53° 30′ 29″"), "lng": wikiCoord("9° 51′ 10″")},
			{"name": "Neuenfelde", "lat": wikiCoord("53° 30′ 53″"), "lng": wikiCoord("9° 47′ 44″")},
			{"name": "Cranz", "lat": wikiCoord("53° 32′ 13″"), "lng": wikiCoord("9° 46′ 50″")},
		]
	},
	düsseldorf: {
		name: 'Stadtteile Düsseldorfs',
		values: [
			{
				lat: wikiCoord('51/13/44/N'),
				lng: wikiCoord('6/46/25/E'),
				desc: '4352 Einwohner',
				name: 'Altstadt'
			},
			{
				lat: wikiCoord('51/19/47.885/N'),
				lng: wikiCoord('6/46/48.392/E'),
				desc: '6035 Einwohner',
				name: 'Angermund'
			},
			{
				lat: wikiCoord('51/09/41/N'),
				lng: wikiCoord('6/52/26/E'),
				desc: '15905 Einwohner',
				name: 'Benrath'
			},
			{
				lat: wikiCoord('51/12/29/N'),
				lng: wikiCoord('6/46/36/E'),
				desc: '7500 Einwohner',
				name: 'Bilk'
			},
			{
				lat: wikiCoord('51/13/22.361/N'),
				lng: wikiCoord('6/46/15.794/E'),
				desc: '2317 Einwohner',
				name: 'Carlstadt'
			},
			{
				lat: wikiCoord('51/14/38.494/N'),
				lng: wikiCoord('6/47/32.579/E'),
				desc: '2317 Einwohner',
				name: 'Derendorf'
			},
			{
				lat: wikiCoord('51/14/12/N'),
				lng: wikiCoord('6/48/34/E'),
				desc: '7500 Einwohner',
				name: 'Düsseltal'
			},
			{
				lat: wikiCoord('51/12/02/N'),
				lng: wikiCoord('6/50/20/E'),
				desc: '10000 Einwohner',
				name: 'Eller'
			},
			{
				lat: wikiCoord('51/11/16/N'),
				lng: wikiCoord('6/46/20/E'),
				desc: '10000 Einwohner',
				name: 'Flehe'
			},
			{
				lat: wikiCoord('51/13/42/N'),
				lng: wikiCoord('6/48/53/E'),
				desc: '10000 Einwohner',
				name: 'Flingern Nord'
			},
			{
				lat: wikiCoord('51/13/15/N'),
				lng: wikiCoord('6/48/32/E'),
				desc: '10000 Einwohner',
				name: 'Flingern Süd'
			},
			{
				lat: wikiCoord('51/12/44/N'),
				lng: wikiCoord('6/46/50/E'),
				desc: '17864 Einwohner',
				name: 'Friedrichstadt'
			},
			{
				lat: wikiCoord('51/08/47/N'),
				lng: wikiCoord('6/53/40/E'),
				desc: '21000 Einwohner',
				name: 'Garath'
			},
			{
				lat: wikiCoord('51/14/22/N'),
				lng: wikiCoord('6/51/58/E'),
				desc: '574000 Einwohner',
				name: 'Gerresheim'
			},
			{
				lat: wikiCoord('51/14/36.074/N'),
				lng: wikiCoord('6/46/20.586/E'),
				desc: '10248 Einwohner',
				name: 'Golzheim'
			},
			{
				lat: wikiCoord('51/14/27/N'),
				lng: wikiCoord('6/49/29/E'),
				desc: '7500 Einwohner',
				name: 'Grafenberg'
			},
			{
				lat: wikiCoord('51/13/9/N'),
				lng: wikiCoord('6/45/28/E'),
				desc: '139 Einwohner',
				name: 'Hafen'
			},
			{
				lat: wikiCoord('51/12/18/N'),
				lng: wikiCoord('6/44/40/E'),
				desc: '3679 Einwohner',
				name: 'Hamm'
			},
			{
				lat: wikiCoord('51/10/45/N'),
				lng: wikiCoord('6/52/25/E'),
				desc: '17538 Einwohner',
				name: 'Hassels'
			},
			{
				lat: wikiCoord('51/13/42.197/N'),
				lng: wikiCoord('6/42/57.269/E'),
				desc: '9445 Einwohner',
				name: 'Heerdt'
			},
			{
				lat: wikiCoord('51/7/56/N'),
				lng: wikiCoord('6/54/23/E'),
				desc: '6462 Einwohner',
				name: 'Hellerhof'
			},
			{
				lat: wikiCoord('51/10/22/N'),
				lng: wikiCoord('6/48/35/E'),
				desc: '1302 Einwohner',
				name: 'Himmelgeist'
			},
			{
				lat: wikiCoord('51/10/18.516/N'),
				lng: wikiCoord('6/49/53.789/E'),
				desc: '12000 Einwohner',
				name: 'Holthausen'
			},
			{
				lat: wikiCoord('51/15/24/N'),
				lng: wikiCoord('6/54/38/E'),
				desc: '3559 Einwohner',
				name: 'Hubbelrath'
			},
			{
				lat: wikiCoord('51/9/54/N'),
				lng: wikiCoord('6/48/54/E'),
				desc: '1717 Einwohner',
				name: 'Itter'
			},
			{
				lat: wikiCoord('51/18/0/N'),
				lng: wikiCoord('6/44/21/E'),
				desc: '7712 Einwohner',
				name: 'Kaiserswerth'
			},
			{
				lat: wikiCoord('51/18/23/N'),
				lng: wikiCoord('6/45/45/E'),
				desc: '1890 Einwohner',
				name: 'Kalkum'
			},
			{
				lat: wikiCoord('51/16/04/N'),
				lng: wikiCoord('6/52/21/E'),
				desc: '7712 Einwohner',
				name: 'Knittkuhl'
			},
			{
				lat: wikiCoord('51/14/47/N'),
				lng: wikiCoord('6/43/40/E'),
				desc: '7382 Einwohner',
				name: 'Lörick'
			},
			{
				lat: wikiCoord('51/16//N'),
				lng: wikiCoord('6/47//E'),
				desc: '5773 Einwohner',
				name: 'Lichtenbroich'
			},
			{
				lat: wikiCoord('51/12/33/N'),
				lng: wikiCoord('6/49/39/E'),
				desc: '9660 Einwohner',
				name: 'Lierenfeld'
			},
			{
				lat: wikiCoord('51/16/50.941/N'),
				lng: wikiCoord('6/44/12.044/E'),
				desc: '4009 Einwohner',
				name: 'Lohausen'
			},
			{
				lat: wikiCoord('51/15/25.877/N'),
				lng: wikiCoord('6/51/50.897/E'),
				desc: '6910 Einwohner',
				name: 'Ludenberg'
			},
			{
				lat: wikiCoord('51/15/18.529/N'),
				lng: wikiCoord('6/48/28.508/E'),
				desc: '13820 Einwohner',
				name: 'Mörsenbroich'
			},
			{
				lat: wikiCoord('51/14/24.374/N'),
				lng: wikiCoord('6/44/59.939/E'),
				desc: '5590 Einwohner',
				name: 'Niederkassel'
			},
			{
				lat: wikiCoord('51/12/57.96/N'),
				lng: wikiCoord('6/48/13.07/E'),
				desc: '27570 Einwohner',
				name: 'Oberbilk'
			},
			{
				lat: wikiCoord('51/13/48.968/N'),
				lng: wikiCoord('6/45/17.860/E'),
				desc: '16800 Einwohner',
				name: 'Oberkassel'
			},
			{
				lat: wikiCoord('51/14/16.926/N'),
				lng: wikiCoord('6/47/12.649/E'),
				desc: '27345 Einwohner',
				name: 'Pempelfort'
			},
			{
				lat: wikiCoord('51/15/58/N'),
				lng: wikiCoord('6/48/51/E'),
				desc: '18557 Einwohner',
				name: 'Rath'
			},
			{
				lat: wikiCoord('51/10/35.368/N'),
				lng: wikiCoord('6/51/57.074/E'),
				desc: '10485 Einwohner',
				name: 'Reisholz'
			},
			{
				lat: wikiCoord('51/13/27.973/N'),
				lng: wikiCoord('6/47/13.114/E'),
				desc: '7500 Einwohner',
				name: 'Stadtmitte'
			},
			{
				lat: wikiCoord('51/15/35.741/N'),
				lng: wikiCoord('6/45/12.298/E'),
				desc: '4894 Einwohner',
				name: 'Stockum'
			},
			{
				lat: wikiCoord('51/12/22/N'),
				lng: wikiCoord('6/54/00/E'),
				desc: '7500 Einwohner',
				name: 'Unterbach'
			},
			{
				lat: wikiCoord('51/12/29/N'),
				lng: wikiCoord('6/46/36/E'),
				desc: '7500 Einwohner',
				name: 'Unterbilk'
			},
			{
				lat: wikiCoord('51/16/24.654/N'),
				lng: wikiCoord('6/47/26.092/E'),
				desc: '20798 Einwohner',
				name: 'Unterrath'
			},
			{
				lat: wikiCoord('51/8/44.527/N'),
				lng: wikiCoord('6/52/1.4016/E'),
				desc: '10485 Einwohner',
				name: 'Urdenbach'
			},
			{
				lat: wikiCoord('51/12/39.492/N'),
				lng: wikiCoord('6/51/35.755/E'),
				desc: '9851 Einwohner',
				name: 'Vennhausen'
			},
			{
				lat: wikiCoord('51/11/17.786/N'),
				lng: wikiCoord('6/45/49.687/E'),
				desc: '2173 Einwohner',
				name: 'Volmerswerth'
			},
			{
				lat: wikiCoord('51/10/53.965/N'),
				lng: wikiCoord('6/48/59.098/E'),
				desc: '26788 Einwohner',
				name: 'Wersten'
			},
			{
				lat: wikiCoord('51/19/7/N'),
				lng: wikiCoord('6/44/36/E'),
				desc: '7465 Einwohner',
				name: 'Wittlaer'
			}
		]
	},
	länder: {
		name: 'Landeshauptstädte Deutschlands',
		aiGenerated: true,
		// prettier-ignore
		values: [
			{name: 'Stuttgart', desc: 'Landeshauptstadt von Baden-Württemberg', lat: 48.77583, lng: 9.18293},
			{name: 'München', desc: 'Landeshauptstadt von Bayern', lat: 48.13743, lng: 11.57549},
			{name: 'Berlin', desc: 'Landeshauptstadt von Berlin', lat: 52.51607, lng: 13.37699},
			{name: 'Potsdam', desc: 'Landeshauptstadt von Brandenburg', lat: 52.39886, lng: 13.06566},
			{name: 'Bremen', desc: 'Landeshauptstadt von Bremen', lat: 53.0793, lng: 8.8017},
			{name: 'Hamburg', desc: 'Landeshauptstadt von Hamburg', lat: 53.55108, lng: 9.99368},
			{name: 'Wiesbaden', desc: 'Landeshauptstadt von Hessen', lat: 50.08258, lng: 8.24932},
			{name: 'Schwerin', desc: 'Landeshauptstadt von Mecklenburg-Vorpommern', lat: 53.63374, lng: 11.4068},
			{name: 'Hannover', desc: 'Landeshauptstadt von Niedersachsen', lat: 52.37589, lng: 9.73201},
			{name: 'Düsseldorf', desc: 'Landeshauptstadt von Nordrhein-Westfalen', lat: 51.22774, lng: 6.77346},
			{name: 'Mainz', desc: 'Landeshauptstadt von Rheinland-Pfalz', lat: 49.99286, lng: 8.24725},
			{name: 'Saarbrücken', desc: 'Landeshauptstadt von Saarland', lat: 49.2354, lng: 6.98199},
			{name: 'Dresden', desc: 'Landeshauptstadt von Sachsen', lat: 51.05089, lng: 13.73832},
			{name: 'Magdeburg', desc: 'Landeshauptstadt von Sachsen-Anhalt', lat: 52.12053, lng: 11.62762},
			{name: 'Kiel', desc: 'Landeshauptstadt von Schleswig-Holstein', lat: 54.32329, lng: 10.13489},
			{name: 'Erfurt', desc: 'Landeshauptstadt von Thüringen', lat: 50.9787, lng: 11.03283}
		]
	},
	nrw: {
		name: 'Städte in NRW',
		values: [
			{
				name: 'Köln',
				desc: 'Die bevölkerungsreichste Stadt in Nordrhein-Westfalen und die viertgrößte Stadt Deutschlands.',
				lat: 50.9375,
				lng: 6.9603
			},
			{
				name: 'Düsseldorf',
				desc: 'Die Landeshauptstadt Nordrhein-Westfalens und ein bedeutendes Wirtschafts- und Kulturzentrum.',
				lat: 51.2277,
				lng: 6.7735
			},
			{
				name: 'Dortmund',
				desc: 'Eine Stadt mit einer starken Industriegeschichte und einer der wichtigsten Wirtschaftsstandorte im Ruhrgebiet.',
				lat: 51.5136,
				lng: 7.4653
			},
			{
				name: 'Essen',
				desc: 'Früher ein Zentrum der Montanindustrie, heute ein wichtiger Standort für Dienstleistungen und Handel.',
				lat: 51.4556,
				lng: 7.0116
			},
			{
				name: 'Duisburg',
				desc: 'Eine Hafenstadt und ein wichtiger Logistikstandort am Rhein und an der Ruhr.',
				lat: 51.4344,
				lng: 6.7623
			},
			{
				name: 'Bochum',
				desc: 'Bekannt für seine Bergbauvergangenheit und heute für seine Kultur- und Bildungseinrichtungen.',
				lat: 51.4812,
				lng: 7.2194
			},
			{
				name: 'Wuppertal',
				desc: 'Berühmt für seine Schwebebahn und als Geburtsort des Chemieunternehmens Bayer AG.',
				lat: 51.2647,
				lng: 7.1784
			},
			{
				name: 'Bielefeld',
				desc: 'Eine Stadt mit einer vielfältigen Wirtschaftsstruktur und einer lebendigen Kulturszene.',
				lat: 52.0302,
				lng: 8.5325
			},
			{
				name: 'Bonn',
				desc: 'Frühere Hauptstadt der Bundesrepublik Deutschland und Sitz zahlreicher internationaler Organisationen.',
				lat: 50.7374,
				lng: 7.0982
			},
			{
				name: 'Münster',
				desc: 'Eine Stadt mit einer reichen Geschichte, bekannt für ihre Fahrradfreundlichkeit und ihre Universität.',
				lat: 51.9607,
				lng: 7.6261
			},
			{
				name: 'Mönchengladbach',
				desc: 'Eine Stadt mit einer starken Industriekultur und einem vielfältigen Freizeitangebot.',
				lat: 51.1805,
				lng: 6.4426
			},
			{
				name: 'Gelsenkirchen',
				desc: 'Früher ein bedeutendes Zentrum des Steinkohlenbergbaus, heute bekannt für den Fußballverein FC Schalke 04.',
				lat: 51.5177,
				lng: 7.0857
			},
			{
				name: 'Aachen',
				desc: 'Eine historische Stadt, die für ihre Universität und ihre kulturellen Sehenswürdigkeiten bekannt ist.',
				lat: 50.7753,
				lng: 6.0839
			}
		]
	},
	nyc: {
		name: 'New York City',
		rotation: 60,
		values: [
			{name: 'One World Trade Center', lat: 40.71274, lng: -74.01339},
			{name: 'Empire State Building', lat: 40.74844, lng: -73.98565},
			{name: 'Chrysler Building', lat: 40.75174, lng: -73.9756},
			{name: 'Bank of America Tower', lat: 40.75856, lng: -73.98295},
			{name: 'The New York Times Building', lat: 40.75652, lng: -73.99035},
			{name: 'One Bryant Park', lat: 40.75566, lng: -73.98342},
			{name: '432 Park Avenue', lat: 40.76144, lng: -73.97137},
			{name: 'One57', lat: 40.76526, lng: -73.97923},
			{name: '30 Hudson Yards', lat: 40.75362, lng: -74.00164},
			{name: 'MetLife Building', lat: 40.75462, lng: -73.97645}
		]
	},
	/* marlSights: {
		name: 'Sehenswürdigkeiten Marls',
		values: [
			{ name: 'Skulpturenmuseum Glaskasten', lat: 51.65618, lng: 7.09468 },
			{ name: 'Zentralbibliothek', lat: 51.653412, lng: 7.0964492 },
			{ name: 'Katholische Kirche St. Georg', lat: 51.64744, lng: 7.08224 },
			{ name: 'St. Bartholomäus', lat: 51.62605, lng: 7.05185 },
			{ name: 'Chemiepark', lat: 51.67946, lng: 7.10056 },
			{ name: 'Heimatmuseum', lat: 51.6458, lng: 7.08099 }
		]
	},
	marlChurches: {
		name: 'Kirchen Marls',
		values: [
			{ name: 'Katholische Kirche St. Georg', lat: 51.64744, lng: 7.08224 },
			{ name: 'St. Bonifatius', lat: 51.65719, lng: 7.08752 },
			{ name: 'Dreifaltigkeitskirche', lat: 51.65517, lng: 7.08813 },
			{ name: 'St. Michael', lat: 51.66571, lng: 7.10233 },
			{ name: 'St. Heinrich', lat: 51.6533, lng: 7.1054 },
			{ name: 'Neoapostolische Kirche', lat: 51.65849, lng: 7.08029 },
			{ name: 'Freikirche Hüls', lat: 51.66532, lng: 7.12322 },
			{ name: 'Herz Jesu', lat: 51.66349, lng: 7.13334 },
			{ name: 'Auferstehungskirche', lat: 51.65312, lng: 7.11498 },
			{ name: 'Friedenskirche', lat: 51.66175, lng: 7.11445 }
		]
	}, */
	beijing: {
		name: 'Sehenswürdigkeiten Pekings',
		values: [
			{
				name: 'Verbotene Stadt',
				desc: 'Ein beeindruckendes historisches Palastensemble, das einst die Residenz der chinesischen Kaiser war.',
				lat: 39.91667,
				lng: 116.39028
			},
			{
				name: 'Chinesische Mauer',
				desc: 'Ein monumentales Bauwerk, das sich über tausende Kilometer erstreckt und als Symbol für Chinas Geschichte und Kultur gilt.',
				lat: 40.43194,
				lng: 116.57028
			},
			{
				name: 'Himmelstempel',
				desc: 'Ein religiöses Bauwerk mit einem einzigartigen runden Design, das den Himmel und die Erde symbolisiert.',
				lat: 39.88333,
				lng: 116.41667
			},
			{
				name: 'Sommerpalast',
				desc: 'Eine malerische königliche Residenz mit weitläufigen Gärten und Pavillons, die am Kunming-See liegt.',
				lat: 39.99972,
				lng: 116.27528
			},
			{
				name: "Tian'anmen-Platz",
				desc: 'Ein riesiger Platz im Herzen Pekings, der für politische Veranstaltungen und historische Ereignisse bekannt ist.',
				lat: 39.9075,
				lng: 116.39722
			},
			{
				name: 'Lama-Tempel',
				desc: 'Ein bedeutendes buddhistisches Kloster, das für seine riesige Maitreya-Statue und religiösen Schätze bekannt ist.',
				lat: 39.93889,
				lng: 116.40556
			},
			{
				name: 'Große Mauer bei Mutianyu',
				desc: 'Ein besonders gut erhaltener Abschnitt der Großen Mauer mit spektakulären Landschaften und weniger Touristen.',
				lat: 40.43,
				lng: 116.56417
			},
			{
				name: 'Nationale Zentralbibliothek',
				desc: 'Ein architektonisches Meisterwerk und eine der größten Bibliotheken Chinas mit umfangreichen Sammlungen.',
				lat: 39.94583,
				lng: 116.36694
			},
			{
				name: 'Nationalmuseum China',
				desc: 'Ein umfassendes Museum, das die Geschichte und Kunst Chinas mit zahlreichen Exponaten präsentiert.',
				lat: 39.90417,
				lng: 116.39139
			},
			{
				name: 'Hutongs',
				desc: 'Ein Netzwerk von engen Gassen und traditionellen Wohnhäusern, das einzigartige Einblicke in das traditionelle Pekinger Leben bietet.',
				lat: 39.9375,
				lng: 116.3875
			},
			{
				name: 'Kaiserpalast',
				desc: 'Ein prächtiges Palastensemble, das als kaiserliche Residenz diente und reich an historischer Bedeutung ist.',
				lat: 39.91861,
				lng: 116.39056
			},
			{
				name: 'Tempel des Himmels-Parks',
				desc: 'Ein weitläufiger Park mit historischen Gebäuden und gepflegten Gärten, der für seine architektonische Schönheit bekannt ist.',
				lat: 39.88222,
				lng: 116.4075
			},
			{
				name: 'Yonghe-Tempel',
				desc: 'Ein beeindruckendes tibetisches buddhistisches Kloster, das für seine prächtige Architektur und religiösen Artefakte bekannt ist.',
				lat: 39.94167,
				lng: 116.41139
			},
			{
				name: 'Drachenmauer',
				desc: 'Eine historische Mauer, die sich durch die Landschaft schlängelt und eine wichtige Verteidigungsstruktur darstellt.',
				lat: 40.36889,
				lng: 116.6875
			},
			{
				name: 'Beihai-Park',
				desc: 'Ein malerischer königlicher Garten mit einem großen See, einer Insel und historischen Pavillons.',
				lat: 39.92639,
				lng: 116.39111
			}
		]
	},
	duisburgChurches: {
		weird: true,
		name: 'Kirchen Duisburgs',
		values: [
			{name: 'Salvatorkirche', lat: 51.43586, lng: 6.76115},
			{name: 'Liebfrauenkirche', lat: 51.43441, lng: 6.76952},
			{name: 'St. Ludger', lat: 51.4303, lng: 6.7826},
			{name: 'St. Anna', lat: 51.43226, lng: 6.79825},
			{name: 'Kirche Jesu Christi der Heiligen der Letzten Tage', lat: 51.43291, lng: 6.72462},
			{name: 'St. Johannes', lat: 51.45286, lng: 6.70989},
			{name: 'Evangelisch-Freikirchliche Gemeinde', lat: 51.44898, lng: 6.70889},
			{name: 'Sankt Peter in den Haesen', lat: 51.45656, lng: 6.69147},
			{name: 'Nederlandse Kerk an de Ruhr', lat: 51.454, lng: 6.73027},
			{name: 'Sankt Maximilian', lat: 51.45372, lng: 6.73418},
			{name: 'Christengemeinde Duisburg', lat: 51.45372, lng: 6.73418},
			{name: 'St. Joseph-Kirche', lat: 51.45372, lng: 6.73418},
			{name: 'Neuapostolische Kirche', lat: 51.42279, lng: 6.76477}
		]
	},
	duisburgGeneral: {
		weird: true,
		name: 'Sehenswürdigkeiten Duisburgs',
		aiGenerated: true,
		values: [
			{
				name: 'Duisburg',
				desc: 'Eine ehemalige Industriestadt am Rhein mit vielfältiger Geschichte.',
				lat: 51.43463,
				lng: 6.76101
			},
			{
				name: 'Innenhafen Duisburg',
				desc: 'Ein malerischer Hafenbereich, der sich zu einem lebendigen Kultur- und Freizeitviertel entwickelt hat.',
				lat: 51.43682,
				lng: 6.76088
			},
			{
				name: 'Landschaftspark Duisburg-Nord',
				desc: 'Ein beeindruckendes Industriedenkmal, das zu einem einzigartigen Park umgestaltet wurde.',
				lat: 51.48248,
				lng: 6.77352
			},
			{
				name: 'MSV-Arena',
				desc: 'Das Heimatstadion des Fußballvereins MSV Duisburg.',
				lat: 51.42838,
				lng: 6.75394
			},
			{
				name: 'Duisburger Zoo',
				desc: 'Ein beliebtes Ausflugsziel mit einer vielfältigen Tierwelt.',
				lat: 51.45597,
				lng: 6.76032
			},
			{
				name: 'Salvator-Kirche',
				desc: 'Eine beeindruckende Kirche mit einer reichen Geschichte.',
				lat: 51.43815,
				lng: 6.77007
			},
			{
				name: 'Schauinsland-Reisen-Arena',
				desc: 'Ein Sportstadion, das für Fußballspiele und andere Veranstaltungen genutzt wird.',
				lat: 51.42946,
				lng: 6.76584
			},
			{
				name: 'Museum Küppersmühle',
				desc: 'Ein renommiertes Museum für moderne Kunst in einem historischen Gebäude.',
				lat: 51.43529,
				lng: 6.76405
			},
			{
				name: 'Duisburger Rathaus',
				desc: 'Ein imposantes Gebäude im Herzen der Stadt, das die Verwaltung beherbergt.',
				lat: 51.43336,
				lng: 6.76237
			},
			{
				name: 'Sechs-Seen-Platte',
				desc: 'Ein Naherholungsgebiet mit vielen Seen und grünen Flächen.',
				lat: 51.42182,
				lng: 6.73158
			},
			{
				name: 'Königstraße Duisburg',
				desc: 'Eine lebendige Einkaufsstraße mit vielen Geschäften und Cafés.',
				lat: 51.43238,
				lng: 6.77449
			},
			{
				name: 'Mercatorhalle Duisburg',
				desc: 'Ein Veranstaltungsort für Konzerte, Theateraufführungen und andere kulturelle Veranstaltungen.',
				lat: 51.43238,
				lng: 6.76218
			},
			{
				name: 'Botanischer Garten Duisburg',
				desc: 'Ein grünes Paradies mit einer Vielzahl von Pflanzenarten.',
				lat: 51.42968,
				lng: 6.74615
			},
			{
				name: 'Stadtbibliothek Duisburg',
				desc: 'Ein Ort des Wissens und der Bildung inmitten der Stadt.',
				lat: 51.43265,
				lng: 6.76385
			},
			{
				name: 'Stadttheater Duisburg',
				desc: 'Eine renommierte Bühne für Theateraufführungen und Opern.',
				lat: 51.43211,
				lng: 6.76947
			},
			{
				name: 'Innenstadt Duisburg',
				desc: 'Das pulsierende Zentrum der Stadt mit zahlreichen Geschäften, Restaurants und Bars.',
				lat: 51.43252,
				lng: 6.77311
			},
			{
				name: 'Rheinpark Duisburg',
				desc: 'Ein herrlicher Park entlang des Rheinufers, ideal zum Spazierengehen und Entspannen.',
				lat: 51.45768,
				lng: 6.76321
			},
			{
				name: 'Haus der Jugend Duisburg',
				desc: 'Ein Ort für Jugendliche mit vielfältigen Angeboten und Aktivitäten.',
				lat: 51.43405,
				lng: 6.75698
			},
			{
				name: 'Lehmbruck-Museum Duisburg',
				desc: 'Ein bedeutendes Museum für moderne und zeitgenössische Skulptur.',
				lat: 51.43516,
				lng: 6.76801
			},
			{
				name: 'Duisburger Philharmoniker',
				desc: 'Ein renommiertes Orchester, das regelmäßig Konzerte in der Stadt gibt.',
				lat: 51.43477,
				lng: 6.77345
			},
			{
				name: 'Sportpark Duisburg',
				desc: 'Ein großes Sportzentrum mit verschiedenen Sportanlagen und Aktivitäten.',
				lat: 51.42219,
				lng: 6.75002
			}
		]
	},
	citiesRuhrgebiet: {
		name: 'Städte im Ruhrgebiet',
		aiGenerated: true,
		values: [
			{
				name: 'Dortmund',
				desc: 'Dortmund ist eine Großstadt im Ruhrgebiet und zeichnet sich durch ihre industrielle Vergangenheit aus.',
				lat: 51.51495,
				lng: 7.46571
			},
			{
				name: 'Essen',
				desc: 'Essen ist eine bedeutende Stadt im Ruhrgebiet und hat sich von einer Industriestadt zu einem kulturellen Zentrum entwickelt.',
				lat: 51.45657,
				lng: 7.01228
			},
			{
				name: 'Duisburg',
				desc: 'Duisburg ist eine Hafenstadt im Ruhrgebiet und spielt eine wichtige Rolle im Logistiksektor.',
				lat: 51.43441,
				lng: 6.76233
			},
			{
				name: 'Bochum',
				desc: 'Bochum ist eine Stadt mit vielfältiger Kultur und einer lebendigen Musikszene im Ruhrgebiet.',
				lat: 51.48165,
				lng: 7.21648
			},
			{
				name: 'Gelsenkirchen',
				desc: 'Gelsenkirchen ist bekannt für den Fußballverein Schalke 04 und hat eine industrielle Vergangenheit.',
				lat: 51.51774,
				lng: 7.08571
			},
			{
				name: 'Herne',
				desc: 'Herne ist eine Stadt im Ruhrgebiet mit einer Mischung aus urbanem Leben und grünen Naherholungsgebieten.',
				lat: 51.53721,
				lng: 7.22208
			},
			{
				name: 'Bottrop',
				desc: 'Bottrop ist eine Stadt im Ruhrgebiet, die sich durch ihre vielfältige Kulturszene auszeichnet.',
				lat: 51.52372,
				lng: 6.92035
			},
			{
				name: 'Hagen',
				desc: 'Hagen ist eine Stadt mit historischer Architektur und einem breiten Angebot an kulturellen Veranstaltungen.',
				lat: 51.36105,
				lng: 7.47181
			},
			{
				name: 'Hamm',
				desc: 'Hamm ist eine Stadt im Ruhrgebiet mit einer Mischung aus Tradition und Moderne.',
				lat: 51.67844,
				lng: 7.82556
			},
			{
				name: 'Mülheim an der Ruhr',
				desc: 'Mülheim an der Ruhr ist eine Stadt mit grünen Parks und einer lebendigen Kunstszene.',
				lat: 51.43092,
				lng: 6.88032
			},
			{
				name: 'Oberhausen',
				desc: 'Oberhausen ist eine Stadt im Ruhrgebiet mit einer Vielzahl von Freizeitmöglichkeiten und kulturellen Einrichtungen.',
				lat: 51.49698,
				lng: 6.86377
			},
			{
				name: 'Recklinghausen',
				desc: 'Recklinghausen ist eine Stadt mit historischem Charme und regelmäßigen kulturellen Veranstaltungen.',
				lat: 51.6146,
				lng: 7.19745
			},
			{
				name: 'Velbert',
				desc: 'Velbert ist eine Stadt im Ruhrgebiet, die durch ihre Lage in den Hügeln geprägt ist.',
				lat: 51.3282,
				lng: 7.04613
			},
			{
				name: 'Gladbeck',
				desc: 'Gladbeck ist eine Stadt mit einer langen Tradition in der Industrie und bietet eine vielfältige Kulturszene.',
				lat: 51.57476,
				lng: 6.97074
			},
			{
				name: 'Witten',
				desc: 'Witten ist eine Stadt im Ruhrgebiet mit einem historischen Stadtkern und zahlreichen Grünflächen.',
				lat: 51.44218,
				lng: 7.34073
			},
			{
				name: 'Unna',
				desc: 'Unna ist eine Stadt im Ruhrgebiet mit einem charmanten Stadtbild und einer reichen Geschichte.',
				lat: 51.53409,
				lng: 7.68453
			},
			{
				name: 'Castrop-Rauxel',
				desc: 'Castrop-Rauxel ist eine Stadt im Ruhrgebiet mit einer Mischung aus Industriekultur und Naturerlebnissen.',
				lat: 51.55073,
				lng: 7.30823
			},
			{
				name: 'Dinslaken',
				desc: 'Dinslaken ist eine Stadt mit historischen Gebäuden und einer vielfältigen Naturlandschaft im Ruhrgebiet.',
				lat: 51.56583,
				lng: 6.74117
			},
			{
				name: 'Hattingen',
				desc: 'Hattingen ist eine Stadt mit einer gut erhaltenen Altstadt und einem charmanten Flair im Ruhrgebiet.',
				lat: 51.39666,
				lng: 7.18494
			},
			{
				name: 'Lünen',
				desc: 'Lünen ist eine Stadt im Ruhrgebiet mit einem historischen Stadtkern und grünen Naherholungsgebieten.',
				lat: 51.6168,
				lng: 7.52498
			}
		]
	},
	stuttgart: {
		name: 'Städte nahe Stuttgart',
		aiGenerated: true,
		values: [
			{
				name: 'Ludwigsburg',
				desc: 'Ludwigsburg ist eine Stadt in Baden-Württemberg, bekannt für ihr barockes Residenzschloss und den blühenden Barockgarten.',
				lat: 48.8976,
				lng: 9.19153
			},
			{
				name: 'Esslingen am Neckar',
				desc: 'Esslingen am Neckar ist eine historische Stadt mit gut erhaltenem mittelalterlichem Stadtbild und Fachwerkhäusern.',
				lat: 48.74077,
				lng: 9.31085
			},
			{
				name: 'Böblingen',
				desc: 'Böblingen ist eine Stadt südwestlich von Stuttgart und zeichnet sich durch moderne Architektur und Einkaufsmöglichkeiten aus.',
				lat: 48.68536,
				lng: 9.01392
			},
			{
				name: 'Fellbach',
				desc: 'Fellbach liegt östlich von Stuttgart und ist für seine Weinberge und das Kultur- und Kongresszentrum Schwabenlandhalle bekannt.',
				lat: 48.81465,
				lng: 9.27679
			},
			{
				name: 'Waiblingen',
				desc: 'Waiblingen ist eine Stadt am Rems-Ufer und besticht durch ihre mittelalterliche Altstadt und das Fachwerkensemble.',
				lat: 48.83013,
				lng: 9.31836
			},
			{
				name: 'Leonberg',
				desc: 'Leonberg ist eine Stadt mit historischem Stadtkern und dem bekannten Pomeranzengarten, einem Renaissance-Garten.',
				lat: 48.79811,
				lng: 9.0186
			},
			{
				name: 'Sindelfingen',
				desc: 'Sindelfingen ist eine Stadt südwestlich von Stuttgart und bekannt für ihre Automobilindustrie und das Mercedes-Benz Werk.',
				lat: 48.71035,
				lng: 9.00304
			},
			{
				name: 'Kornwestheim',
				desc: 'Kornwestheim liegt nordwestlich von Stuttgart und ist für sein Schloss und den Stadtpark Kegelenberg bekannt.',
				lat: 48.86495,
				lng: 9.18316
			},
			{
				name: 'Gerlingen',
				desc: 'Gerlingen ist eine Stadt westlich von Stuttgart und bietet eine Mischung aus Moderne und historischem Charme.',
				lat: 48.79992,
				lng: 9.07306
			},
			{
				name: 'Vaihingen an der Enz',
				desc: 'Vaihingen an der Enz ist eine Stadt mit malerischer Altstadt und dem imposanten Enztalviadukt.',
				lat: 48.93827,
				lng: 8.95207
			},
			{
				name: 'Ditzingen',
				desc: 'Ditzingen ist eine Stadt nordwestlich von Stuttgart und bekannt für ihre schöne Landschaft und das Stadtmuseum.',
				lat: 48.83671,
				lng: 9.06766
			},
			{
				name: 'Weinstadt',
				desc: 'Weinstadt liegt östlich von Stuttgart und zeichnet sich durch ihre Weinberge und Fachwerkhäuser aus.',
				lat: 48.81436,
				lng: 9.38682
			},
			{
				name: 'Korntal-Münchingen',
				desc: 'Korntal-Münchingen liegt nordwestlich von Stuttgart und besticht durch die Kombination aus Natur und städtischem Flair.',
				lat: 48.83462,
				lng: 9.13584
			},
			{
				name: 'Remseck am Neckar',
				desc: 'Remseck am Neckar liegt nördlich von Stuttgart und ist für seine Neckarpromenade und das Schloss Ludwigsburg bekannt.',
				lat: 48.87618,
				lng: 9.25926
			},
			{
				name: 'Ostfildern',
				desc: 'Ostfildern liegt östlich von Stuttgart und bietet eine grüne Umgebung sowie das sehenswerte Schloss Nellingen.',
				lat: 48.72687,
				lng: 9.25605
			},
			{
				name: 'Leinfelden-Echterdingen',
				desc: 'Leinfelden-Echterdingen liegt südlich von Stuttgart und ist für seine Messe Stuttgart und das Si-Centrum bekannt.',
				lat: 48.69716,
				lng: 9.18277
			},
			{
				name: 'Filderstadt',
				desc: 'Filderstadt liegt südlich von Stuttgart und zeichnet sich durch eine moderne Infrastruktur und das Schönbuch-Naturparkzentrum aus.',
				lat: 48.66625,
				lng: 9.22274
			},
			{
				name: 'Schwieberdingen',
				desc: 'Schwieberdingen ist eine Gemeinde nordwestlich von Stuttgart und bietet eine Mischung aus Natur und ländlichem Charme.',
				lat: 48.86842,
				lng: 9.08165
			},
			{
				name: 'Steinenbronn',
				desc: 'Steinenbronn liegt südlich von Stuttgart und ist für seinen Erlebnispfad und das Naturschutzgebiet Schönbuch bekannt.',
				lat: 48.65166,
				lng: 9.11314
			},
			{
				name: 'Markgröningen',
				desc: 'Markgröningen ist eine Stadt westlich von Stuttgart und beeindruckt mit ihrer historischen Altstadt und dem Schloss.',
				lat: 48.90641,
				lng: 9.10694
			}
		]
	},
	dresden: {
		name: 'Städte nahe Dresden',
		aiGenerated: true,
		values: [
			{
				name: 'Meißen',
				desc: 'Meißen, die Wiege Sachsens, ist berühmt für ihre Porzellanmanufaktur und die majestätische Albrechtsburg.',
				lat: 51.16456,
				lng: 13.47254
			},
			{
				name: 'Radebeul',
				desc: 'Radebeul, das sächsische Nizza, lockt mit seinen malerischen Weinbergen und dem charmanten Karl-May-Museum.',
				lat: 51.10453,
				lng: 13.66224
			},
			{
				name: 'Coswig',
				desc: 'Coswig überrascht mit seinem Schloss, umgeben von idyllischen Parkanlagen, und einer reizvollen Altstadt.',
				lat: 51.11492,
				lng: 13.55342
			},
			{
				name: 'Pirna',
				desc: 'Pirna, das Tor zur Sächsischen Schweiz, beeindruckt mit seiner gut erhaltenen Altstadt und der schönen Elbpromenade.',
				lat: 50.96187,
				lng: 13.93488
			},
			{
				name: 'Riesa',
				desc: 'Riesa, bekannt für seine Große Porphyrbrücke, bietet auch das charmante Stadttheater und eine lebendige Kulturszene.',
				lat: 51.30642,
				lng: 13.29334
			},
			{
				name: 'Großenhain',
				desc: 'Großenhain, mit seinem Renaissance-Schloss und dem historischen Marktplatz, ist eine Stadt mit reicher Geschichte und Tradition.',
				lat: 51.28456,
				lng: 13.55148
			},
			{
				name: 'Freital',
				desc: 'Freital, eingebettet zwischen Hügeln und Wäldern, lockt mit dem Wasserschloss Burgk und dem charmanten Stadtpark.',
				lat: 51.00646,
				lng: 13.64432
			},
			{
				name: 'Dippoldiswalde',
				desc: 'Dippoldiswalde, umgeben von malerischer Natur, besticht durch sein mittelalterliches Stadtbild und die imposante Stadtkirche.',
				lat: 50.97618,
				lng: 13.67248
			},
			{
				name: 'Heidenau',
				desc: 'Heidenau, an der Elbe gelegen, bezaubert mit seinem historischen Stadtkern und der Nähe zum Nationalpark Sächsische Schweiz.',
				lat: 51.01341,
				lng: 13.85292
			},
			{
				name: 'Radeberg',
				desc: 'Radeberg, bekannt für sein Bier und die historische Altstadt, ist ein malerisches Städtchen im Osten Sachsens.',
				lat: 51.11466,
				lng: 13.9155
			},
			{
				name: 'Kamenz',
				desc: 'Kamenz, die Lessingstadt, bietet nicht nur kulturelle Vielfalt, sondern auch idyllische Plätze und historische Bauten.',
				lat: 51.26687,
				lng: 14.0938
			},
			{
				name: 'Königsbrück',
				desc: 'Königsbrück, umgeben von Seen und Wäldern, präsentiert sich als charmante Kleinstadt mit historischem Flair.',
				lat: 51.27567,
				lng: 13.84769
			},
			{
				name: 'Weißwasser',
				desc: 'Weißwasser, in der Lausitz gelegen, besticht durch seine Teichlandschaften und die Tradition der Glaskunst.',
				lat: 51.50568,
				lng: 14.63763
			},
			{
				name: 'Großröhrsdorf',
				desc: 'Großröhrsdorf, eingebettet in sanfte Hügel, beeindruckt mit seinem Schloss und der historischen Kirche.',
				lat: 51.20744,
				lng: 13.5781
			},
			{
				name: 'Hoyerswerda',
				desc: 'Hoyerswerda, mit seinem Zoo und dem Schloss, präsentiert sich als modernes Städtchen mit historischem Flair.',
				lat: 51.43827,
				lng: 14.25161
			},
			{
				name: 'Rabenau',
				desc: 'Rabenau, umgeben von grünen Wäldern, besticht durch sein Schloss und die gemütliche Atmosphäre im historischen Ortskern.',
				lat: 50.98941,
				lng: 13.53394
			},
			{
				name: 'Grossenhain',
				desc: 'Großenhain, mit seinem Renaissance-Schloss und dem historischen Marktplatz, ist eine Stadt mit reicher Geschichte und Tradition.',
				lat: 51.28456,
				lng: 13.55148
			},
			{
				name: 'Moritzburg',
				desc: 'Moritzburg, umgeben von einem malerischen Schlosspark, fasziniert mit dem imposanten Barockschloss und seinen vielen Seen.',
				lat: 51.13382,
				lng: 13.71172
			},
			{
				name: 'Klipphausen',
				desc: 'Klipphausen, inmitten der Elbtalauen, beeindruckt mit seiner alten Mühle und den historischen Fachwerkhäusern.',
				lat: 51.06489,
				lng: 13.48174
			},
			{
				name: 'Pulsnitz',
				desc: 'Pulsnitz, die Pfefferkuchenstadt, lockt mit süßem Gebäck und einer charmanten Altstadt mit vielen Fachwerkhäusern.',
				lat: 51.18247,
				lng: 14.00465
			}
		]
	},
	wien: {
		name: 'Städte nahe Wien',
		aiGenerated: true,
		values: [
			{
				name: 'Klosterneuburg',
				desc: 'Klosterneuburg, wo Geschichte auf moderne Lebensart trifft. Bekannt für das imposante Stift und malerische Weinberge.',
				lat: 48.30578,
				lng: 16.32582
			},
			{
				name: 'Schwechat',
				desc: 'Schwechat, Heimat des Flughafens Wien. Ein Ort, der sich im Puls der Luftfahrt bewegt und dennoch bodenständig bleibt.',
				lat: 48.13712,
				lng: 16.47078
			},
			{
				name: 'Baden',
				desc: 'Baden, wo Wellness auf Kultur trifft. Ein charmantes Städtchen mit historischen Bädern und kulturellen Schätzen.',
				lat: 48.01036,
				lng: 16.23419
			},
			{
				name: 'Wiener Neustadt',
				desc: 'Wiener Neustadt, die Stadt der Doppeladler. Hier schlägt das Herz der Militärgeschichte und modernen Innovationen.',
				lat: 47.81398,
				lng: 16.24205
			},
			{
				name: 'Mödling',
				desc: 'Mödling, wo Natur und Urbanität harmonieren. Historische Gassen, grüne Parks und ein lebendiges Stadtleben.',
				lat: 48.10334,
				lng: 16.27768
			},
			{
				name: 'Perchtoldsdorf',
				desc: 'Perchtoldsdorf, der Weinort mit Charme. Genieße die Atmosphäre der Weinberge und das historische Stadtbild.',
				lat: 48.11066,
				lng: 16.27268
			},
			{
				name: 'Tulln',
				desc: 'Tulln, die Gartenstadt an der Donau. Bekannt für blühende Gärten, romantische Flussufer und die Gartenbauschule.',
				lat: 48.32703,
				lng: 16.05957
			},
			{
				name: 'Korneuburg',
				desc: 'Korneuburg, wo Tradition und Moderne sich begegnen. Erlebe die Geschichte in den Gassen und die Dynamik der Gegenwart.',
				lat: 48.33945,
				lng: 16.33963
			},
			{
				name: 'Gerasdorf bei Wien',
				desc: 'Gerasdorf bei Wien, ein Ort zum Wachsen. Moderne Infrastruktur und ländlicher Charme in perfekter Balance.',
				lat: 48.30877,
				lng: 16.48751
			},
			{
				name: 'Stockerau',
				desc: 'Stockerau, die Stadt am Kamp. Historischer Stadtkern, lebendige Kultur und eine idyllische Lage am Fluss.',
				lat: 48.38379,
				lng: 16.21569
			},
			{
				name: 'Purkersdorf',
				desc: 'Purkersdorf, wo Kunst und Natur verschmelzen. Ein Rückzugsort mit Künstlerflair und malerischer Umgebung.',
				lat: 48.21263,
				lng: 16.16672
			},
			{
				name: 'Schwadorf',
				desc: 'Schwadorf, ein Ort der Ruhe im Schatten Wiens. Historische Bauwerke und grüne Oasen abseits des Trubels.',
				lat: 48.11037,
				lng: 16.42402
			},
			{
				name: 'Leopoldsdorf',
				desc: 'Leopoldsdorf, wo Landwirtschaft auf Moderne trifft. Grüne Felder und moderne Infrastruktur in harmonischem Einklang.',
				lat: 48.15889,
				lng: 16.54411
			},
			{
				name: 'Langenzersdorf',
				desc: 'Langenzersdorf, das Tor zum Weinviertel. Historische Architektur und Weingärten prägen das charmante Stadtbild.',
				lat: 48.27311,
				lng: 16.38086
			},
			{
				name: 'Gänserndorf',
				desc: 'Gänserndorf, wo Tradition und Innovation Hand in Hand gehen. Eine Stadt, die die Vergangenheit ehrt und die Zukunft gestaltet.',
				lat: 48.33956,
				lng: 16.58008
			},
			{
				name: 'Enzersfeld im Weinviertel',
				desc: 'Enzersfeld im Weinviertel, ein Ort der Stille und Weinreben. Ländliche Idylle und traditionelle Gemütlichkeit.',
				lat: 48.39965,
				lng: 16.36673
			},
			{
				name: 'Hollabrunn',
				desc: 'Hollabrunn, das Herz des Weinviertels. Charmante Weingüter, historische Plätze und ein pulsierendes Stadtleben.',
				lat: 48.55899,
				lng: 16.07177
			},
			{
				name: 'Marchegg',
				desc: 'Marchegg, die Stadt der Störche. Naturreservate, historische Bauten und eine einzigartige Vogelvielfalt.',
				lat: 48.15127,
				lng: 16.94816
			},
			{
				name: 'Laa an der Thaya',
				desc: 'Laa an der Thaya, wo Geschichte auf Thermalquellen trifft. Historische Bauten, entspannende Bäder und eine charmante Atmosphäre.',
				lat: 48.71808,
				lng: 16.36598
			},
			{
				name: 'Ebreichsdorf',
				desc: 'Ebreichsdorf, wo Pferde und Kultur zu Hause sind. Reitkultur, historische Architektur und eine lebendige Gemeinschaft.',
				lat: 47.95484,
				lng: 16.39552
			},
			{
				name: 'Gumpoldskirchen',
				desc: 'Gumpoldskirchen, das Tor zum Weinbau. Ein charmantes Städtchen mit Weinbergen, traditionellen Heurigen und historischem Flair.',
				lat: 48.05758,
				lng: 16.28282
			},
			{
				name: 'Bruck an der Leitha',
				desc: 'Bruck an der Leitha, wo Geschichte am Flussufer lebendig wird. Historische Bauten, idyllische Uferpromenade und lebendige Kultur.',
				lat: 48.00157,
				lng: 16.77498
			},
			{
				name: 'Zwölfaxing',
				desc: 'Zwölfaxing, ein Ort der Harmonie im Wiener Umland. Grüne Landschaft, kleine Teiche und entspanntes Landleben.',
				lat: 48.09035,
				lng: 16.44211
			},
			{
				name: 'Königstetten',
				desc: 'Königstetten, wo die Donau das Umland prägt. Naturidylle, historisches Ambiente und eine entspannte Atmosphäre.',
				lat: 48.32146,
				lng: 16.22616
			}
		]
	},
	deutschland: {
		name: 'Städte Deutschlands',
		aiGenerated: true,
		values: [
			{
				name: 'Berlin',
				desc: 'Hauptstadt Deutschlands, bekannt für Brandenburger Tor und Politik. 3.755.251 Einwohner',
				lat: 52.52015,
				lng: 13.404
			},
			{
				name: 'Hamburg',
				desc: 'Bedeutende Hafenstadt im Norden Deutschlands. 1.892.122 Einwohner',
				lat: 53.55034,
				lng: 10.00065
			},
			{
				name: 'München',
				desc: 'Hauptstadt Bayerns, berühmt für Oktoberfest und Biergärten. 1.512.491 Einwohner',
				lat: 48.13743,
				lng: 11.57549
			},
			{
				name: 'Köln',
				desc: 'Domstadt am Rhein mit imposantem Kölner Dom. 1.084.831 Einwohner',
				lat: 50.93753,
				lng: 6.96028
			},
			{
				name: 'Frankfurt am Main',
				desc: 'Finanzmetropole mit beeindruckender Skyline. 773.068 Einwohner',
				lat: 50.11092,
				lng: 8.68213
			},
			{
				name: 'Stuttgart',
				desc: 'Hauptstadt von Baden-Württemberg, bekannt für Automobilindustrie. 632.865 Einwohner',
				lat: 48.77584,
				lng: 9.18293
			},
			{
				name: 'Düsseldorf',
				desc: 'Stadt am Rhein, bekannt für Mode und Wirtschaft. 629.047 Einwohner',
				lat: 51.22774,
				lng: 6.77346
			},
			{
				name: 'Leipzig',
				desc: 'Bekannt für Musik und Buchmesse. 616.093 Einwohner',
				lat: 51.33962,
				lng: 12.37129
			},
			{
				name: 'Dortmund',
				desc: 'Ehemaliges Zentrum des Kohlebergbaus, heute Industriestadt. 593.317 Einwohner',
				lat: 51.51494,
				lng: 7.466
			},
			{
				name: 'Essen',
				desc: 'Ehemals bedeutendes Zentrum des Ruhrgebiets. 584.580 Einwohner',
				lat: 51.45822,
				lng: 7.01586
			},
			{
				name: 'Bremen',
				desc: 'Hansestadt mit großer maritimer Geschichte. 569.396 Einwohner',
				lat: 53.07516,
				lng: 8.80777
			},
			{
				name: 'Dresden',
				desc: 'Bekannt für barocke Architektur und Kunstschätze. 563.311 Einwohner',
				lat: 51.05089,
				lng: 13.73832
			},
			{
				name: 'Hannover',
				desc: 'Messestadt und Hauptstadt Niedersachsens. 545.045 Einwohner',
				lat: 52.37589,
				lng: 9.73201
			},
			{
				name: 'Nürnberg',
				desc: 'Bekannt für historische Altstadt und Christkindlesmarkt. 523.026 Einwohner',
				lat: 49.45203,
				lng: 11.07675
			},
			{
				name: 'Duisburg',
				desc: 'Hafenstadt an der Ruhrmündung. 502.211 Einwohner',
				lat: 51.43441,
				lng: 6.76233
			},
			{
				name: 'Bochum',
				desc: 'Bekannt für Bergbau und Ruhr-Universität. 365.742 Einwohner',
				lat: 51.48184,
				lng: 7.21624
			},
			{
				name: 'Wuppertal',
				desc: 'Bekannt für Schwebebahn und Textilindustrie. 358.876 Einwohner',
				lat: 51.26402,
				lng: 7.17857
			},
			{
				name: 'Bielefeld',
				desc: 'Universitätsstadt mit vielfältigem kulturellen Angebot. 338.332 Einwohner',
				lat: 52.03023,
				lng: 8.53247
			},
			{
				name: 'Bonn',
				desc: 'Frühere Hauptstadt der Bundesrepublik Deutschland. 336.465 Einwohner',
				lat: 50.73743,
				lng: 7.09821
			},
			{
				name: 'Münster',
				desc: 'Bekannt für historische Altstadt und Fahrradfreundlichkeit. 320.946 Einwohner',
				lat: 51.96066,
				lng: 7.62613
			},
			{
				name: 'Mannheim',
				desc: 'Wichtiger Wirtschaftsstandort in der Metropolregion Rhein-Neckar. 315.554 Einwohner',
				lat: 49.48746,
				lng: 8.46604
			},
			{
				name: 'Karlsruhe',
				desc: 'Bekannt für Technologie und Kultur. 308.707 Einwohner',
				lat: 49.00689,
				lng: 8.40365
			},
			{
				name: 'Augsburg',
				desc: 'Eine der ältesten Städte Deutschlands, reiche Geschichte und Kultur. 301.033 Einwohner',
				lat: 48.37054,
				lng: 10.89779
			},
			{
				name: 'Wiesbaden',
				desc: 'Hauptstadt Hessens, berühmt für Thermalquellen und Kurhaus. 283.083 Einwohner',
				lat: 50.08258,
				lng: 8.24932
			},
			{
				name: 'Mönchen­gladbach',
				desc: 'Industrie- und Handelsstadt am Niederrhein. 268.465 Einwohner',
				lat: 51.18046,
				lng: 6.44261
			},
			{
				name: 'Gelsenkirchen',
				desc: 'Bekannt für Fußballverein FC Schalke 04 und Industriegeschichte. 263.000 Einwohner',
				lat: 51.51774,
				lng: 7.08572
			},
			{
				name: 'Aachen',
				desc: 'Bedeutende historische Stadt, bekannt für Dom und Karlspreis. 252.136 Einwohner',
				lat: 50.77535,
				lng: 6.08386
			},
			{
				name: 'Braunschweig',
				desc: 'Stadt mit reicher historischer Vergangenheit und Technologieunternehmen. 251.804 Einwohner',
				lat: 52.26887,
				lng: 10.52677
			},
			{
				name: 'Chemnitz',
				desc: 'Industriestadt mit vielfältiger Geschichte. 248.563 Einwohner',
				lat: 50.83226,
				lng: 12.92584
			},
			{
				name: 'Kiel',
				desc: 'Bedeutender Hafen- und Universitätsstadt an der Ostsee. 247.717 Einwohner',
				lat: 54.32219,
				lng: 10.13573
			},
			{
				name: 'Halle (Saale)',
				desc: 'Bekannt für historische Altstadt und Martin-Luther-Universität. 242.083 Einwohner',
				lat: 51.4825,
				lng: 11.97097
			},
			{
				name: 'Magdeburg',
				desc: 'Landeshauptstadt Sachsen-Anhalts mit reichem kulturellem Erbe. 239.364 Einwohner',
				lat: 52.12053,
				lng: 11.62762
			},
			{
				name: 'Freiburg im Breisgau',
				desc: 'Bekannt für Schwarzwald, Universität und ökologische Ausrichtung. 236.140 Einwohner',
				lat: 47.99901,
				lng: 7.8421
			},
			{
				name: 'Krefeld',
				desc: 'Bekannt für Seidenproduktion und Architektur. 228.426 Einwohner',
				lat: 51.33876,
				lng: 6.58534
			},
			{
				name: 'Mainz',
				desc: 'Landeshauptstadt Rheinland-Pfalzs, bekannt für Wein und Gutenberg-Museum. 220.552 Einwohner',
				lat: 49.99286,
				lng: 8.24725
			},
			{
				name: 'Lübeck',
				desc: 'Mittelalterliche Hansestadt, bekannt für Holstentor und Marzipan. 218.095 Einwohner',
				lat: 53.86893,
				lng: 10.68729
			},
			{
				name: 'Erfurt',
				desc: 'Landeshauptstadt Thüringens, reiche Geschichte und Kulturlandschaft. 214.969 Einwohner',
				lat: 50.9787,
				lng: 11.03283
			},
			{
				name: 'Oberhausen',
				desc: 'Stadt im Ruhrgebiet, bekannt für Industriegeschichte und Einkaufszentren. 210.824 Einwohner',
				lat: 51.49698,
				lng: 6.85149
			},
			{
				name: 'Rostock',
				desc: 'Große Hafenstadt an der Ostsee, bekannt für Universität und Hafen. 209.920 Einwohner',
				lat: 54.09244,
				lng: 12.09915
			},
			{
				name: 'Kassel',
				desc: 'Stadt im Herzen Deutschlands, bekannt für Documenta und Bergpark Wilhelmshöhe. 204.202 Einwohner',
				lat: 51.31271,
				lng: 9.47975
			},
			{
				name: 'Hagen',
				desc: 'Stadt im Ruhrgebiet, bekannt für Kunst und Kultur. 189.783 Einwohner',
				lat: 51.36081,
				lng: 7.4754
			},
			{
				name: 'Potsdam',
				desc: 'Landeshauptstadt Brandenburgs, bekannt für Schloss Sanssouci und Parks. 185.750 Einwohner',
				lat: 52.39108,
				lng: 13.06364
			},
			{
				name: 'Saarbrücken',
				desc: 'Landeshauptstadt des Saarlands, kulturelles Zentrum und Universitätsstadt. 181.759 Einwohner',
				lat: 49.24016,
				lng: 6.99693
			},
			{
				name: 'Hamm',
				desc: 'Stadt im Ruhrgebiet, bekannt für Brauchtum und Industriegeschichte. 180.849 Einwohner',
				lat: 51.68037,
				lng: 7.82045
			},
			{
				name: 'Ludwigshafen am Rhein',
				desc: 'Stadt am Rhein, bekannt für Chemieindustrie und Rhein-Galerie. 174.265 Einwohner',
				lat: 49.47741,
				lng: 8.44518
			},
			{
				name: 'Oldenburg (Oldb)',
				desc: 'Universitätsstadt in Niedersachsen mit historischer Altstadt. 172.830 Einwohner',
				lat: 53.14345,
				lng: 8.21455
			},
			{
				name: 'Mülheim an der Ruhr',
				desc: 'Stadt im Ruhrgebiet, bekannt für Kunst und Kultur. 172.404 Einwohner',
				lat: 51.43117,
				lng: 6.88073
			},
			{
				name: 'Osnabrück',
				desc: 'Friedensstadt mit reicher Geschichte und Universität. 167.366 Einwohner',
				lat: 52.27991,
				lng: 8.04718
			},
			{
				name: 'Leverkusen',
				desc: 'Stadt am Rhein, bekannt für Chemieindustrie und Bayer AG. 166.865 Einwohner',
				lat: 51.0303,
				lng: 6.98432
			},
			{
				name: 'Heidelberg',
				desc: 'Bekannt für Schloss, Universität und malerische Altstadt. 160.355 Einwohner',
				lat: 49.39875,
				lng: 8.67243
			}
		]
	},
	deutschland100: {
		name: 'Großstädte Deutschlands',
		aiGenerated: true,
		values: [
			{name: 'Berlin', desc: 'Hauptstadt Deutschlands', lat: 52.52, lng: 13.405},
			{
				name: 'Hamburg',
				desc: 'Deutschlands zweitgrößte Stadt und ein wichtiger Hafen',
				lat: 53.55,
				lng: 9.993
			},
			{
				name: 'Köln',
				desc: 'Bekannt für seinen Dom und eine lebendige Kulturszene',
				lat: 50.93836,
				lng: 6.95997
			},
			{
				name: 'München',
				desc: 'Bayerische Hauptstadt und Zentrum für Kunst und Bier',
				lat: 48.13743,
				lng: 11.57549
			},
			{name: 'Bremen', desc: 'Bedeutender Hafenstadt an der Weser', lat: 53.07516, lng: 8.80777},
			{
				name: 'Dortmund',
				desc: 'Ehemaliges Industriezentrum im Ruhrgebiet',
				lat: 51.51425,
				lng: 7.46849
			},
			{
				name: 'Dresden',
				desc: 'Bekannt für seine barocke Architektur und Kunstschätze',
				lat: 51.05089,
				lng: 13.73832
			},
			{
				name: 'Duisburg',
				desc: 'Großstadt im Ruhrgebiet und bedeutender Binnenhafen',
				lat: 51.43441,
				lng: 6.76233
			},
			{
				name: 'Düsseldorf',
				desc: 'Internationales Wirtschafts- und Modezentrum am Rhein',
				lat: 51.22774,
				lng: 6.77346
			},
			{
				name: 'Essen',
				desc: 'Einst ein Zentrum des Bergbaus und der Schwerindustrie',
				lat: 51.45657,
				lng: 7.01228
			},
			{
				name: 'Frankfurt am Main',
				desc: 'Wirtschafts- und Finanzzentrum Deutschlands',
				lat: 50.11092,
				lng: 8.68213
			},
			{
				name: 'Hannover',
				desc: 'Messestadt und Hauptstadt von Niedersachsen',
				lat: 52.37589,
				lng: 9.73201
			},
			{
				name: 'Leipzig',
				desc: 'Kulturelles Zentrum in Ostdeutschland mit einer reichen Geschichte',
				lat: 51.33962,
				lng: 12.37129
			},
			{
				name: 'Nürnberg',
				desc: 'Bekannt für seine mittelalterliche Altstadt und die Nürnberger Prozesse',
				lat: 49.45203,
				lng: 11.07675
			},
			{
				name: 'Stuttgart',
				desc: 'Industrie- und Automobilzentrum im Südwesten Deutschlands',
				lat: 48.77584,
				lng: 9.18293
			},
			{
				name: 'Aachen',
				desc: 'Historische Stadt nahe der Grenze zu Belgien und den Niederlanden',
				lat: 50.77664,
				lng: 6.08342
			},
			{
				name: 'Augsburg',
				desc: 'Eine der ältesten Städte Deutschlands mit einer reichen Geschichte',
				lat: 48.37154,
				lng: 10.89826
			},
			{
				name: 'Bielefeld',
				desc: 'Bekannt für seine Wirtschaft und Bildungseinrichtungen',
				lat: 52.01971,
				lng: 8.53172
			},
			{
				name: 'Bochum',
				desc: 'Teil des Ruhrgebiets mit einer Industriegeschichte',
				lat: 51.48158,
				lng: 7.21648
			},
			{
				name: 'Bonn',
				desc: 'Ehemalige Hauptstadt und UNO-Standort am Rhein',
				lat: 50.73585,
				lng: 7.10066
			},
			{
				name: 'Braunschweig',
				desc: 'Stadt mit einer langen Geschichte und bedeutender Forschungseinrichtungen',
				lat: 52.26887,
				lng: 10.52677
			},
			{
				name: 'Gelsenkirchen',
				desc: 'Teil des Ruhrgebiets und bekannt für den Fußballverein Schalke 04',
				lat: 51.51774,
				lng: 7.08572
			},
			{
				name: 'Karlsruhe',
				desc: 'Bedeutendes Technologie- und Forschungszentrum in Süddeutschland',
				lat: 49.00689,
				lng: 8.40365
			},
			{
				name: 'Mannheim',
				desc: 'Industrie- und Handelsstadt in Baden-Württemberg',
				lat: 49.48746,
				lng: 8.46604
			},
			{
				name: 'Mönchengladbach',
				desc: 'Stadt im Rheinland mit einer langen Textilindustrie-Tradition',
				lat: 51.18046,
				lng: 6.44208
			},
			{
				name: 'Münster',
				desc: 'Bekannt für seine Fahrradfreundlichkeit und die historische Altstadt',
				lat: 51.96236,
				lng: 7.62571
			},
			{
				name: 'Wiesbaden',
				desc: 'Landeshauptstadt von Hessen und bekannt für seine heißen Quellen',
				lat: 50.08258,
				lng: 8.24932
			},
			{
				name: 'Wuppertal',
				desc: 'Bekannt für seine Schwebebahn und als Industriestandort im Bergischen Land',
				lat: 51.26486,
				lng: 7.17852
			},
			{
				name: 'Bergisch Gladbach',
				desc: 'Stadt in der Nähe von Köln mit einer grünen Umgebung',
				lat: 50.98563,
				lng: 7.13211
			},
			{
				name: 'Bottrop',
				desc: 'Teil des Ruhrgebiets und bekannt für den Freizeitpark Movie Park Germany',
				lat: 51.52373,
				lng: 6.92965
			},
			{
				name: 'Bremerhaven',
				desc: 'Wichtiger Hafen- und Fischereistandort an der Nordsee',
				lat: 53.53958,
				lng: 8.58094
			},
			{
				name: 'Chemnitz',
				desc: 'Ehemals als Karl-Marx-Stadt bekannt und heute eine moderne Industriestadt',
				lat: 50.82785,
				lng: 12.92137
			},
			{
				name: 'Darmstadt',
				desc: 'Stadt des Jugendstils und der Wissenschaft im Rhein-Main-Gebiet',
				lat: 49.87283,
				lng: 8.65119
			},
			{
				name: 'Erfurt',
				desc: 'Landeshauptstadt von Thüringen mit einer gut erhaltenen Altstadt',
				lat: 50.9787,
				lng: 11.03283
			},
			{
				name: 'Erlangen',
				desc: 'Bekannt für seine Universität und als Zentrum der Hightech-Industrie',
				lat: 49.59099,
				lng: 11.00479
			},
			{
				name: 'Freiburg im Breisgau',
				desc: 'Stadt am Rande des Schwarzwaldes mit einem milden Klima und einer lebendigen Kulturszene',
				lat: 47.99609,
				lng: 7.8494
			},
			{
				name: 'Fürth',
				desc: 'Stadt in der Metropolregion Nürnberg mit einer lebendigen Geschichte',
				lat: 49.47505,
				lng: 10.98852
			},
			{
				name: 'Göttingen',
				desc: 'Bekannt für seine Universität und als Zentrum der Forschung und Wissenschaft',
				lat: 51.54128,
				lng: 9.9158
			},
			{
				name: 'Gütersloh',
				desc: 'Stadt in Ostwestfalen-Lippe und Sitz großer Unternehmen wie Bertelsmann',
				lat: 51.90693,
				lng: 8.38076
			},
			{
				name: 'Hagen',
				desc: 'Stadt im östlichen Ruhrgebiet und bekannt für seine grünen Naherholungsgebiete',
				lat: 51.36105,
				lng: 7.47449
			},
			{
				name: 'Halle (Saale)',
				desc: 'Stadt in Sachsen-Anhalt mit einer reichen Kultur- und Industriegeschichte',
				lat: 51.4829,
				lng: 11.9729
			},
			{
				name: 'Hamm',
				desc: 'Stadt an der Lippe und ein bedeutender Verkehrsknotenpunkt in Westfalen',
				lat: 51.68033,
				lng: 7.82096
			},
			{
				name: 'Hanau',
				desc: 'Stadt im Rhein-Main-Gebiet und Geburtsort der Gebrüder Grimm',
				lat: 50.12758,
				lng: 8.91453
			},
			{
				name: 'Heidelberg',
				desc: 'Bekannt für seine romantische Altstadt und die renommierte Universität',
				lat: 49.39875,
				lng: 8.67243
			},
			{
				name: 'Heilbronn',
				desc: 'Stadt am Neckar und bekannt für seine Weinanbaugebiete',
				lat: 49.14269,
				lng: 9.21091
			},
			{
				name: 'Herne',
				desc: 'Stadt im Ruhrgebiet und Teil der Metropolregion Ruhr',
				lat: 51.53799,
				lng: 7.21785
			},
			{
				name: 'Hildesheim',
				desc: 'Stadt mit einer reichen Geschichte und bedeutenden Kulturschätzen',
				lat: 52.15077,
				lng: 9.95112
			},
			{
				name: 'Ingolstadt',
				desc: 'Bekannt für seine Audi-Werke und die historische Altstadt',
				lat: 48.76508,
				lng: 11.42372
			},
			{
				name: 'Jena',
				desc: 'Stadt in Thüringen und bekannt für seine Universität und Optikindustrie',
				lat: 50.92705,
				lng: 11.58924
			},
			{
				name: 'Kaiserslautern',
				desc: 'Stadt in Rheinland-Pfalz und bekannt für seine US-Militärbasis',
				lat: 49.44326,
				lng: 7.76832
			},
			{
				name: 'Kassel',
				desc: 'Bekannt für die documenta-Kunstausstellung und den Bergpark Wilhelmshöhe',
				lat: 51.31271,
				lng: 9.47975
			},
			{
				name: 'Kiel',
				desc: 'Hafenstadt an der Ostsee und Landeshauptstadt von Schleswig-Holstein',
				lat: 54.32329,
				lng: 10.13489
			},
			{
				name: 'Koblenz',
				desc: 'Stadt an der Mündung von Mosel und Rhein und bekannt für sein Deutsches Eck',
				lat: 50.35694,
				lng: 7.58848
			},
			{
				name: 'Krefeld',
				desc: 'Stadt am Niederrhein und bekannt für seine Textilindustrie',
				lat: 51.33876,
				lng: 6.58534
			},
			{
				name: 'Leverkusen',
				desc: 'Stadt am Rhein und bekannt für den Chemiekonzern Bayer',
				lat: 51.04592,
				lng: 6.98848
			},
			{
				name: 'Lübeck',
				desc: 'Stadt an der Ostsee und berühmt für sein historisches Zentrum',
				lat: 53.86624,
				lng: 10.68441
			},
			{
				name: 'Ludwigshafen am Rhein',
				desc: 'Industriestadt am Rhein und Sitz großer Chemieunternehmen',
				lat: 49.48454,
				lng: 8.44735
			},
			{
				name: 'Magdeburg',
				desc: 'Landeshauptstadt von Sachsen-Anhalt und eine alte Hansestadt',
				lat: 52.12053,
				lng: 11.62762
			},
			{
				name: 'Mainz',
				desc: 'Landeshauptstadt von Rheinland-Pfalz und bekannt für seinen Dom',
				lat: 49.99286,
				lng: 8.24725
			},
			{
				name: 'Moers',
				desc: 'Stadt am Niederrhein und bekannt für seinen Schlosspark',
				lat: 51.4508,
				lng: 6.63464
			},
			{
				name: 'Mülheim an der Ruhr',
				desc: 'Stadt im Ruhrgebiet und bekannt für ihre grünen Parks und Gärten',
				lat: 51.42604,
				lng: 6.88233
			},
			{
				name: 'Neuss',
				desc: 'Stadt am Rhein und bekannt für ihre historische Innenstadt',
				lat: 51.19845,
				lng: 6.69359
			},
			{
				name: 'Oberhausen',
				desc: 'Stadt im Ruhrgebiet und bekannt für das Einkaufszentrum CentrO',
				lat: 51.49698,
				lng: 6.85155
			},
			{
				name: 'Offenbach am Main',
				desc: 'Stadt im Rhein-Main-Gebiet und bekannt für ihre Lederwarenindustrie',
				lat: 50.10176,
				lng: 8.76764
			},
			{
				name: 'Oldenburg (Oldb)',
				desc: 'Stadt in Niedersachsen und bekannt für seine Grünflächen und Parks',
				lat: 53.14345,
				lng: 8.21455
			},
			{
				name: 'Osnabrück',
				desc: 'Friedensstadt mit einer reichen Geschichte und grünen Oasen',
				lat: 52.27991,
				lng: 8.04718
			},
			{
				name: 'Paderborn',
				desc: 'Stadt in Nordrhein-Westfalen und bekannt für seinen Dom und die Universität',
				lat: 51.71573,
				lng: 8.752
			},
			{
				name: 'Pforzheim',
				desc: 'Bedeutende Stadt in Baden-Württemberg und bekannt für seine Schmuckindustrie',
				lat: 48.89211,
				lng: 8.69821
			},
			{
				name: 'Potsdam',
				desc: 'Landeshauptstadt von Brandenburg und bekannt für seine Schlösser und Gärten',
				lat: 52.39057,
				lng: 13.06447
			},
			{
				name: 'Recklinghausen',
				desc: 'Stadt im Ruhrgebiet und bekannt für das Ruhrfestspielhaus',
				lat: 51.61479,
				lng: 7.19738
			},
			{
				name: 'Regensburg',
				desc: 'UNESCO-Welterbestadt an der Donau mit einer gut erhaltenen Altstadt',
				lat: 49.01343,
				lng: 12.10162
			},
			{
				name: 'Remscheid',
				desc: 'Stadt im Bergischen Land und bekannt für seine Werkzeugindustrie',
				lat: 51.17901,
				lng: 7.19242
			},
			{
				name: 'Reutlingen',
				desc: 'Stadt in Baden-Württemberg und bekannt für ihre Textilindustrie',
				lat: 48.49371,
				lng: 9.20885
			},
			{
				name: 'Rostock',
				desc: 'Hansestadt an der Ostsee und bekannt für ihre Universität und Häfen',
				lat: 54.09244,
				lng: 12.09915
			},
			{
				name: 'Saarbrücken',
				desc: 'Landeshauptstadt des Saarlandes und Zentrum der saarländischen Kultur',
				lat: 49.23342,
				lng: 6.99603
			},
			{
				name: 'Salzgitter',
				desc: 'Stadt in Niedersachsen und bekannt für ihre Stahlindustrie',
				lat: 52.15714,
				lng: 10.41599
			},
			{
				name: 'Siegen',
				desc: 'Stadt in Nordrhein-Westfalen und bekannt für ihre Universität und Fachhochschule',
				lat: 50.8743,
				lng: 8.02096
			},
			{
				name: 'Solingen',
				desc: 'Stadt im Bergischen Land und bekannt für ihre Schneidwarenindustrie',
				lat: 51.16522,
				lng: 7.06786
			},
			{
				name: 'Trier',
				desc: 'Die älteste Stadt Deutschlands, bekannt für ihre römische Geschichte und Denkmäler',
				lat: 49.75632,
				lng: 6.64171
			},
			{
				name: 'Ulm',
				desc: 'Stadt an der Donau und bekannt für ihr gotisches Münster',
				lat: 48.40108,
				lng: 9.98761
			},
			{
				name: 'Wolfsburg',
				desc: 'Sitz des Automobilherstellers Volkswagen und bekannt für sein Autostadt-Museum',
				lat: 52.42265,
				lng: 10.78655
			},
			{
				name: 'Würzburg',
				desc: 'Bayerische Stadt am Main und bekannt für ihre barocke Architektur und Weine',
				lat: 49.7913,
				lng: 9.95335
			}
		]
	},
	france100k: {
		name: 'Großstädte Frankreichs',
		aiGenerated: true,
		values: [
			{
				name: 'Paris',
				desc: 'Hauptstadt Frankreichs und eine der bedeutendsten Städte der Welt',
				lat: 48.85661,
				lng: 2.35222
			},
			{
				name: 'Marseille',
				desc: 'Große Hafenstadt an der Mittelmeerküste und kulturelles Zentrum der Provence',
				lat: 43.29648,
				lng: 5.36978
			},
			{
				name: 'Lyon',
				desc: 'Zweigrößte Stadt Frankreichs, bekannt für seine Gastronomie und seine historische Altstadt',
				lat: 45.75781,
				lng: 4.83201
			},
			{
				name: 'Toulouse',
				desc: 'Stadt im Südwesten Frankreichs und Zentrum der Luft- und Raumfahrtindustrie',
				lat: 43.60465,
				lng: 1.44421
			},
			{
				name: 'Nice',
				desc: "Beliebtes Touristenziel an der Côte d'Azur mit mediterranem Flair",
				lat: 43.70313,
				lng: 7.26608
			},
			{
				name: 'Nantes',
				desc: 'Stadt an der Loire und ein wichtiges Kultur- und Wirtschaftszentrum im Westen Frankreichs',
				lat: 47.21837,
				lng: -1.55362
			},
			{
				name: 'Montpellier',
				desc: 'Stadt in Südfrankreich und Zentrum für Bildung, Forschung und Technologie',
				lat: 43.61092,
				lng: 3.87723
			},
			{
				name: 'Strasbourg',
				desc: 'Hauptstadt des Elsass und Sitz des Europäischen Parlaments',
				lat: 48.57341,
				lng: 7.75211
			},
			{
				name: 'Bordeaux',
				desc: 'Bekannt für seine Weinproduktion und seine prächtige Architektur',
				lat: 44.83779,
				lng: -0.57918
			},
			{
				name: 'Lille',
				desc: 'Stadt im Norden Frankreichs, bekannt für ihre Kultur, Gastronomie und Architektur',
				lat: 50.62925,
				lng: 3.05726
			},
			{
				name: 'Rennes',
				desc: 'Hauptstadt der Bretagne und bekannt für ihre mittelalterliche Altstadt',
				lat: 48.11198,
				lng: -1.67429
			},
			{
				name: 'Reims',
				desc: 'Bekannt für ihre Kathedrale und als Zentrum der Champagnerproduktion',
				lat: 49.25833,
				lng: 4.0317
			},
			{
				name: 'Toulon',
				desc: 'Stadt am Mittelmeer und wichtiger Militärhafen',
				lat: 43.12423,
				lng: 5.928
			},
			{
				name: 'Saint-Étienne',
				desc: 'Stadt in der Auvergne-Rhône-Alpes-Region und bekannt für ihre Bergbau- und Textilindustrie',
				lat: 45.4397,
				lng: 4.38718
			},
			{
				name: 'Le Havre',
				desc: 'Hafenstadt in der Normandie und UNESCO-Welterbestätte',
				lat: 49.4938,
				lng: 0.10767
			},
			{
				name: 'Dijon',
				desc: 'Hauptstadt der Region Burgund und bekannt für ihre Gastronomie, insbesondere Senf und Wein',
				lat: 47.32205,
				lng: 5.04148
			},
			{
				name: 'Grenoble',
				desc: 'Stadt am Fuße der Alpen und bekannt für ihre Universität und Forschungseinrichtungen',
				lat: 45.18853,
				lng: 5.72452
			},
			{
				name: 'Angers',
				desc: 'Stadt an der Loire und bekannt für ihr Schloss und ihre mittelalterliche Altstadt',
				lat: 47.47842,
				lng: -0.56317
			},
			{
				name: 'Villeurbanne',
				desc: 'Stadt in der Metropolregion Lyon und bekannt für ihre kulturelle Vielfalt',
				lat: 45.77098,
				lng: 4.88077
			},
			{
				name: 'Nîmes',
				desc: 'Bekannt für seine römischen Monumente, insbesondere das Amphitheater',
				lat: 43.8367,
				lng: 4.36005
			},
			{
				name: 'Clermont-Ferrand',
				desc: 'Stadt in der Auvergne und bekannt für ihren Vulkan und ihre Michelin-Fabrik',
				lat: 45.77722,
				lng: 3.08703
			},
			{
				name: 'Aix-en-Provence',
				desc: 'Stadt in der Provence und bekannt für ihre Kunst, Kultur und Architektur',
				lat: 43.52974,
				lng: 5.44743
			},
			{
				name: 'Le Mans',
				desc: 'Bekannt für sein Autorennen, die 24 Stunden von Le Mans, und seine mittelalterliche Altstadt',
				lat: 48.00611,
				lng: 0.19956
			},
			{
				name: 'Brest',
				desc: 'Hafenstadt in der Bretagne und bekannt für ihre maritime Geschichte',
				lat: 48.39039,
				lng: -4.48608
			},
			{
				name: 'Tours',
				desc: 'Stadt im Loiretal und bekannt für ihre gotische Kathedrale und ihre Renaissance-Architektur',
				lat: 47.39414,
				lng: 0.68484
			},
			{
				name: 'Amiens',
				desc: 'Bekannt für ihre gotische Kathedrale und als Heimatort von Jules Verne',
				lat: 49.89407,
				lng: 2.29575
			},
			{
				name: 'Annecy',
				desc: 'Stadt in den französischen Alpen und bekannt für ihren See und ihre mittelalterliche Altstadt',
				lat: 45.89925,
				lng: 6.12889
			},
			{
				name: 'Limoges',
				desc: 'Bekannt für ihre Porzellanherstellung und ihre mittelalterliche Architektur',
				lat: 45.83362,
				lng: 1.26111
			},
			{
				name: 'Boulogne-Billancourt',
				desc: 'Stadt im Großraum Paris und bekannt für ihre Wirtschaft und Kultur',
				lat: 48.8351,
				lng: 2.24039
			},
			{
				name: 'Metz',
				desc: 'Stadt in Lothringen und bekannt für ihre mittelalterliche Architektur und ihre Kathedrale',
				lat: 49.11931,
				lng: 6.17572
			},
			{
				name: 'Besançon',
				desc: 'Stadt in der Region Bourgogne-Franche-Comté und bekannt für ihre Festungen und ihre Universität',
				lat: 47.23802,
				lng: 6.02405
			},
			{
				name: 'Perpignan',
				desc: 'Stadt in Südfrankreich und bekannt für ihre katalanische Kultur und ihre Küche',
				lat: 42.69764,
				lng: 2.89541
			},
			{
				name: 'Orléans',
				desc: "Stadt am Fluss Loire und bekannt für ihre historische Altstadt und Jeanne d'Arc",
				lat: 47.90289,
				lng: 1.90389
			},
			{
				name: 'Rouen',
				desc: 'Stadt in der Normandie und bekannt für ihre gotische Kathedrale und ihre mittelalterliche Architektur',
				lat: 49.44323,
				lng: 1.09997
			},
			{
				name: 'Saint-Denis',
				desc: 'Vorstadt von Paris und bekannt für ihre Basilika und ihre multikulturelle Atmosphäre',
				lat: 48.93618,
				lng: 2.35744
			},
			{
				name: 'Montreuil',
				desc: 'Vorstadt von Paris und bekannt für ihre Kunst- und Kulturszene',
				lat: 48.86161,
				lng: 2.44102
			},
			{
				name: 'Argenteuil',
				desc: 'Vorstadt von Paris und bekannt für ihre Geschichte, Kunst und Kultur',
				lat: 48.94794,
				lng: 2.24636
			},
			{
				name: 'Mulhouse',
				desc: 'Stadt im Elsass und bekannt für ihr Automobilmuseum und ihre Textilindustrie',
				lat: 47.75084,
				lng: 7.33589
			},
			{
				name: 'Caen',
				desc: 'Stadt in der Normandie und bekannt für ihr mittelalterliches Erbe und ihre Universität',
				lat: 49.18286,
				lng: -0.37068
			},
			{
				name: 'Nancy',
				desc: 'Stadt in Lothringen und bekannt für ihre Jugendstil-Architektur und ihre Universität',
				lat: 48.69205,
				lng: 6.18442
			}
		]
	},
	uk100k: {
		name: 'Großstädte England',
		aiGenerated: true,
		values: [
			{
				name: 'London',
				desc: "Capital city of the United Kingdom and one of the world's leading financial centers",
				lat: 51.50735,
				lng: -0.12776
			},
			{
				name: 'Birmingham',
				desc: 'Second-largest city in the UK and a major international commercial center',
				lat: 52.48624,
				lng: -1.8904
			},
			{
				name: 'Bristol',
				desc: 'City in southwest England known for its maritime history and vibrant cultural scene',
				lat: 51.45451,
				lng: -2.58791
			},
			{
				name: 'Liverpool',
				desc: 'Famous for its maritime history, music scene, and football clubs',
				lat: 53.40837,
				lng: -2.99157
			},
			{
				name: 'Manchester',
				desc: 'Major city in northwest England known for its industrial heritage, music scene, and football clubs',
				lat: 53.48076,
				lng: -2.24263
			},
			{
				name: 'Sheffield',
				desc: 'City in South Yorkshire known for its steel industry heritage and green spaces',
				lat: 53.38113,
				lng: -1.47009
			},
			{
				name: 'Leeds',
				desc: 'City in West Yorkshire known for its vibrant cultural scene, shopping, and nightlife',
				lat: 53.80076,
				lng: -1.54908
			},
			{
				name: 'Leicester',
				desc: 'City in the East Midlands known for its multiculturalism and rich history',
				lat: 52.63688,
				lng: -1.13976
			},
			{
				name: 'Bradford',
				desc: 'City in West Yorkshire known for its cultural diversity and industrial heritage',
				lat: 53.79598,
				lng: -1.75937
			},
			{
				name: 'Coventry',
				desc: 'City in the West Midlands known for its history of manufacturing and engineering',
				lat: 52.40682,
				lng: -1.51969
			},
			{
				name: 'Cardiff',
				desc: 'Capital city of Wales known for its historic sites, cultural events, and waterfront',
				lat: 51.48158,
				lng: -3.17909
			},
			{
				name: 'Nottingham',
				desc: 'City in the East Midlands known for its history, lace-making, and association with Robin Hood',
				lat: 52.95478,
				lng: -1.15809
			},
			{
				name: 'Kingston upon Hull',
				desc: 'City in East Yorkshire known for its maritime history and cultural landmarks',
				lat: 53.74567,
				lng: -0.33674
			},
			{
				name: 'Newcastle upon Tyne',
				desc: 'City in northeast England known for its iconic bridges, historic architecture, and vibrant nightlife',
				lat: 54.97825,
				lng: -1.61745
			},
			{
				name: 'Stoke-on-Trent',
				desc: 'City in Staffordshire known for its pottery industry and cultural heritage',
				lat: 53.00267,
				lng: -2.1794
			},
			{
				name: 'Derby',
				desc: 'City in Derbyshire known for its engineering and manufacturing history',
				lat: 52.92277,
				lng: -1.47663
			},
			{
				name: 'Southampton',
				desc: 'Major port city on the south coast of England known for its maritime history and cultural scene',
				lat: 50.9097,
				lng: -1.40435
			},
			{
				name: 'Northampton',
				desc: 'Market town in the East Midlands known for its shoe-making industry and historic sites',
				lat: 52.24048,
				lng: -0.90266
			},
			{
				name: 'Reading',
				desc: 'Town in Berkshire known for its historic abbey, university, and modern shopping centers',
				lat: 51.45426,
				lng: -0.97813
			},
			{
				name: 'Portsmouth',
				desc: 'Port city on the south coast of England known for its maritime heritage and historic dockyard',
				lat: 50.81977,
				lng: -1.08798
			},
			{
				name: 'Plymouth',
				desc: 'Port city on the south coast of Devon known for its maritime history and naval base',
				lat: 50.37546,
				lng: -4.14266
			},
			{
				name: 'Luton',
				desc: 'Town in Bedfordshire known for its airport, hat-making industry, and diverse population',
				lat: 51.87867,
				lng: -0.42003
			},
			{
				name: 'Brighton and Hove',
				desc: 'Seaside resort town in East Sussex known for its vibrant arts scene and LGBTQ+ community',
				lat: 50.82253,
				lng: -0.13716
			},
			{
				name: 'Wolverhampton',
				desc: 'City in the West Midlands known for its industrial heritage and cultural diversity',
				lat: 52.58697,
				lng: -2.12882
			},
			{
				name: 'Bolton',
				desc: 'Town in Greater Manchester known for its industrial history and cultural diversity',
				lat: 53.57849,
				lng: -2.42906
			},
			{
				name: 'Swindon',
				desc: 'Town in Wiltshire known for its railway heritage and modern industrial parks',
				lat: 51.55797,
				lng: -1.78116
			},
			{
				name: 'Norwich',
				desc: 'City in Norfolk known for its historic architecture, vibrant arts scene, and medieval streets',
				lat: 52.63089,
				lng: 1.29735
			},
			{
				name: 'Bournemouth',
				desc: 'Seaside resort town on the south coast known for its beaches, gardens, and entertainment',
				lat: 50.72081,
				lng: -1.90469
			},
			{
				name: 'Milton Keynes',
				desc: 'Town in Buckinghamshire known for its grid road system and modern architecture',
				lat: 52.04062,
				lng: -0.75942
			},
			{
				name: 'Peterborough',
				desc: 'City in Cambridgeshire known for its cathedral, historic sites, and green spaces',
				lat: 52.57364,
				lng: -0.24777
			},
			{
				name: 'Southend-on-Sea',
				desc: 'Seaside resort town in Essex known for its pier, beaches, and cultural events',
				lat: 51.54593,
				lng: 0.70771
			},
			{
				name: 'Middlesbrough',
				desc: 'Industrial town on the River Tees known for its steel industry and landmarks like the Transporter Bridge',
				lat: 54.57469,
				lng: -1.23495
			},
			{
				name: 'Swansea',
				desc: 'Coastal city in Wales known for its maritime history, beaches, and cultural events',
				lat: 51.62144,
				lng: -3.94365
			},
			{
				name: 'Slough',
				desc: 'Town in Berkshire known for its industrial estates, trading estate, and proximity to Heathrow Airport',
				lat: 51.51121,
				lng: -0.59542
			},
			{
				name: 'Warrington',
				desc: 'Town in Cheshire known for its industrial history and proximity to Manchester and Liverpool',
				lat: 53.39002,
				lng: -2.59665
			},
			{
				name: 'Oxford',
				desc: 'City in Oxfordshire known for its prestigious university, historic architecture, and cultural scene',
				lat: 51.75202,
				lng: -1.25772
			},
			{
				name: 'Sunderland',
				desc: 'City on the northeast coast of England known for its shipbuilding heritage and cultural landmarks',
				lat: 54.9061,
				lng: -1.38113
			},
			{
				name: 'Huddersfield',
				desc: 'Town in West Yorkshire known for its Victorian architecture, textile industry heritage, and rugby league team',
				lat: 53.64579,
				lng: -1.78504
			},
			{
				name: 'Cambridge',
				desc: 'City in Cambridgeshire known for its prestigious university, historic colleges, and punting on the River Cam',
				lat: 52.20534,
				lng: 0.12182
			},
			{
				name: 'Poole',
				desc: 'Coastal town in Dorset known for its natural harbor, beaches, and water sports',
				lat: 50.71505,
				lng: -1.98725
			},
			{
				name: 'York',
				desc: 'Historic city in North Yorkshire known for its medieval walls, cobbled streets, and Gothic cathedral',
				lat: 53.95906,
				lng: -1.08154
			},
			{
				name: 'Telford',
				desc: 'New town in Shropshire known for its industrial heritage and modern amenities',
				lat: 52.67842,
				lng: -2.44526
			},
			{
				name: 'Ipswich',
				desc: 'Town in Suffolk known for its maritime history, cultural events, and historic architecture',
				lat: 52.05917,
				lng: 1.15545
			},
			{
				name: 'Gloucester',
				desc: 'City in Gloucestershire known for its Romanesque and Gothic cathedral, historic docks, and Tudor buildings',
				lat: 51.86421,
				lng: -2.23803
			},
			{
				name: 'Blackpool',
				desc: 'Seaside resort town in Lancashire known for its Pleasure Beach, Tower, and illuminations',
				lat: 53.8175,
				lng: -3.03567
			},
			{
				name: 'Watford',
				desc: 'Town in Hertfordshire known for its shopping, entertainment, and proximity to London',
				lat: 51.65613,
				lng: -0.39679
			},
			{
				name: 'Birkenhead',
				desc: 'Town on the Wirral Peninsula known for its maritime history and proximity to Liverpool',
				lat: 53.38907,
				lng: -3.02301
			},
			{
				name: 'Sale',
				desc: 'Town in Greater Manchester known for its thriving town center, parks, and proximity to Manchester',
				lat: 53.42462,
				lng: -2.3242
			},
			{
				name: 'Newport',
				desc: 'City in Wales known for its industrial heritage, historic sites, and cultural events',
				lat: 51.58891,
				lng: -2.9973
			},
			{
				name: 'Colchester',
				desc: 'Town in Essex known for its Roman heritage, historic architecture, and cultural attractions',
				lat: 51.88921,
				lng: 0.90421
			},
			{
				name: 'Salford',
				desc: 'City in Greater Manchester known for its industrial heritage, waterfront development, and arts scene',
				lat: 53.48752,
				lng: -2.29012
			},
			{
				name: 'High Wycombe',
				desc: 'Town in Buckinghamshire known for its furniture industry, historic market, and countryside surroundings',
				lat: 51.62906,
				lng: -0.74934
			},
			{
				name: 'Solihull',
				desc: 'Town in the West Midlands known for its affluent neighborhoods, green spaces, and shopping centers',
				lat: 52.41281,
				lng: -1.77819
			},
			{
				name: 'Blackburn',
				desc: 'Town in Lancashire known for its industrial heritage, parks, and cultural events',
				lat: 53.74858,
				lng: -2.4856
			},
			{
				name: 'Exeter',
				desc: 'City in Devon known for its historic cathedral, Roman walls, and vibrant cultural scene',
				lat: 50.71841,
				lng: -3.5339
			},
			{
				name: 'Maidstone',
				desc: 'County town of Kent known for its historic architecture, river walks, and shopping districts',
				lat: 51.27036,
				lng: 0.5227
			},
			{
				name: 'Chelmsford',
				desc: 'City in Essex known for its cathedral, parks, and shopping centers',
				lat: 51.7361,
				lng: 0.47902
			},
			{
				name: 'Cheltenham',
				desc: 'Spa town in Gloucestershire known for its Regency architecture, horse racing, and cultural festivals',
				lat: 51.89788,
				lng: -2.07936
			},
			{
				name: 'Basingstoke',
				desc: 'Town in Hampshire known for its commerce, transport links, and recreational facilities',
				lat: 51.26249,
				lng: -1.0863
			},
			{
				name: 'Basildon',
				desc: 'Town in Essex known for its New Town architecture, shopping centers, and recreational facilities',
				lat: 51.57199,
				lng: 0.44862
			},
			{
				name: 'Crawley',
				desc: 'Town in West Sussex known for its airport, business parks, and green spaces',
				lat: 51.11563,
				lng: -0.18184
			},
			{
				name: 'Worthing',
				desc: 'Seaside town in West Sussex known for its Victorian architecture, beaches, and cultural events',
				lat: 50.81787,
				lng: -0.37288
			},
			{
				name: 'Gateshead',
				desc: 'Town in Tyne and Wear known for its iconic bridges, cultural venues, and riverside walks',
				lat: 54.94585,
				lng: -1.6174
			},
			{
				name: 'Rochdale',
				desc: 'Town in Greater Manchester known for its textile industry heritage, historic sites, and countryside surroundings',
				lat: 53.61443,
				lng: -2.16115
			},
			{
				name: 'Doncaster',
				desc: 'Market town in South Yorkshire known for its horse racing, railway heritage, and markets',
				lat: 53.52282,
				lng: -1.12846
			},
			{
				name: 'Eastbourne',
				desc: 'Seaside town in East Sussex known for its Victorian pier, beaches, and chalk cliffs',
				lat: 50.76871,
				lng: 0.28453
			},
			{
				name: 'Woking',
				desc: 'Town in Surrey known for its modern developments, shopping centers, and cultural venues',
				lat: 51.31966,
				lng: -0.55893
			},
			{
				name: 'Oldham',
				desc: 'Town in Greater Manchester known for its textile industry heritage and countryside surroundings',
				lat: 53.54094,
				lng: -2.1187
			},
			{
				name: 'Lincoln',
				desc: 'City in Lincolnshire known for its medieval cathedral, castle, and historic quarter',
				lat: 53.2345,
				lng: -0.53836
			},
			{
				name: 'Stockport',
				desc: 'Town in Greater Manchester known for its industrial heritage, historic market, and viaduct',
				lat: 53.41063,
				lng: -2.15753
			},
			{
				name: 'Sutton Coldfield',
				desc: 'Suburban town in the West Midlands known for its green spaces, historic buildings, and affluent neighborhoods',
				lat: 52.57169,
				lng: -1.82238
			},
			{
				name: 'Wakefield',
				desc: 'City in West Yorkshire known for its historic cathedral, museums, and cultural events',
				lat: 53.68331,
				lng: -1.49768
			},
			{
				name: 'Rotherham',
				desc: 'Town in South Yorkshire known for its industrial heritage, parks, and cultural attractions',
				lat: 53.4326,
				lng: -1.3635
			},
			{
				name: 'Gillingham',
				desc: 'Town in Kent known for its maritime heritage, parks, and shopping centers',
				lat: 51.38913,
				lng: 0.54863
			},
			{
				name: 'St Helens',
				desc: 'Town in Merseyside known for its glass industry heritage, parks, and rugby league team',
				lat: 53.45113,
				lng: -2.73845
			},
			{
				name: 'Wigan',
				desc: 'Town in Greater Manchester known for its industrial heritage, market, and rugby league team',
				lat: 53.54503,
				lng: -2.6325
			},
			{
				name: 'Worcester',
				desc: 'City in Worcestershire known for its cathedral, historic buildings, and scenic riverside',
				lat: 52.192,
				lng: -2.22001
			},
			{
				name: 'Hemel Hempstead',
				desc: 'Town in Hertfordshire known for its new town architecture, shopping center, and green spaces',
				lat: 51.75316,
				lng: -0.44844
			},
			{
				name: 'Bath',
				desc: 'City in Somerset known for its Roman-built baths, Georgian architecture, and literary connections',
				lat: 51.38139,
				lng: -2.35966
			}
		]
	},
	nigeria100k: {
		name: 'Großstädte Nigerias',
		aiGenerated: true,
		values: [
			{
				name: 'Lagos',
				desc: 'Vibrant metropolis and economic hub of Nigeria, known for its bustling markets, lively nightlife, and stunning beaches',
				lat: 6.52438,
				lng: 3.37921
			},
			{
				name: 'Kano',
				desc: 'Historic city in northern Nigeria, famous for its ancient walls, traditional crafts, and bustling markets',
				lat: 11.99984,
				lng: 8.52462
			},
			{
				name: 'Ibadan',
				desc: 'Largest city in Nigeria by geographical area, known for its rich cultural heritage, universities, and vibrant music scene',
				lat: 7.37756,
				lng: 3.94704
			},
			{
				name: 'Benin City',
				desc: 'Ancient city in southern Nigeria, renowned for its rich history, traditional festivals, and bronze artworks',
				lat: 6.33504,
				lng: 5.62749
			},
			{
				name: 'Port Harcourt',
				desc: 'Major port city in southern Nigeria, known for its oil industry, cultural diversity, and waterfront attractions',
				lat: 4.77742,
				lng: 7.0134
			},
			{
				name: 'Aba',
				desc: 'Commercial center in southeastern Nigeria, famous for its textile industry, vibrant markets, and cultural festivals',
				lat: 5.10658,
				lng: 7.36667
			},
			{
				name: 'Jos',
				desc: 'City in central Nigeria, known for its cool climate, stunning landscapes, and vibrant culture',
				lat: 9.92849,
				lng: 8.89212
			},
			{
				name: 'Ilorin',
				desc: 'Capital of Kwara State in central Nigeria, known for its Islamic heritage, traditional architecture, and vibrant markets',
				lat: 8.49664,
				lng: 4.54215
			},
			{
				name: 'Abuja',
				desc: 'Capital city of Nigeria, known for its modern architecture, government institutions, and cultural landmarks',
				lat: 9.05785,
				lng: 7.49508
			},
			{
				name: 'Kaduna',
				desc: 'City in northern Nigeria, known for its historical significance, diverse population, and vibrant arts scene',
				lat: 10.52641,
				lng: 7.43879
			},
			{
				name: 'Enugu',
				desc: 'Capital of Enugu State in southeastern Nigeria, known for its coal mines, beautiful landscapes, and vibrant nightlife',
				lat: 6.44132,
				lng: 7.49883
			},
			{
				name: 'Zaria',
				desc: 'City in northern Nigeria, famous for its ancient city walls, traditional crafts, and vibrant cultural scene',
				lat: 11.07972,
				lng: 7.71032
			},
			{
				name: 'Ogbomosho',
				desc: 'City in southwestern Nigeria, known for its agricultural activities, traditional markets, and cultural festivals',
				lat: 8.13305,
				lng: 4.24641
			},
			{
				name: 'Warri',
				desc: 'City in southern Nigeria, known for its oil industry, bustling markets, and vibrant street life',
				lat: 5.51667,
				lng: 5.75
			},
			{
				name: 'Ikorodu',
				desc: 'Suburban town in Lagos State, Nigeria, known for its historic sites, cultural festivals, and vibrant markets',
				lat: 6.61941,
				lng: 3.50471
			},
			{
				name: 'Maiduguri',
				desc: 'City in northeastern Nigeria, known for its vibrant markets, Islamic heritage, and cultural festivals',
				lat: 11.84692,
				lng: 13.15757
			},
			{
				name: 'Ife',
				desc: 'City in southwestern Nigeria, known for its archaeological sites, traditional crafts, and cultural festivals',
				lat: 7.48043,
				lng: 4.56032
			},
			{
				name: 'Bauchi',
				desc: 'City in northeastern Nigeria, known for its beautiful landscapes, historic sites, and vibrant cultural scene',
				lat: 10.31032,
				lng: 9.84388
			},
			{
				name: 'Akure',
				desc: 'City in southwestern Nigeria, known for its cocoa production, beautiful landscapes, and vibrant markets',
				lat: 7.25256,
				lng: 5.19312
			},
			{
				name: 'Abeokuta',
				desc: 'City in southwestern Nigeria, known for its historic sites, traditional markets, and cultural festivals',
				lat: 7.15571,
				lng: 3.34509
			},
			{
				name: 'Uyo',
				desc: 'City in southeastern Nigeria, known for its oil industry, beautiful landscapes, and vibrant cultural scene',
				lat: 5.03333,
				lng: 7.92657
			},
			{
				name: 'Oyo',
				desc: 'City in southwestern Nigeria, known for its historical significance, traditional festivals, and vibrant markets',
				lat: 7.85257,
				lng: 3.93219
			},
			{
				name: 'Sokoto',
				desc: 'City in northwestern Nigeria, known for its Islamic heritage, traditional architecture, and vibrant markets',
				lat: 13.06092,
				lng: 5.23901
			},
			{
				name: 'Owerri',
				desc: 'City in southeastern Nigeria, known for its hospitality, vibrant markets, and cultural festivals',
				lat: 5.48363,
				lng: 7.03325
			},
			{
				name: 'Yola',
				desc: 'City in northeastern Nigeria, known for its historic sites, beautiful landscapes, and vibrant culture',
				lat: 9.20917,
				lng: 12.48157
			},
			{
				name: 'Calabar',
				desc: 'City in southeastern Nigeria, known for its colonial architecture, beautiful beaches, and vibrant cultural scene',
				lat: 4.95893,
				lng: 8.32695
			},
			{
				name: 'Umuahia',
				desc: 'City in southeastern Nigeria, known for its palm oil industry, traditional crafts, and vibrant markets',
				lat: 5.52491,
				lng: 7.49481
			},
			{
				name: 'Ondo',
				desc: 'City in southwestern Nigeria, known for its agricultural activities, traditional festivals, and vibrant markets',
				lat: 7.09368,
				lng: 4.83552
			},
			{
				name: 'Minna',
				desc: 'City in central Nigeria, known for its historical significance, beautiful landscapes, and vibrant culture',
				lat: 9.61388,
				lng: 6.55692
			},
			{
				name: 'Lafia',
				desc: 'City in central Nigeria, known for its agricultural activities, traditional crafts, and vibrant markets',
				lat: 8.4939,
				lng: 8.51532
			},
			{
				name: 'Okene',
				desc: 'City in central Nigeria, known for its oil industry, traditional crafts, and vibrant markets',
				lat: 7.5511,
				lng: 6.2359
			},
			{
				name: 'Katsina',
				desc: 'City in northwestern Nigeria, known for its historic sites, traditional crafts, and vibrant markets',
				lat: 12.99082,
				lng: 7.60177
			},
			{
				name: 'Ikeja',
				desc: 'City in Lagos State, Nigeria, known for its bustling markets, vibrant nightlife, and modern amenities',
				lat: 6.60437,
				lng: 3.35383
			},
			{
				name: 'Nsukka',
				desc: 'Town in southeastern Nigeria, known for its university, traditional festivals, and vibrant markets',
				lat: 6.8569,
				lng: 7.3954
			},
			{
				name: 'Ado Ekiti',
				desc: 'City in southwestern Nigeria, known for its educational institutions, traditional festivals, and vibrant culture',
				lat: 7.62386,
				lng: 5.22063
			},
			{
				name: 'Awka',
				desc: 'Capital of Anambra State in southeastern Nigeria, known for its cultural festivals, traditional markets, and vibrant nightlife',
				lat: 6.21045,
				lng: 7.07045
			},
			{
				name: 'Iseyin',
				desc: 'City in southwestern Nigeria, known for its textile industry, traditional crafts, and vibrant markets',
				lat: 7.97422,
				lng: 3.60278
			},
			{
				name: 'Mubi',
				desc: 'City in northeastern Nigeria, known for its diverse population, traditional crafts, and vibrant markets',
				lat: 10.27034,
				lng: 13.27003
			},
			{
				name: 'Onitsha',
				desc: 'City in southeastern Nigeria, known for its vibrant markets, bustling streets, and cultural festivals',
				lat: 6.14529,
				lng: 6.78845
			},
			{
				name: 'Sagamu',
				desc: 'City in southwestern Nigeria, known for its agricultural activities, traditional festivals, and vibrant markets',
				lat: 6.83878,
				lng: 3.64674
			},
			{
				name: 'Makurdi',
				desc: 'City in central Nigeria, known for its agricultural activities, traditional crafts, and vibrant markets',
				lat: 7.73759,
				lng: 8.5258
			},
			{
				name: 'Mokwa',
				desc: 'Town in central Nigeria, known for its natural attractions, traditional crafts, and vibrant markets',
				lat: 9.30539,
				lng: 5.05453
			},
			{
				name: 'Badagry',
				desc: 'Coastal town in southwestern Nigeria, known for its slave trade history, cultural landmarks, and beautiful beaches',
				lat: 6.43885,
				lng: 2.90492
			},
			{
				name: 'Ilesa',
				desc: 'City in southwestern Nigeria, known for its agricultural activities, traditional festivals, and vibrant markets',
				lat: 7.62532,
				lng: 4.74096
			},
			{
				name: 'Gombe',
				desc: 'City in northeastern Nigeria, known for its natural attractions, traditional crafts, and vibrant markets',
				lat: 10.28969,
				lng: 11.16763
			},
			{
				name: 'Obafemi Owode',
				desc: 'Local government area in Ogun State, Nigeria, known for its agricultural activities, traditional festivals, and vibrant markets',
				lat: 6.98333,
				lng: 3.55
			},
			{
				name: 'Owo',
				desc: 'City in southwestern Nigeria, known for its historic sites, traditional crafts, and vibrant markets',
				lat: 7.19535,
				lng: 5.58675
			},
			{
				name: 'Suleja',
				desc: 'City in Niger State, Nigeria, known for its diverse population, traditional crafts, and vibrant markets',
				lat: 9.18084,
				lng: 7.17984
			},
			{
				name: 'Lavun',
				desc: 'Local government area in Niger State, Nigeria, known for its agricultural activities, traditional festivals, and vibrant markets',
				lat: 9.0049,
				lng: 6.446
			},
			{
				name: 'Potiskum',
				desc: 'City in northeastern Nigeria, known for its vibrant markets, traditional crafts, and cultural festivals',
				lat: 11.70663,
				lng: 11.07989
			},
			{
				name: 'Kukawa',
				desc: 'Town in northeastern Nigeria, known for its historic significance, traditional crafts, and cultural festivals',
				lat: 12.13998,
				lng: 13.63582
			},
			{
				name: 'Gusau',
				desc: 'City in northwestern Nigeria, known for its agricultural activities, traditional crafts, and vibrant markets',
				lat: 12.17001,
				lng: 6.66358
			},
			{
				name: 'Iwo',
				desc: 'City in southwestern Nigeria, known for its traditional festivals, vibrant markets, and cultural landmarks',
				lat: 7.62636,
				lng: 4.18282
			},
			{
				name: 'Bida',
				desc: 'City in central Nigeria, known for its traditional crafts, vibrant markets, and cultural festivals',
				lat: 9.07863,
				lng: 6.00932
			},
			{
				name: 'Ugep',
				desc: 'Town in southeastern Nigeria, known for its agricultural activities, traditional crafts, and vibrant markets',
				lat: 5.80857,
				lng: 8.08026
			},
			{
				name: 'Ijebu Ode',
				desc: 'City in southwestern Nigeria, known for its historic sites, traditional festivals, and vibrant markets',
				lat: 6.82086,
				lng: 3.91775
			},
			{
				name: 'Epe',
				desc: 'Town in southwestern Nigeria, known for its fishing industry, beautiful landscapes, and cultural festivals',
				lat: 6.58406,
				lng: 3.97783
			},
			{
				name: 'Ise Ekiti',
				desc: 'Town in southwestern Nigeria, known for its agricultural activities, traditional crafts, and vibrant markets',
				lat: 7.4604,
				lng: 5.4235
			},
			{
				name: 'Gboko',
				desc: 'City in central Nigeria, known for its agricultural activities, traditional crafts, and vibrant markets',
				lat: 7.32019,
				lng: 9.00359
			},
			{
				name: 'Ilawe Ekiti',
				desc: 'Town in southwestern Nigeria, known for its agricultural activities, traditional crafts, and vibrant markets',
				lat: 7.5956,
				lng: 5.05938
			},
			{
				name: 'Ikare',
				desc: 'City in southwestern Nigeria, known for its traditional festivals, vibrant markets, and cultural landmarks',
				lat: 7.52999,
				lng: 5.75386
			},
			{
				name: 'Osogbo',
				desc: 'City in southwestern Nigeria, known for its historic sites, traditional festivals, and vibrant markets',
				lat: 7.77134,
				lng: 4.55698
			},
			{
				name: 'Okpoko',
				desc: 'Town in southeastern Nigeria, known for its vibrant markets, traditional crafts, and cultural festivals',
				lat: 6.16188,
				lng: 6.79534
			},
			{
				name: 'Sapele',
				desc: 'City in southern Nigeria, known for its oil industry, vibrant markets, and cultural festivals',
				lat: 5.89046,
				lng: 5.67606
			},
			{
				name: 'Ila',
				desc: 'Town in southwestern Nigeria, known for its traditional festivals, vibrant markets, and cultural landmarks',
				lat: 8.00825,
				lng: 4.90809
			},
			{
				name: 'Shaki',
				desc: 'Town in southwestern Nigeria, known for its traditional crafts, vibrant markets, and cultural festivals',
				lat: 8.66684,
				lng: 3.92637
			},
			{
				name: 'Ijero',
				desc: 'Town in southwestern Nigeria, known for its traditional festivals, vibrant markets, and cultural landmarks',
				lat: 7.81477,
				lng: 5.06768
			},
			{
				name: 'Ikot Ekpene',
				desc: 'City in southeastern Nigeria, known for its vibrant markets, traditional crafts, and cultural festivals',
				lat: 5.18158,
				lng: 7.71475
			},
			{
				name: 'Jalingo',
				desc: 'City in northeastern Nigeria, known for its vibrant markets, traditional crafts, and cultural festivals',
				lat: 8.88333,
				lng: 11.36667
			},
			{
				name: 'Otukpo',
				desc: 'Town in central Nigeria, known for its agricultural activities, traditional festivals, and vibrant markets',
				lat: 7.19048,
				lng: 8.13014
			},
			{
				name: 'Okigwe',
				desc: 'City in southeastern Nigeria, known for its traditional festivals, vibrant markets, and cultural landmarks',
				lat: 5.82917,
				lng: 7.35
			},
			{
				name: 'Kisi',
				desc: 'Town in southwestern Nigeria, known for its traditional crafts, vibrant markets, and cultural festivals',
				lat: 9.08008,
				lng: 3.84844
			},
			{
				name: 'Buguma',
				desc: 'Town in southern Nigeria, known for its fishing industry, vibrant markets, and cultural festivals',
				lat: 4.73333,
				lng: 6.8632
			},
			{
				name: 'Funtua',
				desc: 'Town in northwestern Nigeria, known for its agricultural activities, vibrant markets, and cultural festivals',
				lat: 11.52352,
				lng: 7.31089
			},
			{
				name: 'Abakaliki',
				desc: 'City in southeastern Nigeria, known for its traditional crafts, vibrant markets, and cultural festivals',
				lat: 6.32484,
				lng: 8.1134
			},
			{
				name: 'Asaba',
				desc: 'City in southwestern Nigeria, known for its beautiful landscapes, traditional festivals, and vibrant markets',
				lat: 6.20539,
				lng: 6.72148
			},
			{
				name: 'Gbongan',
				desc: 'Town in southwestern Nigeria, known for its traditional festivals, vibrant markets, and cultural landmarks',
				lat: 7.47744,
				lng: 4.35405
			},
			{
				name: 'Igboho',
				desc: 'Town in southwestern Nigeria, known for its traditional crafts, vibrant markets, and cultural festivals',
				lat: 7.43896,
				lng: 3.41818
			},
			{
				name: 'Gashua',
				desc: 'Town in northeastern Nigeria, known for its vibrant markets, traditional crafts, and cultural festivals',
				lat: 12.87149,
				lng: 11.04705
			},
			{
				name: 'Bama',
				desc: 'Town in northeastern Nigeria, known for its traditional crafts, vibrant markets, and cultural festivals',
				lat: 11.5203,
				lng: 13.68962
			},
			{
				name: 'Uromi',
				desc: 'Town in southeastern Nigeria, known for its traditional crafts, vibrant markets, and cultural festivals',
				lat: 6.70199,
				lng: 6.33033
			}
		]
	},
	turkey100k: {
		name: 'Großstädte der Türkei',
		aiGenerated: true,
		values: [
			{
				name: 'Istanbul',
				desc: 'Wo der Bosporus die Kontinente verbindet',
				lat: 41.00823,
				lng: 28.97836
			},
			{
				name: 'Ankara',
				desc: 'Die pulsierende Hauptstadt der Türkei',
				lat: 39.93337,
				lng: 32.85974
			},
			{name: 'Izmir', desc: 'Die Perle der Ägäis', lat: 38.41924, lng: 27.12872},
			{
				name: 'Bursa',
				desc: 'Wo Geschichte auf moderne Energie trifft',
				lat: 40.18257,
				lng: 29.06785
			},
			{
				name: 'Adana',
				desc: 'Heiß, lebhaft und voller kultureller Vielfalt',
				lat: 37.00167,
				lng: 35.32889
			},
			{name: 'Gaziantep', desc: 'Wo jede Mahlzeit ein Fest ist', lat: 37.06622, lng: 37.38332},
			{name: 'Konya', desc: 'Das Herz Anatoliens', lat: 37.87135, lng: 32.48464},
			{
				name: 'Antalya',
				desc: 'Wo das azurblaue Meer auf majestätische Berge trifft',
				lat: 36.89689,
				lng: 30.71332
			},
			{
				name: 'Kayseri',
				desc: 'Wo Tradition und Moderne Hand in Hand gehen',
				lat: 38.73472,
				lng: 35.46722
			},
			{
				name: 'Diyarbakır',
				desc: 'Eine antike Stadt mit einer reichen kulturellen Mischung',
				lat: 37.91441,
				lng: 40.23063
			},
			{name: 'Mersin', desc: 'Wo das Meer die Seele berührt', lat: 36.80076, lng: 34.62545},
			{
				name: 'Eskişehir',
				desc: 'Die Stadt der Studenten und der kreativen Energie',
				lat: 39.77667,
				lng: 30.52056
			},
			{
				name: 'Samsun',
				desc: 'Wo das Schwarze Meer seine Geschichten erzählt',
				lat: 41.28667,
				lng: 36.33
			},
			{
				name: 'Denizli',
				desc: 'Heimat der antiken Stadt Hierapolis und der Pamukkale-Thermen',
				lat: 37.77417,
				lng: 29.0875
			},
			{
				name: 'Şanlıurfa',
				desc: 'Die Stadt der Propheten und der Legenden',
				lat: 37.16708,
				lng: 38.79392
			},
			{
				name: 'Kahramanmaraş',
				desc: 'Berühmt für seine Süßigkeiten und seine heldenhaften Namen',
				lat: 37.57944,
				lng: 36.93717
			},
			{name: 'Malatya', desc: 'Das Zentrum des Aprikosenanbaus', lat: 38.35519, lng: 38.30946},
			{
				name: 'Van',
				desc: 'Wo der See Geschichten aus alter Zeit bewahrt',
				lat: 38.49435,
				lng: 43.38388
			},
			{name: 'Erzurum', desc: 'Die eisige Schönheit des Ostens', lat: 39.92077, lng: 41.27436},
			{name: 'Elazığ', desc: 'Zwischen Bergen und Seen eingebettet', lat: 38.67525, lng: 39.2213},
			{
				name: 'Batman',
				desc: 'Nicht nur ein Superheld, sondern auch eine Stadt voller Geschichte',
				lat: 37.88745,
				lng: 41.13205
			},
			{
				name: 'Sivas',
				desc: 'Wo die Vergangenheit in jeder Ecke lebt',
				lat: 39.75042,
				lng: 37.01545
			},
			{
				name: 'Manisa',
				desc: 'Die Wiege der Lydier und eine Stadt voller grüner Natur',
				lat: 38.61406,
				lng: 27.4299
			},
			{
				name: 'İzmit',
				desc: 'Wo der Marmarameerarm eine lebhafte Stadt umarmt',
				lat: 40.765,
				lng: 29.94083
			},
			{
				name: 'Gebze',
				desc: 'Wo Industrie und Natur eine faszinierende Verbindung eingehen',
				lat: 40.80276,
				lng: 29.43068
			},
			{
				name: 'Balıkesir',
				desc: 'Reich an Olivenbäumen und einer entspannten Lebensweise',
				lat: 39.64917,
				lng: 27.88611
			},
			{
				name: 'Tarsus',
				desc: 'Geburtsort des Apostels Paulus und eine Stadt der Legenden',
				lat: 36.91793,
				lng: 34.89236
			},
			{
				name: 'Kütahya',
				desc: 'Bekannt für sein handgefertigtes Porzellan und seine reiche Geschichte',
				lat: 39.41619,
				lng: 29.98305
			},
			{
				name: 'Trabzon',
				desc: 'Wo das Grün der Berge auf das Blau des Meeres trifft',
				lat: 41.00527,
				lng: 39.72617
			},
			{
				name: 'Adapazarı',
				desc: 'Ein Ort, der aus Trümmern wiederauferstanden ist und jetzt aufblüht',
				lat: 40.78188,
				lng: 30.40333
			},
			{
				name: 'Isparta',
				desc: 'Bekannt als Stadt der Rosen und des Duftes',
				lat: 37.76444,
				lng: 30.55306
			},
			{
				name: 'Çorum',
				desc: 'Reich an archäologischen Schätzen und traditioneller Küche',
				lat: 40.54694,
				lng: 34.95333
			},
			{
				name: 'Çorlu',
				desc: 'Ein lebendiges Zentrum wirtschaftlicher Aktivitäten',
				lat: 41.15917,
				lng: 27.8025
			},
			{
				name: 'Antakya',
				desc: 'Wo die Vergangenheit in den Mauern der Altstadt verweilt',
				lat: 36.20655,
				lng: 36.15723
			},
			{
				name: 'Adıyaman',
				desc: 'Bekannt für den majestätischen Berg Nemrut und seine historischen Stätten',
				lat: 37.76442,
				lng: 38.27629
			},
			{
				name: 'İskenderun',
				desc: 'Wo der Duft von Gewürzen in der Luft liegt und das Meer ruft',
				lat: 36.58718,
				lng: 36.17347
			},
			{
				name: 'Osmaniye',
				desc: 'Wo Geschichte auf moderne Bequemlichkeiten trifft',
				lat: 37.07417,
				lng: 36.24778
			},
			{
				name: 'Kırıkkale',
				desc: 'Bekannt für seine Metallindustrie und seine grünen Landschaften',
				lat: 39.84683,
				lng: 33.51529
			},
			{
				name: 'Aydın',
				desc: 'Reich an antiken Stätten und sonnenverwöhnten Landschaften',
				lat: 37.8444,
				lng: 27.8458
			},
			{
				name: 'Uşak',
				desc: 'Wo Handwerkskunst und Tradition zusammenkommen',
				lat: 38.68222,
				lng: 29.40806
			},
			{
				name: 'Aksaray',
				desc: 'Wo die Wüste auf fruchtbare Ebenen trifft',
				lat: 38.3725,
				lng: 34.02537
			},
			{
				name: 'Afyonkarahisar',
				desc: 'Bekannt für seine Thermalquellen und das Köfte',
				lat: 38.75667,
				lng: 30.54333
			},
			{
				name: 'İnegöl',
				desc: 'Die Stadt der Möbel und des guten Geschmacks',
				lat: 40.07813,
				lng: 29.5134
			},
			{
				name: 'Darıca',
				desc: 'Wo die Natur die Hektik der Stadt mildert',
				lat: 40.77406,
				lng: 29.37861
			},
			{
				name: 'Tekirdağ',
				desc: 'Berühmt für seine köstlichen Meeresfrüchte und seinen Raki',
				lat: 40.97972,
				lng: 27.51472
			},
			{
				name: 'Ordu',
				desc: 'Wo das Grün der Berge auf das Blau des Meeres trifft',
				lat: 40.98472,
				lng: 37.87889
			},
			{
				name: 'Edirne',
				desc: 'Wo Geschichte in jeder Ecke des Steins verewigt ist',
				lat: 41.67588,
				lng: 26.5587
			},
			{
				name: 'Tokat',
				desc: 'Bekannt für seine traditionelle Architektur und seine leckeren Äpfel',
				lat: 40.30667,
				lng: 36.56333
			},
			{
				name: 'Karaman',
				desc: 'Wo die Geschichte der Seldschuken lebendig wird',
				lat: 37.18111,
				lng: 33.215
			},
			{
				name: 'Kızıltepe',
				desc: 'Ein Schmelztiegel der Kulturen und der Geschmäcker',
				lat: 37.19357,
				lng: 40.58611
			},
			{
				name: 'Gölcük',
				desc: 'Bekannt für seine atemberaubende Lage am Seeufer',
				lat: 40.68444,
				lng: 29.41583
			},
			{
				name: 'Düzce',
				desc: 'Wo die grünen Hügel in den Himmel ragen',
				lat: 40.83889,
				lng: 31.16389
			},
			{
				name: 'Körfez',
				desc: 'Ein modernes Zentrum mit einem Hauch von Geschichte',
				lat: 40.77075,
				lng: 29.84154
			},
			{
				name: 'Siirt',
				desc: 'Bekannt für seine reiche kulturelle Vielfalt und sein köstliches Essen',
				lat: 37.929,
				lng: 41.9415
			},
			{
				name: 'Derince',
				desc: 'Wo die Schönheit des Meeres die Seele berührt',
				lat: 40.77472,
				lng: 29.89833
			},
			{name: 'Bolu', desc: 'Umgeben von grünen Wäldern und Bergseen', lat: 40.735, lng: 31.60611},
			{
				name: 'Menemen',
				desc: 'Bekannt für sein köstliches Frühstück und seine entspannte Atmosphäre',
				lat: 38.6025,
				lng: 27.06917
			},
			{
				name: 'Turgutlu',
				desc: 'Wo die Landwirtschaft auf industrielle Entwicklung trifft',
				lat: 38.5,
				lng: 27.7
			},
			{
				name: 'Torbalı',
				desc: 'Ein Ort, der zwischen Tradition und Moderne balanciert',
				lat: 38.20472,
				lng: 27.35694
			},
			{
				name: 'Bandırma',
				desc: 'Ein wichtiger Hafen an der Marmarasee',
				lat: 40.35222,
				lng: 27.97667
			},
			{
				name: 'Siverek',
				desc: 'Wo die Wüste auf fruchtbare Felder trifft',
				lat: 37.755,
				lng: 39.31667
			},
			{
				name: 'Nazilli',
				desc: 'Bekannt für seine Weinproduktion und sein buntes Stadtbild',
				lat: 37.91244,
				lng: 28.32261
			},
			{
				name: 'Niğde',
				desc: 'Umgeben von majestätischen Bergen und fruchtbaren Ebenen',
				lat: 37.96959,
				lng: 34.68294
			},
			{
				name: 'Zonguldak',
				desc: 'Reich an Kohle und einer reichen maritimen Geschichte',
				lat: 41.45647,
				lng: 31.79869
			},
			{
				name: 'Karabük',
				desc: 'Bekannt für seine Stahlproduktion und seine grünen Parks',
				lat: 41.2061,
				lng: 32.62061
			},
			{
				name: 'Kırşehir',
				desc: 'Wo die Steppe die Sinne weckt und die Geschichte lebt',
				lat: 39.14556,
				lng: 34.16333
			},
			{
				name: 'Çanakkale',
				desc: 'Wo der Heldentum in den Wellen des Dardanellen ruht',
				lat: 40.15531,
				lng: 26.41417
			},
			{
				name: 'Ceyhan',
				desc: 'Ein wichtiger Hafen am Mittelmeer und ein Zentrum der Petrochemie',
				lat: 37.02444,
				lng: 35.8175
			},
			{
				name: 'Erzincan',
				desc: 'Wo die Natur die Sinne belebt und die Berge die Seele berühren',
				lat: 39.74397,
				lng: 39.49267
			},
			{
				name: 'Akhisar',
				desc: 'Bekannt für seine Olivenhaine und seine freundlichen Menschen',
				lat: 38.91715,
				lng: 27.84163
			},
			{
				name: 'Cizre',
				desc: 'Wo die Geschichte der antiken Zivilisationen weiterlebt',
				lat: 37.32503,
				lng: 42.19036
			},
			{
				name: 'Lüleburgaz',
				desc: 'Ein Ort, an dem Tradition auf Moderne trifft und eine einzigartige Harmonie schafft',
				lat: 41.40556,
				lng: 27.35944
			},
			{
				name: 'Karadeniz Ereğli',
				desc: 'Wo die Kohle die Geschichte des Schwarzen Meeres erzählt',
				lat: 41.28389,
				lng: 31.42139
			}
		]
	},
	poland100k: {
		name: 'Großstädte Polens',
		aiGenerated: true,
		values: [
			{
				name: 'Warschau',
				desc: 'Die lebendige Hauptstadt, in der Geschichte auf Moderne trifft',
				lat: 52.22977,
				lng: 21.01178
			},
			{
				name: 'Krakau',
				desc: 'Die königliche Stadt voller Legenden und kultureller Schätze',
				lat: 50.06465,
				lng: 19.94498
			},
			{
				name: 'Łódź',
				desc: 'Die Stadt der Industrie, Kunst und lebendigen Straßen',
				lat: 51.75945,
				lng: 19.45598
			},
			{
				name: 'Breslau',
				desc: 'Wo die bunten Fassaden die Geschichte der Jahrhunderte erzählen',
				lat: 51.10789,
				lng: 17.03854
			},
			{
				name: 'Posen',
				desc: 'Eine Stadt voller Geschichte und kultureller Vielfalt',
				lat: 52.40692,
				lng: 16.92993
			},
			{
				name: 'Danzig',
				desc: 'Wo die Bernsteinstraße auf das Meer trifft und die Hansezeit lebt',
				lat: 54.35205,
				lng: 18.64637
			},
			{
				name: 'Stettin',
				desc: 'Die Hafenstadt, in der Geschichte und Moderne Hand in Hand gehen',
				lat: 53.42894,
				lng: 14.55302
			},
			{
				name: 'Bromberg',
				desc: 'Eine Stadt am Fluss, reich an Kultur und historischer Bedeutung',
				lat: 53.1235,
				lng: 18.00844
			},
			{
				name: 'Lublin',
				desc: 'Eine Stadt der Kontraste, wo Geschichte und junge Energie zusammenfließen',
				lat: 51.24677,
				lng: 22.56845
			},
			{
				name: 'Białystok',
				desc: 'Wo die grünen Parks die Seele berühren und die Geschichte lebt',
				lat: 53.13249,
				lng: 23.16884
			},
			{
				name: 'Kattowitz',
				desc: 'Das industrielle Herz Oberschlesiens, reich an Kultur und Tradition',
				lat: 50.26489,
				lng: 19.02378
			},
			{
				name: 'Gdingen',
				desc: 'Wo das Meer die Stadt umarmt und die Segelboote im Wind tanzen',
				lat: 54.51889,
				lng: 18.53054
			},
			{
				name: 'Tschenstochau',
				desc: 'Heimat der Schwarzen Madonna und des spirituellen Pilgerweges',
				lat: 50.811,
				lng: 19.12078
			},
			{
				name: 'Radom',
				desc: 'Wo die Geschichte in den Straßen wandelt und die Zukunft im Horizont liegt',
				lat: 51.40253,
				lng: 21.14714
			},
			{
				name: 'Thorn',
				desc: 'Die mittelalterliche Stadt, in der die Legenden der Vergangenheit weiterleben',
				lat: 53.01375,
				lng: 18.59814
			},
			{
				name: 'Sosnowitz',
				desc: 'Ein Zentrum der Industrie und des Wandels, wo Tradition und Innovation kollidieren',
				lat: 50.28611,
				lng: 19.10367
			},
			{
				name: 'Rzeszów',
				desc: 'Wo die Kultur blüht und die Geschichte in jedem Winkel spürbar ist',
				lat: 50.04132,
				lng: 21.99901
			},
			{
				name: 'Kielce',
				desc: 'Umgeben von Hügeln und Geschichte, eine Stadt voller Charme und Tradition',
				lat: 50.87033,
				lng: 20.62752
			},
			{
				name: 'Gleiwitz',
				desc: 'Wo die Industrie die Landschaft prägt und die Geschichte in den Straßen lebt',
				lat: 50.29761,
				lng: 18.67658
			},
			{
				name: 'Allenstein',
				desc: 'Die grüne Stadt im Norden, reich an Geschichte und natürlicher Schönheit',
				lat: 53.77842,
				lng: 20.48012
			},
			{
				name: 'Hindenburg',
				desc: 'Bekannt für seine industrielle Vergangenheit und seine kulturelle Vielfalt',
				lat: 50.314,
				lng: 18.7851
			},
			{
				name: 'Bielitz-Biala',
				desc: 'Wo die Berge die Stadt umarmen und die Geschichte in den Straßen verweilt',
				lat: 49.8225,
				lng: 19.0583
			},
			{
				name: 'Beuthen',
				desc: 'Eine Stadt, die zwischen Tradition und Fortschritt balanciert, inmitten einer grünen Landschaft',
				lat: 50.34715,
				lng: 18.90661
			},
			{
				name: 'Grünberg',
				desc: 'Umgeben von Wäldern und Seen, eine Stadt voller natürlicher Schönheit und Geschichte',
				lat: 51.93548,
				lng: 15.50443
			},
			{
				name: 'Rybnik',
				desc: 'Wo die Industrie das Herzstück bildet und die Natur die Seele berührt',
				lat: 50.09713,
				lng: 18.54179
			},
			{
				name: 'Ruda O.S.',
				desc: 'Ein Zentrum der Industrie und der Kultur, wo Vergangenheit und Zukunft sich treffen',
				lat: 50.2584,
				lng: 18.85894
			},
			{
				name: 'Oppeln',
				desc: 'Die historische Stadt am Fluss, wo Tradition und Moderne harmonisch zusammenleben',
				lat: 50.66667,
				lng: 17.92528
			},
			{
				name: 'Tichau',
				desc: 'Wo die Industrie das Stadtbild prägt und die Kultur in jedem Winkel spürbar ist',
				lat: 50.13333,
				lng: 18.96667
			},
			{
				name: 'Landsberg an der Warthe',
				desc: 'Eine Stadt am Fluss, wo die Geschichte in den Straßen lebendig wird',
				lat: 52.73667,
				lng: 15.24056
			},
			{
				name: 'Elbing',
				desc: 'Die Stadt am Wasser, reich an Geschichte und maritimer Tradition',
				lat: 54.15492,
				lng: 19.40879
			},
			{
				name: 'Dombrowa',
				desc: 'Ein Zentrum der Kohleindustrie, wo die Kultur blüht und die Natur die Seele berührt',
				lat: 50.34882,
				lng: 19.19675
			},
			{
				name: 'Plotzk',
				desc: 'Wo die Weichsel die Stadt umarmt und die Geschichte in den Straßen lebt',
				lat: 52.54682,
				lng: 19.70638
			},
			{
				name: 'Waldenburg',
				desc: 'Eine Stadt in den Bergen, wo die Geschichte in den alten Gemäuern verweilt',
				lat: 50.77141,
				lng: 16.28432
			},
			{
				name: 'Leslau',
				desc: 'Wo die Weichsel die Landschaft prägt und die Geschichte in den Straßen wandelt',
				lat: 52.65979,
				lng: 19.06718
			},
			{
				name: 'Tarnau',
				desc: 'Umgeben von Hügeln und Wäldern, eine Stadt voller Charme und Geschichte',
				lat: 50.01286,
				lng: 20.98646
			},
			{
				name: 'Königshütte',
				desc: 'Ein Industriezentrum, wo die Vergangenheit in den Mauern lebt und die Zukunft im Horizont liegt',
				lat: 50.29758,
				lng: 18.96186
			},
			{
				name: 'Köslin',
				desc: 'Bekannt für seine Küste und seine Geschichte, eine Stadt voller maritimer Tradition',
				lat: 54.19438,
				lng: 16.17222
			}
		]
	},
	spain100k: {
		name: 'Großstädte Spaniens',
		aiGenerated: true,
		values: [
			{
				name: 'Madrid',
				desc: 'Die pulsierende Hauptstadt, wo das Leben niemals schläft',
				lat: 40.41678,
				lng: -3.70379
			},
			{
				name: 'Barcelona',
				desc: 'Die Stadt der Kunst und des Designs, wo das Mittelmeer die Kreativität beflügelt',
				lat: 41.38289,
				lng: 2.17743
			},
			{
				name: 'Valencia',
				desc: 'Wo die Sonne immer scheint und die Orangen blühen',
				lat: 39.46975,
				lng: -0.37739
			},
			{
				name: 'Sevilla',
				desc: 'Die leidenschaftliche Stadt, wo Flamenco in der Luft liegt und die Geschichte tanzt',
				lat: 37.38863,
				lng: -5.9829
			},
			{
				name: 'Saragossa',
				desc: 'Wo die alte und die moderne Welt sich in den Schatten der Basilika treffen',
				lat: 41.64882,
				lng: -0.88909
			},
			{
				name: 'Málaga',
				desc: 'Wo die Berge das Meer umarmen und die Sonne das Lächeln hervorlockt',
				lat: 36.72127,
				lng: -4.4214
			},
			{
				name: 'Murcia',
				desc: 'Die Stadt der Palmen, wo das Leben im Rhythmus der Siesta pulsiert',
				lat: 37.98344,
				lng: -1.12989
			},
			{
				name: 'Palma',
				desc: 'Wo die Altstadt ihre Geheimnisse bewahrt und das Meer die Träume segelt',
				lat: 39.56956,
				lng: 2.65016
			},
			{
				name: 'Las Palmas de Gran Canaria',
				desc: 'Eine Oase im Atlantik, wo die Vulkaninsel das Leben begrünt',
				lat: 28.12355,
				lng: -15.43699
			},
			{
				name: 'Alicante',
				desc: 'Wo die Festung die Stadt überblickt und das Mittelmeer die Sinne verwöhnt',
				lat: 38.34521,
				lng: -0.48099
			},
			{
				name: 'Bilbao',
				desc: 'Die Stadt der Kontraste, wo Industrie auf Innovation trifft und Kunst die Straßen belebt',
				lat: 43.26271,
				lng: -2.92528
			},
			{
				name: 'Córdoba',
				desc: 'Die Stadt der blumengeschmückten Innenhöfe und der maurischen Pracht',
				lat: 37.88818,
				lng: -4.77938
			},
			{
				name: 'Valladolid',
				desc: 'Wo die Geschichte in den Mauern wandelt und die Weinberge die Sinne betören',
				lat: 41.65225,
				lng: -4.72453
			},
			{
				name: 'Vigo',
				desc: 'Die Stadt am Meer, wo der Fischmarkt pulsiert und die Musik in den Gassen spielt',
				lat: 42.2406,
				lng: -8.72073
			},
			{
				name: 'L’Hospitalet de Llobregat',
				desc: 'Eine moderne Stadt, wo das Multikulturelle blüht und die Zukunft gestaltet wird',
				lat: 41.35967,
				lng: 2.10115
			},
			{
				name: 'Gijón',
				desc: 'Wo die Brandung die Küste umspielt und die grünen Hügel zum Wandern einladen',
				lat: 43.5322,
				lng: -5.66112
			},
			{
				name: 'Vitoria-Gasteiz',
				desc: 'Die grüne Stadt, wo die Parks die Atemzüge füllen und die Geschichte die Straßen belebt',
				lat: 42.84662,
				lng: -2.6676
			},
			{
				name: 'A Coruña',
				desc: 'Die Stadt am Ende der Welt, wo der Leuchtturm den Weg weist und die Wellen die Seelen beruhigen',
				lat: 43.37135,
				lng: -8.396
			},
			{
				name: 'Elche',
				desc: 'Wo die Palmen den Himmel küssen und die Geschichte in den maurischen Ruinen verweilt',
				lat: 38.26993,
				lng: -0.71256
			},
			{
				name: 'Granada',
				desc: 'Die Stadt der Alhambra, wo die Berge die Legenden umarmen und die Gassen die Sinne betören',
				lat: 37.17734,
				lng: -3.59856
			},
			{
				name: 'Terrassa',
				desc: 'Eine Stadt der Künste und der Industrie, wo Tradition und Innovation Hand in Hand gehen',
				lat: 41.5662,
				lng: 2.00884
			},
			{
				name: 'Badalona',
				desc: 'Wo das Meer die Stadt umarmt und die Geschichte in den Mauern lebt',
				lat: 41.45004,
				lng: 2.24741
			},
			{
				name: 'Cartagena',
				desc: 'Die Stadt am Meer, wo die Geschichte in den alten Mauern ruht und die Küste die Sinne erfrischt',
				lat: 37.62568,
				lng: -0.99658
			},
			{
				name: 'Sabadell',
				desc: 'Wo die Industrie das Herz bildet und die Kultur die Seele belebt',
				lat: 41.54329,
				lng: 2.10942
			},
			{
				name: 'Oviedo',
				desc: 'Die Stadt der Pilger, wo die Berge die Sinne betören und die Tradition in jeder Ecke lebt',
				lat: 43.36191,
				lng: -5.84939
			},
			{
				name: 'Jerez de la Frontera',
				desc: 'Die Stadt des Sherrys und des Flamenco, wo die Kultur die Straßen erfüllt und die Sonne die Herzen erwärmt',
				lat: 36.68501,
				lng: -6.12655
			},
			{
				name: 'Móstoles',
				desc: 'Eine Stadt der Vielfalt, wo das Leben in den Straßen pulsiert und die Träume hoch fliegen',
				lat: 40.32234,
				lng: -3.86496
			},
			{
				name: 'Santa Cruz de Tenerife',
				desc: 'Wo die Palmen im Wind tanzen und das Meer die Seele beruhigt',
				lat: 28.46363,
				lng: -16.25185
			},
			{
				name: 'Pamplona',
				desc: 'Die Stadt der Stiere und der Festivals, wo Tradition und Adrenalin Hand in Hand gehen',
				lat: 42.81253,
				lng: -1.64577
			},
			{
				name: 'Almería',
				desc: 'Wo die Wüste das Meer umarmt und die Sonne das Land verzaubert',
				lat: 36.83814,
				lng: -2.45974
			},
			{
				name: 'Alcalá de Henares',
				desc: 'Die Stadt von Cervantes, wo die Geschichte in den Gassen wandelt und die Literatur die Luft füllt',
				lat: 40.48198,
				lng: -3.36354
			},
			{
				name: 'Leganes',
				desc: 'Eine Stadt der Kultur und der Vielfalt, wo die Träume wahr werden und die Gemeinschaft stark ist',
				lat: 40.3318,
				lng: -3.76891
			},
			{
				name: 'Fuenlabrada',
				desc: 'Wo die Stadt das Herz bildet und die Zukunft gestaltet wird',
				lat: 40.28345,
				lng: -3.79417
			},
			{
				name: 'Donostia-San Sebastián',
				desc: 'Die Perle des Baskenlandes, wo die Berge das Meer umarmen und die Pintxos die Gaumen erfreuen',
				lat: 43.31833,
				lng: -1.98123
			},
			{
				name: 'Getafe',
				desc: 'Eine Stadt der Innovation und des Fortschritts, wo die Zukunft gestaltet wird und die Träume fliegen',
				lat: 40.30825,
				lng: -3.73239
			},
			{
				name: 'Castellón de la Plana',
				desc: 'Wo die Strände die Küste säumen und die Geschichte in den Straßen wandelt',
				lat: 39.98636,
				lng: -0.05132
			},
			{
				name: 'Burgos',
				desc: 'Die Stadt der Kathedralen, wo die Geschichte in den Steinen verewigt ist und die Kultur in den Gassen pulsiert',
				lat: 42.34087,
				lng: -3.69973
			},
			{
				name: 'Albacete',
				desc: 'Wo die Landschaft die Sinne berührt und die Tradition in den Herzen lebt',
				lat: 38.99435,
				lng: -1.85613
			},
			{
				name: 'Alcorcón',
				desc: 'Eine moderne Stadt, wo das Leben in den Straßen pulsiert und die Zukunft gestaltet wird',
				lat: 40.34585,
				lng: -3.8249
			},
			{
				name: 'Santander',
				desc: 'Die Stadt am Meer, wo die Berge den Horizont umarmen und die Geschichte in den Wellen ruht',
				lat: 43.46231,
				lng: -3.80998
			},
			{
				name: 'San Cristóbal de La Laguna',
				desc: 'Eine UNESCO-Weltkulturerbestadt, wo die Geschichte in den Straßen wandelt und die Kultur die Herzen erwärmt',
				lat: 28.4853,
				lng: -16.32014
			},
			{
				name: 'Marbella',
				desc: 'Die Stadt des Luxus und der Sonne, wo die Promenaden die Schönen und Reichen begeistern',
				lat: 36.51543,
				lng: -4.88583
			},
			{
				name: 'Badajoz',
				desc: 'Wo die Festungen die Geschichte erzählen und die Gastronomie die Sinne verwöhnt',
				lat: 38.87861,
				lng: -6.97034
			},
			{
				name: 'Logroño',
				desc: 'Die Stadt des Weins, wo die Rioja die Herzen erwärmt und die Tapas die Gaumen erfreuen',
				lat: 42.46667,
				lng: -2.45
			},
			{
				name: 'Salamanca',
				desc: 'Die Stadt der Studenten, wo die Geschichte in den Mauern verewigt ist und die Kultur die Sinne erfüllt',
				lat: 40.96449,
				lng: -5.6631
			},
			{
				name: 'Lleida',
				desc: 'Wo die Pyrenäen den Horizont umarmen und die Geschichte in den Steinen verewigt ist',
				lat: 41.61476,
				lng: 0.62687
			},
			{
				name: 'Huelva',
				desc: 'Die Stadt am Meer, wo die Geschichte in den Schiffen ruht und die Natur die Sinne erfreut',
				lat: 37.26615,
				lng: -6.94019
			},
			{
				name: 'Dos Hermanas',
				desc: 'Wo die Tradition die Familie stärkt und die Moderne die Zukunft gestaltet',
				lat: 37.28658,
				lng: -5.92424
			},
			{
				name: 'Tarragona',
				desc: 'Die Stadt der antiken Geschichte, wo das Römische Erbe die Straßen belebt und das Mittelmeer die Seelen beruhigt',
				lat: 41.11888,
				lng: 1.2455
			},
			{
				name: 'Torrejón de Ardoz',
				desc: 'Eine Stadt voller Leben und Farben, wo die Feste die Straßen erfüllen und die Träume fliegen',
				lat: 40.45662,
				lng: -3.47636
			},
			{
				name: 'Parla',
				desc: 'Wo die Vielfalt die Stadt prägt und die Gemeinschaft die Herzen erwärmt',
				lat: 40.23237,
				lng: -3.76891
			},
			{
				name: 'Mataró',
				desc: 'Die Stadt am Meer, wo die Tradition in den Schiffen ruht und die Moderne in den Straßen lebt',
				lat: 41.54098,
				lng: 2.44448
			},
			{
				name: 'Algeciras',
				desc: 'Wo Europa Afrika begegnet und die Straße von Gibraltar die Kulturen verbindet',
				lat: 36.13326,
				lng: -5.45051
			},
			{
				name: 'León',
				desc: 'Die Stadt der Kathedralen, wo die Geschichte in den Steinen verewigt ist und die Kultur die Sinne erfüllt',
				lat: 42.59981,
				lng: -5.5717
			},
			{
				name: 'Alcobendas',
				desc: 'Eine moderne Stadt, wo das Leben in den Straßen pulsiert und die Zukunft gestaltet wird',
				lat: 40.54751,
				lng: -3.64197
			},
			{
				name: 'Santa Coloma de Gramanet',
				desc: 'Wo die Moderne die Tradition umarmt und die Gemeinschaft die Herzen erwärmt',
				lat: 41.45004,
				lng: 2.21188
			},
			{
				name: 'Cádiz',
				desc: 'Die älteste Stadt im Westen, wo die Geschichte in den Mauern wandelt und das Meer die Sinne beruhigt',
				lat: 36.52706,
				lng: -6.2886
			},
			{
				name: 'Jaén',
				desc: 'Wo die Oliven die Landschaft prägen und die Geschichte in den Hügeln verweilt',
				lat: 37.77959,
				lng: -3.78491
			},
			{
				name: 'Reus',
				desc: 'Die Stadt des modernenismus, wo die Kunst in den Straßen wandelt und die Geschichte in den Gassen lebt',
				lat: 41.15612,
				lng: 1.10687
			},
			{
				name: 'Roquetas de Mar',
				desc: 'Die Stadt am Meer, wo die Strände den Horizont säumen und die Sonne die Seelen erwärmt',
				lat: 36.74987,
				lng: -2.614
			},
			{
				name: 'Ourense',
				desc: 'Wo die Thermalquellen die Sinne erfreuen und die Geschichte in den Straßen wandelt',
				lat: 42.3367,
				lng: -7.8631
			},
			{
				name: 'Girona',
				desc: 'Die Stadt der Blumen und der Legenden, wo die Geschichte in den Gassen lebt und die Kultur die Sinne erfüllt',
				lat: 41.9794,
				lng: 2.8214
			},
			{
				name: 'Telde',
				desc: 'Eine Stadt voller Geschichte und Tradition, wo die Vulkanlandschaft die Sinne berührt und die Kultur die Herzen erwärmt',
				lat: 27.99441,
				lng: -15.41645
			},
			{
				name: 'Barakaldo',
				desc: 'Wo die Industrie das Leben prägt und die Gemeinschaft die Zukunft gestaltet',
				lat: 43.29876,
				lng: -2.9851
			},
			{
				name: 'Rivas-Vaciamadrid',
				desc: 'Eine grüne Stadt, wo die Natur die Seele berührt und die Zukunft gestaltet wird',
				lat: 40.33292,
				lng: -3.51848
			}
		]
	},
	italy100k: {
		name: 'Großstädte Italiens',
		aiGenerated: true,
		values: [
			{
				name: 'Rom',
				desc: 'Die ewige Stadt, wo Geschichte in jedem Stein liegt und Kunst die Luft erfüllt',
				lat: 41.90278,
				lng: 12.49636
			},
			{
				name: 'Mailand',
				desc: 'Die Modehauptstadt, wo Stil in den Straßen lebt und Innovation in der Luft liegt',
				lat: 45.46427,
				lng: 9.18951
			},
			{
				name: 'Neapel',
				desc: 'Die Stadt der Leidenschaft, wo die Sonne das Herz erwärmt und das Meer die Seele berührt',
				lat: 40.85177,
				lng: 14.26812
			},
			{
				name: 'Turin',
				desc: 'Die königliche Stadt, wo die Alpen den Horizont säumen und die Schokolade die Sinne verwöhnt',
				lat: 45.07049,
				lng: 7.68682
			},
			{
				name: 'Palermo',
				desc: 'Die Stadt der Kontraste, wo die Geschichte in den Gassen wandelt und das Meer die Träume segelt',
				lat: 38.11569,
				lng: 13.36141
			},
			{
				name: 'Genua',
				desc: 'Die Hafenstadt, wo die Geschichte in den Palästen ruht und die Ligurische Küste die Sinne berührt',
				lat: 44.40564,
				lng: 8.94625
			},
			{
				name: 'Bologna',
				desc: 'Die Stadt der Türme, wo die Kulinarik die Herzen erfreut und die Universität die Geister beflügelt',
				lat: 44.49419,
				lng: 11.34652
			},
			{
				name: 'Florenz',
				desc: 'Die Wiege der Renaissance, wo die Kunst in den Palästen lebt und die Geschichte die Sinne erfüllt',
				lat: 43.76956,
				lng: 11.25581
			},
			{
				name: 'Bari',
				desc: 'Wo das Mittelmeer die Stadt umarmt und die Geschichte in den Gassen wandelt',
				lat: 41.11714,
				lng: 16.87187
			},
			{
				name: 'Catania',
				desc: 'Die Stadt am Fuße des Ätna, wo die Geschichte in den Mauern ruht und die Sonne die Seelen erwärmt',
				lat: 37.50213,
				lng: 15.08719
			},
			{
				name: 'Verona',
				desc: 'Die Stadt von Romeo und Julia, wo die Liebe in der Luft liegt und die Geschichte in den Steinen verweilt',
				lat: 45.43838,
				lng: 10.99162
			},
			{
				name: 'Venedig',
				desc: 'Die Stadt der Kanäle, wo die Gondeln die Straßen ersetzen und die Geschichte in jeder Ecke lebt',
				lat: 45.44084,
				lng: 12.31552
			},
			{
				name: 'Messina',
				desc: 'Die Stadt am Meer, wo die Straße von Messina die Kulturen verbindet und die Geschichte die Seelen berührt',
				lat: 38.19375,
				lng: 15.55572
			},
			{
				name: 'Padua',
				desc: 'Die Stadt der Fresken und der Gelehrsamkeit, wo die Universität die Köpfe beflügelt und die Kunst die Sinne erfüllt',
				lat: 45.40643,
				lng: 11.87676
			},
			{
				name: 'Triest',
				desc: 'Die Stadt am Meer, wo die Geschichte in den Häfen ruht und die Kultur die Sinne berührt',
				lat: 45.64953,
				lng: 13.77682
			},
			{
				name: 'Brescia',
				desc: 'Die Stadt der Römer, wo die Geschichte in den Ruinen wandelt und die Moderne in den Straßen lebt',
				lat: 45.53983,
				lng: 10.22296
			},
			{
				name: 'Parma',
				desc: 'Wo der Käse die Sinne betört und die Oper die Herzen erwärmt',
				lat: 44.80148,
				lng: 10.32852
			},
			{
				name: 'Prato',
				desc: 'Die Textilstadt, wo Tradition in den Webstühlen liegt und Innovation in den Fabriken blüht',
				lat: 43.8805,
				lng: 11.09602
			},
			{
				name: 'Tarent',
				desc: 'Die Stadt am Ionischen Meer, wo die antike Geschichte in den Ruinen ruht und die Sonne die Sinne erwärmt',
				lat: 40.47818,
				lng: 17.24014
			},
			{
				name: 'Modena',
				desc: 'Wo die Motoren brüllen und die Balsamico-Essige die Sinne betören',
				lat: 44.64713,
				lng: 10.92505
			},
			{
				name: 'Reggio Calabria',
				desc: 'Die Stadt am Fuße des Aspromonte, wo die Geschichte in den Museen ruht und das Meer die Seele beruhigt',
				lat: 38.11048,
				lng: 15.65118
			},
			{
				name: 'Reggio nell’Emilia',
				desc: 'Die Stadt der Kartoffel, wo die Landwirtschaft die Tradition prägt und die Moderne die Zukunft gestaltet',
				lat: 44.69825,
				lng: 10.63039
			},
			{
				name: 'Perugia',
				desc: 'Die Stadt der Kunst und des Jazz, wo die Etrusker die Geschichte prägten und die Kultur die Sinne beflügelt',
				lat: 43.11072,
				lng: 12.38992
			},
			{
				name: 'Ravenna',
				desc: 'Die Stadt der Mosaiken, wo die Geschichte in den Kirchen ruht und die Kunst die Herzen erfüllt',
				lat: 44.41836,
				lng: 12.20353
			},
			{
				name: 'Livorno',
				desc: 'Die Hafenstadt, wo das Meer die Stadt umarmt und die Geschichte in den Mauern lebt',
				lat: 43.54847,
				lng: 10.31057
			},
			{
				name: 'Rimini',
				desc: 'Die Stadt am Meer, wo die Geschichte in den Ruinen wandelt und die Sonne die Seelen erwärmt',
				lat: 44.05739,
				lng: 12.56348
			},
			{
				name: 'Cagliari',
				desc: 'Die Stadt der Sonne, wo die Küste die Träume segelt und die Geschichte in den Straßen lebt',
				lat: 39.22384,
				lng: 9.12166
			},
			{
				name: 'Foggia',
				desc: 'Wo das Meer die Küste umarmt und die Geschichte in den Feldern ruht',
				lat: 41.46226,
				lng: 15.54437
			},
			{
				name: 'Ferrara',
				desc: 'Die Stadt der Renaissance, wo die Geschichte in den Palästen ruht und die Kultur die Sinne erfüllt',
				lat: 44.83737,
				lng: 11.62182
			},
			{
				name: 'Salerno',
				desc: 'Die Stadt am Tyrrhenischen Meer, wo die Geschichte in den Ruinen wandelt und die Küste die Seelen berührt',
				lat: 40.68042,
				lng: 14.76513
			},
			{
				name: 'Latina',
				desc: 'Wo die Moderne das Land prägt und die Landwirtschaft die Sinne verwöhnt',
				lat: 41.46739,
				lng: 12.9036
			},
			{
				name: 'Giugliano in Campania',
				desc: 'Die Stadt der Olivenhaine und der Geschichte, wo die Tradition die Sinne verwöhnt und die Moderne die Zukunft gestaltet',
				lat: 40.92707,
				lng: 14.19544
			},
			{
				name: 'Sassari',
				desc: 'Die Stadt im Nordwesten Sardiniens, wo die Tradition die Geschichte prägt und das Meer die Träume segelt',
				lat: 40.72618,
				lng: 8.55925
			},
			{
				name: 'Monza',
				desc: 'Die Stadt der Rennstrecken, wo die Motoren brüllen und die Geschichte in den Palästen ruht',
				lat: 45.58224,
				lng: 9.27445
			},
			{
				name: 'Bergamo',
				desc: 'Die Stadt der Kontraste, wo die Altstadt die Moderne umarmt und die Alpen den Horizont säumen',
				lat: 45.69826,
				lng: 9.67727
			},
			{
				name: 'Pescara',
				desc: 'Die Stadt am Adriatischen Meer, wo die Küste die Seelen berührt und die Geschichte in den Straßen lebt',
				lat: 42.46128,
				lng: 14.20965
			},
			{
				name: 'Trient',
				desc: 'Die Stadt der Dolomiten, wo die Berge den Horizont umarmen und die Geschichte in den Mauern wandelt',
				lat: 46.06787,
				lng: 11.12108
			},
			{
				name: 'Syrakus',
				desc: 'Die Stadt der antiken Wunder, wo die Geschichte in den Ruinen lebt und das Mittelmeer die Seelen beruhigt',
				lat: 37.07555,
				lng: 15.28659
			},
			{
				name: 'Forlì',
				desc: 'Wo die Kunst die Sinne betört und die Geschichte in den Gassen wandelt',
				lat: 44.22214,
				lng: 12.04034
			},
			{
				name: 'Vicenza',
				desc: 'Die Stadt der Architektur und des Palladio, wo die Kunst in den Palästen lebt und die Geschichte die Sinne erfüllt',
				lat: 45.54751,
				lng: 11.54689
			},
			{
				name: 'Terni',
				desc: 'Die Stadt am Fluss, wo die Industrie das Leben prägt und die Geschichte in den Mauern lebt',
				lat: 42.56705,
				lng: 12.6499
			},
			{
				name: 'Bozen',
				desc: 'Die Stadt der Berge und der Kultur, wo die Dolomiten den Horizont säumen und die Tradition in den Gassen lebt',
				lat: 46.49835,
				lng: 11.35473
			},
			{
				name: 'Piacenza',
				desc: 'Die Stadt am Fluss, wo die Geschichte in den Kirchen ruht und die Kulinarik die Sinne verwöhnt',
				lat: 45.04663,
				lng: 9.69904
			},
			{
				name: 'Novara',
				desc: 'Die Stadt der Türme und der Geschichte, wo die Piazza die Herzen erfüllt und die Kultur die Sinne beflügelt',
				lat: 45.4459,
				lng: 8.62143
			}
		]
	},
	canada100k: {
		name: 'Großstädte Kanadas',
		aiGenerated: true,
		values: [
			{
				name: 'Toronto',
				desc: 'Die kosmopolitische Metropole, wo Vielfalt die Straßen erfüllt und Kultur die Herzen berührt',
				lat: 43.65107,
				lng: -79.34702
			},
			{
				name: 'Montreal',
				desc: 'Die kulturelle Hauptstadt, wo das Französische die Sinne betört und die Geschichte in den Straßen wandelt',
				lat: 45.50884,
				lng: -73.58781
			},
			{
				name: 'Vancouver',
				desc: 'Die Stadt am Pazifik, wo die Berge den Horizont umarmen und die Vielfalt die Sinne erfreut',
				lat: 49.28273,
				lng: -123.12073
			},
			{
				name: 'Calgary',
				desc: 'Die Stadt der Cowboys, wo die Rockies den Horizont säumen und die Energie die Straßen erfüllt',
				lat: 51.05011,
				lng: -114.08529
			},
			{
				name: 'Edmonton',
				desc: 'Die Stadt am North Saskatchewan River, wo die Natur die Seele berührt und die Kultur die Herzen erfüllt',
				lat: 53.54504,
				lng: -113.4909
			},
			{
				name: 'Ottawa – Gatineau',
				desc: 'Die Hauptstadt am Fluss, wo Geschichte in den Gebäuden ruht und die Natur die Seele berührt',
				lat: 45.42153,
				lng: -75.69719
			},
			{
				name: 'Winnipeg',
				desc: 'Die Stadt der Seen, wo die Prärie den Horizont säumt und die Kultur die Herzen erwärmt',
				lat: 49.89514,
				lng: -97.13837
			},
			{
				name: 'Québec',
				desc: 'Die europäische Stadt in Nordamerika, wo das Französische die Straßen füllt und die Geschichte die Seelen berührt',
				lat: 46.81388,
				lng: -71.20798
			},
			{
				name: 'Hamilton',
				desc: 'Die Stadt am Ontariosee, wo die Industrie das Leben prägt und die Kultur die Herzen erwärmt',
				lat: 43.25608,
				lng: -79.87286
			},
			{
				name: 'Kitchener',
				desc: 'Die Stadt der Innovation, wo die Zukunft gestaltet wird und die Gemeinschaft die Herzen erwärmt',
				lat: 43.45164,
				lng: -80.49222
			},
			{
				name: 'London',
				desc: 'Die Stadt am Fluss, wo Tradition und Moderne Hand in Hand gehen und die Kultur die Sinne beflügelt',
				lat: 51.50735,
				lng: -0.12776
			},
			{
				name: 'Victoria',
				desc: 'Die königliche Stadt, wo die Blumen blühen und die Geschichte in den Straßen wandelt',
				lat: 48.42842,
				lng: -123.36564
			},
			{
				name: 'Halifax',
				desc: 'Die Stadt am Atlantik, wo die Wellen die Küste säumen und die Geschichte in den Häfen ruht',
				lat: 44.64886,
				lng: -63.57532
			},
			{
				name: 'Oshawa',
				desc: 'Die Stadt der Autoproduktion, wo Innovation in den Fabriken liegt und die Zukunft auf den Straßen fährt',
				lat: 43.89709,
				lng: -78.86579
			},
			{
				name: 'Windsor',
				desc: 'Die Stadt am Ufer des Michigansees, wo die Geschichte in den Fabriken ruht und die Zukunft in den Straßen lebt',
				lat: 42.30165,
				lng: -83.03074
			},
			{
				name: 'Saskatoon',
				desc: 'Die Stadt am South Saskatchewan River, wo die Prärie den Horizont säumt und die Kultur die Herzen erwärmt',
				lat: 52.1318,
				lng: -106.66047
			},
			{
				name: 'Saint Catharines – Niagara',
				desc: 'Die Stadt am Wellandkanal, wo die Weinberge die Landschaft prägen und die Wasserfälle die Sinne berühren',
				lat: 43.1594,
				lng: -79.24686
			},
			{
				name: 'Regina',
				desc: 'Die Stadt der Prärien, wo der Himmel endlos ist und die Gemeinschaft stark ist',
				lat: 50.44521,
				lng: -104.6189
			},
			{
				name: 'Saint John’s',
				desc: 'Die Stadt am Atlantik, wo die Felsen die Küste säumen und die Geschichte in den Häfen ruht',
				lat: 47.56151,
				lng: -52.71257
			},
			{
				name: 'Kelowna',
				desc: 'Die Stadt am Okanagansee, wo die Weinberge die Hügel säumen und die Natur die Sinne berührt',
				lat: 49.88795,
				lng: -119.49601
			},
			{
				name: 'Barrie',
				desc: 'Die Stadt am Kempenfelt Bay, wo die Seen die Natur umarmen und die Gemeinschaft die Herzen erwärmt',
				lat: 44.38936,
				lng: -79.69033
			},
			{
				name: 'Sherbrooke',
				desc: 'Die Stadt der Natur, wo die Wälder die Stadt umarmen und die Kultur die Sinne berührt',
				lat: 45.40008,
				lng: -71.89831
			},
			{
				name: 'Guelph',
				desc: 'Die Stadt der Bildung, wo die Universität die Köpfe beflügelt und die Natur die Seelen berührt',
				lat: 43.54635,
				lng: -80.25055
			},
			{
				name: 'Kanata',
				desc: 'Wo die Natur die Stadt umarmt und die Gemeinschaft die Zukunft gestaltet',
				lat: 45.34076,
				lng: -75.919
			},
			{
				name: 'Abbotsford',
				desc: 'Die Stadt am Fraser River, wo die Berge den Horizont säumen und die Gemeinschaft die Herzen erwärmt',
				lat: 49.0568,
				lng: -122.28553
			},
			{
				name: 'Trois-Rivières',
				desc: 'Die Stadt am St.-Lorenz-Strom, wo die Geschichte in den Mauern ruht und die Kultur die Sinne berührt',
				lat: 46.34515,
				lng: -72.5477
			},
			{
				name: 'Kingston',
				desc: 'Die Stadt am Ontariosee, wo die Geschichte in den Festungen lebt und die Universität die Köpfe beflügelt',
				lat: 44.23117,
				lng: -76.48595
			},
			{
				name: 'Milton',
				desc: 'Wo die Natur die Stadt umarmt und die Gemeinschaft die Zukunft gestaltet',
				lat: 43.51681,
				lng: -79.88296
			},
			{
				name: 'Moncton',
				desc: 'Die Stadt am Petitcodiac River, wo die Gezeiten die Küste säumen und die Geschichte in den Straßen wandelt',
				lat: 46.08782,
				lng: -64.77823
			},
			{
				name: 'White Rock',
				desc: 'Die Stadt am Pazifik, wo die Küste den Horizont säumt und die Gemeinschaft die Herzen erwärmt',
				lat: 49.02531,
				lng: -122.80292
			},
			{
				name: 'Nanaimo',
				desc: 'Die Stadt am Meer, wo die Geschichte in den Häfen ruht und die Natur die Sinne berührt',
				lat: 49.16588,
				lng: -123.94006
			},
			{
				name: 'Brantford',
				desc: 'Die Stadt am Grand River, wo die Geschichte in den Museen lebt und die Gemeinschaft die Zukunft gestaltet',
				lat: 43.13939,
				lng: -80.26442
			},
			{
				name: 'Chicoutimi – Jonquière',
				desc: 'Die Stadt am Saguenay River, wo die Natur die Stadt umarmt und die Kultur die Seelen erwärmt',
				lat: 48.41755,
				lng: -71.09194
			},
			{
				name: 'Saint-Jérôme',
				desc: 'Die Stadt am Rivière du Nord, wo die Berge den Horizont säumen und die Gemeinschaft die Zukunft gestaltet',
				lat: 45.78036,
				lng: -74.00284
			}
		]
	},
	vietnam100k: {
		name: 'Großstädte Vietnams',
		aiGenerated: true,
		values: [
			{
				name: 'Biên Hòa',
				desc: 'Die Stadt am Đồng Nai Fluss, wo die Industrie das Leben prägt und die Kultur die Herzen erwärmt',
				lat: 10.94472,
				lng: 106.82431
			},
			{
				name: 'Thuận An',
				desc: 'Die Stadt am Sông Sài Gòn, wo die Moderne Hand in Hand mit der Tradition geht und die Gemeinschaft die Zukunft gestaltet',
				lat: 10.8966,
				lng: 106.7291
			},
			{
				name: 'Dĩ An',
				desc: 'Wo die Stadt aufblüht und die Zukunft gestaltet wird',
				lat: 10.90679,
				lng: 106.75024
			},
			{
				name: 'Nha Trang',
				desc: 'Die Perle des Ostens, wo das Meer die Küste säumt und die Geschichte in den Tempeln ruht',
				lat: 12.23879,
				lng: 109.19675
			},
			{
				name: 'Buôn Ma Thuột',
				desc: 'Die Stadt der Kaffeeplantagen, wo die Natur die Seele berührt und die Kultur die Sinne beflügelt',
				lat: 12.66747,
				lng: 108.03775
			},
			{
				name: 'Thanh Hóa',
				desc: 'Die Stadt am Ma-Fluss, wo die Geschichte in den Tempeln ruht und die Kultur die Herzen erwärmt',
				lat: 19.80498,
				lng: 105.77669
			},
			{
				name: 'Vũng Tàu',
				desc: 'Die Stadt am Meer, wo die Wellen die Küste säumen und die Geschichte in den Festungen lebt',
				lat: 10.34599,
				lng: 107.08426
			},
			{
				name: 'Huế',
				desc: 'Die kaiserliche Stadt, wo die Geschichte in den Palästen ruht und die Kultur die Herzen berührt',
				lat: 16.46371,
				lng: 107.58465
			},
			{
				name: 'Thái Nguyên',
				desc: 'Die Stadt der Industrie, wo die Fabriken die Landschaft prägen und die Gemeinschaft die Zukunft gestaltet',
				lat: 21.59422,
				lng: 105.84817
			},
			{
				name: 'Vinh',
				desc: 'Die Stadt am Lam-Fluss, wo die Geschichte in den Tempeln ruht und die Kultur die Sinne berührt',
				lat: 18.67337,
				lng: 105.69232
			},
			{
				name: 'Thủ Dầu Một',
				desc: 'Die Stadt des Handels, wo die Märkte die Straßen füllen und die Gemeinschaft die Herzen erwärmt',
				lat: 10.97895,
				lng: 106.65404
			},
			{
				name: 'Quy Nhơn',
				desc: 'Die Stadt am Meer, wo die Wellen die Küste säumen und die Geschichte in den Tempeln ruht',
				lat: 13.77365,
				lng: 109.22196
			},
			{
				name: 'Long Xuyên',
				desc: 'Die Stadt am Hậu-Fluss, wo die Schwimmenden Märkte die Straßen füllen und die Natur die Seelen berührt',
				lat: 10.3867,
				lng: 105.43576
			},
			{
				name: 'Hạ Long',
				desc: 'Die Bucht der aufsteigenden Drachen, wo die Karstfelsen den Horizont säumen und die Kultur die Herzen berührt',
				lat: 20.91005,
				lng: 107.1839
			},
			{
				name: 'Quảng Ngãi',
				desc: 'Die Stadt am Sông Trà Khúc, wo die Geschichte in den Tempeln ruht und die Kultur die Sinne berührt',
				lat: 15.11856,
				lng: 108.80476
			},
			{
				name: 'Pleiku',
				desc: 'Die Stadt in den Zentralen Hochländern, wo die Berge den Horizont säumen und die Gemeinschaft die Zukunft gestaltet',
				lat: 13.98329,
				lng: 108.00287
			},
			{
				name: 'Bắc Ninh',
				desc: 'Die Stadt der Tempel, wo die Geschichte in den Pagoden ruht und die Kultur die Herzen berührt',
				lat: 21.18643,
				lng: 106.06352
			},
			{
				name: 'Hải Dương',
				desc: 'Die Stadt am Cái-Fluss, wo die Industrie das Leben prägt und die Kultur die Herzen erwärmt',
				lat: 20.94092,
				lng: 106.33139
			},
			{
				name: 'Nam Định',
				desc: 'Die Stadt am Roten Fluss, wo die Tradition die Straßen füllt und die Kultur die Seelen berührt',
				lat: 20.42885,
				lng: 106.16293
			},
			{
				name: 'Mỹ Tho',
				desc: 'Die Stadt am Mekong, wo die Flüsse die Küste säumen und die Kultur die Herzen erwärmt',
				lat: 10.36002,
				lng: 106.35997
			},
			{
				name: 'Rạch Giá',
				desc: 'Die Stadt am Golf von Thailand, wo die Küste die Seelen berührt und die Kultur die Herzen erwärmt',
				lat: 10.01665,
				lng: 105.081
			},
			{
				name: 'Phan Thiết',
				desc: 'Die Stadt am Meer, wo die Dünen den Horizont säumen und die Küste die Seelen berührt',
				lat: 10.92902,
				lng: 108.06332
			},
			{
				name: 'Đà Lạt',
				desc: 'Die Stadt des ewigen Frühlings, wo die Blumen blühen und die Berge den Horizont säumen',
				lat: 11.94542,
				lng: 108.44193
			},
			{
				name: 'Cà Mau',
				desc: 'Die Stadt am Südlichen Punkt, wo die Küste die Seelen berührt und die Natur die Sinne erfüllt',
				lat: 9.177,
				lng: 105.1501
			},
			{
				name: 'Việt Trì',
				desc: 'Die Stadt am Roten Fluss, wo die Tradition die Straßen füllt und die Kultur die Herzen erwärmt',
				lat: 21.30195,
				lng: 105.40104
			},
			{
				name: 'Thái Bình',
				desc: 'Die Stadt am Roten Flussdelta, wo die Felder die Landschaft prägen und die Kultur die Seelen berührt',
				lat: 20.45363,
				lng: 106.33769
			},
			{
				name: 'Cẩm Phả',
				desc: 'Die Stadt am Golf von Bắc Bộ, wo die Küste die Seelen berührt und die Gemeinschaft die Zukunft gestaltet',
				lat: 21.01449,
				lng: 107.29252
			},
			{
				name: 'Bắc Giang',
				desc: 'Die Stadt am Kỳ Cùng Fluss, wo die Tradition die Straßen füllt und die Kultur die Herzen erwärmt',
				lat: 21.28192,
				lng: 106.19952
			},
			{
				name: 'Chí Linh',
				desc: 'Die Stadt der Berge, wo die Natur die Stadt umarmt und die Gemeinschaft die Zukunft gestaltet',
				lat: 21.15013,
				lng: 106.39405
			},
			{
				name: 'Kon Tum',
				desc: 'Die Stadt im Hochland, wo die Berge den Horizont säumen und die Kultur die Seelen berührt',
				lat: 14.35446,
				lng: 108.00743
			},
			{
				name: 'Phan Rang-Tháp Chàm',
				desc: 'Die Stadt am Meer, wo die Tempel die Küste säumen und die Geschichte in den Ruinen lebt',
				lat: 11.56623,
				lng: 108.98392
			},
			{
				name: 'Cao Lãnh',
				desc: 'Die Stadt am Mekong-Delta, wo die Flüsse die Landschaft prägen und die Kultur die Sinne berührt',
				lat: 10.4632,
				lng: 105.62747
			},
			{
				name: 'Bảo Lộc',
				desc: 'Die Stadt am Tân Uyên Fluss, wo die Berge den Horizont säumen und die Gemeinschaft die Zukunft gestaltet',
				lat: 11.54678,
				lng: 107.80973
			},
			{
				name: 'Phủ Lý',
				desc: 'Die Stadt am Roten Fluss, wo die Geschichte in den Tempeln ruht und die Kultur die Herzen erwärmt',
				lat: 20.54182,
				lng: 105.91318
			},
			{
				name: 'Bạc Liêu',
				desc: 'Die Stadt am Hậu-Flussdelta, wo die Küste die Seelen berührt und die Kultur die Herzen erwärmt',
				lat: 9.285,
				lng: 105.724
			},
			{
				name: 'Tuy Hòa',
				desc: 'Die Stadt am Đà Rằng Fluss, wo die Natur die Stadt umarmt und die Gemeinschaft die Zukunft gestaltet',
				lat: 13.08844,
				lng: 109.11228
			},
			{
				name: 'Long Khánh',
				desc: 'Die Stadt am Đồng Nai Fluss, wo die Industrie das Leben prägt und die Gemeinschaft die Zukunft gestaltet',
				lat: 10.94037,
				lng: 107.23206
			},
			{
				name: 'Tân An',
				desc: 'Die Stadt am Vàm Cỏ Tay Fluss, wo die Felder die Landschaft prägen und die Kultur die Herzen erwärmt',
				lat: 10.53343,
				lng: 106.41257
			},
			{
				name: 'Vĩnh Long',
				desc: 'Die Stadt am Cửu Long Fluss, wo die Tradition die Straßen füllt und die Kultur die Herzen erwärmt',
				lat: 10.25321,
				lng: 105.972
			},
			{
				name: 'Sóc Trăng',
				desc: 'Die Stadt am Sông Phung Hiep, wo die Schwimmenden Märkte die Straßen füllen und die Kultur die Sinne berührt',
				lat: 9.60358,
				lng: 105.98052
			},
			{
				name: 'Tây Ninh',
				desc: 'Die Stadt der Tempel, wo die Geschichte in den Pagoden ruht und die Kultur die Herzen berührt',
				lat: 11.30101,
				lng: 106.10089
			},
			{
				name: 'Đồng Hới',
				desc: 'Die Stadt am Nhật Lệ Fluss, wo die Geschichte in den Tempeln ruht und die Kultur die Herzen erwärmt',
				lat: 17.48333,
				lng: 106.6
			},
			{
				name: 'Cam Ranh',
				desc: 'Die Stadt am Cam-Ranh-Bucht, wo die Küste die Seelen berührt und die Natur die Sinne erfüllt',
				lat: 11.92019,
				lng: 109.15835
			},
			{
				name: 'Ninh Bình',
				desc: 'Die Stadt am Roten Fluss, wo die Kalksteinfelsen den Horizont säumen und die Natur die Seelen berührt',
				lat: 20.25298,
				lng: 105.97503
			},
			{
				name: 'Lào Cai',
				desc: 'Die Stadt am Rote Fluss, wo die Berge den Horizont säumen und die Gemeinschaft die Zukunft gestaltet',
				lat: 22.4853,
				lng: 103.97066
			},
			{
				name: 'Bến Tre',
				desc: 'Die Stadt am Tiền Fluss, wo die Kokospalmen die Landschaft prägen und die Gemeinschaft die Zukunft gestaltet',
				lat: 10.23503,
				lng: 106.37527
			},
			{
				name: 'Tam Kỳ',
				desc: 'Die Stadt am Meer, wo die Strände die Küste säumen und die Gemeinschaft die Zukunft gestaltet',
				lat: 15.57357,
				lng: 108.47448
			},
			{
				name: 'Uông Bí',
				desc: 'Die Stadt am Cửa Lục Fluss, wo die Natur die Stadt umarmt und die Kultur die Seelen berührt',
				lat: 21.03333,
				lng: 106.78333
			},
			{
				name: 'Vĩnh Yên',
				desc: 'Die Stadt am Roten Fluss, wo die Berge den Horizont säumen und die Kultur die Seelen berührt',
				lat: 21.31147,
				lng: 105.59698
			},
			{
				name: 'Hưng Yên',
				desc: 'Die Stadt am Hồng-Flussdelta, wo die Felder die Landschaft prägen und die Gemeinschaft die Zukunft gestaltet',
				lat: 20.64638,
				lng: 106.05108
			},
			{
				name: 'Trà Vinh',
				desc: 'Die Stadt am Mekong-Delta, wo die Schwimmenden Märkte die Straßen füllen und die Kultur die Sinne berührt',
				lat: 9.93497,
				lng: 106.34592
			},
			{
				name: 'Sầm Sơn',
				desc: 'Die Stadt am Meer, wo die Strände die Küste säumen und die Gemeinschaft die Herzen erwärmt',
				lat: 19.72293,
				lng: 105.90814
			},
			{
				name: 'Bà Rịa',
				desc: 'Die Stadt am Cổ Chiên Flussdelta, wo die Küste die Seelen berührt und die Gemeinschaft die Zukunft gestaltet',
				lat: 10.49617,
				lng: 107.16766
			},
			{
				name: 'Đồng Xoài',
				desc: 'Die Stadt der Kautschukplantagen, wo die Natur die Stadt umarmt und die Gemeinschaft die Zukunft gestaltet',
				lat: 11.5349,
				lng: 106.90573
			},
			{
				name: 'Móng Cái',
				desc: 'Die Stadt am Grenzfluss, wo die Küste die Seelen berührt und die Gemeinschaft die Zukunft gestaltet',
				lat: 21.44139,
				lng: 107.97028
			},
			{
				name: 'Sa Đéc',
				desc: 'Die Stadt am Mekong, wo die Blumen blühen und die Schwimmenden Märkte die Straßen füllen',
				lat: 10.29652,
				lng: 105.63739
			},
			{
				name: 'Sơn La',
				desc: 'Die Stadt in den Bergen, wo die Natur die Stadt umarmt und die Gemeinschaft die Zukunft gestaltet',
				lat: 21.32232,
				lng: 103.91014
			},
			{
				name: 'Phúc Yên',
				desc: 'Die Stadt am Đà River, wo die Industrie das Leben prägt und die Gemeinschaft die Zukunft gestaltet',
				lat: 21.28813,
				lng: 105.71784
			},
			{
				name: 'Tuyên Quang',
				desc: 'Die Stadt am Nậm Na Fluss, wo die Berge den Horizont säumen und die Gemeinschaft die Zukunft gestaltet',
				lat: 21.82333,
				lng: 105.21833
			},
			{
				name: 'Hà Tĩnh',
				desc: 'Die Stadt am Südchinesischen Meer, wo die Geschichte in den Tempeln ruht und die Kultur die Seelen berührt',
				lat: 18.34282,
				lng: 105.90569
			},
			{
				name: 'Lạng Sơn',
				desc: 'Die Stadt am Kỳ Cùng Fluss, wo die Berge den Horizont säumen und die Gemeinschaft die Zukunft gestaltet',
				lat: 21.85374,
				lng: 106.76144
			},
			{
				name: 'Châu Đốc',
				desc: 'Die Stadt am Hậu-Flussdelta, wo die Schwimmenden Märkte die Straßen füllen und die Gemeinschaft die Zukunft gestaltet',
				lat: 10.70629,
				lng: 105.11715
			},
			{
				name: 'Hòa Bình',
				desc: 'Die Stadt am Đà River, wo die Berge den Horizont säumen und die Gemeinschaft die Zukunft gestaltet',
				lat: 20.8137,
				lng: 105.33741
			},
			{
				name: 'Yên Bái',
				desc: 'Die Stadt am Roten Fluss, wo die Berge den Horizont säumen und die Gemeinschaft die Zukunft gestaltet',
				lat: 21.72288,
				lng: 104.9119
			}
		]
	},
	usa100k: {
		name: 'Großstädte der USA',
		aiGenerated: true,
		values: [
			{
				name: 'New York City',
				desc: 'Die Stadt, die niemals schläft',
				lat: 40.71278,
				lng: -74.006
			},
			{name: 'Los Angeles', desc: 'Stadt der Engel und Träume', lat: 34.05223, lng: -118.24368},
			{name: 'Chicago', desc: 'Windy City', lat: 41.87811, lng: -87.6298},
			{name: 'Houston', desc: 'Raumfahrtstadt', lat: 29.76043, lng: -95.3698},
			{name: 'Phoenix', desc: 'Wüstenmetropole', lat: 33.44838, lng: -112.07404},
			{name: 'Philadelphia', desc: 'Stadt der brüderlichen Liebe', lat: 39.95258, lng: -75.16522},
			{name: 'San Antonio', desc: 'Alamo City', lat: 29.42412, lng: -98.49363},
			{name: 'San Diego', desc: 'Amerikas feinste Stadt', lat: 32.71571, lng: -117.16109},
			{name: 'Dallas', desc: 'Big D', lat: 32.77627, lng: -96.79688},
			{name: 'San José', desc: 'Silicon Valley Kapital', lat: 37.33865, lng: -121.88556},
			{name: 'Austin', desc: 'Live-Musik Hauptstadt', lat: 30.26715, lng: -97.74306},
			{name: 'Jacksonville', desc: 'Die Jax', lat: 30.33218, lng: -81.65565},
			{name: 'Fort Worth', desc: 'Wo der Westen beginnt', lat: 32.72541, lng: -97.32085},
			{name: 'Columbus', desc: 'Testmarktstadt', lat: 39.96118, lng: -82.99879},
			{name: 'Indianapolis', desc: 'Kreuzung von Amerika', lat: 39.76838, lng: -86.15804},
			{name: 'Charlotte', desc: 'Die Königin Stadt', lat: 35.22709, lng: -80.84313},
			{name: 'San Francisco', desc: 'Die Stadt am Goldenen Tor', lat: 37.77493, lng: -122.41942},
			{name: 'Seattle', desc: 'Emerald City', lat: 47.60621, lng: -122.33207},
			{name: 'Denver', desc: 'Die Mile-High City', lat: 39.73915, lng: -104.9847},
			{name: 'Washington, D.C.', desc: "Nation's Capital", lat: 38.89511, lng: -77.03637},
			{name: 'Nashville', desc: 'Music City', lat: 36.16266, lng: -86.7816},
			{name: 'Oklahoma City', desc: 'OKC', lat: 35.46756, lng: -97.51643},
			{name: 'El Paso', desc: 'Sun City', lat: 31.76188, lng: -106.48502},
			{name: 'Boston', desc: 'Beantown', lat: 42.36008, lng: -71.05888},
			{name: 'Portland', desc: 'Rose City', lat: 45.50511, lng: -122.67503},
			{name: 'Las Vegas', desc: 'Sin City', lat: 36.16994, lng: -115.13983},
			{name: 'Detroit', desc: 'Motor City', lat: 42.33143, lng: -83.04575},
			{name: 'Memphis', desc: 'Blues City', lat: 35.14953, lng: -90.04898},
			{name: 'Louisville', desc: 'Derby City', lat: 38.25266, lng: -85.75846},
			{name: 'Baltimore', desc: 'Charm City', lat: 39.29038, lng: -76.61219},
			{name: 'Milwaukee', desc: 'Brew City', lat: 43.0389, lng: -87.90647},
			{name: 'Albuquerque', desc: 'Duke City', lat: 35.08449, lng: -106.65114},
			{name: 'Tucson', desc: 'Old Pueblo', lat: 32.22261, lng: -110.97471},
			{name: 'Fresno', desc: 'Raisin Capital', lat: 36.73723, lng: -119.78712},
			{name: 'Sacramento', desc: 'City of Trees', lat: 38.58157, lng: -121.4944},
			{name: 'Kansas City', desc: 'Heart of America', lat: 39.09973, lng: -94.57857},
			{name: 'Mesa', desc: 'City of Eternal Sunshine', lat: 33.41511, lng: -111.83148},
			{name: 'Atlanta', desc: 'The ATL', lat: 33.749, lng: -84.38798},
			{name: 'Omaha', desc: 'Gateway to the West', lat: 41.25626, lng: -95.94043},
			{name: 'Colorado Springs', desc: 'Olympic City USA', lat: 38.83388, lng: -104.82136},
			{name: 'Raleigh', desc: 'City of Oaks', lat: 35.77959, lng: -78.63818},
			{name: 'Long Beach', desc: 'Aloha City', lat: 33.77005, lng: -118.19374},
			{name: 'Virginia Beach', desc: 'Resort City', lat: 36.85293, lng: -75.97799},
			{name: 'Miami', desc: 'Magic City', lat: 25.76168, lng: -80.19179},
			{name: 'Oakland', desc: 'The Town', lat: 37.80436, lng: -122.27111},
			{name: 'Minneapolis', desc: 'City of Lakes', lat: 44.97795, lng: -93.26772},
			{name: 'Tulsa', desc: 'Oil Capital of the World', lat: 36.15398, lng: -95.99277},
			{name: 'Bakersfield', desc: 'Country Music Capital', lat: 35.37329, lng: -119.01871},
			{name: 'Wichita', desc: 'Air Capital of the World', lat: 37.69224, lng: -97.33754},
			{name: 'Arlington', desc: 'Entertainment Capital of Texas', lat: 32.73569, lng: -97.10807},
			{name: 'Aurora', desc: 'Gateway to the Rockies', lat: 39.72943, lng: -104.83192},
			{name: 'Tampa', desc: 'Cigar City', lat: 27.95058, lng: -82.45718},
			{name: 'New Orleans', desc: 'The Big Easy', lat: 29.95107, lng: -90.07153},
			{name: 'Cleveland', desc: 'The Land', lat: 41.49932, lng: -81.69436},
			{name: 'Honolulu', desc: 'The Gathering Place', lat: 21.30694, lng: -157.85833},
			{name: 'Anaheim', desc: 'Home of Disneyland', lat: 33.83659, lng: -117.9143},
			{name: 'Lexington', desc: 'Horse Capital of the World', lat: 38.04058, lng: -84.50372},
			{name: 'Stockton', desc: 'Asparagus Capital of the World', lat: 37.9577, lng: -121.29078},
			{name: 'Corpus Christi', desc: 'Sparkling City by the Sea', lat: 27.80058, lng: -97.39638},
			{
				name: 'Henderson',
				desc: 'Amerikas Hauptstadt der Sicherheit',
				lat: 36.0397,
				lng: -114.98194
			},
			{name: 'Riverside', desc: 'City of Arts and Innovation', lat: 33.95335, lng: -117.39616},
			{name: 'Newark', desc: 'Brick City', lat: 40.73566, lng: -74.17237},
			{name: 'Saint Paul', desc: 'Twin City', lat: 44.9537, lng: -93.08996},
			{name: 'Santa Ana', desc: 'Downtown of the Orange County', lat: 33.74557, lng: -117.86783},
			{name: 'Cincinnati', desc: 'Queen City', lat: 39.10312, lng: -84.51202},
			{name: 'Irvine', desc: 'The Safest City in America', lat: 33.68394, lng: -117.79469},
			{name: 'Orlando', desc: 'The City Beautiful', lat: 28.53834, lng: -81.37924},
			{name: 'Pittsburgh', desc: 'The Steel City', lat: 40.44062, lng: -79.99589},
			{name: 'St. Louis', desc: 'Gateway to the West', lat: 38.62727, lng: -90.19789},
			{name: 'Greensboro', desc: 'Tournament Town', lat: 36.07264, lng: -79.79198},
			{name: 'Jersey City', desc: 'The 6th Borough', lat: 40.72816, lng: -74.07764},
			{name: 'Anchorage', desc: 'The Last Frontier', lat: 61.21806, lng: -149.90028},
			{name: 'Lincoln', desc: 'Star City', lat: 40.81362, lng: -96.7026},
			{name: 'Plano', desc: 'Hot Air Balloon Capital', lat: 33.01984, lng: -96.69889},
			{name: 'Durham', desc: 'Bull City', lat: 35.99403, lng: -78.89862},
			{name: 'Buffalo', desc: 'The Queen City', lat: 42.88645, lng: -78.87837},
			{name: 'Chandler', desc: 'Innovation and Technology Hub', lat: 33.30616, lng: -111.84125},
			{name: 'Chula Vista', desc: 'Lemon Capital of the World', lat: 32.64005, lng: -117.0842},
			{name: 'Toledo', desc: 'Glass City', lat: 41.66394, lng: -83.55521},
			{name: 'Madison', desc: 'City of Four Lakes', lat: 43.07305, lng: -89.40123},
			{name: 'Reno', desc: 'The Biggest Little City in the World', lat: 39.52963, lng: -119.8138},
			{name: 'Fort Wayne', desc: 'Summit City', lat: 41.07927, lng: -85.13935},
			{name: 'North Las Vegas', desc: 'Community of Choice', lat: 36.19886, lng: -115.1175},
			{name: 'Saint Petersburg', desc: 'Sunshine City', lat: 27.7676, lng: -82.64029},
			{name: 'Lubbock', desc: 'Hub City', lat: 33.57786, lng: -101.85517},
			{name: 'Irving', desc: 'The Dream City', lat: 32.81402, lng: -96.94889},
			{name: 'Laredo', desc: 'The City Under Seven Flags', lat: 27.50641, lng: -99.50754},
			{name: 'Winston-Salem', desc: 'City of Arts and Innovation', lat: 36.09986, lng: -80.24422},
			{name: 'Chesapeake', desc: 'The Great Bridge', lat: 36.76821, lng: -76.28749},
			{name: 'Glendale', desc: "Arizona's Antique Capital", lat: 33.53865, lng: -112.18599},
			{name: 'Scottsdale', desc: "The West's Most Western Town", lat: 33.49417, lng: -111.92605},
			{name: 'Garland', desc: 'Wildflower Capital of Texas', lat: 32.91262, lng: -96.63888},
			{name: 'Norfolk', desc: 'The Gateway to the New World', lat: 36.85077, lng: -76.28587},
			{name: 'Boise', desc: 'City of Trees', lat: 43.61502, lng: -116.20231},
			{name: 'Fremont', desc: 'The Fremont Experience', lat: 37.54827, lng: -121.98857},
			{name: 'Spokane', desc: 'Lilac City', lat: 47.65878, lng: -117.42605},
			{name: 'Santa Clarita', desc: 'The Valley', lat: 34.39166, lng: -118.54259},
			{name: 'Baton Rouge', desc: 'Red Stick', lat: 30.45147, lng: -91.18715},
			{name: 'Richmond', desc: 'The River City', lat: 37.54072, lng: -77.43605},

			{name: 'Hialeah', desc: 'Das Herz von Miami', lat: 25.8576, lng: -80.27811},
			{name: 'San Bernardino', desc: 'Tor zur Wildnis', lat: 34.10834, lng: -117.28977},
			{name: 'Tacoma', desc: 'Stadt der Glasbläser', lat: 47.25288, lng: -122.44429},
			{name: 'Modesto', desc: 'Geburtsort des Graffiti', lat: 37.6391, lng: -120.99688},
			{name: 'Huntsville', desc: 'Rocket City', lat: 34.73037, lng: -86.5861},
			{name: 'Des Moines', desc: 'Heart of the Heartland', lat: 41.60054, lng: -93.60911},
			{name: 'Yonkers', desc: 'Die Stadt der Hügel', lat: 40.93121, lng: -73.89875},
			{name: 'Rochester', desc: 'Blumenstadt', lat: 43.16103, lng: -77.61092},
			{name: 'Moreno Valley', desc: 'Die Stadt am Berg', lat: 33.94247, lng: -117.22967},
			{name: 'Fayetteville', desc: 'Stadt der Soldaten', lat: 35.05266, lng: -78.87836},
			{name: 'Fontana', desc: 'Die Motorstadt des Westens', lat: 34.09223, lng: -117.43505},
			{name: 'Columbus', desc: 'Die fliegende Stadt', lat: 32.46098, lng: -84.98771},
			{name: 'Worcester', desc: 'Herz von Massachusetts', lat: 42.26259, lng: -71.80229},
			{name: 'Port St. Lucie', desc: 'Die Stadt, die glänzt', lat: 27.27305, lng: -80.35822},
			{name: 'Little Rock', desc: 'Die Felsenstadt', lat: 34.74648, lng: -92.28959},
			{name: 'Augusta', desc: 'Die Gartenstadt', lat: 33.47097, lng: -81.97484},
			{name: 'Oxnard', desc: 'Die Multikulti-Stadt', lat: 34.1975, lng: -119.17705},
			{name: 'Birmingham', desc: 'Die Magische Stadt', lat: 33.52066, lng: -86.80249},
			{name: 'Montgomery', desc: 'Die Wiege der Konföderation', lat: 32.36681, lng: -86.29997},
			{name: 'Frisco', desc: 'Die Stadt, die wächst', lat: 33.15067, lng: -96.82361},
			{name: 'Amarillo', desc: 'Die Gelbe Rose von Texas', lat: 35.22199, lng: -101.8313},
			{name: 'Salt Lake City', desc: 'Die große Salzstadt', lat: 40.76078, lng: -111.89105},
			{name: 'Grand Rapids', desc: 'Die Möbelstadt', lat: 42.96336, lng: -85.66809},
			{name: 'Huntington Beach', desc: 'Die Surfhauptstadt', lat: 33.6603, lng: -117.99923},
			{name: 'Overland Park', desc: 'Die grüne Stadt', lat: 38.98223, lng: -94.67079},
			{name: 'Glendale', desc: 'Die Einkaufsstadt', lat: 34.14251, lng: -118.25508},
			{name: 'Tallahassee', desc: 'Die Hauptstadt von Florida', lat: 30.43826, lng: -84.28073},
			{name: 'Grand Prairie', desc: 'Die günstige Stadt', lat: 32.74596, lng: -96.99778},
			{name: 'McKinney', desc: 'Die charmante Stadt', lat: 33.19762, lng: -96.61527},
			{name: 'Cape Coral', desc: 'Die Kanalstadt', lat: 26.56285, lng: -81.94953},
			{name: 'Sioux Falls', desc: 'Die Flussstadt', lat: 43.54997, lng: -96.70033},
			{name: 'Peoria', desc: 'Die blühende Stadt', lat: 33.5806, lng: -112.23738},
			{name: 'Providence', desc: 'Die Renaissance Stadt', lat: 41.82399, lng: -71.41283},
			{name: 'Vancouver', desc: 'Die Perle des Pazifiks', lat: 45.63873, lng: -122.66149},
			{name: 'Knoxville', desc: 'Die Hügelstadt', lat: 35.96064, lng: -83.92074},
			{name: 'Akron', desc: 'Die Gummi-Stadt', lat: 41.08144, lng: -81.51901},
			{name: 'Shreveport', desc: 'Die Louisiana-Stadt', lat: 32.52515, lng: -93.75018},
			{name: 'Mobile', desc: 'Die Azaleenstadt', lat: 30.69436, lng: -88.04305},
			{name: 'Brownsville', desc: 'Die grüne Stadt', lat: 25.90175, lng: -97.49748},
			{name: 'Newport News', desc: 'Die Schiffbau-Stadt', lat: 37.08708, lng: -76.47301},
			{name: 'Fort Lauderdale', desc: 'Die Yachtstadt', lat: 26.12231, lng: -80.14338},
			{name: 'Chattanooga', desc: 'Die Bergstadt', lat: 35.04563, lng: -85.30968},
			{name: 'Tempe', desc: 'Die Sonnenstadt', lat: 33.42551, lng: -111.94001},
			{name: 'Aurora', desc: 'Die Schlafstadt', lat: 41.76058, lng: -88.32007},
			{name: 'Santa Rosa', desc: 'Die Rosengartenstadt', lat: 38.44047, lng: -122.71443},
			{name: 'Eugene', desc: 'Die Tracktown USA', lat: 44.05207, lng: -123.08675},
			{name: 'Elk Grove', desc: 'Die Baumbesitzstadt', lat: 38.4088, lng: -121.37162},
			{name: 'Salem', desc: 'Die Kirschenstadt', lat: 44.9429, lng: -123.0351},
			{name: 'Ontario', desc: 'Die Inland Empire Stadt', lat: 34.06334, lng: -117.65089},
			{name: 'Cary', desc: 'Die Baumpfleger-Stadt', lat: 35.79154, lng: -78.78112},
			{name: 'Rancho Cucamonga', desc: 'Die Sandstrandstadt', lat: 34.1064, lng: -117.59311},
			{name: 'Oceanside', desc: 'Die Surferstadt', lat: 33.19587, lng: -117.37948},
			{name: 'Lancaster', desc: 'Die Ballonstadt', lat: 34.68678, lng: -118.15416},
			{name: 'Garden Grove', desc: 'Die Gartenstadt', lat: 33.77391, lng: -117.94145},
			{name: 'Pembroke Pines', desc: 'Die Vorstadtstadt', lat: 26.00776, lng: -80.29626},
			{name: 'Fort Collins', desc: 'Die Bierstadt', lat: 40.58526, lng: -105.08442},
			{name: 'Palmdale', desc: 'Die Wüstenstadt', lat: 34.57943, lng: -118.11646},
			{name: 'Springfield', desc: 'Die Wiesenstadt', lat: 37.20896, lng: -93.2923},
			{name: 'Clarksville', desc: 'Die Grenzstadt', lat: 36.52977, lng: -87.35945},
			{name: 'Salinas', desc: 'Die Landwirtschaftsstadt', lat: 36.67774, lng: -121.6555},
			{name: 'Hayward', desc: 'Die Shanty-Stadt', lat: 37.66882, lng: -122.0808},
			{name: 'Paterson', desc: 'Die Seidenstadt', lat: 40.91677, lng: -74.17181},
			{name: 'Alexandria', desc: 'Die alte Stadt', lat: 38.80484, lng: -77.04692},
			{name: 'Macon', desc: 'Die Musikstadt', lat: 32.84069, lng: -83.6324},
			{name: 'Corona', desc: 'Die Stadt der Zitrusfrüchte', lat: 33.87529, lng: -117.56644},
			{name: 'Kansas City', desc: 'Die Barbecue-Stadt', lat: 39.11417, lng: -94.62746},
			{name: 'Lakewood', desc: 'Die Sanddünenstadt', lat: 39.70471, lng: -105.08137},
			{name: 'Springfield', desc: 'Die Grüne Stadt', lat: 42.10148, lng: -72.58981},
			{name: 'Sunnyvale', desc: 'Die Herzen der Silicon Valley', lat: 37.36883, lng: -122.03635},
			{
				name: 'Jackson',
				desc: 'Die Hauptstadt des Magnolienstaates',
				lat: 32.29876,
				lng: -90.18481
			},
			{name: 'Killeen', desc: 'Die Hügelstadt', lat: 31.11712, lng: -97.7278},
			{name: 'Hollywood', desc: 'Die Unterhaltungsstadt', lat: 26.0112, lng: -80.14949},
			{name: 'Murfreesboro', desc: 'Die Bildungshauptstadt', lat: 35.84562, lng: -86.39027},
			{name: 'Pasadena', desc: 'Die Rosenstadt', lat: 34.14778, lng: -118.14452},
			{name: 'Bellevue', desc: 'Die Skyline-Stadt', lat: 47.61038, lng: -122.20068},
			{name: 'Pomona', desc: 'Die Diamantenstadt', lat: 34.05529, lng: -117.75228},
			{name: 'Escondido', desc: 'Die kreative Stadt', lat: 33.11921, lng: -117.08642},
			{name: 'Joliet', desc: 'Die Stahlstadt', lat: 41.52503, lng: -88.08173},
			{name: 'Charleston', desc: 'Die Heilige Stadt', lat: 32.77657, lng: -79.93092},
			{name: 'Mesquite', desc: 'Die Kiefernstadt', lat: 32.7668, lng: -96.59916},
			{name: 'Naperville', desc: 'Die Vorstadt-Oase', lat: 41.78586, lng: -88.14729},
			{name: 'Rockford', desc: 'Die Waldstadt', lat: 42.27113, lng: -89.09399},
			{name: 'Bridgeport', desc: 'Die Hafenstadt', lat: 41.18655, lng: -73.19518},
			{name: 'Syracuse', desc: 'Die Orangenstadt', lat: 43.04812, lng: -76.14742},
			{name: 'Savannah', desc: 'Die charmante Stadt', lat: 32.08354, lng: -81.09983},
			{name: 'Roseville', desc: 'Die Einkaufsstadt', lat: 38.75212, lng: -121.28801},
			{name: 'Torrance', desc: 'Die Meeresstadt', lat: 33.83585, lng: -118.34063},
			{name: 'Fullerton', desc: 'Die Universitätsstadt', lat: 33.87029, lng: -117.92534},
			{name: 'Surprise', desc: 'Die Wüstenstadt', lat: 33.62923, lng: -112.36793},
			{name: 'McAllen', desc: 'Die Palmenstadt', lat: 26.20341, lng: -98.23001},
			{name: 'Thornton', desc: 'Die Parkstadt', lat: 39.86804, lng: -104.97192},
			{name: 'Visalia', desc: 'Die Tulpenstadt', lat: 36.33023, lng: -119.29206},
			{name: 'Olathe', desc: 'Die Ziegelstadt', lat: 38.8814, lng: -94.81913},
			{name: 'Gainesville', desc: 'Die Studentenstadt', lat: 29.65163, lng: -82.32483},
			{
				name: 'West Valley City',
				desc: 'Die Familiengemeinschaft',
				lat: 40.69161,
				lng: -112.00105
			},
			{name: 'Orange', desc: 'Die Orange Stadt', lat: 33.78779, lng: -117.85311},
			{name: 'Denton', desc: 'Die Zahnarztstadt', lat: 33.21484, lng: -97.13307},
			{name: 'Warren', desc: 'Die Autostadt', lat: 42.47754, lng: -83.0277},
			{name: 'Pasadena', desc: 'Die Blumenstadt', lat: 34.14778, lng: -118.14452},
			{name: 'Waco', desc: 'Die Wiege von Texas', lat: 31.54933, lng: -97.14667},

			{
				name: 'Cedar Rapids',
				desc: 'Die Stadt der fünf Jahreszeiten',
				lat: 41.97788,
				lng: -91.66562
			},
			{name: 'Dayton', desc: 'Die Wiege der Luftfahrt', lat: 39.75895, lng: -84.19161},
			{name: 'Elizabeth', desc: 'Die Königin der Städte', lat: 40.66399, lng: -74.2107},
			{name: 'Hampton', desc: 'Die Wiege der Freiheit', lat: 37.02987, lng: -76.34522},
			{name: 'Columbia', desc: 'Die Palmetto Stadt', lat: 34.00071, lng: -81.03481},
			{name: 'Kent', desc: 'Die Berlin des Westens', lat: 47.38093, lng: -122.23484},
			{name: 'Stamford', desc: 'Die Stadt, die arbeitet', lat: 41.05343, lng: -73.53873},
			{name: 'Victorville', desc: 'Die Stadt des Sieges', lat: 34.53611, lng: -117.29116},
			{name: 'Miramar', desc: 'Die Stadt am Meer', lat: 23.1738, lng: -106.4229},
			{name: 'Coral Springs', desc: 'Die Stadt im Grünen', lat: 26.27119, lng: -80.2706},
			{name: 'Sterling Heights', desc: 'Die Stadt der Sicherheit', lat: 42.58031, lng: -83.0302},
			{name: 'New Haven', desc: 'Die Stadt des Wissens', lat: 41.30815, lng: -72.92816},
			{name: 'Carrollton', desc: 'Die Stadt der Vielfalt', lat: 32.95373, lng: -96.89028},
			{name: 'Midland', desc: 'Die Tall City', lat: 31.99735, lng: -102.07791},
			{name: 'Norman', desc: 'Die Stadt der Universität', lat: 35.22257, lng: -97.43948},
			{name: 'Santa Clara', desc: 'Die Silicon Valley Stadt', lat: 37.35411, lng: -121.95524},
			{name: 'Athens', desc: 'Die Stadt der Literatur', lat: 33.95193, lng: -83.35757},
			{name: 'Thousand Oaks', desc: 'Die Stadt der Eichen', lat: 34.17056, lng: -118.83759},
			{name: 'Topeka', desc: 'Die Hauptstadt des Körpers', lat: 39.04735, lng: -95.67516},
			{name: 'Simi Valley', desc: 'Die Stadt der Verzauberung', lat: 34.26945, lng: -118.78148},
			{name: 'Columbia', desc: 'Die Hauptstadt des Südens', lat: 38.95171, lng: -92.33407},
			{name: 'Vallejo', desc: 'Die Stadt der Möglichkeiten', lat: 38.10409, lng: -122.25664},
			{name: 'Fargo', desc: 'Die Gateway Stadt', lat: 46.87719, lng: -96.7898},
			{name: 'Allentown', desc: 'Die Stadt des Erwachens', lat: 40.60843, lng: -75.49018},
			{name: 'Pearland', desc: 'Die Blumenstadt', lat: 29.56357, lng: -95.28605},
			{name: 'Concord', desc: 'Die Stadt der Bäume', lat: 37.978, lng: -122.03107},
			{
				name: 'Abilene',
				desc: 'Die Stadt des westlichen Lebensstils',
				lat: 32.44874,
				lng: -99.73314
			},
			{name: 'Arvada', desc: 'Die Goldstadt', lat: 39.80276, lng: -105.08748},
			{name: 'Berkeley', desc: 'Die Stadt des Wissens', lat: 37.87159, lng: -122.27275},
			{name: 'Ann Arbor', desc: 'Die A Stadt', lat: 42.28083, lng: -83.74304},
			{name: 'Independence', desc: 'Die Stadt der Unabhängigkeit', lat: 39.09112, lng: -94.41551},
			{name: 'Rochester', desc: 'Die Blumenstadt', lat: 44.02163, lng: -92.4699},
			{name: 'Lafayette', desc: 'Die Herzstadt', lat: 30.22409, lng: -92.01984},
			{name: 'Hartford', desc: 'Die Kapitale der Kleinen Städte', lat: 41.76371, lng: -72.68509},
			{name: 'College Station', desc: 'Die Stadt des Wissens', lat: 30.62798, lng: -96.33441},
			{name: 'Clovis', desc: 'Die Stadt der Legenden', lat: 36.82523, lng: -119.70292},
			{name: 'Fairfield', desc: 'Die Stadt der Blumen', lat: 38.24936, lng: -122.03997},
			{name: 'Palm Bay', desc: 'Die Stadt der Möglichkeiten', lat: 28.03446, lng: -80.58866},
			{name: 'Richardson', desc: 'Die Stadt der Technologie', lat: 32.94833, lng: -96.72985},
			{name: 'Round Rock', desc: 'Die sportliche Stadt', lat: 30.50826, lng: -97.6789},
			{name: 'Cambridge', desc: 'Die Stadt der Ideen', lat: 42.37361, lng: -71.10973},
			{name: 'Meridian', desc: 'Die Stadt der Möglichkeiten', lat: 32.36431, lng: -88.70366},
			{name: 'West Palm Beach', desc: 'Die Stadt der Palmen', lat: 26.71534, lng: -80.05337},
			{name: 'Evansville', desc: 'Die Stadt der Musik', lat: 37.97476, lng: -87.55585},
			{name: 'Clearwater', desc: 'Die Strandstadt', lat: 27.96585, lng: -82.8001},
			{name: 'Billings', desc: 'Die Stadt der Freiheit', lat: 45.78329, lng: -108.50069},
			{name: 'West Jordan', desc: 'Die Stadt des Fortschritts', lat: 40.60967, lng: -111.9391},
			{name: 'Richmond', desc: 'Die Stadt des Friedens', lat: 37.55376, lng: -77.46026},
			{name: 'Westminster', desc: 'Die Stadt der Möglichkeiten', lat: 39.83665, lng: -105.0372},
			{name: 'Manchester', desc: 'Die Stadt der Träume', lat: 42.99564, lng: -71.45479},
			{name: 'Lowell', desc: 'Die Industriestadt', lat: 42.63342, lng: -71.31617},
			{name: 'Wilmington', desc: 'Die Hafenstadt', lat: 34.22573, lng: -77.94471},
			{name: 'Antioch', desc: 'Die Stadt der Bäume', lat: 38.00492, lng: -121.80579},
			{name: 'Beaumont', desc: 'Die Stadt des Südens', lat: 30.08017, lng: -94.12656},
			{name: 'Provo', desc: 'Die Stadt des Wissens', lat: 40.23384, lng: -111.65853},
			{
				name: 'North Charleston',
				desc: 'Die Stadt des Fortschritts',
				lat: 32.85462,
				lng: -79.97481
			},
			{name: 'Elgin', desc: 'Die Uhrenstadt', lat: 42.03541, lng: -88.28257},
			{name: 'Carlsbad', desc: 'Die Küstenstadt', lat: 33.15809, lng: -117.35059},
			{name: 'Odessa', desc: 'Die Petro-Stadt', lat: 31.84568, lng: -102.36764},
			{name: 'Waterbury', desc: 'Die Stadt des Messings', lat: 41.55815, lng: -73.0515},
			{name: 'Springfield', desc: 'Die Blumenstadt', lat: 42.10148, lng: -72.58981},
			{name: 'League City', desc: 'Die Stadt des Spaßes', lat: 29.50745, lng: -95.09493},
			{name: 'Downey', desc: 'Die Stadt der Rosen', lat: 33.94001, lng: -118.13257},
			{name: 'Gresham', desc: 'Die Stadt des Waldes', lat: 45.49818, lng: -122.43148},
			{name: 'High Point', desc: 'Die Möbelstadt', lat: 35.95569, lng: -80.00532},
			{name: 'Broken Arrow', desc: 'Die Blumenstadt', lat: 36.0526, lng: -95.79082},
			{name: 'Peoria', desc: 'Die Stadt der Vielfalt', lat: 33.5806, lng: -112.23738},
			{name: 'Lansing', desc: 'Die Stadt des Flusses', lat: 42.73253, lng: -84.55553},
			{name: 'Lakeland', desc: 'Die Stadt der Seen', lat: 28.03947, lng: -81.9498},
			{name: 'Pompano Beach', desc: 'Die Goldstadt', lat: 26.23786, lng: -80.12477},
			{name: 'Costa Mesa', desc: 'Die Stadt der Kunst', lat: 33.64113, lng: -117.91867},
			{name: 'Pueblo', desc: 'Die Stahlstadt', lat: 38.25445, lng: -104.60914},
			{name: 'Lewisville', desc: 'Die Stadt des Sees', lat: 33.04623, lng: -96.99418},
			{name: 'Miami Gardens', desc: 'Die Stadt der Schönheit', lat: 25.94204, lng: -80.2456},
			{name: 'Las Cruces', desc: 'Die Stadt der Kreuze', lat: 32.31994, lng: -106.76365},
			{name: 'Sugar Land', desc: 'Die Stadt der Süße', lat: 29.61968, lng: -95.63495},
			{name: 'Murrieta', desc: 'Die Stadt der Aussichten', lat: 33.55391, lng: -117.21392},
			{name: 'Ventura', desc: 'Die Stadt des Surfs', lat: 34.27465, lng: -119.22903},
			{name: 'Everett', desc: 'Die Stadt des Flusses', lat: 47.97898, lng: -122.20208},
			{name: 'Temecula', desc: 'Die Stadt der Weinberge', lat: 33.49364, lng: -117.14836},
			{name: 'Dearborn', desc: 'Die Stadt der Autos', lat: 42.32226, lng: -83.17631},
			{name: 'Santa Maria', desc: 'Die Blumenstadt', lat: 34.95303, lng: -120.43572},
			{name: 'West Covina', desc: 'Die Stadt des Schattens', lat: 34.06862, lng: -117.93895},
			{name: 'El Monte', desc: 'Die Stadt der Rosen', lat: 34.06862, lng: -118.02757},
			{name: 'Greeley', desc: 'Die Stadt des Universitätslebens', lat: 40.42331, lng: -104.70913},
			{name: 'Sparks', desc: 'Die Funkenstadt', lat: 39.53489, lng: -119.75269},
			{name: 'Centennial', desc: 'Die Stadt der Vororte', lat: 39.57916, lng: -104.87692},
			{name: 'Boulder', desc: 'Die Stadt der Bergen', lat: 40.01499, lng: -105.27055},
			{name: 'Sandy Springs', desc: 'Die Stadt des Flusses', lat: 33.93097, lng: -84.37324},
			{name: 'Inglewood', desc: 'Die Stadt der Engel', lat: 33.96168, lng: -118.35313},
			{name: 'South Fulton', desc: 'Die Stadt des Südens', lat: 33.73226, lng: -84.55704},
			{name: 'Green Bay', desc: 'Die Stadt der Packers', lat: 44.51916, lng: -88.01983},
			{name: 'Burbank', desc: 'Die Medienstadt', lat: 34.18084, lng: -118.30897},
			{name: 'Renton', desc: 'Die Stadt des Wachstums', lat: 47.48288, lng: -122.21707},
			{name: 'Hillsboro', desc: 'Die High-Tech-Stadt', lat: 45.52289, lng: -122.98983},
			{name: 'El Cajon', desc: 'Die Quelle der Sonne', lat: 32.79477, lng: -116.96253},
			{name: 'Tyler', desc: 'Die Rose City', lat: 32.35126, lng: -95.30106},
			{name: 'Davie', desc: 'Die Cowboy-Stadt', lat: 26.07647, lng: -80.25223},
			{name: 'San Mateo', desc: 'Die Stadt der Schönheit', lat: 37.56299, lng: -122.32553},
			{name: 'Brockton', desc: 'Die Stadt der Champions', lat: 42.08343, lng: -71.01838},
			{name: 'Concord', desc: 'Die Stadt des Geistes', lat: 37.97798, lng: -122.03107},
			{name: 'Jurupa Valley', desc: 'Die Stadt des Geistes', lat: 34.00145, lng: -117.46765},
			{name: 'Daly City', desc: 'Die Stadt des Walles', lat: 37.70577, lng: -122.46192},
			{name: 'Allen', desc: 'Die Stadt des Geistes', lat: 33.10317, lng: -96.67055},
			{name: 'Rio Rancho', desc: 'Die Stadt des Lebens', lat: 35.23275, lng: -106.66305},
			{name: 'Rialto', desc: 'Die Stadt der Zukunft', lat: 34.1064, lng: -117.37032},
			{name: 'South Bend', desc: 'Die Stadt des Kreuzes', lat: 41.68338, lng: -86.25001},
			{name: 'Spokane Valley', desc: 'Die Stadt der Täler', lat: 47.67399, lng: -117.23937},
			{name: 'Norwalk', desc: 'Die Stadt der Glocken', lat: 33.90224, lng: -118.08173},
			{name: 'Menifee', desc: 'Die Stadt der Gemeinschaft', lat: 33.69715, lng: -117.18588},
			{name: 'Vacaville', desc: 'Die Stadt des Frühlings', lat: 38.35658, lng: -121.98774},
			{name: 'Wichita Falls', desc: 'Die Stadt der Windmühlen', lat: 33.91371, lng: -98.49339},
			{name: 'Davenport', desc: 'Die Stadt des Jazz', lat: 41.52364, lng: -90.57764},
			{name: 'Quincy', desc: 'Die Stadt der Brücken', lat: 39.9356, lng: -91.40987},
			{name: 'Chico', desc: 'Die Stadt der Bäume', lat: 39.72849, lng: -121.83748},
			{name: 'Lynn', desc: 'Die Stadt der Muscheln', lat: 42.46676, lng: -70.94949},
			{name: 'Lee’s Summit', desc: 'Die Stadt des Wachstums', lat: 38.91084, lng: -94.38217},
			{name: 'New Bedford', desc: 'Die Stadt des Herzens', lat: 41.63622, lng: -70.93421},
			{name: 'Federal Way', desc: 'Die Stadt der Fjorde', lat: 47.32232, lng: -122.31262},
			{name: 'Edinburg', desc: 'Die Stadt der Musik', lat: 26.30174, lng: -98.16212},
			{name: 'Nampa', desc: 'Die Stadt des Specks', lat: 43.54072, lng: -116.56346},
			{name: 'Roanoke', desc: 'Die Stadt des Berges', lat: 37.27097, lng: -79.94143}
		]
	},
	egypt100k: {
		name: 'Großstädte Ägyptens',
		aiGenerated: true,
		values: [
			{name: 'Kairo', desc: 'Das Herz Ägyptens', lat: 30.04442, lng: 31.23571},
			{name: 'Alexandria', desc: 'Die Perle des Mittelmeers', lat: 31.20009, lng: 29.91874},
			{name: 'Gizeh', desc: 'Die Wächter der Pyramiden', lat: 30.01306, lng: 31.20885},
			{
				name: 'Schubra al-Chaima',
				desc: 'Die Stadt der fruchtbaren Oasen',
				lat: 30.12993,
				lng: 31.24244
			},
			{name: 'Port Said', desc: 'Das Tor zur Welt', lat: 31.25654, lng: 32.28412},
			{name: 'Sues', desc: 'Die Brücke zwischen den Meeren', lat: 30.00518, lng: 32.54981},
			{name: 'al-Mansura', desc: 'Das Zentrum der Tradition', lat: 31.04089, lng: 31.37847},
			{
				name: 'Mahalla al-Kubra',
				desc: 'Die Stadt der Textilindustrie',
				lat: 30.9745,
				lng: 31.17141
			},
			{name: 'Tanta', desc: 'Die Stadt der Fruchtbarkeit', lat: 30.78602, lng: 31.0008},
			{name: 'Asyut', desc: 'Die Stadt der Säulen', lat: 27.1828, lng: 31.15107},
			{name: 'Fayyum', desc: 'Das Land der Seen', lat: 29.30995, lng: 30.8428},
			{name: 'al-Chusus', desc: 'Die Stadt der Legenden', lat: 30.54988, lng: 31.49893},
			{name: 'Zagazig', desc: 'Die Stadt der Dämme', lat: 30.58768, lng: 31.502},
			{name: 'Ismailia', desc: 'Die Stadt am Kanal', lat: 30.60427, lng: 32.27225},
			{name: 'Assuan', desc: 'Das Tor zum Süden', lat: 24.08894, lng: 32.89983},
			{
				name: 'Madinat as-Sadis min Uktubar',
				desc: 'Die Stadt der Hoffnung',
				lat: 29.97465,
				lng: 31.25917
			},
			{name: 'Damanhur', desc: 'Die Stadt der Träume', lat: 31.03495, lng: 30.46829},
			{name: 'Neu-Kairo', desc: 'Die Stadt der Moderne', lat: 30.06263, lng: 31.49514},
			{name: 'Damiette', desc: 'Die Stadt des Flusses', lat: 31.41987, lng: 31.81444},
			{name: 'al-Minya', desc: 'Die Stadt der Kunst', lat: 28.10988, lng: 30.7503},
			{name: 'Bani Suwaif', desc: 'Die Stadt des Nils', lat: 29.07441, lng: 31.09785},
			{name: 'Luxor', desc: 'Das Land der Pharaonen', lat: 25.68724, lng: 32.63963},
			{name: 'Schibin al-Kaum', desc: 'Die Stadt der Wunder', lat: 30.54877, lng: 31.00635},
			{name: 'Sauhadsch', desc: 'Die Stadt der Felsen', lat: 29.1962, lng: 25.51956},
			{name: 'Qina', desc: 'Das Tor zur Vergangenheit', lat: 26.1641, lng: 32.7267},
			{
				name: 'Madinat al-Aschir min Ramadan',
				desc: 'Die Stadt des Lebens',
				lat: 30.39489,
				lng: 31.24057
			},
			{name: 'Mallawi', desc: 'Die Stadt der Kultur', lat: 27.73165, lng: 30.84177},
			{name: 'Hurghada', desc: 'Die Stadt der Korallen', lat: 27.25738, lng: 33.81291},
			{name: 'al-Arisch', desc: 'Die Stadt des Horus', lat: 31.12763, lng: 33.80057},
			{
				name: 'Kafr asch-Schaich',
				desc: 'Die Stadt der Fruchtbarkeit',
				lat: 31.11482,
				lng: 30.94072
			},
			{name: 'Bilbais', desc: 'Die Stadt der Götter', lat: 31.35201, lng: 31.61297},
			{name: 'Banha', desc: 'Die Stadt der Brücken', lat: 30.46598, lng: 31.1847},
			{name: 'Idku', desc: 'Die Stadt der Fischer', lat: 31.31654, lng: 30.29173},
			{name: 'Marsa Matruh', desc: 'Die Stadt am Meer', lat: 31.35364, lng: 27.23864},
			{name: 'Matariyya', desc: 'Die Stadt der Geschichte', lat: 30.07879, lng: 31.2821},
			{name: 'Qalyub', desc: 'Die Stadt der Ruhe', lat: 30.1696, lng: 31.25868},
			{name: 'al-Hawamidiyya', desc: 'Die Stadt der Brisen', lat: 29.90702, lng: 31.23195},
			{name: 'Abu Kabir', desc: 'Die Stadt der Sonnenuntergänge', lat: 30.58717, lng: 31.18842},
			{name: 'Mit Ghamr', desc: 'Die Stadt der Palmen', lat: 31.19677, lng: 31.60219},
			{name: 'Achmim', desc: 'Die Stadt der Hieroglyphen', lat: 26.56372, lng: 31.74616},
			{name: 'Girga', desc: 'Die Stadt der Tempel', lat: 26.3342, lng: 31.89431},
			{name: 'Disuk', desc: 'Die Stadt der Gärten', lat: 31.13089, lng: 31.372},
			{name: 'Samalut', desc: 'Die Stadt der Legenden', lat: 28.31198, lng: 30.7123},
			{name: 'Obour', desc: 'Die Stadt der Sterne', lat: 30.16076, lng: 31.58592},
			{name: 'Kerdasa', desc: 'Die Stadt des Grüns', lat: 29.88231, lng: 31.23101},
			{name: 'Belqas', desc: 'Die Stadt der Farben', lat: 30.58828, lng: 31.28162},
			{name: 'Nasser', desc: 'Die Stadt des Friedens', lat: 31.34779, lng: 30.37807},
			{name: 'Tahta', desc: 'Die Stadt der Tradition', lat: 26.76754, lng: 31.50402},
			{name: 'Sinnuris', desc: 'Die Stadt des Lichts', lat: 30.91161, lng: 31.16374},
			{name: 'Kafr ad-Dawwar', desc: 'Die Stadt der Industrie', lat: 31.13356, lng: 30.13296},
			{name: 'El Manzala', desc: 'Die Stadt der Fischerei', lat: 31.05071, lng: 31.38302},
			{name: 'Rosette', desc: 'Die Stadt der Kultur', lat: 31.40481, lng: 30.41644},
			{name: 'Minuf', desc: 'Die Stadt der Töpfer', lat: 30.47097, lng: 30.93102},
			{name: 'Ashmoun', desc: 'Die Stadt des Flusses', lat: 30.94661, lng: 30.87696},
			{name: 'El Senbellawein', desc: 'Die Stadt der Reben', lat: 31.04638, lng: 30.95593},
			{name: 'Maghagha', desc: 'Die Stadt der Mosaike', lat: 27.19236, lng: 30.80404},
			{name: 'Manfalut', desc: 'Die Stadt des Flusses', lat: 28.99694, lng: 31.15579},
			{name: 'Faqous', desc: 'Die Stadt der Mythen', lat: 30.7792, lng: 31.39559},
			{name: 'Kom Ombo', desc: 'Die Stadt der Doppelgötter', lat: 24.46973, lng: 32.93715},
			{name: 'Beni Mazar', desc: 'Die Stadt der Ruinen', lat: 28.50265, lng: 30.8065},
			{name: 'al-Faschn', desc: 'Die Stadt des Friedens', lat: 27.30685, lng: 30.9668},
			{name: 'Talcha', desc: 'Die Stadt der Geister', lat: 31.03472, lng: 31.59076},
			{name: 'Abnob', desc: 'Die Stadt der Opfer', lat: 31.07617, lng: 31.20661},
			{name: 'Zifta', desc: 'Die Stadt des Glücks', lat: 30.74924, lng: 31.23906},
			{name: 'Abu Tig', desc: 'Die Stadt der Sonnenuntergänge', lat: 27.18507, lng: 33.83021},
			{name: 'Dairut', desc: 'Die Stadt der Schönheit', lat: 26.12463, lng: 31.81285},
			{name: 'Tima', desc: 'Die Stadt der Geschichte', lat: 27.4812, lng: 30.79282},
			{name: 'Dikirnis', desc: 'Die Stadt der Rituale', lat: 31.08973, lng: 31.59902}
		]
	},
	iran100k: {
		name: 'Großstädte des Irans',
		aiGenerated: true,
		values: [
			{name: 'Teheran', desc: 'Die pulsierende Hauptstadt', lat: 35.6892, lng: 51.389},
			{name: 'Maschhad', desc: 'Die spirituelle Stadt', lat: 36.2605, lng: 59.6168},
			{name: 'Isfahan', desc: 'Die historische Schatztruhe', lat: 32.6546, lng: 51.668},
			{name: 'Karadsch', desc: 'Die grüne Oase', lat: 34.8034, lng: 48.5103},
			{name: 'Schiras', desc: 'Die Stadt der Poesie', lat: 29.5918, lng: 52.5837},
			{name: 'Täbris', desc: 'Die kulturelle Vielfalt', lat: 38.0805, lng: 46.3012},
			{name: 'Ghom', desc: 'Die heilige Stadt', lat: 34.6399, lng: 50.8759},
			{name: 'Ahvaz', desc: 'Die Stadt am Fluss', lat: 31.3183, lng: 48.6706},
			{name: 'Kermānschāh', desc: 'Die Stadt der Monumente', lat: 34.3142, lng: 47.064},
			{name: 'Urmia', desc: 'Die Stadt der Seen', lat: 37.5527, lng: 45.0761},
			{name: 'Rascht', desc: 'Die grüne Stadt am Meer', lat: 37.2805, lng: 49.5832},
			{name: 'Zahedan', desc: 'Die Stadt der Wüste', lat: 29.485, lng: 60.8626},
			{name: 'Hamadan', desc: 'Die antike Stadt', lat: 34.7995, lng: 48.5146},
			{name: 'Kerman', desc: 'Die Stadt der Karawansereien', lat: 30.2672, lng: 57.0768},
			{name: 'Yazd', desc: 'Die Stadt der Windtürme', lat: 31.8795, lng: 54.2666},
			{name: 'Ardabil', desc: 'Die Stadt der Heiligen', lat: 38.2465, lng: 48.2956},
			{name: 'Bandar Abbas', desc: 'Die Hafenstadt', lat: 27.1865, lng: 56.2808},
			{name: 'Arak', desc: 'Die Stadt der Industrie', lat: 34.0917, lng: 49.6892},
			{name: 'Islamschahr', desc: 'Die Stadt des Glaubens', lat: 35.5387, lng: 51.2406},
			{name: 'Zandschan', desc: 'Die Stadt der Gärten', lat: 36.679, lng: 45.776},
			{name: 'Sanandadsch', desc: 'Die Stadt der Blumen', lat: 35.312, lng: 46.9884},
			{name: 'Qazvin', desc: 'Die historische Stadt', lat: 36.2797, lng: 50.0041},
			{name: 'Chorramabad', desc: 'Die Stadt der Schlösser', lat: 33.5375, lng: 48.3522},
			{name: 'Gorgan', desc: 'Die Stadt der Wälder', lat: 36.8508, lng: 54.4399},
			{name: 'Sari', desc: 'Die Stadt am Kaspischen Meer', lat: 36.5633, lng: 53.0601},
			{name: 'Schahriyar', desc: 'Die Stadt der Träume', lat: 35.6542, lng: 51.0566},
			{name: 'Ghods', desc: 'Die Stadt des Fortschritts', lat: 35.7061, lng: 51.3343},
			{name: 'Kaschan', desc: 'Die Stadt der Rosen', lat: 34.016, lng: 51.4692},
			{name: 'Malard', desc: 'Die Stadt der Weiden', lat: 35.662, lng: 50.9469},
			{name: 'Dezful', desc: 'Die Stadt am Fluss', lat: 32.3801, lng: 48.4058},
			{name: 'Nischapur', desc: 'Die Stadt der Dichter', lat: 36.2156, lng: 58.7939},
			{name: 'Babol', desc: 'Die Stadt der Geschichte', lat: 36.5544, lng: 52.6787},
			{name: 'Chomeinischahr', desc: 'Die Stadt der Brücken', lat: 36.6816, lng: 51.4255},
			{name: 'Sabsevar', desc: 'Die Stadt der Paläste', lat: 36.2126, lng: 57.6819},
			{name: 'Golestan', desc: 'Die Stadt der Gärten', lat: 32.8552, lng: 59.2211},
			{name: 'Amol', desc: 'Die Stadt des Wassers', lat: 36.4699, lng: 52.353},
			{name: 'Pakdascht-al Roum', desc: 'Die Stadt der Traditionen', lat: 35.4738, lng: 51.2618},
			{name: 'Nadschafabad', desc: 'Die Stadt des Friedens', lat: 34.3574, lng: 47.0674},
			{name: 'Borudscherd', desc: 'Die Stadt der Berge', lat: 35.5524, lng: 47.9962},
			{name: 'Abadan', desc: 'Die Stadt der Ölindustrie', lat: 30.3277, lng: 48.2956},
			{name: 'Ghartschak', desc: 'Die Stadt des Handels', lat: 27.2076, lng: 60.6917},
			{name: 'Bodschnurd', desc: 'Die Stadt der Palmen', lat: 36.8968, lng: 54.0019},
			{name: 'Waramin', desc: 'Die Stadt der Künste', lat: 35.3086, lng: 51.6464},
			{name: 'Buschehr', desc: 'Die Hafenstadt am Persischen Golf', lat: 28.9216, lng: 50.838},
			{name: 'Saveh', desc: 'Die Stadt der Gärten', lat: 35.0239, lng: 50.3566},
			{name: 'Qaem-Schahr', desc: 'Die Stadt der Hoffnung', lat: 34.642, lng: 50.8764},
			{name: 'Birdschand', desc: 'Die Stadt der Karawanen', lat: 32.8639, lng: 59.2211},
			{name: 'Sirdschan', desc: 'Die Stadt des Glücks', lat: 29.453, lng: 55.6787},
			{name: 'Choy', desc: 'Die Stadt der Berge', lat: 38.4912, lng: 44.9602},
			{name: 'Ilam', desc: 'Die Stadt der Wasserfälle', lat: 33.6374, lng: 46.4227},
			{name: 'Bukan', desc: 'Die Stadt der Kultur', lat: 36.5216, lng: 46.2123},
			{name: 'Schahr-e Kord', desc: 'Die Stadt in den Bergen', lat: 32.3256, lng: 50.8549},
			{name: 'Semnan', desc: 'Die Stadt der Karawanen', lat: 35.5729, lng: 53.3971},
			{name: 'Fardis', desc: 'Die Stadt der Traditionen', lat: 35.7105, lng: 50.9359},
			{name: 'Maragha', desc: 'Die Stadt der Sternwarte', lat: 37.3843, lng: 46.2391},
			{name: 'Schahinschahr', desc: 'Die Stadt der Schönheit', lat: 32.8764, lng: 51.5287},
			{name: 'Malayer', desc: 'Die Stadt der Handwerkskunst', lat: 34.302, lng: 48.8141},
			{name: 'Mahabad', desc: 'Die Stadt der Kultur', lat: 36.7269, lng: 45.7095},
			{name: 'Saqqez', desc: 'Die Stadt der Bäume', lat: 36.2491, lng: 46.2726},
			{name: 'Māhschahr', desc: 'Die Stadt der Perspektiven', lat: 30.5567, lng: 49.1753},
			{name: 'Rafsandschan', desc: 'Die Stadt des Handels', lat: 37.3044, lng: 49.5916},
			{name: 'Gonbad-e Qabus', desc: 'Die Stadt der Geschichte', lat: 37.2453, lng: 55.1692},
			{name: 'Schahrud', desc: 'Die Stadt der Flüsse', lat: 36.4154, lng: 54.9763},
			{name: 'Marvdascht', desc: 'Die Stadt der Weinberge', lat: 29.8773, lng: 52.779},
			{name: 'Kamalschahr', desc: 'Die Stadt der Kunst', lat: 34.794, lng: 48.4375},
			{name: 'Dschahrom', desc: 'Die Stadt der Wasserfälle', lat: 28.5, lng: 53.5795},
			{
				name: 'Torbat-e Heydariyeh',
				desc: 'Die Stadt der Gelehrsamkeit',
				lat: 35.2748,
				lng: 59.2207
			},
			{name: 'Marivan', desc: 'Die Stadt der Legenden', lat: 35.5189, lng: 46.1831},
			{name: 'Andimeschk', desc: 'Die Stadt der Traditionen', lat: 32.4347, lng: 48.3954},
			{name: 'Schahreza', desc: 'Die Stadt der Paläste', lat: 32.0336, lng: 51.8795},
			{name: 'Zābol', desc: 'Die Stadt der Berge', lat: 31.0299, lng: 61.4911},
			{name: 'Yasudsch', desc: 'Die Stadt der Gärten', lat: 32.6613, lng: 51.6804},
			{name: 'Miandoab', desc: 'Die Stadt der Berge', lat: 36.9694, lng: 46.0945},
			{name: 'Chorramschahr', desc: 'Die Stadt der Brücken', lat: 30.4275, lng: 48.1845},
			{name: 'Marand', desc: 'Die Stadt der Antike', lat: 38.4329, lng: 45.774},
			{name: 'Dschiroft', desc: 'Die Stadt der Wüste', lat: 28.7054, lng: 57.6819},
			{name: 'Bam', desc: 'Die Stadt der Zitadellen', lat: 29.1077, lng: 58.3611},
			{name: 'Behbahān', desc: 'Die Stadt des Wassers', lat: 30.5955, lng: 50.2412},
			{name: 'Dorud', desc: 'Die Stadt der Flüsse', lat: 33.4925, lng: 49.0151},
			{name: 'Nazarabad', desc: 'Die Stadt der Träume', lat: 34.0935, lng: 50.3664},
			{name: 'Moḥamadshahr', desc: 'Die Stadt der Hoffnung', lat: 35.6596, lng: 50.9979},
			{name: 'Izeh', desc: 'Die Stadt am Fluss', lat: 31.8286, lng: 49.8679},
			{name: 'Bandar Anzali', desc: 'Die Stadt am Meer', lat: 37.4722, lng: 49.4592},
			{name: 'Andisheh', desc: 'Die Stadt des Geistes', lat: 35.7274, lng: 51.2468},
			{name: 'Irānschahr', desc: 'Die Stadt des Sonnenuntergangs', lat: 27.2024, lng: 60.6848},
			{name: 'Fasa', desc: 'Die Stadt der Landwirtschaft', lat: 28.9717, lng: 53.6487},
			{name: 'Borazjan', desc: 'Die Stadt des Frühlings', lat: 29.2662, lng: 51.2161},
			{name: 'Baneh', desc: 'Die Stadt der Wälder', lat: 35.9971, lng: 45.8854},
			{name: 'Tschahbahar', desc: 'Die Hafenstadt am Golf von Oman', lat: 25.2877, lng: 60.643},
			{name: 'Robat Karim', desc: 'Die Stadt der Ruhe', lat: 35.4842, lng: 51.0811},
			{name: 'Kāschmar', desc: 'Die Stadt der Rosen', lat: 35.2433, lng: 58.4656},
			{name: 'Schuschtar', desc: 'Die Stadt der Brücken', lat: 32.0569, lng: 48.8448},
			{name: 'Quchan', desc: 'Die Stadt der Teppiche', lat: 37.1057, lng: 58.5078},
			{name: 'Lahidschan', desc: 'Die Stadt der Traditionen', lat: 35.7005, lng: 51.3924},
			{name: 'Ahar', desc: 'Die Stadt der Berge', lat: 38.4829, lng: 47.0716},
			{name: 'Masdsched Soleyman', desc: 'Die Stadt der Feuer', lat: 31.2156, lng: 49.5887},
			{name: 'Torbat-e Dschām', desc: 'Die Stadt der Schätze', lat: 35.2444, lng: 60.6225}
		]
	},
	southKorea100k: {
		name: 'Großstädte Südkoreas',
		aiGenerated: true,
		values: [
			{name: 'Seoul', desc: 'Hauptstadt und pulsierendes Zentrum', lat: 37.5665, lng: 126.978},
			{name: 'Busan', desc: 'Hafenstadt am Ozean', lat: 35.1796, lng: 129.0756},
			{name: 'Incheon', desc: 'Hafenstadt und Tor zu Korea', lat: 37.4563, lng: 126.7052},
			{name: 'Daegu', desc: 'Historische Stadt im Herzen Südkoreas', lat: 35.8714, lng: 128.6014},
			{
				name: 'Daejeon',
				desc: 'Technologiezentrum und Universitätsstadt',
				lat: 36.3504,
				lng: 127.3845
			},
			{name: 'Gwangju', desc: 'Kulturelles und politisches Zentrum', lat: 35.1595, lng: 126.8526},
			{
				name: 'Suwon',
				desc: 'Historisches Erbe und moderne Entwicklung',
				lat: 37.2636,
				lng: 127.0286
			},
			{name: 'Ulsan', desc: 'Industriestadt und Wirtschaftszentrum', lat: 35.5384, lng: 129.3114},
			{
				name: 'Yongin',
				desc: 'Moderne Stadt mit vielfältigen Freizeitmöglichkeiten',
				lat: 37.2411,
				lng: 127.1776
			},
			{name: 'Goyang', desc: 'Grüne Stadt mit stetigem Wachstum', lat: 37.6564, lng: 126.835},
			{name: 'Changwon', desc: 'Industrie- und Bildungszentrum', lat: 35.2272, lng: 128.6811},
			{
				name: 'Seongnam',
				desc: 'Moderne Stadt mit grünen Wohnvierteln',
				lat: 37.4386,
				lng: 127.1376
			},
			{name: 'Hwaseong', desc: 'Historische Festungsstadt', lat: 37.2066, lng: 126.816},
			{
				name: 'Cheongju',
				desc: 'Kulturelles und wirtschaftliches Zentrum',
				lat: 36.6439,
				lng: 127.4911
			},
			{name: 'Bucheon', desc: 'Stadt der Künste und Kultur', lat: 37.4985, lng: 126.7831},
			{
				name: 'Ansan',
				desc: 'Multikulturelle Stadt mit vielfältiger Geschichte',
				lat: 37.323,
				lng: 126.821
			},
			{name: 'Namyangju', desc: 'Grüne Stadt am Hangang', lat: 37.6369, lng: 127.214},
			{
				name: 'Cheonan',
				desc: 'Stadt des Fortschritts und der Industrie',
				lat: 36.8144,
				lng: 127.1252
			},
			{
				name: 'Jeonju',
				desc: 'Kulturelle Hauptstadt und Zentrum der Tradition',
				lat: 35.8242,
				lng: 127.148
			},
			{
				name: 'Gimhae',
				desc: 'Stadt des Wachstums und des Fortschritts',
				lat: 35.2284,
				lng: 128.8811
			},
			{
				name: 'Pyeongtaek',
				desc: 'Moderne Stadt mit militärischer Präsenz',
				lat: 36.9944,
				lng: 127.0878
			},
			{name: 'Anyang', desc: 'Stadt der Innovation und Kreativität', lat: 37.392, lng: 126.9263},
			{name: 'Siheung', desc: 'Grüne Stadt im Wachstum', lat: 37.3808, lng: 126.7329},
			{name: 'Pohang', desc: 'Industriestadt an der Ostküste', lat: 36.0208, lng: 129.3712},
			{name: 'Gimpo', desc: 'Stadt des Handels und des Verkehrs', lat: 37.5948, lng: 126.7226},
			{name: 'Paju', desc: 'Stadt der Künste und Kultur', lat: 37.8339, lng: 126.6879},
			{
				name: 'Uijeongbu',
				desc: 'Stadt der Bildung und des Wachstums',
				lat: 37.7411,
				lng: 127.0474
			},
			{
				name: 'Gumi',
				desc: 'Industriestadt mit fortschrittlicher Technologie',
				lat: 36.1147,
				lng: 128.336
			},
			{name: 'Gwangju', desc: 'Kulturelles und politisches Zentrum', lat: 35.1595, lng: 126.8526},
			{
				name: 'Sejong',
				desc: 'Stadt der Innovation und Nachhaltigkeit',
				lat: 36.6092,
				lng: 127.2956
			},
			{name: 'Wonju', desc: 'Stadt der Bildung und des Sports', lat: 37.3514, lng: 127.9454},
			{name: 'Jinju', desc: 'Historische Stadt am Fluss Nam', lat: 35.1796, lng: 128.1076},
			{name: 'Yangsan', desc: 'Moderne Stadt mit ländlichem Charme', lat: 35.3387, lng: 129.0383},
			{
				name: 'Asan',
				desc: 'Stadt des Fortschritts und der Industrie',
				lat: 36.7833,
				lng: 127.0046
			},
			{
				name: 'Gwangmyeong',
				desc: 'Stadt des Handels und der Industrie',
				lat: 37.4772,
				lng: 126.866
			},
			{name: 'Iksan', desc: 'Stadt des Handels und des Handwerks', lat: 35.9439, lng: 126.9543},
			{name: 'Chuncheon', desc: 'Stadt der Seen und der Natur', lat: 37.8747, lng: 127.7342},
			{name: 'Gyeongsan', desc: 'Bildungsstadt mit ländlichem Flair', lat: 35.8259, lng: 128.725},
			{name: 'Hanam', desc: 'Moderne Stadt mit historischem Erbe', lat: 37.5402, lng: 127.204},
			{name: 'Gunpo', desc: 'Stadt der Kultur und des Fortschritts', lat: 37.3617, lng: 126.9357},
			{
				name: 'Suncheon',
				desc: 'Ökologische Stadt mit Naturschutzgebieten',
				lat: 34.9506,
				lng: 127.4894
			},
			{name: 'Yeosu', desc: 'Küstenstadt mit maritimem Charme', lat: 34.7604, lng: 127.6622},
			{name: 'Gunsan', desc: 'Stadt des Handels und der Industrie', lat: 35.9783, lng: 126.7114},
			{
				name: 'Gyeongju',
				desc: 'Historische Hauptstadt und UNESCO-Weltkulturerbe',
				lat: 35.8562,
				lng: 129.2242
			},
			{name: 'Geoje', desc: 'Industriestadt mit maritimem Flair', lat: 34.8803, lng: 128.6262},
			{
				name: 'Osan',
				desc: 'Moderne Stadt mit militärischer Präsenz',
				lat: 37.1499,
				lng: 127.0773
			},
			{
				name: 'Yangju',
				desc: 'Stadt des Wachstums und der Entwicklung',
				lat: 37.8334,
				lng: 127.0619
			},
			{name: 'Icheon', desc: 'Stadt der Keramik und der Kultur', lat: 37.2716, lng: 127.4425},
			{name: 'Mokpo', desc: 'Hafenstadt am Gelben Meer', lat: 34.7937, lng: 126.3914},
			{name: 'Chungju', desc: 'Stadt der Seen und der Geschichte', lat: 36.9717, lng: 127.9303},
			{name: 'Gangneung', desc: 'Stadt des Strandes und der Kultur', lat: 37.7519, lng: 128.8761},
			{
				name: 'Anseong',
				desc: 'Stadt des Pferderennens und der Landwirtschaft',
				lat: 37.0101,
				lng: 127.2703
			},
			{name: 'Guri', desc: 'Grüne Stadt am Stadtrand', lat: 37.6035, lng: 127.1432},
			{
				name: 'Seosan',
				desc: 'Küstenstadt mit landwirtschaftlicher Tradition',
				lat: 36.7782,
				lng: 126.4513
			},
			{name: 'Dangjin', desc: 'Stadt der Industrie und des Handels', lat: 37.0084, lng: 126.5978},
			{name: 'Uiwang', desc: 'Moderne Stadt mit grünen Wohnvierteln', lat: 37.384, lng: 127.0329},
			{name: 'Andong', desc: 'Stadt der Tradition und Kultur', lat: 36.5659, lng: 128.725},
			{name: 'Pocheon', desc: 'Stadt der Natur und der Erholung', lat: 37.8859, lng: 127.199},
			{
				name: 'Gwangyang',
				desc: 'Industriestadt mit landschaftlicher Schönheit',
				lat: 34.9421,
				lng: 127.6952
			},
			{name: 'Gimcheon', desc: 'Stadt des Handels und der Kultur', lat: 36.1224, lng: 128.1198},
			{name: 'Jecheon', desc: 'Stadt der Flüsse und der Erholung', lat: 37.1498, lng: 128.2116},
			{
				name: 'Tongyeong',
				desc: 'Küstenstadt mit maritimer Tradition',
				lat: 34.8529,
				lng: 128.4296
			},
			{
				name: 'Nonsan',
				desc: 'Stadt des Ackerbaus und der Landwirtschaft',
				lat: 36.2031,
				lng: 127.0848
			},
			{name: 'Yeoju', desc: 'Stadt der Geschichte und der Kunst', lat: 37.2982, lng: 127.6378},
			{
				name: 'Naju',
				desc: 'Stadt der Landwirtschaft und des Handels',
				lat: 35.0287,
				lng: 126.7171
			},
			{name: 'Sacheon', desc: 'Stadt des Handels und der Industrie', lat: 35.0766, lng: 128.0661},
			{
				name: 'Gongju',
				desc: 'Historische Stadt mit königlichem Erbe',
				lat: 36.4554,
				lng: 127.1247
			},
			{
				name: 'Jeongeup',
				desc: 'Stadt der Landwirtschaft und der Kultur',
				lat: 35.5699,
				lng: 126.8515
			},
			{
				name: 'Yeongju',
				desc: 'Stadt der Geschichte und der Tradition',
				lat: 36.8251,
				lng: 128.5537
			},
			{name: 'Miryang', desc: 'Stadt der Brücken und der Landschaft', lat: 35.4853, lng: 128.7483}
		]
	},
	mexico100k: {
		name: 'Großstädte Mexikos',
		aiGenerated: true,
		values: [
			{name: 'Ciudad de México', desc: 'Die Megastadt', lat: 19.4326, lng: -99.1332},
			{name: 'Tijuana', desc: 'Die Grenzstadt', lat: 32.5149, lng: -117.0382},
			{name: 'Ecatepec de Morelos', desc: 'Die Bevölkerungsdichte', lat: 19.6018, lng: -99.0601},
			{name: 'León', desc: 'Die Schuhstadt', lat: 21.1231, lng: -101.6865},
			{
				name: 'Heroica Puebla de Zaragoza',
				desc: 'Die Kolonialstadt',
				lat: 19.0414,
				lng: -98.2063
			},
			{name: 'Ciudad Juárez', desc: 'Die Grenzmetropole', lat: 31.6904, lng: -106.4245},
			{name: 'Guadalajara', desc: 'Die Mariachi-Stadt', lat: 20.6597, lng: -103.3496},
			{name: 'Zapopan', desc: 'Die Moderne', lat: 20.7235, lng: -103.3849},
			{name: 'Monterrey', desc: 'Die Industriestadt', lat: 25.6866, lng: -100.3161},
			{name: 'Nezahualcóyotl', desc: 'Die Stadtoase', lat: 19.3971, lng: -99.0126},
			{name: 'Chihuahua', desc: 'Die Wüstenstadt', lat: 28.6322, lng: -106.0691},
			{name: 'Mérida', desc: 'Die Weiße Stadt', lat: 20.9676, lng: -89.6246},
			{name: 'Cancún', desc: 'Die Badehochburg', lat: 21.1619, lng: -86.8515},
			{name: 'Saltillo', desc: 'Die Stahlstadt', lat: 25.4389, lng: -100.9737},
			{name: 'Aguascalientes', desc: 'Die historische Stadt', lat: 21.8853, lng: -102.2916},
			{name: 'Hermosillo', desc: 'Die Wüstenstadt', lat: 29.0729, lng: -110.9559},
			{name: 'Mexicali', desc: 'Die Wüstenstadt', lat: 32.6245, lng: -115.4523},
			{name: 'San Luis Potosí', desc: 'Die Kolonialstadt', lat: 22.1565, lng: -100.9855},
			{name: 'Culiacán Rosales', desc: 'Die Stadt der Banditen', lat: 24.7998, lng: -107.3931},
			{name: 'Santiago de Querétaro', desc: 'Die Kolonialstadt', lat: 20.5888, lng: -100.3899},
			{
				name: 'Naucalpan de Juárez (municipio de Naucalpan)',
				desc: 'Die Vorstadt',
				lat: 19.474,
				lng: -99.235
			},
			{name: 'Morelia', desc: 'Die Kolonialstadt', lat: 19.4326, lng: -101.897},
			{name: 'Chimalhuacán', desc: 'Die Gemeinschaft', lat: 19.4218, lng: -98.9539},
			{name: 'Reynosa', desc: 'Die Grenzstadt', lat: 26.0806, lng: -98.2882},
			{name: 'Torreón', desc: 'Die Industriestadt', lat: 25.5428, lng: -103.4068},
			{name: 'Tlalnepantla de Baz', desc: 'Die Stadt der Berge', lat: 19.5408, lng: -99.1958},
			{name: 'Acapulco de Juárez', desc: 'Die Badehochburg', lat: 16.8531, lng: -99.8237},
			{name: 'Tlaquepaque', desc: 'Die Künstlerstadt', lat: 20.6414, lng: -103.3075},
			{name: 'Guadalupe', desc: 'Die Stadt der Tradition', lat: 25.6763, lng: -100.255},
			{name: 'Victoria de Durango', desc: 'Die Bergstadt', lat: 24.0228, lng: -104.6606},
			{name: 'Tuxtla Gutiérrez', desc: 'Die Stadt der Palmen', lat: 16.7516, lng: -93.115},
			{name: 'Apodaca', desc: 'Die Industriestadt', lat: 25.7691, lng: -100.1807},
			{name: 'Ciudad López Mateos', desc: 'Die Vorstadt', lat: 19.5475, lng: -99.234},
			{name: 'Cuautitlán Izcalli', desc: 'Die Gemeinschaft', lat: 19.6467, lng: -99.2432},
			{name: 'Heroica Matamoros', desc: 'Die Grenzstadt', lat: 25.8694, lng: -97.5047},
			{name: 'General Escobedo', desc: 'Die Industriestadt', lat: 25.8125, lng: -100.3124},
			{name: 'Irapuato', desc: 'Die Agrarstadt', lat: 20.6763, lng: -101.3554},
			{name: 'Xalapa-Enríquez', desc: 'Die Bergstadt', lat: 19.5438, lng: -96.9102},
			{name: 'Tonalá', desc: 'Die Kunststadt', lat: 20.6231, lng: -103.233},
			{name: 'Mazatlán', desc: 'Die Badehochburg', lat: 23.2332, lng: -106.4066},
			{name: 'Nuevo Laredo', desc: 'Die Grenzstadt', lat: 27.4769, lng: -99.5164},
			{name: 'San Nicolás de los Garza', desc: 'Die Industriestadt', lat: 25.7343, lng: -100.3},
			{name: 'Veracruz', desc: 'Die Hafenstadt', lat: 19.1726, lng: -96.1332},
			{name: 'Ojo de Agua', desc: 'Die Stadt der Quellen', lat: 19.6583, lng: -99.005},
			{name: 'Xico', desc: 'Die Kaffeestadt', lat: 19.3446, lng: -98.9601},
			{name: 'Celaya', desc: 'Die Agrarstadt', lat: 20.5236, lng: -100.815},
			{name: 'Tepic', desc: 'Die Kolonialstadt', lat: 21.7514, lng: -104.8455},
			{name: 'Ixtapaluca', desc: 'Die Stadt des Wassers', lat: 19.3178, lng: -98.8854},
			{name: 'Cuernavaca', desc: 'Die Stadt des ewigen Frühlings', lat: 18.9242, lng: -99.2216},
			{name: 'Villahermosa', desc: 'Die Stadt des Wassers', lat: 17.9895, lng: -92.947},
			{name: 'Ciudad Victoria', desc: 'Die Landeshauptstadt', lat: 23.7369, lng: -99.1411},
			{name: 'Ensenada', desc: 'Die Hafenstadt', lat: 31.8666, lng: -116.5964},
			{name: 'Ciudad Obregón', desc: 'Die Agrarstadt', lat: 27.4862, lng: -109.9408},
			{name: 'Villa Nicolás Romero', desc: 'Die Stadt des Friedens', lat: 19.6333, lng: -99.3167},
			{
				name: 'Soledad de Graciano Sánchez',
				desc: 'Die Stadt der Sonne',
				lat: 22.2033,
				lng: -100.9398
			},
			{name: 'Juárez', desc: 'Die Grenzstadt', lat: 31.6904, lng: -106.4245},
			{name: 'Playa del Carmen', desc: 'Das Paradies', lat: 20.6296, lng: -87.0739},
			{name: 'Santa Catarina', desc: 'Die Stadt der Berge', lat: 25.6725, lng: -100.4569},
			{name: 'Gómez Palacio', desc: 'Die Industriestadt', lat: 25.5695, lng: -103.495},
			{name: 'Uruapan del Progreso', desc: 'Die Avocado-Stadt', lat: 19.4167, lng: -102.0667},
			{name: 'Los Mochis', desc: 'Die Stadt des Wassers', lat: 25.7933, lng: -108.996},
			{name: 'Pachuca de Soto', desc: 'Die Silberstadt', lat: 20.1011, lng: -98.7591},
			{name: 'Tampico', desc: 'Die Hafenstadt', lat: 22.2331, lng: -97.862},
			{name: 'Tehuacán', desc: 'Die Stadt des Wassers', lat: 18.4616, lng: -97.3928},
			{name: 'San Francisco Coacalco', desc: 'Die Stadt der Berge', lat: 19.6299, lng: -99.0845},
			{name: 'Heroica Nogales', desc: 'Die Grenzstadt', lat: 31.3155, lng: -110.9464},
			{name: 'Oaxaca de Juárez', desc: 'Die Kolonialstadt', lat: 17.0732, lng: -96.7266},
			{name: 'La Paz', desc: 'Die Paradiesstadt', lat: 24.1426, lng: -110.3128},
			{name: 'San Francisco de Campeche', desc: 'Die Kolonialstadt', lat: 19.8301, lng: -90.5349},
			{name: 'Monclova', desc: 'Die Industriestadt', lat: 26.9063, lng: -101.4206},
			{name: 'García', desc: 'Die Bergstadt', lat: 25.8125, lng: -100.3124},
			{name: 'Chilpancingo de los Bravo', desc: 'Die Bergstadt', lat: 17.5505, lng: -99.5051},
			{name: 'Puerto Vallarta', desc: 'Das Paradies', lat: 20.6534, lng: -105.2253},
			{name: 'Toluca de Lerdo', desc: 'Die Kolonialstadt', lat: 19.2926, lng: -99.6562},
			{name: 'Tapachula', desc: 'Die Stadt der Kaffeebohnen', lat: 14.9054, lng: -92.2623},
			{name: 'Buenavista', desc: 'Die Stadt der Freude', lat: 19.5016, lng: -99.1946},
			{name: 'Coatzacoalcos', desc: 'Die Hafenstadt', lat: 18.1345, lng: -94.458},
			{name: 'Ciudad Madero', desc: 'Die Stadt des Meeres', lat: 22.2753, lng: -97.8331},
			{name: 'Cabo San Lucas', desc: 'Das Paradies', lat: 22.8905, lng: -109.9167},
			{name: 'Chicoloapan', desc: 'Die Stadt der Farben', lat: 19.4322, lng: -98.9224},
			{name: 'Ciudad del Carmen', desc: 'Die Hafenstadt', lat: 18.6537, lng: -91.8244},
			{name: 'San Cristóbal de las Casas', desc: 'Die Kolonialstadt', lat: 16.737, lng: -92.6376},
			{name: 'Poza Rica de Hidalgo', desc: 'Die Ölstadt', lat: 20.5339, lng: -97.4595},
			{name: 'San Juan del Río', desc: 'Die Kolonialstadt', lat: 20.3846, lng: -99.9962},
			{name: 'San Luis Río Colorado', desc: 'Die Grenzstadt', lat: 32.4581, lng: -114.7719},
			{
				name: 'Chalco de Díaz Covarrubias',
				desc: 'Die Stadt der Tradition',
				lat: 19.2629,
				lng: -98.8979
			},
			{name: 'Jiutepec', desc: 'Die Stadt der Seen', lat: 18.8742, lng: -99.161},
			{name: 'Piedras Negras', desc: 'Die Grenzstadt', lat: 28.7073, lng: -100.5178},
			{name: 'Guadalupe', desc: 'Die Stadt des Wassers', lat: 25.6763, lng: -100.255},
			{name: 'Chetumal', desc: 'Die Tropenstadt', lat: 18.5087, lng: -88.3037},
			{name: 'Salamanca', desc: 'Die Industriestadt', lat: 20.5704, lng: -101.1911},
			{name: 'Ciudad Acuña', desc: 'Die Grenzstadt', lat: 29.3233, lng: -100.9528},
			{name: 'Manzanillo', desc: 'Die Hafenstadt', lat: 19.1136, lng: -104.3586},
			{
				name: 'San Pablo de las Salinas',
				desc: 'Die Stadt der Farben',
				lat: 19.6789,
				lng: -99.0869
			},
			{name: 'Cuautla', desc: 'Die Stadt der Tradition', lat: 18.8131, lng: -98.9546},
			{name: 'Zamora de Hidalgo', desc: 'Die Stadt der Tradition', lat: 19.9927, lng: -102.2924},
			{name: 'Villa de Álvarez', desc: 'Die Stadt des Wassers', lat: 19.2673, lng: -103.7446},
			{name: 'Colima', desc: 'Die Vulkanstadt', lat: 19.2433, lng: -103.7243},
			{name: 'Fresnillo', desc: 'Die Silberstadt', lat: 23.1742, lng: -102.8669},
			{name: 'Kanasín', desc: 'Die Landstadt', lat: 20.9172, lng: -89.6411},
			{name: 'Hacienda Santa Fe', desc: 'Die Stadt der Wärme', lat: 20.6788, lng: -103.3556},
			{name: 'Córdoba', desc: 'Die Kaffeestadt', lat: 18.8843, lng: -96.9366},
			{name: 'Zacatecas', desc: 'Die Bergstadt', lat: 22.7709, lng: -102.5832},
			{name: 'Ciudad Valles', desc: 'Die Stadt der Berge', lat: 21.9864, lng: -99.013},
			{name: 'San José del Cabo', desc: 'Das Paradies', lat: 23.0633, lng: -109.6926},
			{name: 'Ciudad Cuauhtémoc', desc: 'Die Landstadt', lat: 28.4252, lng: -106.8691},
			{
				name: 'Naucalpan de Juárez (municipio de Huixquilucan)',
				desc: 'Die Vorstadt',
				lat: 19.4062,
				lng: -99.258
			},
			{name: 'Iguala', desc: 'Die Stadt der Revolution', lat: 18.3458, lng: -99.5413},
			{
				name: 'San Pedro Garza García',
				desc: 'Die Stadt der Reichen',
				lat: 25.657,
				lng: -100.4021
			},
			{
				name: 'Veracruz (municipio de Boca del Río)',
				desc: 'Die Hafenstadt',
				lat: 19.1016,
				lng: -96.096
			},
			{name: 'Delicias', desc: 'Die Agrarstadt', lat: 28.1904, lng: -105.4705},
			{name: 'Navojoa', desc: 'Die Agrarstadt', lat: 27.0679, lng: -109.4441},
			{name: 'Tepexpan', desc: 'Die Archäologiestadt', lat: 19.6411, lng: -99.1668},
			{name: 'Orizaba', desc: 'Die Stadt der Wasserfälle', lat: 18.8477, lng: -97.1004},
			{name: 'Cuautitlán', desc: 'Die Gemeinschaft', lat: 19.6728, lng: -99.1762},
			{name: 'Guaymas', desc: 'Die Hafenstadt', lat: 27.9217, lng: -110.8957},
			{name: 'El Pueblito', desc: 'Die Stadt der Tradition', lat: 20.5811, lng: -100.4345},
			{name: 'Ramos Arizpe', desc: 'Die Industriestadt', lat: 25.5501, lng: -100.9655},
			{name: 'Hidalgo del Parral', desc: 'Die Silberstadt', lat: 26.9247, lng: -105.664},
			{name: 'Comitán de Domínguez', desc: 'Die Kolonialstadt', lat: 16.2501, lng: -92.1372},
			{name: 'Ciudad Guzmán', desc: 'Die Landstadt', lat: 19.705, lng: -103.4612},
			{name: 'Lagos de Moreno', desc: 'Die Kolonialstadt', lat: 21.3578, lng: -101.9221},
			{name: 'Río Bravo', desc: 'Die Grenzstadt', lat: 25.9996, lng: -98.1127},
			{name: 'Tulancingo de Bravo', desc: 'Die Stadt der Tradition', lat: 20.084, lng: -98.3581},
			{name: 'Temixco', desc: 'Die Stadt der Erholung', lat: 18.85, lng: -99.2333},
			{
				name: 'San Juan Bautista Tuxtepec',
				desc: 'Die Stadt des Wassers',
				lat: 18.0858,
				lng: -96.1297
			},
			{
				name: 'Apatzingán de la Constitución',
				desc: 'Die Stadt der Kultur',
				lat: 19.0848,
				lng: -102.3486
			},
			{
				name: 'Cholula de Rivadavia',
				desc: 'Die Stadt der Pyramiden',
				lat: 19.0641,
				lng: -98.3035
			},
			{name: 'Minatitlán', desc: 'Die Ölstadt', lat: 17.9892, lng: -94.5532},
			{name: 'Rosarito', desc: 'Die Badehochburg', lat: 32.3334, lng: -117.0293}
		]
	},
	pakistan100k: {
		name: 'Großstädte Pakistans',
		aiGenerated: true,
		values: [
			{name: 'Karachi', desc: 'Die Stadt am Meer', lat: 24.8607, lng: 67.0011},
			{name: 'Lahore', desc: 'Die Stadt der Gärten', lat: 31.5497, lng: 74.3436},
			{name: 'Faisalabad', desc: 'Die Stadt der Textilien', lat: 31.4504, lng: 73.135},
			{name: 'Rawalpindi', desc: 'Die Garnisonsstadt', lat: 33.5651, lng: 73.0169},
			{name: 'Gujranwala', desc: 'Die Industriestadt', lat: 32.1617, lng: 74.1883},
			{name: 'Peshawar', desc: 'Die Stadt der Blumen', lat: 34.0151, lng: 71.5249},
			{name: 'Multan', desc: 'Die Stadt der Heiligen', lat: 30.1575, lng: 71.5249},
			{name: 'Hyderabad', desc: 'Die Stadt am Fluss', lat: 25.3792, lng: 68.3682},
			{name: 'Islamabad', desc: 'Die Grüne Hauptstadt', lat: 33.6844, lng: 73.0479},
			{name: 'Quetta', desc: 'Die Obststadt', lat: 30.1798, lng: 66.975},
			{name: 'Bahawalpur', desc: 'Die Stadt der Paläste', lat: 29.3955, lng: 71.6724},
			{name: 'Sargodha', desc: 'Die Stadt der Adler', lat: 32.0836, lng: 72.6711},
			{name: 'Sialkot', desc: 'Die Stadt der Handwerker', lat: 32.4942, lng: 74.5225},
			{name: 'Sukkur', desc: 'Die Stadt der Brücken', lat: 27.7136, lng: 68.8304},
			{name: 'Larkana', desc: 'Die Stadt der Legenden', lat: 27.558, lng: 68.2141},
			{name: 'Sheikhupura', desc: 'Die Stadt der Träume', lat: 31.7131, lng: 73.9783},
			{name: 'Rahim Yar Khan', desc: 'Die Stadt der Pfade', lat: 28.4202, lng: 70.2957},
			{name: 'Jhang', desc: 'Die Stadt der Musik', lat: 31.273, lng: 72.3217},
			{name: 'Dera Ghazi Khan', desc: 'Die Stadt der Derwische', lat: 30.0572, lng: 70.6348},
			{name: 'Gujrat', desc: 'Die Stadt der Festungen', lat: 32.5748, lng: 74.079},
			{name: 'Sahiwal', desc: 'Die Stadt der Söhne', lat: 30.6655, lng: 73.109},
			{name: 'Wah Cantonment', desc: 'Die Stadt der Soldaten', lat: 33.7981, lng: 72.8205},
			{name: 'Mardan', desc: 'Die Stadt der Tapferen', lat: 34.2051, lng: 72.0438},
			{name: 'Kasur', desc: 'Die Stadt der Liebe', lat: 31.1154, lng: 74.446},
			{name: 'Okara', desc: 'Die Stadt der Rosen', lat: 30.8104, lng: 73.4594},
			{name: 'Mingora', desc: 'Die Stadt der Schönheit', lat: 35.3075, lng: 72.4741},
			{name: 'Nawabshah', desc: 'Die Stadt der Palmen', lat: 26.244, lng: 68.4095},
			{name: 'Chiniot', desc: 'Die Stadt der Handwerker', lat: 31.7221, lng: 72.9785},
			{name: 'Kotri', desc: 'Die Stadt am Fluss', lat: 25.362, lng: 68.309},
			{name: 'Kamoke', desc: 'Die Stadt der Brüder', lat: 31.9744, lng: 74.2243},
			{name: 'Hafizabad', desc: 'Die Stadt der Weisen', lat: 32.0707, lng: 73.681},
			{name: 'Sadiqabad', desc: 'Die Stadt der Freiheit', lat: 28.3076, lng: 70.1307},
			{name: 'Mirpur Khas', desc: 'Die Stadt der Träume', lat: 25.5308, lng: 69.0157},
			{name: 'Burewala', desc: 'Die Stadt der Segler', lat: 30.1591, lng: 72.6849},
			{name: 'Kohat', desc: 'Die Stadt der Soldaten', lat: 33.5961, lng: 71.4394},
			{name: 'Khanewal', desc: 'Die Stadt der Flüsse', lat: 30.3019, lng: 71.9322},
			{name: 'Dera Ismail Khan', desc: 'Die Stadt der Diamanten', lat: 31.8329, lng: 70.9093},
			{name: 'Turbat', desc: 'Die Stadt der Ruhe', lat: 26.0032, lng: 63.0496},
			{name: 'Muzaffargarh', desc: 'Die Stadt der Flüsse', lat: 30.0756, lng: 71.1924},
			{name: 'Abbottabad', desc: 'Die Stadt der Berge', lat: 34.1566, lng: 73.2407},
			{name: 'Mandi Bahauddin', desc: 'Die Stadt der Landwirte', lat: 32.5875, lng: 73.4919},
			{name: 'Shikarpur', desc: 'Die Stadt der Rosen', lat: 27.9572, lng: 68.6379},
			{name: 'Jacobabad', desc: 'Die Stadt des Windes', lat: 28.2771, lng: 68.4396},
			{name: 'Jhelum', desc: 'Die Stadt der Tapferen', lat: 32.9349, lng: 73.731},
			{name: 'Khanpur', desc: 'Die Stadt der Traditionen', lat: 28.6448, lng: 70.6623},
			{name: 'Khairpur', desc: 'Die Stadt der Legenden', lat: 27.5291, lng: 68.7616},
			{name: 'Khuzdar', desc: 'Die Stadt der Berge', lat: 27.8076, lng: 66.6223},
			{name: 'Pakpattan', desc: 'Die Stadt der Heiligen', lat: 30.3455, lng: 73.3948},
			{name: 'Hub', desc: 'Die Stadt der Industrie', lat: 25.0358, lng: 66.8897},
			{name: 'Daska', desc: 'Die Stadt der Rosen', lat: 32.3255, lng: 74.3464},
			{name: 'Gojra', desc: 'Die Stadt der Blumen', lat: 31.1482, lng: 72.6849},
			{name: 'Dadu', desc: 'Die Stadt des Wassers', lat: 26.7349, lng: 67.7758},
			{name: 'Muridke', desc: 'Die Stadt der Hoffnung', lat: 31.7954, lng: 74.2569},
			{name: 'Bahawalnagar', desc: 'Die Stadt der Farben', lat: 29.9987, lng: 73.2547},
			{name: 'Samundri', desc: 'Die Stadt der Freiheit', lat: 31.0341, lng: 72.1026},
			{name: 'Tando Allahyar', desc: 'Die Stadt der Traditionen', lat: 25.4602, lng: 68.7191},
			{name: 'Tando Adam', desc: 'Die Stadt des Glücks', lat: 25.7616, lng: 68.5391},
			{name: 'Jaranwala', desc: 'Die Stadt der Träume', lat: 31.3342, lng: 73.421},
			{name: 'Chishtian', desc: 'Die Stadt der Eleganz', lat: 29.7972, lng: 72.868},
			{name: 'Attock', desc: 'Die Stadt der Festungen', lat: 33.7738, lng: 72.3715},
			{name: 'Vehari', desc: 'Die Stadt der Hoffnung', lat: 30.0321, lng: 72.3451},
			{name: 'Kot Abdul Malik', desc: 'Die Stadt der Freude', lat: 31.4391, lng: 74.2972},
			{name: 'Ferozewala', desc: 'Die Stadt der Träume', lat: 31.5156, lng: 73.154},
			{name: 'Chakwal', desc: 'Die Stadt der Hoffnung', lat: 32.9336, lng: 72.8584},
			{name: 'Gujranwala Cantonment', desc: 'Die Stadt der Soldaten', lat: 32.1772, lng: 74.1883},
			{name: 'Kamalia', desc: 'Die Stadt der Träume', lat: 30.7306, lng: 72.6505},
			{name: 'Umerkot', desc: 'Die Stadt der Könige', lat: 25.3614, lng: 69.7369},
			{name: 'Ahmadpur East', desc: 'Die Stadt der Hoffnung', lat: 29.1461, lng: 71.2604},
			{name: 'Kot Addu', desc: 'Die Stadt der Blumen', lat: 30.4709, lng: 70.9649},
			{name: 'Wazirabad', desc: 'Die Stadt der Brücken', lat: 32.4433, lng: 74.115},
			{name: 'Mansehra', desc: 'Die Stadt der Berge', lat: 34.3419, lng: 73.1968},
			{name: 'Layyah', desc: 'Die Stadt der Legenden', lat: 30.9707, lng: 70.9496},
			{name: 'Swabi', desc: 'Die Stadt der Krieger', lat: 34.1183, lng: 72.4689},
			{name: 'Chaman', desc: 'Die Grenzstadt', lat: 30.9235, lng: 66.4498},
			{name: 'Taxila', desc: 'Die Stadt der Geschichte', lat: 33.7556, lng: 72.8299},
			{name: 'Nowshera', desc: 'Die Stadt der Tapferen', lat: 34.006, lng: 71.9829},
			{name: 'Khushab', desc: 'Die Stadt der Traditionen', lat: 32.2969, lng: 72.3522},
			{name: 'Shahdadkot', desc: 'Die Stadt der Paläste', lat: 27.8505, lng: 67.9067},
			{name: 'Mianwali', desc: 'Die Stadt der Falken', lat: 32.5853, lng: 71.5486},
			{name: 'Kabal', desc: 'Die Stadt der Ruhe', lat: 34.8631, lng: 71.7886},
			{name: 'Lodhran', desc: 'Die Stadt der Hoffnung', lat: 29.5422, lng: 71.6335},
			{name: 'Hasilpur', desc: 'Die Stadt der Träume', lat: 29.7192, lng: 72.554},
			{name: 'Charsadda', desc: 'Die Stadt der Blumen', lat: 34.1466, lng: 71.7447},
			{name: 'Bhakkar', desc: 'Die Stadt der Traditionen', lat: 31.6202, lng: 71.0659},
			{name: 'Badin', desc: 'Die Stadt der Seen', lat: 24.6554, lng: 68.838},
			{name: 'Arifwala', desc: 'Die Stadt der Landwirtschaft', lat: 30.2887, lng: 73.0483},
			{name: 'Ghotki', desc: 'Die Stadt der Träume', lat: 28.006, lng: 69.3154},
			{name: 'Sambrial', desc: 'Die Stadt der Brücken', lat: 32.4678, lng: 74.37},
			{name: 'Jatoi', desc: 'Die Stadt der Hoffnung', lat: 29.5776, lng: 71.2983},
			{name: 'Harunabad', desc: 'Die Stadt der Sterne', lat: 29.6124, lng: 73.0305},
			{name: 'Daharki', desc: 'Die Stadt des Flusses', lat: 28.9136, lng: 69.5434},
			{name: 'Narowal', desc: 'Die Stadt der Traditionen', lat: 32.1023, lng: 74.8737},
			{name: 'Tando Muhammad Khan', desc: 'Die Stadt der Sonne', lat: 25.1241, lng: 68.5337},
			{name: 'Kamber Ali Khan', desc: 'Die Stadt der Freiheit', lat: 27.9304, lng: 68.5672},
			{name: 'Mirpur Mathelo', desc: 'Die Stadt der Träume', lat: 28.0171, lng: 69.1724},
			{name: 'Kandhkot', desc: 'Die Stadt des Flusses', lat: 28.243, lng: 69.1792},
			{name: 'Bhalwal', desc: 'Die Stadt der Hoffnung', lat: 32.2727, lng: 72.8978}
		]
	},
	germanyInteresting: {
		name: 'Interessante deutsche Städte',
		aiGenerated: true,
		values: [
			{"name": "Berlin", "desc": "Hauptstadt Deutschlands", "lat": 52.52001, "lng": 13.40495},
			{"name": "München", "desc": "Bayerische Metropole", "lat": 48.13513, "lng": 11.58198},
			{"name": "Hamburg", "desc": "Hafenstadt an der Elbe", "lat": 53.55108, "lng": 9.99368},
			{"name": "Köln", "desc": "Domstadt am Rhein", "lat": 50.93753, "lng": 6.96028},
			{"name": "Frankfurt am Main", "desc": "Finanzzentrum", "lat": 50.11092, "lng": 8.68213},
			{"name": "Stuttgart", "desc": "Automobilstadt", "lat": 48.77585, "lng": 9.18293},
			{"name": "Düsseldorf", "desc": "Modestadt am Rhein", "lat": 51.22774, "lng": 6.77346},
			{"name": "Dresden", "desc": "Elbflorenz", "lat": 51.05041, "lng": 13.73726},
			{"name": "Leipzig", "desc": "Messestadt", "lat": 51.33970, "lng": 12.37307},
			{"name": "Hannover", "desc": "Expo-Stadt", "lat": 52.37589, "lng": 9.73201},
			{"name": "Nürnberg", "desc": "Historische Stadt", "lat": 49.45210, "lng": 11.07666},
			{"name": "Bremen", "desc": "Hansestadt", "lat": 53.07930, "lng": 8.80169},
			{"name": "Essen", "desc": "Kulturhauptstadt", "lat": 51.45564, "lng": 7.01156},
			{"name": "Dortmund", "desc": "Industriestadt", "lat": 51.51359, "lng": 7.46530},
			{"name": "Kiel", "desc": "Hafenstadt an der Ostsee", "lat": 54.32329, "lng": 10.12277},
			{"name": "Magdeburg", "desc": "Ottostadt", "lat": 52.12053, "lng": 11.62762},
			{"name": "Freiburg im Breisgau", "desc": "Tor zum Schwarzwald", "lat": 47.99901, "lng": 7.84210},
			{"name": "Rostock", "desc": "Hansestadt", "lat": 54.09244, "lng": 12.09915},
			{"name": "Potsdam", "desc": "Schloss Sanssouci", "lat": 52.39057, "lng": 13.06447},
			{"name": "Münster", "desc": "Fahrradstadt", "lat": 51.96066, "lng": 7.62613},
			{"name": "Mainz", "desc": "Weinstadt", "lat": 49.99286, "lng": 8.24725},
			{"name": "Erfurt", "desc": "Landeshauptstadt Thüringen", "lat": 50.98477, "lng": 11.02988},
			{"name": "Wiesbaden", "desc": "Kurstadt", "lat": 50.08258, "lng": 8.24096},
			{"name": "Regensburg", "desc": "UNESCO-Welterbe", "lat": 49.01343, "lng": 12.10162},
			{"name": "Garmisch-Partenkirchen", "desc": "Zugspitze", "lat": 47.49265, "lng": 11.09549},
			{"name": "Bremerhaven", "desc": "Havenwelten", "lat": 53.53958, "lng": 8.58094},
			{"name": "Würzburg", "desc": "Residenz", "lat": 49.79130, "lng": 9.95335},
			{"name": "Heidelberg", "desc": "Schloss Heidelberg", "lat": 49.39875, "lng": 8.67243},
			{"name": "Saarbrücken", "desc": "Hauptstadt des Saarlands", "lat": 49.24016, "lng": 6.99693},
			{"name": "Koblenz", "desc": "Deutsches Eck", "lat": 50.35694, "lng": 7.58897},
			{"name": "Flensburg", "desc": "Fördestadt", "lat": 54.78521, "lng": 9.43961},
			{"name": "Chemnitz", "desc": "Stadt der Moderne", "lat": 50.82784, "lng": 12.92137},
			{"name": "Lübeck", "desc": "Marzipanstadt", "lat": 53.86547, "lng": 10.68656},
			{"name": "Füssen", "desc": "Neuschwanstein", "lat": 47.57139, "lng": 10.70171},
			{"name": "Trier", "desc": "Älteste Stadt Deutschlands", "lat": 49.74999, "lng": 6.63714},
			{"name": "Osnabrück", "desc": "Friedensstadt", "lat": 52.27991, "lng": 8.04718},
			{"name": "Weimar", "desc": "Klassische Stadt", "lat": 50.97949, "lng": 11.32354},
			{"name": "Bonn", "desc": "Beethovenstadt", "lat": 50.73743, "lng": 7.09821},
			{"name": "Augsburg", "desc": "Renaissance Stadt", "lat": 48.37054, "lng": 10.89779},
			{"name": "Lindau", "desc": "Inselstadt im Bodensee", "lat": 47.54479, "lng": 9.68394},
			{"name": "Cottbus", "desc": "Tor zum Spreewald", "lat": 51.75631, "lng": 14.33287},
			{"name": "Passau", "desc": "Dreiflüssestadt", "lat": 48.56636, "lng": 13.43194},
			{"name": "Konstanz", "desc": "Bodenseestadt", "lat": 47.66356, "lng": 9.17582},
			{"name": "Wismar", "desc": "Hafenstadt an der Ostsee", "lat": 53.89163, "lng": 11.46473},
			{"name": "Stralsund", "desc": "Tor zur Insel Rügen", "lat": 54.30910, "lng": 13.08100},
			{"name": "Kassel", "desc": "Herkules Denkmal", "lat": 51.31271, "lng": 9.47975},
			{"name": "Greifswald", "desc": "Universitätsstadt", "lat": 54.09301, "lng": 13.38786},
			{"name": "Schwerin", "desc": "Schloss Schwerin", "lat": 53.62937, "lng": 11.41315},
			{"name": "Rüdesheim am Rhein", "desc": "Weinstadt", "lat": 49.98177, "lng": 7.92222},
			{"name": "Ulm", "desc": "Ulmer Münster", "lat": 48.40108, "lng": 9.98761},
			{"name": "Friedrichshafen", "desc": "Zeppelin Museum", "lat": 47.65670, "lng": 9.48020},
			{"name": "Halle (Saale)", "desc": "Salzstadt", "lat": 51.48220, "lng": 11.97362},
			{"name": "Göttingen", "desc": "Universitätsstadt", "lat": 51.54128, "lng": 9.91580},
			{"name": "Jena", "desc": "Lichtstadt", "lat": 50.92705, "lng": 11.58924},
			{"name": "Bamberg", "desc": "UNESCO-Welterbe", "lat": 49.89873, "lng": 10.90067},
			{"name": "Bayreuth", "desc": "Festspielstadt", "lat": 49.94708, "lng": 11.57893},
			{"name": "Tübingen", "desc": "Universitätsstadt", "lat": 48.52164, "lng": 9.05765},
			{"name": "Lüneburg", "desc": "Salzstadt", "lat": 53.24694, "lng": 10.41420},
			{"name": "Schwäbisch Hall", "desc": "Historische Stadt", "lat": 49.11245, "lng": 9.74093},
			{"name": "Bad Kreuznach", "desc": "Kurstadt", "lat": 49.84161, "lng": 7.86719},
			{"name": "Bad Tölz", "desc": "Bayerische Alpen", "lat": 47.76114, "lng": 11.55837},
			{"name": "Worms", "desc": "Nibelungenstadt", "lat": 49.63251, "lng": 8.35748},
			{"name": "Oldenburg", "desc": "Universitätsstadt", "lat": 53.14345, "lng": 8.21455},
			{"name": "Goslar", "desc": "Kaiserstadt", "lat": 51.90414, "lng": 10.42782},
			{"name": "Speyer", "desc": "Domstadt", "lat": 49.31794, "lng": 8.44122},
			{"name": "Dessau-Roßlau", "desc": "Bauhausstadt", "lat": 51.83863, "lng": 12.24555},
			{"name": "Rothenburg ob der Tauber", "desc": "Mittelalterliche Stadt", "lat": 49.37848, "lng": 10.17855},
			{"name": "Celle", "desc": "Fachwerkstadt", "lat": 52.62264, "lng": 10.08045},
			{"name": "Quedlinburg", "desc": "Fachwerkstadt", "lat": 51.79048, "lng": 11.13473},
			{"name": "Lüchow", "desc": "Wendland", "lat": 52.96724, "lng": 11.15346},
			{"name": "Nordhausen", "desc": "Harzstadt", "lat": 51.49667, "lng": 10.79272},
			{"name": "Kempten", "desc": "Allgäu", "lat": 47.71670, "lng": 10.31390},
			{"name": "Bad Reichenhall", "desc": "Kurstadt in den Alpen", "lat": 47.72580, "lng": 12.87645},
			{"name": "Neubrandenburg", "desc": "Vier Tore Stadt", "lat": 53.55720, "lng": 13.26137},
			{"name": "Paderborn", "desc": "Domstadt", "lat": 51.71892, "lng": 8.75751},
			{"name": "Ingolstadt", "desc": "Audistadt", "lat": 48.76508, "lng": 11.42372},
			{"name": "Gera", "desc": "Otto-Dix-Stadt", "lat": 50.87723, "lng": 12.08187},
			{"name": "Siegen", "desc": "Universitätsstadt", "lat": 50.87482, "lng": 8.02431},
			{"name": "Heilbronn", "desc": "Weinstadt", "lat": 49.14269, "lng": 9.21088},
			{"name": "Wittenberg", "desc": "Lutherstadt", "lat": 51.86421, "lng": 12.64757},
			{"name": "Freising", "desc": "Domberg", "lat": 48.40289, "lng": 11.74848},
			{"name": "Hildesheim", "desc": "UNESCO-Welterbe", "lat": 52.15478, "lng": 9.95768},
			{"name": "Ravensburg", "desc": "Puzzlestadt", "lat": 47.78198, "lng": 9.61090},
			{"name": "Landshut", "desc": "Burg Trausnitz", "lat": 48.54419, "lng": 12.14685},
			{"name": "Hameln", "desc": "Rattenfängerstadt", "lat": 52.10595, "lng": 9.35878},
			{"name": "Baden-Baden", "desc": "Kurstadt", "lat": 48.76092, "lng": 8.23966},
			{"name": "Memmingen", "desc": "Tor zum Allgäu", "lat": 47.98638, "lng": 10.18136},
			{"name": "Marburg", "desc": "Universitätsstadt", "lat": 50.80217, "lng": 8.76679},
			{"name": "Bad Homburg", "desc": "Kurstadt", "lat": 50.22662, "lng": 8.61806},
			{"name": "Singen", "desc": "Hohentwiel", "lat": 47.76476, "lng": 8.85209},
			{"name": "Meißen", "desc": "Porzellanstadt", "lat": 51.16114, "lng": 13.47310},
			{"name": "Bautzen", "desc": "Historische Stadt", "lat": 51.18194, "lng": 14.42264}
		]
	}
} satisfies Partial<Record<string, PointList>>;

export default presets;
