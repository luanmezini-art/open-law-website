import React from 'react';

import { Wifi, Coffee, Users, Printer, Lock, Car } from 'lucide-react';

const Amenities = () => {
    const amenities = [
        { icon: Wifi, title: 'Highspeed Internet', desc: 'Glasfaser-Anbindung' },
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

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {amenities.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col items-center text-center group"
                        >
                            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                                <item.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                            <p className="text-slate-500">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Amenities;
