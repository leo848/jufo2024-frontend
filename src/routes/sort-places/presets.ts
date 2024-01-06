import type { NamedPoint } from '../../geom/coordPoint';

function wikiCoord(coord: string): number {
	let [deg, min, sec] = coord
		.split(' ')
		.map((s) => s.substring(0, s.length - 1))
		.map(Number);
	return deg + min / 60 + sec / 3600;
}

const presets: {
	name: string;
	rotation?: number;
	values: NamedPoint[];
}[] = [
	{
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
			{"name": "Neuwerk", "lat": wikiCoord("53° 55′ 16″"), "lng": wikiCoord("8° 30′ 2″")}, 	
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
	{
		name: 'Aachen simpel',
		// prettier-ignore
		values: [
			{ name: 'Aachener Dom', lat: 50.7745, lng: 6.08382 },
			{ name: 'Informatik-Fakultät', lat: 50.77932, lng: 6.05888 }
		]
	},
	{
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
	{
		name: 'Sehenswürdigkeiten Marls',
		values: 
[
  { "name": "Skulpturenmuseum Glaskasten", "lat": 51.65618, "lng": 7.09468},
  { "name": "Zentralbibliothek", "lat": 51.6534120, "lng": 7.0964492 },
  {  "name": "Katholische Kirche St. Georg", "lat": 51.64744, "lng": 7.08224},
  { "name": "St. Bartholomäus", "lat": 51.62605, "lng": 7.05185 },
  { "name": "Chemiepark", "lat": 51.67946, "lng": 7.10056 },
  { "name": "Heimatmuseum", "lat": 51.6458, "lng": 7.08099 },
]

	},
	{
		"name": 'Kirchen Marls',
		values: [
  {  "name": "Katholische Kirche St. Georg", "lat": 51.64744, "lng": 7.08224},
  { "name": "St. Bonifatius", "lat": 51.65719, "lng": 7.08752 },
  { "name": "Dreifaltigkeitskirche", "lat": 51.65517, "lng": 7.08813 },
  { "name": "St. Michael", "lat": 51.66571, "lng": 7.10233 },
  { "name": "St. Heinrich", "lat": 51.6533, "lng": 7.1054 },
  { "name": "Neoapostolische Kirche", "lat": 51.65849, "lng": 7.08029 },
  { "name": "Freikirche Hüls", "lat": 51.66532, "lng": 7.12322 },
  { "name": "Herz Jesu", "lat": 51.66349, "lng": 7.13334 },
  { "name": "Auferstehungskirche", "lat": 51.65312, "lng": 7.11498 },
  { "name": "Friedenskirche", "lat": 51.66175, "lng": 7.11445 }
		]
	}
];

export default presets;
