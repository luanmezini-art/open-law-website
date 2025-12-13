
import { Building2, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 py-16">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
                {/* Brand Column */}
                <div>
                    <div className="flex items-center gap-2 text-white mb-6">
                        <Building2 className="w-8 h-8 text-blue-500" />
                        <span className="text-xl font-bold">BusinessCenter Premium</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                        Ihr Partner für professionelle Büroflächen in Berlin.
                        Flexibel, modern und repräsentativ.
                    </p>
                </div>

                {/* Contact Column */}
                <div>
                    <h3 className="text-white font-bold mb-6">Kontakt</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-blue-500" />
                            <span>Hauptstraße 123, 10115 Berlin</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-blue-500" />
                            <span>+49 (0) 30 123 456 78</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-blue-500" />
                            <span>kontakt@businesscenter-premium.de</span>
                        </div>
                    </div>
                </div>

                {/* Hours Column */}
                <div>
                    <h3 className="text-white font-bold mb-6">Öffnungszeiten</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Montag - Freitag</span>
                            <span className="text-white">08:00 - 18:00</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Samstag</span>
                            <span className="text-white">09:00 - 14:00</span>
                        </div>
                        <div className="flex justify-between pt-4 border-t border-slate-800 mt-4">
                            <span>Zugang für Mieter</span>
                            <span className="text-blue-400 font-bold">24/7</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
                © {new Date().getFullYear()} BusinessCenter Premium GmbH. Alle Rechte vorbehalten.
            </div>
        </footer>
    );
};

export default Footer;
