import type { NamedPoint } from '../../geom/coordPoint';

function wikiCoord(coord: string): number {
	let deg, min, sec;
	if (coord.endsWith("″")) {
		[deg, min, sec] = coord
			.split(' ')
			.map((s) => s.substring(0, s.length - 1))
			.map(Number);
	} else {
		[deg, min, sec] = coord
			.split("/")
			.slice(0, 3)
			.map(Number);
	}
	return deg + min / 60 + sec / 3600;
}

export type PointList = {
	name: string;
	aiGenerated?: boolean;
	rotation?: number;
	values: NamedPoint[];
	desc?: string;
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
			{ lat: wikiCoord("51/13/44/N"), lng: wikiCoord("6/46/25/E"), desc: "4352 Einwohner", name: "Altstadt" },
			{ lat: wikiCoord("51/19/47.885/N"), lng: wikiCoord("6/46/48.392/E"), desc: "6035 Einwohner", name: "Angermund" },
			{ lat: wikiCoord("51/09/41/N"), lng: wikiCoord("6/52/26/E"), desc: "15905 Einwohner", name: "Benrath" },
			{ lat: wikiCoord("51/12/29/N"), lng: wikiCoord("6/46/36/E"), desc: "7500 Einwohner", name: "Bilk" },
			{ lat: wikiCoord("51/13/22.361/N"), lng: wikiCoord("6/46/15.794/E"), desc: "2317 Einwohner", name: "Carlstadt" },
			{ lat: wikiCoord("51/14/38.494/N"), lng: wikiCoord("6/47/32.579/E"), desc: "2317 Einwohner", name: "Derendorf" },
			{ lat: wikiCoord("51/14/12/N"), lng: wikiCoord("6/48/34/E"), desc: "7500 Einwohner", name: "Düsseltal" },
			{ lat: wikiCoord("51/12/02/N"), lng: wikiCoord("6/50/20/E"), desc: "10000 Einwohner", name: "Eller" },
			{ lat: wikiCoord("51/11/16/N"), lng: wikiCoord("6/46/20/E"), desc: "10000 Einwohner", name: "Flehe" },
			{ lat: wikiCoord("51/13/42/N"), lng: wikiCoord("6/48/53/E"), desc: "10000 Einwohner", name: "Flingern Nord" },
			{ lat: wikiCoord("51/13/15/N"), lng: wikiCoord("6/48/32/E"), desc: "10000 Einwohner", name: "Flingern Süd" },
			{ lat: wikiCoord("51/12/44/N"), lng: wikiCoord("6/46/50/E"), desc: "17864 Einwohner", name: "Friedrichstadt" },
			{ lat: wikiCoord("51/08/47/N"), lng: wikiCoord("6/53/40/E"), desc: "21000 Einwohner", name: "Garath" },
			{ lat: wikiCoord("51/14/22/N"), lng: wikiCoord("6/51/58/E"), desc: "574000 Einwohner", name: "Gerresheim" },
			{ lat: wikiCoord("51/14/36.074/N"), lng: wikiCoord("6/46/20.586/E"), desc: "10248 Einwohner", name: "Golzheim" },
			{ lat: wikiCoord("51/14/27/N"), lng: wikiCoord("6/49/29/E"), desc: "7500 Einwohner", name: "Grafenberg" },
			{ lat: wikiCoord("51/13/9/N"), lng: wikiCoord("6/45/28/E"), desc: "139 Einwohner", name: "Hafen" },
			{ lat: wikiCoord("51/12/18/N"), lng: wikiCoord("6/44/40/E"), desc: "3679 Einwohner", name: "Hamm" },
			{ lat: wikiCoord("51/10/45/N"), lng: wikiCoord("6/52/25/E"), desc: "17538 Einwohner", name: "Hassels" },
			{ lat: wikiCoord("51/13/42.197/N"), lng: wikiCoord("6/42/57.269/E"), desc: "9445 Einwohner", name: "Heerdt" },
			{ lat: wikiCoord("51/7/56/N"), lng: wikiCoord("6/54/23/E"), desc: "6462 Einwohner", name: "Hellerhof" },
			{ lat: wikiCoord("51/10/22/N"), lng: wikiCoord("6/48/35/E"), desc: "1302 Einwohner", name: "Himmelgeist" },
			{ lat: wikiCoord("51/10/18.516/N"), lng: wikiCoord("6/49/53.789/E"), desc: "12000 Einwohner", name: "Holthausen" },
			{ lat: wikiCoord("51/15/24/N"), lng: wikiCoord("6/54/38/E"), desc: "3559 Einwohner", name: "Hubbelrath" },
			{ lat: wikiCoord("51/9/54/N"), lng: wikiCoord("6/48/54/E"), desc: "1717 Einwohner", name: "Itter" },
			{ lat: wikiCoord("51/18/0/N"), lng: wikiCoord("6/44/21/E"), desc: "7712 Einwohner", name: "Kaiserswerth" },
			{ lat: wikiCoord("51/18/23/N"), lng: wikiCoord("6/45/45/E"), desc: "1890 Einwohner", name: "Kalkum" },
			{ lat: wikiCoord("51/16/04/N"), lng: wikiCoord("6/52/21/E"), desc: "7712 Einwohner", name: "Knittkuhl" },
			{ lat: wikiCoord("51/14/47/N"), lng: wikiCoord("6/43/40/E"), desc: "7382 Einwohner", name: "Lörick" },
			{ lat: wikiCoord("51/16//N"), lng: wikiCoord("6/47//E"), desc: "5773 Einwohner", name: "Lichtenbroich" },
			{ lat: wikiCoord("51/12/33/N"), lng: wikiCoord("6/49/39/E"), desc: "9660 Einwohner", name: "Lierenfeld" },
			{ lat: wikiCoord("51/16/50.941/N"), lng: wikiCoord("6/44/12.044/E"), desc: "4009 Einwohner", name: "Lohausen" },
			{ lat: wikiCoord("51/15/25.877/N"), lng: wikiCoord("6/51/50.897/E"), desc: "6910 Einwohner", name: "Ludenberg" },
			{ lat: wikiCoord("51/15/18.529/N"), lng: wikiCoord("6/48/28.508/E"), desc: "13820 Einwohner", name: "Mörsenbroich" },
			{ lat: wikiCoord("51/14/24.374/N"), lng: wikiCoord("6/44/59.939/E"), desc: "5590 Einwohner", name: "Niederkassel" },
			{ lat: wikiCoord("51/12/57.96/N"), lng: wikiCoord("6/48/13.07/E"), desc: "27570 Einwohner", name: "Oberbilk" },
			{ lat: wikiCoord("51/13/48.968/N"), lng: wikiCoord("6/45/17.860/E"), desc: "16800 Einwohner", name: "Oberkassel" },
			{ lat: wikiCoord("51/14/16.926/N"), lng: wikiCoord("6/47/12.649/E"), desc: "27345 Einwohner", name: "Pempelfort" },
			{ lat: wikiCoord("51/15/58/N"), lng: wikiCoord("6/48/51/E"), desc: "18557 Einwohner", name: "Rath" },
			{ lat: wikiCoord("51/10/35.368/N"), lng: wikiCoord("6/51/57.074/E"), desc: "10485 Einwohner", name: "Reisholz" },
			{ lat: wikiCoord("51/13/27.973/N"), lng: wikiCoord("6/47/13.114/E"), desc: "7500 Einwohner", name: "Stadtmitte" },
			{ lat: wikiCoord("51/15/35.741/N"), lng: wikiCoord("6/45/12.298/E"), desc: "4894 Einwohner", name: "Stockum" },
			{ lat: wikiCoord("51/12/22/N"), lng: wikiCoord("6/54/00/E"), desc: "7500 Einwohner", name: "Unterbach" },
			{ lat: wikiCoord("51/12/29/N"), lng: wikiCoord("6/46/36/E"), desc: "7500 Einwohner", name: "Unterbilk" },
			{ lat: wikiCoord("51/16/24.654/N"), lng: wikiCoord("6/47/26.092/E"), desc: "20798 Einwohner", name: "Unterrath" },
			{ lat: wikiCoord("51/8/44.527/N"), lng: wikiCoord("6/52/1.4016/E"), desc: "10485 Einwohner", name: "Urdenbach" },
			{ lat: wikiCoord("51/12/39.492/N"), lng: wikiCoord("6/51/35.755/E"), desc: "9851 Einwohner", name: "Vennhausen" },
			{ lat: wikiCoord("51/11/17.786/N"), lng: wikiCoord("6/45/49.687/E"), desc: "2173 Einwohner", name: "Volmerswerth" },
			{ lat: wikiCoord("51/10/53.965/N"), lng: wikiCoord("6/48/59.098/E"), desc: "26788 Einwohner", name: "Wersten" },
			{ lat: wikiCoord("51/19/7/N"), lng: wikiCoord("6/44/36/E"), desc: "7465 Einwohner", name: "Wittlaer" },
		],
	},
	aachen1: {
		name: 'Aachen simpel',
		// prettier-ignore
		values: [
		{ name: 'Aachener Dom', lat: 50.7745, lng: 6.08382 },
		{ name: 'Informatik-Fakultät', lat: 50.77932, lng: 6.05888 }
		]
	},
	nrw: {
		name: "Städte in NRW",
		values: [
		  {
			"name": "Köln",
			"desc": "Die bevölkerungsreichste Stadt in Nordrhein-Westfalen und die viertgrößte Stadt Deutschlands.",
			"lat": 50.9375,
			"lng": 6.9603
		  },
		  {
			"name": "Düsseldorf",
			"desc": "Die Landeshauptstadt Nordrhein-Westfalens und ein bedeutendes Wirtschafts- und Kulturzentrum.",
			"lat": 51.2277,
			"lng": 6.7735
		  },
		  {
			"name": "Dortmund",
			"desc": "Eine Stadt mit einer starken Industriegeschichte und einer der wichtigsten Wirtschaftsstandorte im Ruhrgebiet.",
			"lat": 51.5136,
			"lng": 7.4653
		  },
		  {
			"name": "Essen",
			"desc": "Früher ein Zentrum der Montanindustrie, heute ein wichtiger Standort für Dienstleistungen und Handel.",
			"lat": 51.4556,
			"lng": 7.0116
		  },
		  {
			"name": "Duisburg",
			"desc": "Eine Hafenstadt und ein wichtiger Logistikstandort am Rhein und an der Ruhr.",
			"lat": 51.4344,
			"lng": 6.7623
		  },
		  {
			"name": "Bochum",
			"desc": "Bekannt für seine Bergbauvergangenheit und heute für seine Kultur- und Bildungseinrichtungen.",
			"lat": 51.4812,
			"lng": 7.2194
		  },
		  {
			"name": "Wuppertal",
			"desc": "Berühmt für seine Schwebebahn und als Geburtsort des Chemieunternehmens Bayer AG.",
			"lat": 51.2647,
			"lng": 7.1784
		  },
		  {
			"name": "Bielefeld",
			"desc": "Eine Stadt mit einer vielfältigen Wirtschaftsstruktur und einer lebendigen Kulturszene.",
			"lat": 52.0302,
			"lng": 8.5325
		  },
		  {
			"name": "Bonn",
			"desc": "Frühere Hauptstadt der Bundesrepublik Deutschland und Sitz zahlreicher internationaler Organisationen.",
			"lat": 50.7374,
			"lng": 7.0982
		  },
		  {
			"name": "Münster",
			"desc": "Eine Stadt mit einer reichen Geschichte, bekannt für ihre Fahrradfreundlichkeit und ihre Universität.",
			"lat": 51.9607,
			"lng": 7.6261
		  },
		  {
			"name": "Mönchengladbach",
			"desc": "Eine Stadt mit einer starken Industriekultur und einem vielfältigen Freizeitangebot.",
			"lat": 51.1805,
			"lng": 6.4426
		  },
		  {
			"name": "Gelsenkirchen",
			"desc": "Früher ein bedeutendes Zentrum des Steinkohlenbergbaus, heute bekannt für den Fußballverein FC Schalke 04.",
			"lat": 51.5177,
			"lng": 7.0857
		  },
		  {
			"name": "Aachen",
			"desc": "Eine historische Stadt, die für ihre Universität und ihre kulturellen Sehenswürdigkeiten bekannt ist.",
			"lat": 50.7753,
			"lng": 6.0839
		  }
		]

	},
	nyc: {
		name: 'New York City',
		rotation: 60,
		values: [
			{ name: 'One World Trade Center', lat: 40.71274, lng: -74.01339 },
			{ name: 'Empire State Building', lat: 40.74844, lng: -73.98565 },
			{ name: 'Chrysler Building', lat: 40.75174, lng: -73.9756 },
			{ name: 'Bank of America Tower', lat: 40.75856, lng: -73.98295 },
			{ name: 'The New York Times Building', lat: 40.75652, lng: -73.99035 },
			{ name: 'One Bryant Park', lat: 40.75566, lng: -73.98342 },
			{ name: '432 Park Avenue', lat: 40.76144, lng: -73.97137 },
			{ name: 'One57', lat: 40.76526, lng: -73.97923 },
			{ name: '30 Hudson Yards', lat: 40.75362, lng: -74.00164 },
			{ name: 'MetLife Building', lat: 40.75462, lng: -73.97645 }
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
		name: 'Kirchen Duisburgs',
		values: [
			{ name: 'Salvatorkirche', lat: 51.43586, lng: 6.76115 },
			{ name: 'Liebfrauenkirche', lat: 51.43441, lng: 6.76952 },
			{ name: 'St. Ludger', lat: 51.4303, lng: 6.7826 },
			{ name: 'St. Anna', lat: 51.43226, lng: 6.79825 },
			{ name: 'Kirche Jesu Christi der Heiligen der Letzten Tage', lat: 51.43291, lng: 6.72462 },
			{ name: 'St. Johannes', lat: 51.45286, lng: 6.70989 },
			{ name: 'Evangelisch-Freikirchliche Gemeinde', lat: 51.44898, lng: 6.70889 },
			{ name: 'Sankt Peter in den Haesen', lat: 51.45656, lng: 6.69147 },
			{ name: 'Nederlandse Kerk an de Ruhr', lat: 51.454, lng: 6.73027 },
			{ name: 'Sankt Maximilian', lat: 51.45372, lng: 6.73418 },
			{ name: 'Christengemeinde Duisburg', lat: 51.45372, lng: 6.73418 },
			{ name: 'St. Joseph-Kirche', lat: 51.45372, lng: 6.73418 },
			{ name: 'Neuapostolische Kirche', lat: 51.42279, lng: 6.76477 }
		]
	},
	duisburgGeneral: {
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
	}
} satisfies Partial<Record<string, PointList>>;

export default presets;
