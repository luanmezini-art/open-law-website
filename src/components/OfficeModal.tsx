import { X, Check, Mail, Ruler, Euro } from 'lucide-react';
import type { Office } from '../data/offices';

interface OfficeModalProps {
    office: Office;
    onClose: () => void;
    onRequest: () => void;
}

const OfficeModal: React.FC<OfficeModalProps> = ({ office, onClose, onRequest }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">{office.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            <span className="text-sm text-green-600 font-medium uppercase tracking-wide">Verfügbar</span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-8">
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <div className="flex items-center gap-2 text-blue-600 mb-1">
                                <Ruler className="w-5 h-5" />
                                <span className="font-medium">Fläche</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-900">{office.area} m²</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <div className="flex items-center gap-2 text-blue-600 mb-1">
                                <Euro className="w-5 h-5" />
                                <span className="font-medium">Miete (netto)</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-900">{office.price} €<span className="text-sm font-normal text-slate-500">/Monat</span></p>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h4 className="font-bold text-slate-900 mb-4">Ausstattung & Features</h4>
                        <ul className="grid grid-cols-2 gap-3">
                            {office.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2 text-slate-600">
                                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-8">
                        <h4 className="font-bold text-slate-900 mb-2 text-sm uppercase tracking-wide">Inklusive Nebenkosten</h4>
                        <div className="flex flex-wrap gap-2">
                            {['Heizung', 'Strom', 'Highspeed Internet', 'Reinigung'].map((item, i) => (
                                <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm text-slate-600">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={onRequest}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-blue-500/30"
                    >
                        <Mail className="w-5 h-5" />
                        Jetzt Anfragen
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OfficeModal;
