export type WordList = {
	name: string;
	aiGenerated?: boolean;
	values: { str: string; desc?: string }[];
	desc?: string;
};

export const presets = {
	philosophy: {
		name: 'Philosophische Disziplinen',
		aiGenerated: false,
		values: [
			{ str: 'anthropologie' },
			{ str: 'ästhetik' },
			{ str: 'erkenntnistheorie' },
			{ str: 'ethik' },
			{ str: 'geschichtsphilosophie' },
			{ str: 'handlungstheorie' },
			{ str: 'kulturphilosophie' },
			{ str: 'logik' },
			{ str: 'metaphysik' },
			{ str: 'mystik' },
			{ str: 'naturphilosophie' },
			{ str: 'ontologie' },
			{ str: 'rechtsphilosophie' },
			{ str: 'semiotik' },
			{ str: 'sozialphilosophie' },
			{ str: 'sprachphilosophie' },
			{ str: 'technikphilosophie' },
			{ str: 'wissenschaftstheorie' }
		]
	},
	school: {
		name: 'Schulfächer',
		aiGenerated: true,
		values: [
			{ str: 'Mathematik', desc: 'Mathematik umfasst Algebra, Geometrie und Analysis.' },
			{ str: 'Deutsch', desc: 'Deutschunterricht beinhaltet Lesen, Schreiben und Grammatik.' },
			{
				str: 'Englisch',
				desc: 'Englischunterricht konzentriert sich auf Sprachkenntnisse und Kommunikation.'
			},
			{
				str: 'Biologie',
				desc: 'Biologie beschäftigt sich mit der Erforschung von Lebewesen und ihrem Lebensraum.'
			},
			{
				str: 'Chemie',
				desc: 'Chemie befasst sich mit der Struktur, Zusammensetzung und Reaktion von Stoffen.'
			},
			{
				str: 'Physik',
				desc: 'Physik erforscht die Naturphänomene und grundlegenden Gesetze des Universums.'
			},
			{
				str: 'Geschichte',
				desc: 'Geschichte umfasst die Erforschung vergangener Ereignisse, Kulturen und Gesellschaften.'
			},
			{
				str: 'Geografie',
				desc: 'Geografie beschäftigt sich mit der Erde, ihren Merkmalen, Klima und Umwelt.'
			},
			{
				str: 'Informatik',
				desc: 'Informatik behandelt die Verarbeitung von Informationen, Programmierung und Datenanalyse.'
			},
			{
				str: 'Kunst',
				desc: 'Kunstunterricht umfasst Malerei, Skulptur, Design und kreative Ausdrucksformen.'
			},
			{
				str: 'Musik',
				desc: 'Musikunterricht beinhaltet das Erlernen von Instrumenten, Musiktheorie und -geschichte.'
			},
			{
				str: 'Sport',
				desc: 'Sportunterricht fördert körperliche Fitness, Teamarbeit und sportliche Fähigkeiten.'
			},
			{
				str: 'Spanisch',
				desc: 'Spanisch umfasst die spanische Sprachkenntnisse und Kommunikation.'
			},
			{
				str: 'Religion',
				desc: 'Religionsunterricht behandelt Glaubenssysteme, Rituale und spirituelle Traditionen.'
			},
			{
				str: 'Wirtschaft',
				desc: 'Wirtschaft umfasst Themen wie Geld, Handel, Produktion und Ressourcenmanagement.'
			},
			{
				str: 'Politik',
				desc: 'Politik beschäftigt sich mit Regierungssystemen, politischen Ideologien und Staatsbürgerschaft.'
			},
			{
				str: 'Psychologie',
				desc: 'Psychologie untersucht das Verhalten und die mentale Prozesse des Menschen.'
			},
			{
				str: 'Philosophie',
				desc: 'Philosophie befasst sich mit grundlegenden Fragen zur Existenz, Wissen und Ethik.'
			},
			{ str: 'Französisch', desc: 'Französisch vermittelt die französische Sprache und Kultur.' },
			{ str: 'Latein', desc: 'Latein thematisiert das lateinische Vokabular und die Grammatik.' }
		]
	},
	colorsAndBirds: {
		name: 'Farben + Vögel',
		values: [
			{ str: 'rot' },
			{ str: 'schwalbe' },
			{ str: 'lila' },
			{ str: 'amsel' },
			{ str: 'spatz' },
			{ str: 'schwarz' },
			{ str: 'rotkehlchen' },
			{ str: 'orange' },
			{ str: 'braun' },
			{ str: 'weiß' },
			{ str: 'kolibri' },
			{ str: 'meise' },
			{ str: 'rosa' },
			{ str: 'sperling' },
			{ str: 'möve' },
			{ str: 'buchfink' },
			{ str: 'violett' },
			{ str: 'kranich' },
			{ str: 'gelb' },
			{ str: 'grün' }
		]
	},
	europe: {
		name: 'EU-Mitgliedsstaaten',
		aiGenerated: true,
		desc: 'Eine Liste aller Mitgliedsstaaten der Europäischen Union',
		values: [
			{ str: 'Deutschland', desc: 'Mitteleuropäisches Land mit starker Wirtschaft.' },
			{ str: 'Frankreich', desc: 'Westeuropäisches Land mit reicher Kultur.' },
			{ str: 'Italien', desc: 'Südeuropäisches Land bekannt für seine Küche und Kunst.' },
			{ str: 'Spanien', desc: 'Südeuropäisches Land mit sonnigem Klima und reicher Geschichte.' },
			{ str: 'Portugal', desc: 'Südwesteuropäisches Land mit schönen Küsten.' },
			{ str: 'Belgien', desc: 'Kleines Land mit vielen historischen Städten.' },
			{ str: 'Niederlande', desc: 'Bekannt für Windmühlen, Tulpen und Fahrradkultur.' },
			{ str: 'Luxemburg', desc: 'Kleines Land mit einer starken Finanzindustrie.' },
			{ str: 'Dänemark', desc: 'Skandinavisches Land mit einer glücklichen Bevölkerung.' },
			{ str: 'Schweden', desc: 'Skandinavisches Land mit atemberaubender Natur.' },
			{ str: 'Finnland', desc: 'Skandinavisches Land mit einer starken Bildungstradition.' },
			{ str: 'Österreich', desc: 'Zentraleuropäisches Land bekannt für seine Alpen.' },
			{ str: 'Griechenland', desc: 'Bekannt für seine antike Geschichte und mediterrane Küche.' },
			{ str: 'Irland', desc: 'Inselnation mit grünen Landschaften und gastfreundlichen Menschen.' },
			{ str: 'Zypern', desc: 'Mediterrane Insel mit reicher Kultur.' },
			{ str: 'Malta', desc: 'Kleiner Inselstaat mit einer faszinierenden Geschichte.' },
			{ str: 'Estland', desc: 'Baltisches Land mit einer digitalen Gesellschaft.' },
			{ str: 'Lettland', desc: 'Baltisches Land mit einer vielfältigen Naturlandschaft.' },
			{ str: 'Litauen', desc: 'Baltisches Land mit einer reichen Geschichte.' },
			{ str: 'Polen', desc: 'Mitteleuropäisches Land mit einer bewegten Vergangenheit.' },
			{ str: 'Tschechien', desc: 'Mitteleuropäisches Land mit beeindruckender Architektur.' },
			{ str: 'Slowakei', desc: 'Mitteleuropäisches Land mit malerischen Landschaften.' },
			{ str: 'Ungarn', desc: 'Mitteleuropäisches Land bekannt für sein Gulasch.' },
			{ str: 'Slowenien', desc: 'Kleines Land mit vielfältiger Natur.' },
			{ str: 'Kroatien', desc: 'Balkanland mit einer beeindruckenden Adriaküste.' },
			{ str: 'Rumänien', desc: 'Osteuropäisches Land mit einer reichen Kultur.' },
			{ str: 'Bulgarien', desc: 'Osteuropäisches Land mit einer vielfältigen Landschaft.' }
		]
	},
	artists: {
		name: 'Wichtige Künstler',
		aiGenerated: true,
		values: [
			{ str: 'Picasso', desc: 'berühmter spanischer Maler und Bildhauer' },
			{ str: 'Warhol', desc: 'bekannter amerikanischer Künstler der Pop Art' },
			{ str: 'Michelangelo', desc: 'renommierte italienische Renaissance-Künstler' },
			{ str: 'Rembrandt', desc: 'herausragender niederländischer Maler und Radierer' },
			{ str: 'Monet', desc: 'führender französischer Impressionist' },
			{ str: 'Dali', desc: 'berühmter spanischer surrealistischer Künstler' },
			{ str: 'Kahlo', desc: 'bedeutende mexikanische Malerin des 20. Jahrhunderts' },
			{
				str: 'Pollock',
				desc: 'einflussreicher amerikanischer Maler der Abstrakten Expressionismus'
			},
			{ str: 'Matisse', desc: 'renommierte französische Künstler des 20. Jahrhunderts' },
			{ str: 'Renoir', desc: 'bedeutender französischer Impressionist' },
			{ str: 'Goya', desc: 'berühmter spanischer Maler und Grafiker' },
			{ str: 'Hokusai', desc: 'renommierten japanischen Künstler und Druckmacher' },
			{ str: 'Raphael', desc: 'bedeutender italienischer Hochrenaissance-Maler' },
			{ str: 'Titian', desc: 'einflussreicher venezianischer Renaissance-Maler' },
			{ str: 'Cézanne', desc: 'bahnbrechender französischer postimpressionistischer Künstler' },
			{ str: 'Turner', desc: 'bedeutender britischer Landschaftsmaler und Aquarellist' },
			{ str: 'Vermeer', desc: 'berühmter niederländischer Maler des 17. Jahrhunderts' },
			{ str: 'Botticelli', desc: 'renommierte italienische Renaissance-Künstler' }
		]
	},
	videogames: {
		name: 'Videospiele',
		aiGenerated: true,
		values: [
			{ str: 'Mario', desc: "Jump'n'Run" },
			{ str: 'Zelda', desc: 'Action-Adventure' },
			{ str: 'Halo', desc: 'First-Person Shooter' },
			{ str: 'GTA', desc: 'Open-World-Action' },
			{ str: 'Minecraft', desc: 'Sandbox' },
			{ str: 'Overwatch', desc: 'Team-Based Shooter' },
			{ str: 'Pokemon', desc: 'Role-Playing Game' },
			{ str: 'FIFA', desc: 'Soccer Simulation' },
			{ str: 'CounterStrike', desc: 'Tactical First-Person Shooter' }
		]
	},
	mathematicians: {
		name: 'Mathematiker',
		aiGenerated: true,
		values: [
			{ str: 'Euler', desc: 'Zahlentheorie, Analysis' },
			{ str: 'Gauss', desc: 'Hochrangige Mathematik in verschiedenen Gebieten' },
			{ str: 'Newton', desc: 'Gravitation, Differential- und Integralrechnung' },
			{ str: 'Riemann', desc: 'Differentialgeometrie, Riemannsche Geometrie' },
			{ str: 'Fermat', desc: 'Zahlentheorie, Analytische Geometrie' },
			{ str: 'Euclid', desc: 'Elemente, Euklidische Geometrie' },
			{ str: 'Hilbert', desc: 'Hilbertsche Räume, Zahlentheorie' },
			{ str: 'Poincaré', desc: 'Topologie, dynamische Systeme' },
			{ str: 'Cantor', desc: 'Mengenlehre, Unendlichkeit' },
			{ str: 'Galois', desc: 'Galoistheorie, Algebra' },
			{ str: 'Archimedes', desc: 'Integralrechnung, Geometrie' },
			{ str: 'Turing', desc: 'Berechenbarkeit, Kryptographie' },
			{ str: 'Gödel', desc: 'Unvollständigkeitssätze, Logik' },
			{ str: 'Descartes', desc: 'Koordinatengeometrie, Algebra' },
			{ str: 'Pascal', desc: 'Wahrscheinlichkeitstheorie, Dreieckstheorie' },
			{ str: 'Leibniz', desc: 'Differentialrechnung, Monadologie' },
			{ str: 'Bernoulli', desc: 'Wahrscheinlichkeitsrechnung, Analysis' },
			{ str: 'Boole', desc: 'Boolesche Algebra, Logik' },
			{ str: 'Cayley', desc: 'Gruppentheorie, Algebra' },
			{ str: 'Fourier', desc: 'Fourier-Transformation, Analysis' }
		]
	},
	math: {
		name: 'Disziplinen der Mathematik',
		aiGenerated: true,
		values: [
			{ str: 'Analysis', desc: 'Studium von Funktionen und deren Grenzwerten.' },
			{ str: 'Algebra', desc: 'Studium von mathematischen Symbolen und deren Manipulation.' },
			{ str: 'Geometrie', desc: 'Studium von Formen, Größen, und Eigenschaften des Raums.' },
			{ str: 'Kombinatorik', desc: 'Studium von diskreten Strukturen und Kombinationen.' },
			{
				str: 'Topologie',
				desc: 'Studium von räumlichen Eigenschaften, die unter stetigen Verformungen invariant sind.'
			},
			{
				str: 'Zahlentheorie',
				desc: 'Studium von ganzen Zahlen und den Eigenschaften ihrer Struktur.'
			},
			{
				str: 'Differentialgleichungen',
				desc: 'Studium von Gleichungen, die Ableitungen involvieren.'
			},
			{ str: 'Graphentheorie', desc: 'Studium von Graphen und deren Eigenschaften.' },
			{ str: 'Numerik', desc: 'Studium von numerischen Approximationen mathematischer Probleme.' },
			{ str: 'Logik', desc: 'Studium von formalen Systemen und Schlussfolgerungen.' },
			{ str: 'Statistik', desc: 'Studium von Datenanalyse, Wahrscheinlichkeit und Inferenz.' },
			{ str: 'Kryptographie', desc: 'Studium von Verschlüsselung und Informationssicherheit.' },
			{ str: 'Funktionalanalysis', desc: 'Studium von Vektorräumen und linearen Operatoren.' },
			{ str: 'Stochastik', desc: 'Studium von zufälligen Ereignissen und Wahrscheinlichkeiten.' }
		]
	},
	programmingLanguages: {
		name: 'Programmiersprachen',
		aiGenerated: true,
		values: [
			{ str: 'Python', desc: 'Allzwecksprache mit einfacher Syntax und großer Community.' },
			{ str: 'JavaScript', desc: 'Clientseitige Sprache für Webentwicklung.' },
			{ str: 'Java', desc: 'Robust, plattformunabhängig, in vielen Unternehmensanwendungen.' },
			{ str: 'C', desc: 'Urgestein der Programmierung, effizient und hardwarenah.' },
			{ str: 'C++', desc: 'Erweiterung von C mit Objektorientierung und stark in Systemsoftware.' },
			{ str: 'C#', desc: 'Von Microsoft entwickelte Sprache, für Windows-Entwicklung und Spiele.' },
			{
				str: 'PHP',
				desc: 'Häufig für serverseitige Webentwicklung, besonders für dynamische Webseiten.'
			},
			{ str: 'Swift', desc: 'Von Apple entwickelt für iOS- und macOS-Anwendungen.' },
			{ str: 'Go', desc: 'Effizient, konkurrierend, von Google entwickelt.' },
			{
				str: 'Ruby',
				desc: 'Einfache und produktive Sprache, bekannt für das Ruby on Rails Framework.'
			},
			{ str: 'Rust', desc: 'Sichere, parallele Programmierung ohne Garbage Collection.' },
			{ str: 'TypeScript', desc: 'Superset von JavaScript mit statischer Typisierung.' },
			{ str: 'Scala', desc: 'Für skalierbare, hochleistungsfähige Anwendungen auf der JVM.' },
			{
				str: 'Perl',
				desc: 'Praktisch in Textverarbeitung, Systemadministration und Webentwicklung.'
			},
			{ str: 'R', desc: 'Für statistische Berechnungen und Datenanalyse.' },
			{ str: 'MATLAB', desc: 'Für numerische Berechnungen und wissenschaftliches Computing.' },
			{ str: 'Assembly', desc: 'Niedrigste Ebene, direkt mit Hardwarebefehlen.' },
			{ str: 'SQL', desc: 'Datenbanksprache für Datenabfragen und -manipulationen.' },
			{
				str: 'Haskell',
				desc: 'Funktionale Programmiersprache, stark in der mathematischen Logik.'
			},
			{ str: 'Shell', desc: 'Zur Automatisierung von Prozessen in Betriebssystemen.' },
			{ str: 'Objective-C', desc: 'Vorläufer von Swift, für iOS- und macOS-Entwicklung.' },
			{
				str: 'Lua',
				desc: 'Leichtgewichtige Skriptsprache, häufig in Spielen und eingebetteten Systemen.'
			},
			{ str: 'Groovy', desc: 'Dynamisch typisierte Sprache, läuft auf der JVM.' },
			{ str: 'Dart', desc: 'Für die Entwicklung von nativen mobilen, Web- und Desktopanwendungen.' }
		]
	},
	elements: {
		name: 'Elemente des Periodensystems',
		aiGenerated: true,
		values: [
			{ str: 'Wasserstoff', desc: '1. H: Brennstoff, chem. Industrie' },
			{ str: 'Helium', desc: '2. He: Kühlung, Schutzgas' },
			{ str: 'Lithium', desc: '3. Li: Batterien, Medizin' },
			{ str: 'Beryllium', desc: '4. Be: Legierungen, Röntgenfenster' },
			{ str: 'Bor', desc: '5. B: Gläser, Halbleiter' },
			{ str: 'Kohlenstoff', desc: '6. C: Organische Chemie, Materialien' },
			{ str: 'Stickstoff', desc: '7. N: Dünger, Lebensmittel' },
			{ str: 'Sauerstoff', desc: '8. O: Atmung, Oxidation' },
			{ str: 'Fluor', desc: '9. F: Zahnmedizin, Kühlmittel' },
			{ str: 'Neon', desc: '10. Ne: Leuchten, Laser' },
			{ str: 'Natrium', desc: '11. Na: Salz, Metallurgie' },
			{ str: 'Magnesium', desc: '12. Mg: Legierungen, Medizin' },
			{ str: 'Aluminium', desc: '13. Al: Verpackungen, Bauwesen' },
			{ str: 'Silicium', desc: '14. Si: Elektronik, Glas' },
			{ str: 'Phosphor', desc: '15. P: Dünger, Feuerwerk' },
			{ str: 'Schwefel', desc: '16. S: Chemikalien, Gummi' },
			{ str: 'Chlor', desc: '17. Cl: Desinfektion, PVC' },
			{ str: 'Argon', desc: '18. Ar: Schutzgas, Beleuchtung' },
			{ str: 'Kalium', desc: '19. K: Dünger, Medizin' },
			{ str: 'Calcium', desc: '20. Ca: Knochen, Metallurgie' },
			{ str: 'Scandium', desc: '21. Sc: Leichtmetall, Beleuchtung' },
			{ str: 'Titan', desc: '22. Ti: Flugzeugbau, Implantate' },
			{ str: 'Vanadium', desc: '23. V: Stahl, Katalysatoren' },
			{ str: 'Chrom', desc: '24. Cr: Beschichtungen, Legierungen' },
			{ str: 'Mangan', desc: '25. Mn: Stahlherstellung, Batterien' },
			{ str: 'Eisen', desc: '26. Fe: Baustoff, Werkzeuge' },
			{ str: 'Kobalt', desc: '27. Co: Magnete, Legierungen' },
			{ str: 'Nickel', desc: '28. Ni: Münzen, Legierungen' },
			{ str: 'Kupfer', desc: '29. Cu: Elektronik, Leitungen' },
			{ str: 'Zink', desc: '30. Zn: Rostschutz, Batterien' },
			{ str: 'Gallium', desc: '31. Ga: Halbleiter, LED' },
			{ str: 'Germanium', desc: '32. Ge: Optik, Halbleiter' },
			{ str: 'Arsen', desc: '33. As: Halbleiter, Insektizid' },
			{ str: 'Selen', desc: '34. Se: Fotovoltaik, Medizin' },
			{ str: 'Brom', desc: '35. Br: Desinfektion, Flammschutz' },
			{ str: 'Krypton', desc: '36. Kr: Beleuchtung, Laser' },
			{ str: 'Rubidium', desc: '37. Rb: Laser, Forschung' },
			{ str: 'Strontium', desc: '38. Sr: Feuerwerk, Röntgen' },
			{ str: 'Yttrium', desc: '39. Y: Leuchtmittel, Katalysator' },
			{ str: 'Zirconium', desc: '40. Zr: Keramik, Kernreaktor' },
			{ str: 'Niob', desc: '41. Nb: Superlegierungen, Supraleitung' },
			{ str: 'Molybdän', desc: '42. Mo: Stahllegierung, Katalysator' },
			{ str: 'Technetium', desc: '43. Tc: Medizin, Kernkraft' },
			{ str: 'Ruthenium', desc: '44. Ru: Katalysator, Schmuck' },
			{ str: 'Rhodium', desc: '45. Rh: Katalysator, Schmuck' },
			{ str: 'Palladium', desc: '46. Pd: Katalysator, Schmuck' },
			{ str: 'Silber', desc: '47. Ag: Schmuck, Elektronik' },
			{ str: 'Cadmium', desc: '48. Cd: Batterien, Beschichtungen' },
			{ str: 'Indium', desc: '49. In: Legierungen, Elektronik' },
			{ str: 'Zinn', desc: '50. Sn: Konserven, Legierungen' },
			{ str: 'Antimon', desc: '51. Sb: Flammschutz, Legierungen' },
			{ str: 'Tellur', desc: '52. Te: Legierungen, Halbleiter' },
			{ str: 'Iod', desc: '53. I: Desinfektion, Röntgenkontrastmittel' },
			{ str: 'Xenon', desc: '54. Xe: Beleuchtung, Narkosemittel' },
			{ str: 'Cäsium', desc: '55. Cs: Atomuhr, Forschung' },
			{ str: 'Barium', desc: '56. Ba: Röntgenkontrastmittel, Feuerwerk' },
			{ str: 'Lanthan', desc: '57. La: Leuchtmittel, Katalysator' },
			{ str: 'Cer', desc: '58. Ce: Feuerzeug, Katalysator' },
			{ str: 'Praseodym', desc: '59. Pr: Magneten, Legierungen' },
			{ str: 'Neodym', desc: '60. Nd: Magneten, Glas' },
			{ str: 'Promethium', desc: '61. Pm: Leuchtfarbe, Batterien' },

			{ str: 'Samarium', desc: '62. Sm: Magneten, Katalysator' },
			{ str: 'Europium', desc: '63. Eu: Leuchtmittel, Sicherheitsetiketten' },
			{ str: 'Gadolinium', desc: '64. Gd: Kontrastmittel, Magneten' },
			{ str: 'Terbium', desc: '65. Tb: Leuchtmittel, Magneten' },
			{ str: 'Dysprosium', desc: '66. Dy: Magneten, Laser' },
			{ str: 'Holmium', desc: '67. Ho: Magneten, Laser' },
			{ str: 'Erbium', desc: '68. Er: Lasertechnik, Gläser' },
			{ str: 'Thulium', desc: '69. Tm: Medizin, Lasertechnik' },
			{ str: 'Ytterbium', desc: '70. Yb: Laser, Atomuhr' },
			{ str: 'Lutetium', desc: '71. Lu: Strahlentherapie, Katalysator' },
			{ str: 'Hafnium', desc: '72. Hf: Legierungen, Kernreaktor' },
			{ str: 'Tantal', desc: '73. Ta: Legierungen, Elektronik' },
			{ str: 'Wolfram', desc: '74. W: Glühfäden, Hartmetall' },
			{ str: 'Rhenium', desc: '75. Re: Glühfäden, Katalysator' },
			{ str: 'Osmium', desc: '76. Os: Legierungen, Katalysator' },
			{ str: 'Iridium', desc: '77. Ir: Schmuck, Katalysator' },
			{ str: 'Platin', desc: '78. Pt: Schmuck, Katalysator' },
			{ str: 'Gold', desc: '79. Au: Schmuck, Elektronik' },
			{ str: 'Quecksilber', desc: '80. Hg: Thermometer, Barometer' },
			{ str: 'Thallium', desc: '81. Tl: Hochtemperatursupraleitung, Batterien' },
			{ str: 'Blei', desc: '82. Pb: Batterien, Strahlenschutz' },
			{ str: 'Bismut', desc: '83. Bi: Medizin, Legierungen' },
			{ str: 'Polonium', desc: '84. Po: Kernkraft, elektrostatische Ladung' },
			{ str: 'Astat', desc: '85. At: Radiotherapie, Forschung' },
			{ str: 'Radon', desc: '86. Rn: Radiotherapie, Forschung' }
		]
	},
	mathTerms: {
		name: 'Begriffe der Mathematik',
		aiGenerated: true,
		values: [
			{ str: 'Vektor', desc: 'Eine Größe, die sowohl Magnitude als auch Richtung hat.' },
			{
				str: 'Arithmetik',
				desc: 'Grundlegende mathematische Operationen wie Addition, Subtraktion, Multiplikation und Division.'
			},
			{
				str: 'Nullstellen',
				desc: 'Die Punkte einer Funktion, an denen sie den Wert null erreicht.'
			},
			{
				str: 'Runden',
				desc: 'Eine Methode zur Vereinfachung einer Zahl auf eine bestimmte Anzahl von Dezimalstellen.'
			},
			{
				str: 'Integral',
				desc: 'Ein Konzept der Analysis, das den Flächeninhalt unter einer Kurve beschreibt.'
			},
			{
				str: 'Differentialgleichung',
				desc: 'Eine Gleichung, die eine Funktion und ihre Ableitungen enthält.'
			},
			{
				str: 'Polynom',
				desc: 'Eine mathematische Ausdrucksform, die aus einer Summe von Potenzen einer Variablen besteht.'
			},
			{
				str: 'Exponentialfunktion',
				desc: 'Eine Funktion, bei der die Variable im Exponenten steht.'
			},
			{ str: 'Logarithmus', desc: 'Die Umkehrung der Exponentialfunktion.' },
			{
				str: 'Kreis',
				desc: 'Die Menge aller Punkte in einer Ebene, die einen festen Abstand von einem gegebenen Punkt haben.'
			},
			{
				str: 'Geometrie',
				desc: 'Der Zweig der Mathematik, der sich mit Formen, Größen und Eigenschaften von Raumfiguren befasst.'
			},
			{
				str: 'Trigonometrie',
				desc: 'Der Bereich der Mathematik, der sich mit den Beziehungen zwischen den Seiten und den Winkeln von Dreiecken befasst.'
			},
			{
				str: 'Kongruenz',
				desc: 'Eine Beziehung zwischen geometrischen Figuren, bei der sie die gleiche Form und Größe haben.'
			},
			{
				str: 'Faktorisierung',
				desc: 'Die Zerlegung einer Zahl oder eines Ausdrucks in seine Faktoren.'
			},
			{ str: 'Matrix', desc: 'Eine rechteckige Anordnung von Zahlen oder Symbolen.' },
			{
				str: 'Determinante',
				desc: 'Eine spezielle Zahl, die mit einer quadratischen Matrix assoziiert ist.'
			},
			{
				str: 'Algebra',
				desc: 'Der Bereich der Mathematik, der sich mit Symbolen und den Regeln für deren Manipulation befasst.'
			},
			{
				str: 'Funktion',
				desc: 'Eine mathematische Beziehung zwischen einer unabhängigen Variablen und einer abhängigen Variablen.'
			},
			{
				str: 'Statistik',
				desc: 'Ein Bereich der Mathematik, der sich mit der Sammlung, Analyse, Interpretation und Präsentation von Daten befasst.'
			},
			{
				str: 'Wahrscheinlichkeit',
				desc: 'Die Wahrscheinlichkeit, dass ein bestimmtes Ereignis eintritt.'
			},
			{
				str: 'Mittelwert',
				desc: 'Die durchschnittliche Summe einer Gruppe von Zahlen, geteilt durch die Anzahl der Zahlen.'
			},
			{ str: 'Median', desc: 'Der mittlere Wert einer sortierten Liste von Zahlen.' },
			{
				str: 'Standardabweichung',
				desc: 'Ein Maß für die Streuung oder Variation in einer Menge von Zahlen.'
			},
			{
				str: 'Kombinatorik',
				desc: 'Der Zweig der Mathematik, der sich mit der Anzahl der Möglichkeiten befasst, Elemente in einer geordneten oder ungeordneten Weise auszuwählen.'
			},
			{ str: 'Folge', desc: 'Eine geordnete Liste von Objekten.' },
			{
				str: 'Limit',
				desc: 'Ein Konzept in der Analysis, das den Wert beschreibt, dem eine Funktion für bestimmte Eingaben näher kommt.'
			},
			{
				str: 'Integralrechnung',
				desc: 'Ein Teilgebiet der Analysis, das sich mit Flächenberechnungen und der Bestimmung von Flächenschwerpunkten befasst.'
			},
			{
				str: 'Differentialrechnung',
				desc: 'Ein Teilgebiet der Mathematik, das sich mit der Studie von Änderungen und der Rate des Wandels von Funktionen befasst.'
			},
			{
				str: 'Koordinatensystem',
				desc: 'Ein System, das es ermöglicht, Punkte in der Ebene oder im Raum durch Koordinaten zu identifizieren.'
			},
			{
				str: 'Zahlentheorie',
				desc: 'Ein Bereich der Mathematik, der sich mit den Eigenschaften von ganzen Zahlen und den Beziehungen zwischen ihnen befasst.'
			},
			{
				str: 'Primzahl',
				desc: 'Eine natürliche Zahl größer als 1, die nur durch 1 und sich selbst ohne Rest teilbar ist.'
			},
			{ str: 'Teiler', desc: 'Eine Zahl, die ohne Rest in eine andere Zahl passt.' },
			{ str: 'Teilerfremd', desc: 'Zahlen, die keine gemeinsamen Teiler außer 1 haben.' },
			{
				str: 'Fraktal',
				desc: 'Eine komplexe geometrische Form, die sich selbst in kleinerem Maßstab wiederholt.'
			},
			{
				str: 'Algorithmus',
				desc: 'Eine Reihe von gut definierten Anweisungen zur Lösung eines Problems oder zur Durchführung einer Aufgabe.'
			},
			{
				str: 'Abbildung',
				desc: 'Eine Zuordnung, die jedem Element einer Menge genau ein Element einer anderen Menge zuordnet.'
			},
			{
				str: 'Identität',
				desc: 'Ein Element, das eine bestimmte mathematische Operation unverändert lässt.'
			},
			{
				str: 'Dezimalzahl',
				desc: 'Eine Zahl im Dezimalsystem, die einen Dezimalpunkt enthalten kann.'
			},
			{
				str: 'Quadratwurzel',
				desc: 'Eine Zahl, die, wenn sie mit sich selbst multipliziert wird, ein bestimmtes Ergebnis ergibt.'
			}
		].sort((a, b) => a.str.localeCompare(b.str))
	},
	mathTerms2: {
		name: 'Wörter der Mathematik',
		aiGenerated: true,
		values: [
			{ str: 'Integral', desc: 'Bestimmtes oder unbestimmtes Ergebnis einer Integration' },
			{ str: 'Ableitung', desc: 'Steigung einer Funktion an einem bestimmten Punkt' },
			{ str: 'Matrix', desc: 'Rechteckige Anordnung von Zahlen, Symbolen oder Ausdrücken' },
			{ str: 'Vektor', desc: 'Größe mit Richtung und Betrag' },
			{
				str: 'Differentialgleichung',
				desc: 'Gleichung, die Ableitungen einer unbekannten Funktion beinhaltet'
			},
			{ str: 'Menge', desc: 'Sammlung von Objekten' },
			{ str: 'Determinante', desc: 'Maß für die lineare Abhängigkeit von Vektoren' },
			{ str: 'Exponentialfunktion', desc: 'Funktion, in der eine Variable im Exponenten steht' },
			{ str: 'Integralrechnung', desc: 'Berechnung von Flächen und Volumina unter Kurven' },
			{
				str: 'Kreis',
				desc: 'Geometrische Figur mit allen Punkten, die einen konstanten Abstand zu einem Mittelpunkt haben'
			},
			{ str: 'Polynom', desc: 'Algebraischer Ausdruck mit Summen von Potenzen einer Variablen' },
			{
				str: 'Quadratwurzel',
				desc: 'Eine Zahl, die multipliziert mit sich selbst das Argument ergibt'
			},
			{
				str: 'Stetigkeit',
				desc: 'Eigenschaft einer Funktion, bei der kleine Änderungen im Argument kleine Änderungen im Funktionswert verursachen'
			},
			{
				str: 'Trigonometrie',
				desc: 'Studium der Beziehungen zwischen den Seiten und den Winkeln von Dreiecken'
			},
			{ str: 'Axiom', desc: 'Grundlegende Annahme, die in einem mathematischen System gilt' },
			{
				str: 'Kongruenz',
				desc: 'Beziehung zwischen geometrischen Figuren, bei der sie in Form und Größe übereinstimmen'
			},
			{ str: 'Algorithmus', desc: 'Geordnete Folge von Anweisungen zur Lösung eines Problems' },
			{ str: 'Divergenz', desc: 'Eigenschaft eines Vektorfeldes, dessen Fluss nicht konvergiert' },
			{
				str: 'Kreuzprodukt',
				desc: 'Produkt zweier Vektoren, das einen Vektor ergibt, der senkrecht zu den Ausgangsvektoren steht'
			},
			{ str: 'Mittelwert', desc: 'Durchschnittliche Zahl in einer Menge von Zahlen' },
			{ str: 'Permutation', desc: 'Anordnung von Objekten in einer bestimmten Reihenfolge' },
			{
				str: 'Primzahl',
				desc: 'Eine natürliche Zahl größer als 1, die nur durch 1 und sich selbst ohne Rest teilbar ist'
			},
			{ str: 'Wurzel', desc: 'Eine Zahl, die potenziert das Argument ergibt' },
			{ str: 'Faktorisierung', desc: 'Zerlegung einer Zahl oder eines Ausdrucks in Faktoren' },
			{
				str: 'Hyperbel',
				desc: 'Geometrische Kurve, die durch die Gleichung xy = k charakterisiert wird'
			},
			{
				str: 'Logarithmus',
				desc: 'Die Potenz, zu der eine bestimmte Zahl erhöht werden muss, um eine andere Zahl zu ergeben'
			},
			{
				str: 'Normalverteilung',
				desc: 'Wahrscheinlichkeitsverteilung, die durch eine Glockenkurve gekennzeichnet ist'
			},
			{ str: 'Relation', desc: 'Beziehung zwischen Elementen zweier Mengen' },
			{ str: 'Satz', desc: 'Mathematische Aussage, die bewiesen oder widerlegt werden kann' },
			{
				str: 'Stochastik',
				desc: 'Bereich der Mathematik, der sich mit zufälligen Ereignissen befasst'
			},
			{ str: 'Summe', desc: 'Ergebnis der Addition von Zahlen oder Ausdrücken' },
			{ str: 'Variable', desc: 'Symbol, das eine beliebige Zahl oder Funktion repräsentiert' },
			{
				str: 'Analysis',
				desc: 'Teilgebiet der Mathematik, das sich mit Funktionen und deren Eigenschaften befasst'
			},
			{ str: 'Basis', desc: 'Grundlegende Menge von Vektoren, die einen Vektorraum aufspannen' },
			{
				str: 'Definitheit',
				desc: 'Eigenschaft einer quadratischen Form, positiv, negativ oder indefinit zu sein'
			},
			{
				str: 'Ellipse',
				desc: 'Geometrische Kurve, die durch die Gleichung x²/a² + y²/b² = 1 charakterisiert wird'
			},
			{
				str: 'Fraktal',
				desc: 'Komplexe geometrische Form, die sich aus einfachen Mustern wiederholt'
			},
			{
				str: 'Gradient',
				desc: 'Vektor, der die Richtung des steilsten Anstiegs einer Funktion angibt'
			},
			{ str: 'Interpolation', desc: 'Schätzung eines Wertes zwischen bekannten Werten' },
			{ str: 'Komplex', desc: 'Zahl, die aus einem Realteil und einem Imaginärteil besteht' },
			{
				str: 'Manifold',
				desc: 'Mathematischer Raum, der lokal flach ist, aber global gekrümmt sein kann'
			},
			{ str: 'Normal', desc: 'Vektor, der senkrecht auf einer Ebene oder Kurve steht' },
			{ str: 'Ordnung', desc: 'Grad der Komplexität oder Größe einer Menge oder Struktur' },
			{
				str: 'Rekursion',
				desc: 'Mathematisches Konzept, bei dem eine Funktion sich selbst aufruft'
			},
			{ str: 'Substitution', desc: 'Ersetzen einer Variablen durch einen anderen Ausdruck' },
			{ str: 'Tangente', desc: 'Gerade, die eine Kurve an einem bestimmten Punkt berührt' },
			{ str: 'Unendlich', desc: 'Zustand, in dem etwas keine Grenzen hat oder nicht endet' }
		].sort((a, b) => a.str.localeCompare(b.str))
	},
	jufo: {
		name: 'Fachgebiete Jugend forscht',
		desc: 'Eine Liste der sieben Fachgebiete von Jugend forscht. Die Namen und Beschreibungen wurden der offiziellen Website (https://www.jugend-forscht.de/teilnahme/fachgebiete.html) übernommen.',
		aiGenerated: false,
		values: [
			{
				str: 'Arbeitswelt',
				desc: 'Im Fachgebiet Arbeitswelt steht der Mensch im Mittelpunkt. Vor allem für Auszubildende ist dieses Fach ein ideales Betätigungsfeld'
			},
			{
				str: 'Biologie',
				desc: 'Alles, was mit der belebten Umwelt zu tun hat, gehört ins Fachgebiet Biologie'
			},
			{ str: 'Chemie', desc: 'Die Chemie bietet viele Forschungsmöglichkeiten.' },
			{
				str: 'Geowissenschaften',
				desc: 'Ferne Himmelskörper beobachten, das Klima analysieren, Landschaftsstrukturen erkunden oder Versteinerungen freilegen – in diesem Fachgebiet ist alles denkbar, was in die Bereiche Astronomie, Astrophysik, Weltraumforschung, Geografie, Geowissenschaften und Ozeanografie gehört. '
			},
			{
				str: 'Mathematik',
				desc: 'In der Welt der Rätsel und Knobelaufgaben, der Zahlen, Formen und Formeln, der Strukturen und der Algorithmen gibt es viel zu entdecken'
			},
			{
				str: 'Physik',
				desc: 'Ob Licht oder Elektrizität, ob Wellen oder feste Körper – hinter beinahe allen Dingen in unserer Umwelt steckt Physik'
			},
			{
				str: 'Technik',
				desc: 'Für alle, die voller Ideen für neue Erfindungen stecken sowie Spaß an handwerklicher Arbeit haben, ist Technik das richtige Fachgebiet'
			}
		]
	},
	computerScienceTerms: {
		name: 'Wörter der Informatik',
		aiGenerated: true,
		values: [
			{
				str: 'Algorithmus',
				desc: 'Eine präzise Reihe von Anweisungen zur Lösung eines Problems in endlicher Zeit.'
			},
			{
				str: 'Array',
				desc: 'Eine Datenstruktur, die eine Sammlung von Elementen desselben Typs speichert und über einen Index zugänglich macht.'
			},
			{
				str: 'Variable',
				desc: 'Ein Bezeichner, der einen Wert speichert und sich während der Programmausführung ändern kann.'
			},
			{
				str: 'Funktion',
				desc: 'Ein in sich geschlossener Block von Anweisungen, der eine bestimmte Aufgabe ausführt.'
			},
			{
				str: 'Schleife',
				desc: 'Eine Kontrollstruktur, die es ermöglicht, einen Block von Anweisungen mehrmals auszuführen, solange eine Bedingung erfüllt ist.'
			},
			{
				str: 'Rekursion',
				desc: 'Ein Konzept, bei dem eine Funktion sich selbst aufruft, um eine Aufgabe zu lösen.'
			},
			{
				str: 'Klasse',
				desc: 'Ein Bauplan zur Erstellung von Objekten, der Eigenschaften und Methoden definiert.'
			},
			{
				str: 'Objekt',
				desc: 'Eine Instanz einer Klasse, das Daten und Methoden zur Bearbeitung dieser Daten enthält.'
			},
			{
				str: 'Interface',
				desc: 'Eine Sammlung von Methoden, die von Klassen implementiert werden müssen, um eine bestimmte Funktionalität bereitzustellen.'
			},
			{
				str: 'Methode',
				desc: 'Eine Funktion, die einem Objekt zugeordnet ist und darauf zugreifen kann.'
			},
			{
				str: 'Datenbank',
				desc: 'Ein strukturierter Satz von Daten, der in einem Computersystem gespeichert ist und abgerufen sowie aktualisiert werden kann.'
			},
			{
				str: 'SQL',
				desc: 'Structured Query Language, eine Sprache zur Verwaltung und Abfrage von Datenbanken.'
			},
			{
				str: 'HTML',
				desc: 'Hypertext Markup Language, eine Auszeichnungssprache zur Strukturierung von Inhalten im Web.'
			},
			{
				str: 'CSS',
				desc: 'Cascading Style Sheets, eine Stylesheet-Sprache zur Gestaltung des Aussehens von HTML-Dokumenten.'
			},
			{
				str: 'JavaScript',
				desc: 'Eine Skriptsprache, die hauptsächlich für die Entwicklung von interaktiven Webseiten verwendet wird.'
			},
			{
				str: 'API',
				desc: 'Application Programming Interface, eine Schnittstelle, die den Zugriff auf die Funktionalität eines Programms ermöglicht.'
			},
			{
				str: 'JSON',
				desc: 'JavaScript Object Notation, ein Datenformat zum Speichern und Austauschen von Daten.'
			},
			{
				str: 'XML',
				desc: 'Extensible Markup Language, eine Auszeichnungssprache zur Darstellung hierarchischer Strukturen in Textform.'
			},
			{
				str: 'TCP',
				desc: 'Transmission Control Protocol, ein zuverlässiges, verbindungsorientiertes Protokoll zur Übertragung von Daten über ein Netzwerk.'
			},
			{
				str: 'IP',
				desc: 'Internet Protocol, ein Protokoll zur Adressierung und zum Routing von Datenpaketen über ein Netzwerk.'
			},
			{
				str: 'HTTP',
				desc: 'Hypertext Transfer Protocol, ein Protokoll zur Übertragung von Daten über das World Wide Web.'
			},
			{
				str: 'FTP',
				desc: 'File Transfer Protocol, ein Netzwerkprotokoll zum Übertragen von Dateien über ein TCP/IP-Netzwerk.'
			},
			{
				str: 'LAN',
				desc: 'Local Area Network, ein Netzwerk, das eine begrenzte geografische Fläche wie ein Gebäude oder eine Gruppe von Gebäuden abdeckt.'
			},
			{
				str: 'Router',
				desc: 'Ein Netzwerkgerät, das den Datenverkehr zwischen verschiedenen Netzwerken steuert und weiterleitet.'
			},
			{
				str: 'Firewall',
				desc: 'Ein Sicherheitssystem, das den Datenverkehr zwischen einem internen Netzwerk und dem Internet überwacht und filtert.'
			},
			{
				str: 'Betriebssystem',
				desc: 'Eine Software, die die Ressourcen eines Computers verwaltet und die Ausführung von Anwendungsprogrammen ermöglicht.'
			},
			{ str: 'Compiler', desc: 'Ein Programm, das Quellcode in ausführbaren Code übersetzt.' },
			{
				str: 'Interpreter',
				desc: 'Ein Programm, das Quellcode Zeile für Zeile liest und sofort ausführt.'
			},
			{
				str: 'Debugging',
				desc: 'Der Prozess der Identifizierung und Behebung von Fehlern oder Fehlfunktionen in einem Computerprogramm.'
			},
			{
				str: 'Versionierung',
				desc: 'Das Verwalten und Verfolgen von Änderungen an Dokumenten, Dateien oder Software über die Zeit.'
			},
			{
				str: 'Repository',
				desc: 'Ein Speicherort, der alle Versionen einer Software oder einer Gruppe von Dateien sowie Metadaten darüber enthält.'
			},
			{
				str: 'Framework',
				desc: 'Eine strukturierte Sammlung von Bibliotheken, Werkzeugen und Best Practices zur Entwicklung von Softwareanwendungen.'
			},
			{
				str: 'Client',
				desc: 'Ein Computer oder eine Softwareanwendung, die auf Dienste oder Ressourcen in einem Netzwerk zugreift.'
			},
			{
				str: 'Server',
				desc: 'Ein Computer oder ein Programm, das Dienste oder Ressourcen für andere Computer oder Programme bereitstellt.'
			},
			{
				str: 'Virtualisierung',
				desc: 'Die Erstellung virtueller Versionen von Ressourcen wie Hardware, Betriebssystemen oder Speichermedien.'
			},
			{
				str: 'Container',
				desc: 'Eine standardisierte, ausführbare Umgebung, die Anwendungen und ihre Abhängigkeiten kapselt.'
			},
			{
				str: 'Kryptographie',
				desc: 'Das Studium und die Anwendung von Techniken zum Schutz von Informationen vor unbefugtem Zugriff oder Änderung.'
			},
			{
				str: 'Cybersecurity',
				desc: 'Der Schutz von Computersystemen, Netzwerken und Daten vor Cyberangriffen.'
			},
			{
				str: 'Blockchain',
				desc: 'Eine dezentrale, verteilte Datenbanktechnologie, die Transaktionen transparent und sicher speichert.'
			},
			{
				str: 'DevOps',
				desc: 'Eine Kultur und Praktik, die die Zusammenarbeit zwischen Entwicklungsteams und Betriebsteams fördert, um Softwareentwicklung und Bereitstellung zu verbessern.'
			},
			{
				str: 'Agile',
				desc: 'Ein Ansatz für Softwareentwicklung, der iterative Entwicklung, Zusammenarbeit und schnelle Anpassung betont.'
			},
			{
				str: 'Microservices',
				desc: 'Eine Architektur, bei der eine Anwendung als eine Sammlung kleiner, unabhängiger Dienste entwickelt und bereitgestellt wird.'
			},
			{
				str: 'REST',
				desc: 'Representational State Transfer, ein Architekturstil für verteilte Systeme, der auf HTTP basiert und Ressourcen über URLs darstellt.'
			},
			{
				str: 'Encryption',
				desc: 'Das Verfahren, Daten in eine Form umzuwandeln, die nur autorisierte Parteien lesen können.'
			},
			{
				str: 'OAuth',
				desc: 'Ein Autorisierungsprotokoll, das es einem Benutzer ermöglicht, Ressourcen freizugeben, ohne seine Anmeldeinformationen weiterzugeben.'
			},
			{
				str: 'Regex',
				desc: 'Ein regulärer Ausdruck, eine Sequenz von Zeichen, die ein Suchmuster definieren.'
			},
			{
				str: 'Shell',
				desc: 'Eine Benutzerschnittstelle für den Zugriff auf Betriebssystemdienste, die über eine Befehlszeile oder grafische Benutzeroberfläche erfolgen kann.'
			}
		].sort((a, b) => a.str.localeCompare(b.str))
	}
} satisfies Partial<Record<string, WordList>>;
