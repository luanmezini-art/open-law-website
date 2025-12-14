

import { Wifi, Coffee, Users, Printer, Lock, Car, Train, Building2, ShowerHead } from 'lucide-react';

const Amenities = () => {
    const amenities = [
        { icon: Wifi, title: 'Highspeed Internet', desc: 'Glasfaser-Anbindung' },
        { icon: Train, title: 'Top Anbindung', desc: 'U2 Märk. Museum & S-Jannowitzbrücke' },
        { icon: Building2, title: 'Modernes Objekt', desc: 'Bürokomplex Baujahr 2000er' },
        { icon: ShowerHead, title: 'Sanitär & Küche', desc: '2 Bäder, 2 Duschen & Küche' },
        { icon: Coffee, title: 'Premium Kaffee', desc: 'Flatrate inklusive' },
        { icon: Users, title: 'Meetingräume', desc: 'Buchbar per App' },
        { icon: Printer, title: 'Druckerstation', desc: 'Fair-Use Policy' },
        { icon: Lock, title: '24/7 Zugang', desc: 'Sicheres Schließsystem' },
        { icon: Car, title: 'Parkplätze', desc: 'Optional verfügbar' },
    ];

    return (
        <div className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Alles für Ihren Erfolg</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Konzentrieren Sie sich auf Ihr Business. Wir kümmern uns um den Rest.
                        Unsere All-Inclusive Ausstattung lässt keine Wünsche offen.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
                    {amenities.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-4 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col items-center text-center group"
                        >
                            <div className="w-10 h-10 md:w-16 md:h-16 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 mb-3 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                                <item.icon className="w-5 h-5 md:w-8 md:h-8" />
                            </div>
                            <h3 className="text-sm md:text-xl font-bold text-slate-900 mb-1 md:mb-2">{item.title}</h3>
                            <p className="text-xs md:text-base text-slate-500">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Amenities;
