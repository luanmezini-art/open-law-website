
import { MapPin, Building2, Clock, Shield } from 'lucide-react';

const Hero = () => {
  return (
    <div className="bg-slate-900 text-white py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
          Ihr perfektes Büro <br />
          <span className="text-blue-400">wartet auf Sie</span>
        </h1>

        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          Entdecken Sie moderne Gewerbeflächen im BusinessPark Zentrum.
          Wählen Sie Ihr Wunschbüro direkt am Grundriss und erstellen Sie sofort Ihren Mietvertrag.
        </p>

        <div className="flex justify-center mb-16">
          <a
            href="/Expose.pdf"
            target="_blank"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-colors backdrop-blur-sm border border-white/10"
          >
            <Building2 className="w-5 h-5" />
            Exposé als PDF ansehen
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-2 md:gap-3 p-3 md:p-4 rounded-xl hover:bg-white/5 transition-colors">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
              <MapPin className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="text-center">
              <div className="text-xs md:text-sm text-slate-400">Standort</div>
              <div className="text-sm md:text-base font-semibold">Wallstr. 15, Berlin</div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 md:gap-3 p-3 md:p-4 rounded-xl hover:bg-white/5 transition-colors">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
              <Building2 className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="text-center">
              <div className="text-xs md:text-sm text-slate-400">Gesamtfläche</div>
              <div className="text-sm md:text-base font-semibold">415 m² (4. OG)</div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 md:gap-3 p-3 md:p-4 rounded-xl hover:bg-white/5 transition-colors">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
              <Clock className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="text-center">
              <div className="text-xs md:text-sm text-slate-400">Verfügbarkeit</div>
              <div className="text-sm md:text-base font-semibold">Ab 01.07.2025</div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 md:gap-3 p-3 md:p-4 rounded-xl hover:bg-white/5 transition-colors">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
              <Shield className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="text-center">
              <div className="text-xs md:text-sm text-slate-400">Ausstattung</div>
              <div className="text-sm md:text-base font-semibold">Vollständig renoviert</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
