import imgSmall from '../assets/images/office-small.png';
import imgMedium from '../assets/images/office-medium.png';
import imgLarge from '../assets/images/office-large.png';

export interface Office {
    id: string;
    name: string;
    area: number;
    price: number;
    status: 'available' | 'reserved' | 'rented';
    type?: 'office' | 'facility';
    features: string[];
    description: string;
    x: number;
    y: number;
    width: number;
    height: number;
    image: string;
    bookings?: { start: string; end: string }[];
}

// Layout Note:
// The plan shows a long horizontal corridor.
// Top Row (Hofseite): Rooms 30-35
// Bottom Row (Straßenseite): Rooms 20-29
// Layout verified against floor plan screenshot.

export const offices: Office[] = [
    // --- Struktur / Facilities (Hofseite) ---
    {
        id: 'TH4',
        name: 'TH4',
        area: 0,
        price: 0,
        status: 'rented',
        type: 'facility',
        features: [],
        description: 'Treppenhaus Links',
        x: 20,
        y: 60,
        width: 60,
        height: 140,
        image: imgSmall,
    },
    {
        id: 'FAC_L',
        name: 'WC / Küche',
        area: 0,
        price: 0,
        status: 'rented',
        type: 'facility',
        features: [],
        description: 'Sanitäranlagen und Teeküche',
        x: 90,
        y: 60,
        width: 120,
        height: 140,
        image: imgSmall,
    },

    // --- Büros Hofseite (Links vom Eingang) ---
    {
        id: '33',
        name: 'Büro 33',
        area: 14.4,
        price: 345,
        status: 'available',
        features: ['Hofseitig', 'Ruhig'],
        description: 'Ruhiges Einzelbüro zum Hof.',
        x: 220,
        y: 60,
        width: 100,
        height: 140,
        image: imgSmall,
        bookings: [
            { start: '2025-01-01', end: '2025-06-30' }
        ]
    },
    {
        id: '32',
        name: 'Büro 32',
        area: 23.3,
        price: 560,
        status: 'available',
        features: ['Team-Büro', 'Hofblick'],
        description: 'Helles Büro für 2 Personen.',
        x: 330,
        y: 60,
        width: 140,
        height: 140,
        image: imgMedium,
    },

    // --- Eingang / Flur Mitte ---
    // Dies ist der Durchgang/Glaswand Bereich
    {
        id: 'ENT_HOF',
        name: 'Eingang Hof',
        area: 0,
        price: 0,
        status: 'rented',
        type: 'facility',
        features: [],
        description: 'Hintereingang / Hofzugang',
        x: 480,
        y: 60,
        width: 60,
        height: 140,
        image: imgSmall,
    },

    // --- Büros Hofseite (Rechts vom Eingang) ---
    {
        id: '31',
        name: 'Büro 31',
        area: 23.2,
        price: 558,
        status: 'available',
        features: ['Verglast', 'Modern'],
        description: 'Modernes Team-Büro, zentral gelegen.',
        x: 550,
        y: 60,
        width: 140,
        height: 140,
        image: imgMedium,
    },
    {
        id: '30',
        name: 'Büro 30',
        area: 14.0,
        price: 336,
        status: 'available',
        features: ['Kompakt', 'Hofseitig'],
        description: 'Kleines Einzelbüro.',
        x: 700,
        y: 60,
        width: 100,
        height: 140,
        image: imgSmall,
    },

    // --- Struktur / Facilities Rechts ---
    {
        id: 'TH5',
        name: 'TH5',
        area: 0,
        price: 0,
        status: 'rented',
        type: 'facility',
        features: [],
        description: 'Treppenhaus Rechts',
        x: 810,
        y: 60,
        width: 60,
        height: 140,
        image: imgSmall,
    },

    // --- Flur (Mitte) ---
    {
        id: '04',
        name: 'Flur 04',
        area: 68.3,
        price: 0,
        status: 'rented', // Common area
        features: ['Gemeinschaftsfläche'],
        description: 'Großzügiger Flurbereich.',
        x: 20,
        y: 210,
        width: 850,
        height: 60,
        image: imgLarge,
    },

    // --- Büros Straßenseite (Bottom Row 20-29) ---
    {
        id: '20',
        name: 'Büro 20',
        area: 25.3,
        price: 608,
        status: 'available',
        features: ['Eckbüro', 'Straßenblick'],
        description: 'Großes Eckbüro mit viel Licht.',
        x: 20,
        y: 280,
        width: 120,
        height: 140,
        image: imgMedium,
    },
    {
        id: '21',
        name: 'Büro 21',
        area: 14.7,
        price: 353,
        status: 'available',
        features: ['Standard'],
        description: 'Effizientes Einzelbüro.',
        x: 150,
        y: 280,
        width: 80,
        height: 140,
        image: imgSmall,
    },
    {
        id: '22',
        name: 'Büro 22',
        area: 14.7,
        price: 353,
        status: 'available',
        features: ['Standard'],
        description: 'Effizientes Einzelbüro.',
        x: 235,
        y: 280,
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
        x: 320,
        y: 280,
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
        x: 405,
        y: 280,
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
        x: 490,
        y: 280,
        width: 80,
        height: 140,
        image: imgSmall,
    },
    {
        id: '26',
        name: 'Büro 26',
        area: 14.7,
        price: 353,
        status: 'available',
        features: ['Standard'],
        description: 'Effizientes Einzelbüro.',
        x: 575,
        y: 280,
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
        x: 660,
        y: 280,
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
        x: 745,
        y: 280,
        width: 80,
        height: 140,
        image: imgSmall,
    },
    {
        id: '29',
        name: 'Büro 29',
        area: 25.2,
        price: 605,
        status: 'available',
        features: ['Eckbüro'],
        description: 'Großes Eckbüro.',
        x: 835,
        y: 280,
        width: 120,
        height: 140,
        image: imgMedium,
    },
];
