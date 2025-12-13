import { useState } from 'react';
import Hero from './components/Hero';
import Amenities from './components/Amenities';
import FloorPlan from './components/FloorPlan';
import Footer from './components/Footer';
import CostBreakdownModal from './components/CostBreakdownModal';
import InquiryModal from './components/InquiryModal';
import type { Office } from './data/offices';

function App() {
  const [selectedOffices, setSelectedOffices] = useState<Office[]>([]);
  const [showCostModal, setShowCostModal] = useState(false);
  const [showInquiryForm, setShowInquiryForm] = useState(false);

  const handleOfficeToggle = (office: Office) => {
    setSelectedOffices(prev => {
      const exists = prev.some(o => o.id === office.id);
      if (exists) {
        return prev.filter(o => o.id !== office.id);
      }
      return [...prev, office];
    });
  };

  const handleShowCosts = () => {
    setShowCostModal(true);
  };

  const handleCloseCostModal = () => {
    setShowCostModal(false);
  };

  const handleProceedToInquiry = () => {
    setShowCostModal(false);
    setShowInquiryForm(true);
  };

  const handleCloseInquiry = () => {
    setShowInquiryForm(false);
    setSelectedOffices([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      <Hero />
      <Amenities />
      <FloorPlan selectedOffices={selectedOffices} onOfficeToggle={handleOfficeToggle} />

      {/* Floating Action Bar */}
      {selectedOffices.length > 0 && !showCostModal && !showInquiryForm && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-6 z-40 animate-in slide-in-from-bottom-4">
          <div>
            <span className="font-bold text-blue-400">{selectedOffices.length}</span>
            <span className="ml-2 text-slate-300">Büros ausgewählt</span>
          </div>
          <div className="h-6 w-px bg-slate-700"></div>
          <button
            onClick={handleShowCosts}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full font-bold transition-colors"
          >
            Kosten berechnen
          </button>
        </div>
      )}

      <Footer />

      {showCostModal && (
        <CostBreakdownModal
          selectedOffices={selectedOffices}
          onClose={handleCloseCostModal}
          onProceed={handleProceedToInquiry}
        />
      )}

      {showInquiryForm && (
        <InquiryModal
          selectedOffices={selectedOffices}
          onClose={handleCloseInquiry}
        />
      )}
    </div>
  );
}

export default App;
