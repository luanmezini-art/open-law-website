import React from 'react';
import { X, Check, ArrowRight } from 'lucide-react';
import type { Office } from '../data/offices';

interface CostBreakdownModalProps {
    selectedOffices: Office[];
    onClose: () => void;
    onProceed: () => void;
}

const CostBreakdownModal: React.FC<CostBreakdownModalProps> = ({ selectedOffices, onClose, onProceed }) => {
    const totalArea = selectedOffices.reduce((sum, office) => sum + office.area, 0);
    const baseRent = selectedOffices.reduce((sum, office) => sum + office.price, 0);

    // Costs calculation
    const serviceCharges = totalArea * 3.50; // 3.50€ per m²
    const cleaningFee = totalArea * 1.50; // 1.50€ per m²
    const netTotal = baseRent + serviceCharges + cleaningFee;
    const vat = netTotal * 0.19;
    const grossTotal = netTotal + vat;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">Kostenübersicht</h3>
                        <p className="text-slate-500 text-sm mt-1">
                            {selectedOffices.length} {selectedOffices.length === 1 ? 'Büro' : 'Büros'} ausgewählt
                        </p>
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
                    <div className="mb-8">
                        <h4 className="font-bold text-slate-900 mb-4">Ausgewählte Einheiten</h4>
                        <div className="flex flex-wrap gap-2">
                            {selectedOffices.map(office => (
                                <span key={office.id} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
                                    {office.name} ({office.area} m²)
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 space-y-3 mb-8">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600">Nettokaltmiete</span>
                            <span className="font-medium">{baseRent.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500">Nebenkostenpauschale (3,50 €/m²)</span>
                            <span className="text-slate-600">{serviceCharges.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500">Reinigungsservice (1,50 €/m²)</span>
                            <span className="text-slate-600">{cleaningFee.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</span>
                        </div>

                        <div className="border-t border-slate-200 my-2 pt-2">
                            <div className="flex justify-between items-center font-medium">
                                <span className="text-slate-900">Zwischensumme (netto)</span>
                                <span>{netTotal.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</span>
                            </div>
                            <div className="flex justify-between items-center text-sm mt-1">
                                <span className="text-slate-500">MwSt. (19%)</span>
                                <span className="text-slate-600">{vat.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</span>
                            </div>
                        </div>

                        <div className="border-t border-slate-300 pt-3 mt-2">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-slate-900">Gesamtbetrag (brutto)</span>
                                <span className="text-2xl font-bold text-blue-600">{grossTotal.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</span>
                            </div>
                            <p className="text-right text-xs text-slate-400 mt-1">monatlich</p>
                        </div>
                    </div>

                    <button
                        onClick={onProceed}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-blue-500/30"
                    >
                        <span>Weiter zur Anfrage</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CostBreakdownModal;
