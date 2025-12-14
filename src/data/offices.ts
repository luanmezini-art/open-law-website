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

export const offices: Office[] = [
    // Top Row
    {
        id: '101',
        name: 'Büro 101',
        area: 14.65,
        price: 353.07,
        status: 'available',
        features: ['Teppichboden', 'LED-Beleuchtung', 'Blick zur Spree'],
        description: 'Modernes Einzelbüro mit neuem Teppichboden und effizienter Raumaufteilung.',
        x: 20,
        y: 20,
        width: 130,
        height: 160,
        image: imgSmall,
    },
    {
        id: '102',
        name: 'Büro 102',
        area: 14.66,
        price: 353.31,
        status: 'available',
        features: ['EDV-Verkabelung', 'Ruhige Lage'],
        description: 'Identisches Nachbarbüro, ideal für konzentriertes Arbeiten.',
        x: 170,
        y: 20,
        width: 130,
        height: 160,
        image: imgSmall,
    },
    {
        id: '103',
        name: 'Büro 103',
        area: 14.73,
        price: 354.99,
        status: 'reserved',
        features: ['Multi-Port', 'Glasfaser'],
        description: 'Kompaktes Büro, bereits reserviert für neue Mieter.',
        x: 320,
        y: 20,
        width: 130,
        height: 160,
        image: imgSmall,
    },
    {
        id: '104',
        name: 'Büro 104',
        area: 23.23,
        price: 559.84,
        status: 'available',
        features: ['Großzügig', '2 Fenster', 'Klimatisierung'],
        description: 'Helles Team-Büro mit ausreichend Platz für 2-3 Arbeitsplätze.',
        x: 470,
        y: 20,
        width: 280, // Double width
        height: 160,
        image: imgLarge,
    },

    // Bottom Row
    {
        id: '105',
        name: 'Büro 105',
        area: 14.44,
        price: 348.00,
        status: 'rented',
        features: ['Archivschrank', 'Innenhof'],
        description: 'Verrmietetes Einzelbüro mit Blick in den ruhigen Innenhof.',
        x: 20,
        y: 200,
        width: 130,
        height: 160,
        image: imgSmall,
    },
    {
        id: '106',
        name: 'Büro 106',
        area: 14.59,
        price: 351.62,
        status: 'available',
        features: ['Teeküchen-Nähe', 'Schallschutz'],
        description: 'Praktisches Büro in der Nähe der Gemeinschaftsküche.',
        x: 170,
        y: 200,
        width: 130,
        height: 160,
        image: imgMedium,
    },
    {
        id: '107',
        name: 'Büro 107',
        area: 29.20,
        price: 703.72,
        status: 'available',
        features: ['Ecklage', 'Doppelbüro'],
        description: 'Geräumiges Doppelbüro (zusammenlegbar) mit viel Licht.',
        x: 320,
        y: 200,
        width: 130,
        height: 160,
        image: imgSmall,
    },
    {
        id: '108',
        name: 'Büro 108',
        area: 63.30,
        price: 1525.53,
        status: 'available',
        features: ['Konferenzraum', 'Panorama', 'Präsentationstechnik'],
        description: 'Großer Meetingraum oder Open-Space Bereich für das ganze Team.',
        x: 470,
        y: 200,
        width: 130,
        height: 160,
        image: imgLarge,
    },
    {
        id: '109',
        name: 'Büro 109',
        area: 12.50,
        price: 301.25,
        status: 'rented',
        features: ['Server', 'Lager'],
        description: 'Kleines Büro oder Lagerfläche.',
        x: 620,
        y: 200,
        width: 130,
        height: 160,
        image: imgSmall,
    },
];
