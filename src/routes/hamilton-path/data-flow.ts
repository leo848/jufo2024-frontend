// Diese Datei soll den Datenfluss der Hamilton-Pfad-Unterseite detaillierter erläutern.

// matrixValues = [
// 				[0, 4, 1],
// 				[4, 0, 2],
// 				[1, 2, 0]
// 			   ]
// - konstant, Werte nur manuell veränderbar)
// - symmetrisch, Hauptdiagonale 0
//
// vertexNames = ["a", "b", "c"]

// Ausführen von NN (oder beliebigem anderen Konstruktionsalgorithmus)
//
// path = [2, 3, 1]
// |-> vertexNamesPath = [{ name: "b", index: 1}, {name: "c", index: 2}, {name: "a", index: 0}]
//     |-> matrixValuesPath = [
//                             [ 0, 2, 4 ],
//                             [ 2, 0, 1 ],
//                             [ 4, 1, 0 ],
//                            ]
//

// Ausführen von 2-opt
//
// matrixValuesPath (2opt) -> server
//
// server -> path
// (z.B. [0, 1, 2])
//
// newPath <- path an den Stellen der Indizes
// path = []
