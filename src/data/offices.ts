import imgSmall from '../assets/images/office-small.png';
import imgMedium from '../assets/images/office-medium.png';
import imgLarge from '../assets/images/office-large.png';

export interface Office {
    id: string;
    name: string;
    area: number;
    price: number;
    status: 'available' | 'reserved' | 'rented';
    features: string[];
    description: string;
    x: number;
    y: number;
    width: number;
    height: number;
    image: string;
}

// Layout Note:
// The plan shows a long horizontal corridor.
// Top Row (Hofseite): Rooms 30-35
// Bottom Row (Straßenseite): Rooms 20-29
// Layout verified against floor plan screenshot.

export const offices: Office[] = [
    // --- Hofseite (Top Row) ---
    {
        id: '04',
        name: 'Flur 04',
        area: 68.3,
        price: 0,
        status: 'rented', // Common area
        features: ['Gemeinschaftsfläche'],
        description: 'Großzügiger Flurbereich.',
        x: 0,
        y: 120, // Middle "Separating" corridor visually, though handled differently usually. Let's put rooms around it.
        width: 1020, // Spans whole width
        height: 60,
        image: imgLarge,
    },
    // We will place Top Row at y=0, Bottom Row at y=200. Corridor roughly in between visually.

    // Hofseite Rooms (Left to Right)
    {
        id: '33',
        name: 'Büro 33',
        area: 14.4,
        price: 345,
        status: 'available',
        features: ['Hofseitig', 'Ruhig'],
        description: 'Ruhiges Einzelbüro zum Hof.',
        x: 230, // Starting after stairwell
        y: 0,
        width: 100,
        height: 120,
        image: imgSmall,
    },
    {
        id: '32',
        name: 'Büro 32',
        area: 23.3,
        price: 560,
        status: 'available',
        features: ['Team-Büro', 'Hofblick'],
        description: 'Helles Büro für 2 Personen.',
        x: 340,
        y: 0,
        width: 140,
        height: 120,
        image: imgMedium,
    },
    {
        id: '31',
        name: 'Büro 31',
        area: 23.2,
        price: 558,
        status: 'available',
        features: ['Verglast', 'Modern'],
        description: 'Modernes Team-Büro, zentral gelegen.',
        x: 490,
        y: 0,
        width: 140,
        height: 120,
        image: imgMedium,
    },
    {
        id: '35', // Assuming label
        name: 'Büro 35',
        area: 14.0,
        price: 336,
        status: 'rented',
        features: ['Kompakt'],
        description: 'Kleines Einzelbüro.',
        x: 640,
        y: 0,
        width: 100,
        height: 120,
        image: imgSmall,
    },

    // --- Straßenseite (Bottom Row) - Rooms 20-29 ---
    {
        id: '20',
        name: 'Büro 20',
        area: 25.3,
        price: 608,
        status: 'available',
        features: ['Eckbüro', 'Straßenblick'],
        description: 'Großes Eckbüro mit viel Licht.',
        x: 0,
        y: 200,
        width: 140,
        height: 140,
        image: imgMedium,
    },
    {
        id: '21',
        name: 'Büro 21',
        area: 14.7,
        price: 353,
        status: 'available',
        features: ['Standard', 'Effizient'],
        description: 'Klassisches Einzelbüro.',
        x: 150,
        y: 200,
        width: 80,
        height: 140,
        image: imgSmall,
    },
    {
        id: '22',
        name: 'Büro 22',
        area: 14.7,
        price: 353,
        status: 'rented',
        features: [],
        description: 'Vermietet.',
        x: 240,
        y: 200,
        width: 80,
        height: 140,
        image: imgSmall,
    },
    {
        id: '23',
        name: 'Büro 23',
        area: 14.7,
        price: 353,
        status: 'available',
        features: ['Standard'],
        description: 'Effizientes Einzelbüro.',
        x: 330,
        y: 200,
        width: 80,
        height: 140,
        image: imgSmall,
    },
    {
        id: '24',
        name: 'Büro 24',
        area: 14.7,
        price: 353,
        status: 'available',
        features: ['Standard'],
        description: 'Effizientes Einzelbüro.',
        x: 420,
        y: 200,
        width: 80,
        height: 140,
        image: imgSmall,
    },
    {
        id: '25',
        name: 'Büro 25',
        area: 14.7,
        price: 353,
        status: 'available',
        features: ['Standard'],
        description: 'Effizientes Einzelbüro.',
        x: 510,
        y: 200,
        width: 80,
        height: 140,
        image: imgSmall,
    },
    {
        id: '26',
        name: 'Büro 26',
        area: 14.7,
        price: 353,
        status: 'reserved',
        features: ['Reserviert'],
        description: 'Reserviert.',
        x: 600,
        y: 200,
        width: 80,
        height: 140,
        image: imgSmall,
    },
    {
        id: '27',
        name: 'Büro 27',
        area: 14.7,
        price: 353,
        status: 'available',
        features: ['Standard'],
        description: 'Effizientes Einzelbüro.',
        x: 690,
        y: 200,
        width: 80,
        height: 140,
        image: imgSmall,
    },
    {
        id: '28',
        name: 'Büro 28',
        area: 14.7,
        price: 353,
        status: 'available',
        features: ['Standard'],
        description: 'Effizientes Einzelbüro.',
        x: 780,
        y: 200,
        width: 80,
        height: 140,
        image: imgSmall,
    },
    {
        id: '29',
        name: 'Büro 29',
        area: 25.2,
        price: 605,
        status: 'rented',
        features: ['Eckbüro'],
        description: 'Großes Eckbüro.',
        x: 870,
        y: 200,
        width: 140,
        height: 140,
        image: imgMedium,
    },
];
