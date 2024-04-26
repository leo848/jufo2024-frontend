import type {ComponentType} from 'svelte';
import type {PathCreateMethod, PathImproveMethod} from './types';
import type {z} from 'zod';
import * as Icon from 'flowbite-svelte-icons';
import {factorial} from '../utils/math';
import type {ParameterKey} from './optionsPool';

type Algorithm = {
	name: string;
	description: string;
	complexity?: string;
	expectedTime?: (n: number, latency: number) => number | null;
	parameters?: ParameterKey[];
	icon: ComponentType;
};

type ConstructionMethod = z.infer<typeof PathCreateMethod>['type'];
type ConstructionAlgorithm = Algorithm & {
	method: ConstructionMethod;
};

type ImprovementMethod = z.infer<typeof PathImproveMethod>['type'];
type ImprovementAlgorithm = Algorithm & {
	stepwise?: boolean;
	method: ImprovementMethod;
};

export const constructionAlgorithms: ConstructionAlgorithm[] = [
	{
		name: 'Aktuelle Anordnung',
		description: 'Die aktuelle Anordnung der Punkte wird als Pfad interpretiert.',
		method: 'transmute',
		complexity: 'O(1)',
		icon: Icon.CameraFotoOutline
	},
	{
		name: 'Zufällig',
		description:
			'Die Punkte werden zufällig nacheinander ausgewählt und so zu einem Pfad zusammengefügt.',
		method: 'random',
		complexity: 'O(n)',
		expectedTime: () => 0,
		icon: Icon.ShuffleOutline
	},
	{
		name: 'Brute Force',
		description:
			'Alle möglichen Permutationen der Punkte werden ausprobiert und die minimale wird gewählt.',
		method: 'bruteForce',
		complexity: 'O(n!)',
		expectedTime: (n: number, latency: number) =>
			Math.max((latency / 1000) * n, factorial(n) / 15128000),
		icon: Icon.HourglassOutline
	},
	{
		name: 'Nearest Neighbor',
		description:
			'Die Methode des nächsten Nachbarn beginnt mit dem Anfangspunkt und wählt stets den nächsten Punkt, der noch nicht besucht wurde, und baut so den Pfad auf.',
		method: 'nearestNeighbor',
		complexity: 'O(n²)',
		expectedTime: (n: number, latency: number) =>
			Math.max(
				(latency / 1000) * n,
				n ** 2 / 30000 + n ** 4.6 / 2000000000000 - n ** 3 / 1000000000
			),
		icon: Icon.PhoneOutline
	},
	{
		name: 'Optimal Nearest Neighbor',
		description: 'Führt NN für alle Startpunkte aus.',
		method: 'optimalNearestNeighbor',
		complexity: 'O(n³)',
		expectedTime: (n: number, latency: number) =>
			Math.max((latency / 1000) * n * 2, n ** 3 / 5000000 + (4 * n) / 1000),
		icon: Icon.PhoneOutline
	},
	{
		name: 'Einfügen',
		method: 'insertion',
		description:
			'In jedem Einfügeschritt wird die beste Möglichkeit ermittelt, einen beliebigen freien Knoten an einer beliebigen Position einzufügen, und die beste ausgewählt, bis der Pfad alle Knoten besucht.',
		icon: Icon.ArrowUpOutline
	},
	{
		name: 'Greedy',
		description:
			'Der Greedy-Algorithmus wählt stets die kürzeste Kante aus, bei deren Auswahl kein Zyklus entsteht.',
		method: 'greedy',
		complexity: 'O(n²)',
		expectedTime: (n: number, latency: number) => (latency / 1000) * n,
		icon: Icon.DollarOutline
	},
	{
		name: 'Held-Karp',
		method: 'heldKarp',
		description:
			'Der Held-Karp-Algorithmus wurde 1962 für die Lösung des Travelling-Salesman-Problems entwickelt und kann ähnlich auch für die mehrdimensionale Sortierung genutzt werden. Dabei werden mittels dynamischer Programmierung Ergebnisse memoisiert, um die Mehrfachberechnung zu verhindern.',
		expectedTime: (n: number, latency: number) =>
			Math.max((latency / 1000) * (n + 32), (n ** 3 * 2 ** n) / 350000 / 1000),
		icon: Icon.CompressOutline
	},
	{
		name: 'ILP',
		method: 'ilp',
		description:
			'Das Problem der Kettensortierung kann als Problem der ganzzahliges lineares Optimierung (engl. integer linear program, kurz ILP) formuliert werden. Dieses wird iterativ mithilfe einer C-Bibliothek gelöst.',
		parameters: ['milpSolver'],
		expectedTime: () => null,
		icon: Icon.BrainOutline
	}
];

export const improvementAlgorithms: ImprovementAlgorithm[] = [
	{
		name: 'Rotieren',
		description: 'Der Pfad wird eindimensional rotiert und so das beste Ergebnis gefunden.',
		method: 'rotate',
		complexity: 'O(n)',
		icon: Icon.RotateOutline
	},
	{
		name: 'Swap',
		description: 'Swap tauscht zwei Kanten, falls dies die Kantenlänge verringert.',
		method: 'swap',
		stepwise: true,
		icon: Icon.ChervonDoubleDownSolid
	},
	{
		name: '2-opt',
		description:
			'Beim 2-opt-Verfahren werden Überkreuzungen zweier Kanten gesucht und durch Tauschen der Knoten behoben.',
		method: 'twoOpt',
		complexity: 'O(n²)',
		stepwise: true,
		icon: Icon.SwatchbookOutline
	},
	{
		name: '3-opt',
		description: 'Beim 3-opt-Verfahren werden drei Kanten getauscht.',
		method: 'threeOpt',
		complexity: 'O(n³)',
		stepwise: true,
		icon: Icon.SwatchbookSolid
	},
	{
		name: 'Inneres Rotieren',
		description: 'Wie Rotieren, nur auf jeden sequentielle Teilpfad des Pfades angewandt.',
		method: 'innerRotate',
		complexity: 'O(n³)',
		stepwise: true,
		icon: Icon.RotateOutline
	},
	{
		name: 'Simulated Annealing',
		description: 'Zu Beginn werden Knoten zufällig getauscht, zum Schluss hin nur noch taktisch.',
		method: 'simulatedAnnealing',
		parameters: ['iterationCount', 'initialTemperature'],
		icon: Icon.ChartSolid
	}
];
