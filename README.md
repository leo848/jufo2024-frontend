# jufo2024-frontend

Dieses Repository enthält den Code für die Frontend-Webanwendung des Jugend forscht-Projekts "sorting the colors: Dimensionsbezogene Generalisierung vergleichsbasierter Sortierung". Die Webanwendung ist in [Svelte](svelte.dev) geschrieben.

## Installation (Entwicklung)

```
git clone https://github.com/leo848/jufo2024-frontend
cd jufo2024-frontend
pnpm run dev
```

Ohne Backend können allerdings keine Algorithmen ausgeführt werden. Für die Installation des Backends siehe [dessen Repo](https://github.com/leo848/jufo2024-backend).

## Funktionen

- Natürliche Zahlen mittels verschiedener Sortieralgorithmen sortieren
  - Aktuell implementiert: Bubble Sort, Selection Sort, Insertion Sort
  - visualisiert als Karten, sowie als (dreidimensionales) Balkendiagramm
- Farben sortieren
  - Farben auswählen
    - Farbräume: sRGB, linear sRGB, HSV, CMY, oklab
    - Farbauswahl
      - automatische Konvertierung zu CSS-Farben und Hexadezimalwert
      - Regler mit adaptivem Farbverlauf
      - zweidimensionale Auswahl aus Diagramm
    - Farbbenennung
      - mittels [color-names](https://github.com/meodai/color-names) benennen
      - Auswahl der Namenliste: HTML-Farben, X11-Farben, und viele mehr (siehe dieses Repo)
      - Distanz zur benannten Farbe anzeigen, Farben normalisieren
  - Liste von Farben erzeugen
  - Farben im interaktiven dreidimensionalen Diagramm anzeigen
- Vektoren sortieren
  - Vektoren einer beliebigen Dimension eingeben
  - Kräftebasierte Graphendarstellung
    - physikalische Simulation (Hooke)
    - mehrdimensionalen Graphen in 2D darstellen
