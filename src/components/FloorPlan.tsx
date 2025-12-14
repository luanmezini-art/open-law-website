import React, { useState, useEffect } from 'react';
import { offices } from '../data/offices';
import type { Office } from '../data/offices';
import { Check, Ruler, Euro, FileText } from 'lucide-react';

interface FloorPlanProps {
    selectedOffices: Office[];
    onOfficeToggle: (office: Office) => void;
}

const FloorPlan: React.FC<FloorPlanProps> = ({ selectedOffices, onOfficeToggle }) => {
    // Local state to track the "focused" office for the details panel
    const [focusedOffice, setFocusedOffice] = useState<Office | null>(null);

    // Update focused office when selection changes (optional, but good UX)
    useEffect(() => {
        if (selectedOffices.length > 0) {
            setFocusedOffice(selectedOffices[selectedOffices.length - 1]);
        } else {
            setFocusedOffice(null);
        }
    }, [selectedOffices]);

    const isSelected = (office: Office) => selectedOffices.some(o => o.id === office.id);

    const handleOfficeClick = (office: Office) => {
        setFocusedOffice(office);
        if (office.status === 'available') {
            onOfficeToggle(office);
        }
    };

    const getStatusColor = (office: Office) => {
        if (isSelected(office)) return '#3b82f6'; // blue-500
        switch (office.status) {
            case 'available': return '#22c55e'; // green-500
            case 'reserved': return '#f97316'; // orange-500
            case 'rented': return '#94a3b8'; // slate-400
            default: return '#cbd5e1';
        }
    };

    const getStatusLabel = (status: Office['status']) => {
        switch (status) {
            case 'available': return 'Verfügbar';
            case 'reserved': return 'Reserviert';
            case 'rented': return 'Vermietet';
            default: return '';
        }
    };

    const getStatusBadgeColor = (status: Office['status']) => {
        switch (status) {
            case 'available': return 'bg-green-100 text-green-700';
            case 'reserved': return 'bg-orange-100 text-orange-700';
            case 'rented': return 'bg-slate-100 text-slate-500';
            default: return 'bg-gray-100 text-gray-500';
        }
    };

    return (
        <div className="py-20 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">Wählen Sie Ihr Büro</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Erkunden Sie unseren interaktiven Grundriss und finden Sie die perfekte Gewerbefläche für Ihr Unternehmen.
                        Klicken Sie auf ein Büro für Details.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {/* Left Column: Floor Plan */}
                    <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg border border-slate-100 p-4 md:p-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 mb-6">
                            <h3 className="text-lg md:text-xl font-bold text-slate-800 text-center md:text-left">Grundriss - Erdgeschoss</h3>
                            <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-xs font-medium">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                                    <span>Verfügbar</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                                    <span>Reserviert</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                                    <span>Vermietet</span>
                                </div>
                            </div>
                        </div>

                        <div className="aspect-[16/10] w-full bg-slate-50 rounded-2xl border border-slate-100 relative overflow-hidden">
                            {/* Grid Pattern */}
                            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.3 }}></div>

                            <svg viewBox="0 0 800 400" className="w-full h-full relative z-10">
                                {offices.map((office) => (
                                    <g
                                        key={office.id}
                                        onClick={() => handleOfficeClick(office)}
                                        className={`transition-all duration-300 ${office.status === 'available' ? 'cursor-pointer hover:opacity-90' : 'cursor-pointer opacity-90'
                                            }`}
                                    >
                                        <rect
                                            x={office.x}
                                            y={office.y}
                                            width={office.width}
                                            height={office.height}
                                            fill={getStatusColor(office)}
                                            rx="8"
                                            stroke={isSelected(office) || focusedOffice?.id === office.id ? '#1e293b' : 'transparent'}
                                            strokeWidth={isSelected(office) || focusedOffice?.id === office.id ? '4' : '0'}
                                            className="drop-shadow-sm"
                                        />
                                        <text
                                            x={office.x + office.width / 2}
                                            y={office.y + office.height / 2 - 15}
                                            textAnchor="middle"
                                            fill="white"
                                            fontSize="16"
                                            fontWeight="bold"
                                            pointerEvents="none"
                                            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
                                        >
                                            {office.name}
                                        </text>
                                        <text
                                            x={office.x + office.width / 2}
                                            y={office.y + office.height / 2 + 10}
                                            textAnchor="middle"
                                            fill="white"
                                            fontSize="14"
                                            pointerEvents="none"
                                            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
                                        >
                                            {office.area} m²
                                        </text>
                                    </g>
                                ))}

                                {/* Entrance Label */}
                                <rect x="360" y="370" width="80" height="24" rx="4" fill="#1e293b" />
                                <text x="400" y="386" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Eingang</text>
                            </svg>
                        </div>
                        <p className="text-center text-slate-400 text-sm mt-4">
                            Klicken Sie auf ein Büro, um Details zu sehen und es zu reservieren
                        </p>
                    </div>

                    {/* Right Column: Details Panel */}
                    <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-4 md:p-8 h-full min-h-[500px] md:min-h-[600px] flex flex-col">
                        <h3 className="text-lg font-semibold text-slate-500 mb-6">Büro-Details</h3>

                        {focusedOffice ? (
                            <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {/* Image Section */}
                                <div className="h-48 w-full relative rounded-2xl overflow-hidden mb-6 shadow-sm">
                                    <img
                                        src={focusedOffice.image || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"}
                                        alt={focusedOffice.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80";
                                            e.currentTarget.onerror = null;
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <div className="absolute bottom-3 right-4">
                                        <a
                                            href={focusedOffice.image || "#"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded backdrop-blur-sm transition-colors border border-white/30"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Bild öffnen
                                        </a>
                                    </div>
                                </div>

                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-3xl font-bold text-slate-900">{focusedOffice.name}</h2>
                                        <p className="text-slate-500">Etage 1</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusBadgeColor(focusedOffice.status)}`}>
                                        {getStatusLabel(focusedOffice.status)}
                                    </span>
                                </div>

                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    <div className="bg-slate-50 p-4 rounded-2xl text-center">
                                        <Ruler className="w-5 h-5 text-orange-500 mx-auto mb-2" />
                                        <div className="text-xl font-bold text-slate-900">{focusedOffice.area}</div>
                                        <div className="text-xs text-slate-500">m²</div>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-2xl text-center">
                                        <Euro className="w-5 h-5 text-orange-500 mx-auto mb-2" />
                                        <div className="text-xl font-bold text-slate-900">{focusedOffice.price.toLocaleString()}</div>
                                        <div className="text-xs text-slate-500">€ / Monat</div>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-2xl text-center">
                                        <FileText className="w-5 h-5 text-orange-500 mx-auto mb-2" />
                                        <div className="text-xl font-bold text-slate-900">{Math.round(focusedOffice.price / focusedOffice.area)}</div>
                                        <div className="text-xs text-slate-500">€ / m²</div>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <h4 className="font-bold text-slate-900 mb-2">Beschreibung</h4>
                                    <p className="text-slate-600 leading-relaxed text-sm">
                                        {focusedOffice.description}
                                    </p>
                                </div>

                                <div className="mb-8 flex-1">
                                    <h4 className="font-bold text-slate-900 mb-3">Ausstattung</h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        {focusedOffice.features.map((feature, i) => (
                                            <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                                                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {focusedOffice.status === 'available' ? (
                                    <button
                                        onClick={() => !isSelected(focusedOffice) && onOfficeToggle(focusedOffice)}
                                        className={`w-full py-4 rounded-xl font-bold text-white transition-all transform active:scale-95 ${isSelected(focusedOffice)
                                            ? 'bg-green-600 hover:bg-green-700 shadow-lg shadow-green-500/30'
                                            : 'bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-900/20'
                                            }`}
                                    >
                                        {isSelected(focusedOffice) ? 'Ausgewählt' : 'Jetzt reservieren & Mietvertrag erstellen'}
                                    </button>
                                ) : (
                                    <button disabled className="w-full py-4 rounded-xl font-bold text-slate-400 bg-slate-100 cursor-not-allowed">
                                        Nicht verfügbar
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-400">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                    <Ruler className="w-8 h-8 opacity-20" />
                                </div>
                                <p>Wählen Sie ein Büro im Grundriss aus,<br />um Details zu sehen.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FloorPlan;
