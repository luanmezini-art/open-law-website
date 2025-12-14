import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { X, Download, CheckCircle, AlertTriangle, Calendar } from 'lucide-react';
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
    endDate: string;
}

const InquiryModal: React.FC<InquiryModalProps> = ({ selectedOffices, onClose }) => {
    const [formData, setFormData] = useState<FormData>({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        startDate: '',
        endDate: '',
    });

    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
    const [availabilityError, setAvailabilityError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    // Duration calculation
    const [durationMonths, setDurationMonths] = useState(0);

    useEffect(() => {
        if (formData.startDate && formData.endDate) {
            const start = new Date(formData.startDate);
            const end = new Date(formData.endDate);
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            // Approximate months for display, pricing is usually monthly
            // Let's count full months for contract
            let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
            if (end.getDate() < start.getDate()) months--;
            // Minimal duration 1 month if days > 0
            if (months < 1 && diffDays > 0) months = 0; // Partial month? Let's say explicit dates -> explicit days.
            // But contract logic is monthly based usually. Let's use exact Months + fraction or just simple Month duration.
            // User asked for "selection on calendar".
            // Let's calculate precise months (float) for price or round up?
            // Simple approach: Duration in Months (rounded to 1 decimal)
            const m = diffDays / 30.44; // Avg days in month
            setDurationMonths(Number(m.toFixed(1)));
        } else {
            setDurationMonths(0);
        }
    }, [formData.startDate, formData.endDate]);

    const checkAvailability = (start: string, end: string): boolean => {
        const s = new Date(start);
        const e = new Date(end);

        for (const office of selectedOffices) {
            if (office.bookings) {
                for (const booking of office.bookings) {
                    const bStart = new Date(booking.start);
                    const bEnd = new Date(booking.end);
                    // Check overlap
                    if (s <= bEnd && e >= bStart) {
                        setAvailabilityError(`Büro ${office.name} ist im gewählten Zeitraum bereits belegt (${new Date(booking.start).toLocaleDateString()} - ${new Date(booking.end).toLocaleDateString()}).`);
                        return false;
                    }
                }
            }
        }
        setAvailabilityError(null);
        return true;
    };

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
        if (!formData.endDate) newErrors.endDate = 'Mietende ist erforderlich';

        if (formData.startDate && formData.endDate) {
            if (new Date(formData.endDate) <= new Date(formData.startDate)) {
                newErrors.endDate = 'Enddatum muss nach Startdatum liegen';
            } else {
                // Check Availability only if dates are valid
                if (!checkAvailability(formData.startDate, formData.endDate)) {
                    // Availability error is set in the check function
                    return false;
                }
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0 && !availabilityError;
    };

    const [lastContract, setLastContract] = useState<{ doc: jsPDF, filename: string } | null>(null);

    const handleSubmit = () => {
        if (validate()) {
            // Determine duration integer for contract (rounding up or just partial?)
            // Contract uses integer months usually. Let's pass the float or calculated months.
            // We pass duration to generateContract. Let's round up to full months for the contract text.
            const contractDuration = Math.ceil(durationMonths);

            const result = generateContract(selectedOffices, { ...formData, duration: contractDuration }); // Adapt contract util if needed or spread correctly
            // result.doc.save(result.filename); // REMOVED auto-save
            setLastContract(result);
            setIsSuccess(true);
        }
    };

    const totalBaseRent = selectedOffices.reduce((sum, office) => sum + office.price, 0);
    const totalArea = selectedOffices.reduce((sum, office) => sum + office.area, 0);
    const serviceCharges = totalArea * 3.50;
    const cleaningFee = totalArea * 1.50;
    const monthlyNet = totalBaseRent + serviceCharges + cleaningFee;
    const monthlyGross = monthlyNet * 1.19;

    // Total Value based on actual calculated duration
    const totalContractValue = monthlyGross * durationMonths;

    if (isSuccess) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-in fade-in zoom-in">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Anfrage erfolgreich!</h3>
                    <p className="text-slate-600 mb-6">
                        Ihr Zeitraum ist verfügbar. Der Mietvertrag wurde erstellt und steht zum Download bereit.
                    </p>

                    <div className="flex flex-col gap-3">
                        {lastContract && (
                            <button
                                onClick={() => {
                                    if (lastContract) {
                                        // Mobile-friendly download: Blob + Anchor
                                        const blob = lastContract.doc.output('blob');
                                        const url = URL.createObjectURL(blob);
                                        const a = document.createElement('a');
                                        a.href = url;
                                        a.download = lastContract.filename;
                                        document.body.appendChild(a);
                                        a.click();
                                        document.body.removeChild(a);
                                        URL.revokeObjectURL(url);
                                    }
                                }}
                                className="w-full py-4 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-blue-500/30"
                            >
                                <Download className="w-5 h-5" />
                                Mietvertrag jetzt herunterladen
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
                    {/* Availability Error Banner */}
                    {availabilityError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <p className="text-sm font-medium">{availabilityError}</p>
                        </div>
                    )}

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

                            {/* Date Range Selection */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Mietbeginn *</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            value={formData.startDate}
                                            onChange={(e) => {
                                                setFormData({ ...formData, startDate: e.target.value });
                                                setAvailabilityError(null); // Reset error on change
                                            }}
                                            className={`w-full px-3 py-2 rounded-lg border ${errors.startDate ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:border-blue-500'} outline-none transition-colors text-sm`}
                                        />
                                    </div>
                                    {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Mietende *</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            value={formData.endDate}
                                            onChange={(e) => {
                                                setFormData({ ...formData, endDate: e.target.value });
                                                setAvailabilityError(null);
                                            }}
                                            className={`w-full px-3 py-2 rounded-lg border ${errors.endDate ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:border-blue-500'} outline-none transition-colors text-sm`}
                                        />
                                    </div>
                                    {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
                                </div>
                            </div>

                            {/* Duration Indicator */}
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-blue-500" />
                                <div>
                                    <span className="text-xs text-slate-500 block uppercase tracking-wider font-bold">Mietdauer</span>
                                    <span className="font-bold text-slate-900">{durationMonths > 0 ? `${durationMonths} Monate` : '-'}</span>
                                </div>
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
                            <span className="text-slate-600">Gewählte Laufzeit</span>
                            <span className="font-medium">{durationMonths} Monate</span>
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
                            disabled={!!availabilityError}
                            className={`flex-1 py-3 px-6 rounded-xl text-white font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${availabilityError ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/30'}`}
                        >
                            <CheckCircle className="w-5 h-5" />
                            Verfügbarkeit prüfen & Buchen
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InquiryModal;
