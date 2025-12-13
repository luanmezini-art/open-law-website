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
        area: 45,
        price: 1250,
        status: 'available',
        features: ['Klimaanlage', 'Glaswand', '2 Fensterseiten', 'Netzwerkanschluss'],
        description: 'Helles Eckbüro mit zwei Fensterseiten und Blick auf den Innenhof. Ideal für kleine Teams oder als repräsentatives Einzelbüro.',
        x: 20,
        y: 20,
        width: 130,
        height: 160,
        image: '/images/office-small.png',
    },
    {
        id: '102',
        name: 'Büro 102',
        area: 32,
        price: 890,
        status: 'available',
        features: ['Ruhige Lage', 'Kompakt', 'Teppichboden'],
        description: 'Effizientes Einzelbüro in ruhiger Lage. Perfekt für konzentriertes Arbeiten.',
        x: 170,
        y: 20,
        width: 130,
        height: 160,
        image: '/images/office-small.png',
    },
    {
        id: '103',
        name: 'Büro 103',
        area: 28,
        price: 750,
        status: 'reserved',
        features: ['Innenhofblick', 'Möbliert'],
        description: 'Kompaktes Büro mit Blick in den begrünten Innenhof. Bereits hochwertig möbliert.',
        x: 320,
        y: 20,
        width: 130,
        height: 160,
        image: '/images/office-small.png',
    },
    {
        id: '104',
        name: 'Büro 104',
        area: 65,
        price: 1800,
        status: 'available',
        features: ['Eckbüro', 'Panoramablick', 'Klimaanlage', 'Meeting-Ecke'],
        description: 'Großzügiges Eckbüro mit viel Tageslicht und Platz für eine eigene Besprechungsecke.',
        x: 470,
        y: 20,
        width: 280, // Double width
        height: 160,
        image: '/images/office-large.png',
    },

    // Bottom Row
    {
        id: '105',
        name: 'Büro 105',
        area: 38,
        price: 950,
        status: 'rented',
        features: ['Ruhige Lage', 'Archivschrank'],
        description: 'Gut geschnittenes Büro mit integriertem Archivbereich.',
        x: 20,
        y: 200,
        width: 130,
        height: 160,
        image: '/images/office-small.png',
    },
    {
        id: '106',
        name: 'Büro 106',
        area: 55,
        price: 1450,
        status: 'available',
        features: ['Großraumbüro', 'Teeküche', 'Schallschutz'],
        description: 'Modernes Team-Büro mit eigener Teeküche und Schallschutz-Elementen.',
        x: 170,
        y: 200,
        width: 130,
        height: 160,
        image: '/images/office-medium.png',
    },
    {
        id: '107',
        name: 'Büro 107',
        area: 42,
        price: 1100,
        status: 'available',
        features: ['Tageslicht', 'Ergonomische Möbel'],
        description: 'Helles Büro mit ergonomischer Grundausstattung.',
        x: 320,
        y: 200,
        width: 130,
        height: 160,
        image: '/images/office-small.png',
    },
    {
        id: '108',
        name: 'Büro 108',
        area: 85,
        price: 2200,
        status: 'available',
        features: ['Konferenzbereich', 'Klimaanlage', 'Eckbüro', 'Lounge-Area'],
        description: 'Repräsentative Bürosuite mit separatem Konferenzbereich und Lounge.',
        x: 470,
        y: 200,
        width: 130,
        height: 160,
        image: '/images/office-large.png',
    },
    {
        id: '109',
        name: 'Büro 109',
        area: 30,
        price: 800,
        status: 'rented',
        features: ['Archivraum', 'Server-Anschluss'],
        description: 'Technik-optimiertes Büro, ideal als Serverraum oder Backoffice.',
        x: 620,
        y: 200,
        width: 130,
        height: 160,
        image: '/images/office-small.png',
    },
];
