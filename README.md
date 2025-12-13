# BusinessCenter Premium - Website

Eine moderne React-Webseite für die Vermietung von Gewerbeflächen, entwickelt mit Vite, TypeScript und Tailwind CSS.

## Features

- **Interaktiver Grundriss**: Auswahl von Büros direkt auf der Karte.
- **Multi-Selection**: Mehrere Büros gleichzeitig auswählen.
- **Kostenkalkulator**: Automatische Berechnung von Miete, Nebenkosten und Kaution.
- **PDF-Vertragsgenerierung**: Erstellung professioneller Mietverträge direkt im Browser.
- **Responsive Design**: Optimiert für Desktop und Tablets.

## Installation & Start (Lokal)

Um dieses Projekt auf einem anderen Computer auszuführen, folgen Sie diesen Schritten:

1. **Voraussetzungen**: Stellen Sie sicher, dass [Node.js](https://nodejs.org/) installiert ist.
2. **Projekt herunterladen**: Entpacken Sie den Projektordner.
3. **Abhängigkeiten installieren**:
   Öffnen Sie ein Terminal im Projektordner und führen Sie aus:
   ```bash
   npm install
   ```
4. **Entwicklungsserver starten**:
   ```bash
   npm run dev
   ```
   Die Seite ist dann unter `http://localhost:5173` erreichbar.

## Im lokalen Netzwerk teilen

Um die Seite für andere Geräte im gleichen WLAN sichtbar zu machen:

1. Starten Sie den Server mit:
   ```bash
   npm run dev -- --host
   ```
2. Im Terminal wird eine "Network"-Adresse angezeigt (z.B. `http://192.168.1.x:5173`).
3. Geben Sie diese Adresse auf dem anderen Gerät ein.

## Technologien

- React 18
- TypeScript
- Tailwind CSS v4
- Lucide React (Icons)
- jsPDF (PDF Generierung)
    tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
