import React, { useState } from 'react';
import { X, Download, CheckCircle } from 'lucide-react';
import type { Office } from '../data/offices';
import { generateContract } from '../utils/contract';

interface InquiryModalProps {
    selectedOffices: Office[];
    onClose: () => void;
}

interface FormData {
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    startDate: string;
    duration: number;
}

const InquiryModal: React.FC<InquiryModalProps> = ({ selectedOffices, onClose }) => {
    const [formData, setFormData] = useState<FormData>({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        startDate: '',
        duration: 12,
    });

    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
    const [isSuccess, setIsSuccess] = useState(false);

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof FormData, string>> = {};

        if (!formData.companyName.trim()) newErrors.companyName = 'Firmenname ist erforderlich';
        if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Ansprechpartner ist erforderlich';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) newErrors.email = 'Ungültige E-Mail-Adresse';

        const phoneRegex = /^[+\d\s()/-]+$/;
        if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Ungültige Telefonnummer';
        }

        if (!formData.startDate) newErrors.startDate = 'Mietbeginn ist erforderlich';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const [lastContract, setLastContract] = useState<{ doc: any, filename: string } | null>(null);

    const handleSubmit = () => {
        if (validate()) {
            const result = generateContract(selectedOffices, formData);
            result.doc.save(result.filename);
            setLastContract(result);
            setIsSuccess(true);
            // Removed auto-close timeout to let user see the download feedback
        }
    };

    const totalBaseRent = selectedOffices.reduce((sum, office) => sum + office.price, 0);
    const totalArea = selectedOffices.reduce((sum, office) => sum + office.area, 0);
    const serviceCharges = totalArea * 3.50;
    const cleaningFee = totalArea * 1.50;
    const monthlyNet = totalBaseRent + serviceCharges + cleaningFee;
    const monthlyGross = monthlyNet * 1.19;
    const totalContractValue = monthlyGross * formData.duration;

    if (isSuccess) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-in fade-in zoom-in">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Anfrage erfolgreich!</h3>
                    <p className="text-slate-600 mb-6">
                        Ihr Mietvertrag wurde generiert und heruntergeladen. <br />
                        Wir werden uns in Kürze bei Ihnen melden.
                    </p>

                    <div className="flex flex-col gap-3">
                        {lastContract && (
                            <button
                                onClick={() => lastContract.doc.save(lastContract.filename)}
                                className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium flex items-center justify-center gap-2 transition-colors"
                            >
                                <Download className="w-5 h-5" />
                                Vertrag erneut herunterladen
                            </button>
                        )}
                        <button onClick={onClose} className="w-full py-3 px-4 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors">
                            Schließen
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-4 md:my-8 animate-in fade-in zoom-in duration-300">
                <div className="bg-slate-50 p-4 md:p-6 border-b border-slate-100 flex justify-between items-center relative md:sticky md:top-0 z-10 rounded-t-2xl">
                    <h3 className="text-base md:text-xl font-bold text-slate-900">Mietanfrage ({selectedOffices.length} Büros)</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500">
                        <X className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                </div>

                <div className="p-4 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Firmenname *</label>
                                <input
                                    type="text"
                                    value={formData.companyName}
                                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                    className={`w-full px-4 py-2 rounded-lg border ${errors.companyName ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:border-blue-500'} outline-none transition-colors`}
                                />
                                {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Ansprechpartner *</label>
                                <input
                                    type="text"
                                    value={formData.contactPerson}
                                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                                    className={`w-full px-4 py-2 rounded-lg border ${errors.contactPerson ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:border-blue-500'} outline-none transition-colors`}
                                />
                                {errors.contactPerson && <p className="text-red-500 text-xs mt-1">{errors.contactPerson}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">E-Mail *</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:border-blue-500'} outline-none transition-colors`}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Telefon *</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className={`w-full px-4 py-2 rounded-lg border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:border-blue-500'} outline-none transition-colors`}
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Mietbeginn *</label>
                                <input
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    className={`w-full px-4 py-2 rounded-lg border ${errors.startDate ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:border-blue-500'} outline-none transition-colors`}
                                />
                                {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Laufzeit</label>
                                <select
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 outline-none bg-white"
                                >
                                    <option value={6}>6 Monate</option>
                                    <option value={12}>12 Monate</option>
                                    <option value={24}>24 Monate</option>
                                    <option value={36}>36 Monate</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-100">
                        <h4 className="font-bold text-slate-900 mb-4">Zusammenfassung</h4>
                        <div className="flex justify-between mb-2 text-sm">
                            <span className="text-slate-600">Monatliche Kosten (brutto)</span>
                            <span className="font-medium">{monthlyGross.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</span>
                        </div>
                        <div className="flex justify-between mb-2 text-sm">
                            <span className="text-slate-600">Laufzeit</span>
                            <span className="font-medium">{formData.duration} Monate</span>
                        </div>
                        <div className="border-t border-blue-200 mt-3 pt-3 flex justify-between items-center">
                            <span className="font-bold text-slate-900">Gesamtvertragswert</span>
                            <span className="text-xl font-bold text-blue-600">{totalContractValue.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 px-6 rounded-xl border border-slate-300 text-slate-600 font-medium hover:bg-slate-50 transition-colors"
                        >
                            Abbrechen
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="flex-1 py-3 px-6 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/30"
                        >
                            <Download className="w-5 h-5" />
                            Anfrage senden & Vertrag laden
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InquiryModal;
