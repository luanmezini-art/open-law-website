

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
        <div className="py-12 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">Alles für Ihren Erfolg</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
                        Konzentrieren Sie sich auf Ihr Business. Wir kümmern uns um den Rest.
                        Unsere All-Inclusive Ausstattung lässt keine Wünsche offen.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-2 md:gap-6">
                    {amenities.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-2 md:p-5 rounded-xl md:rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col items-center text-center group"
                        >
                            <div className="w-8 h-8 md:w-12 md:h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 mb-1.5 md:mb-3 group-hover:scale-110 transition-transform duration-300">
                                <item.icon className="w-4 h-4 md:w-6 md:h-6" />
                            </div>
                            <h3 className="text-xs md:text-lg font-bold text-slate-900 mb-0.5 md:mb-1">{item.title}</h3>
                            <p className="text-[10px] md:text-sm text-slate-500 leading-tight">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Amenities;
