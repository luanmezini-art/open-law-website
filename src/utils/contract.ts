import { jsPDF } from 'jspdf';
import type { Office } from '../data/offices';

interface FormData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  startDate: string;
  duration: number;
}

export const generateContract = (offices: Office[], data: FormData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;

  const totalBaseRent = offices.reduce((sum, office) => sum + office.price, 0);
  const totalArea = offices.reduce((sum, office) => sum + office.area, 0);

  // Costs calculation
  const serviceCharges = totalArea * 3.50;
  const cleaningFee = totalArea * 1.50;
  const monthlyNet = totalBaseRent + serviceCharges + cleaningFee;
  const monthlyGross = monthlyNet * 1.19;
  const totalContractValue = monthlyGross * data.duration;
  const deposit = monthlyGross * 3;

  const today = new Date().toLocaleDateString('de-DE');
  const start = new Date(data.startDate).toLocaleDateString('de-DE');
  const officeNames = offices.map(o => o.name).join(', ');

  // Helper for centered text
  const centerText = (text: string, y: number) => {
    const textWidth = doc.getStringUnitWidth(text) * doc.getFontSize() / doc.internal.scaleFactor;
    const x = (pageWidth - textWidth) / 2;
    doc.text(text, x, y);
  };

  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  centerText('MIETVERTRAG FÜR GEWERBERÄUME', 30);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  // Parties
  let y = 50;
  doc.setFont('helvetica', 'bold');
  doc.text('Zwischen', margin, y);
  y += 7;
  doc.setFont('helvetica', 'normal');
  doc.text('BusinessCenter Premium GmbH', margin, y);
  y += 5;
  doc.text('Hauptstraße 123', margin, y);
  y += 5;
  doc.text('10115 Berlin', margin, y);
  y += 5;
  doc.text('(Vermieter)', margin, y);

  y += 15;
  doc.setFont('helvetica', 'bold');
  doc.text('und', margin, y);
  y += 7;
  doc.setFont('helvetica', 'normal');
  doc.text(data.companyName, margin, y);
  y += 5;
  doc.text(`z.Hd. ${data.contactPerson}`, margin, y);
  y += 5;
  doc.text('(Mieter)', margin, y);

  y += 15;
  doc.text('wird folgender Mietvertrag geschlossen:', margin, y);

  // Sections
  const addSection = (title: string, content: string) => {
    y += 15;
    if (y > 270) {
      doc.addPage();
      y = 30;
    }
    doc.setFont('helvetica', 'bold');
    doc.text(title, margin, y);
    y += 7;
    doc.setFont('helvetica', 'normal');

    const splitText = doc.splitTextToSize(content, contentWidth);
    doc.text(splitText, margin, y);
    y += (splitText.length * 5);
  };

  addSection('§1 MIETGEGENSTAND',
    `Vermietet werden folgende Büroeinheiten im BusinessCenter Premium, Hauptstraße 123, 10115 Berlin: ${officeNames}.\n\nDie gesamte Mietfläche beträgt ca. ${totalArea} m².\n\nDie Räume werden in renoviertem Zustand übergeben.`
  );

  addSection('§2 MIETZEIT',
    `Das Mietverhältnis beginnt am ${start}.\nEs wird eine feste Laufzeit von ${data.duration} Monaten vereinbart.\nDie Kündigungsfrist beträgt 3 Monate zum Laufzeitende. Wird das Mietverhältnis nicht gekündigt, verlängert es sich automatisch um weitere 12 Monate.`
  );

  addSection('§3 MIETE UND KAUTION',
    `Die monatliche Miete setzt sich wie folgt zusammen:\n\n` +
    `Nettokaltmiete: ${totalBaseRent.toLocaleString('de-DE', { minimumFractionDigits: 2 })} EUR\n` +
    `Nebenkostenpauschale: ${serviceCharges.toLocaleString('de-DE', { minimumFractionDigits: 2 })} EUR\n` +
    `Reinigungsservice: ${cleaningFee.toLocaleString('de-DE', { minimumFractionDigits: 2 })} EUR\n` +
    `--------------------------------------------------\n` +
    `Zwischensumme (netto): ${monthlyNet.toLocaleString('de-DE', { minimumFractionDigits: 2 })} EUR\n` +
    `zzgl. 19% MwSt.: ${(monthlyNet * 0.19).toLocaleString('de-DE', { minimumFractionDigits: 2 })} EUR\n` +
    `--------------------------------------------------\n` +
    `Gesamtmiete (brutto): ${monthlyGross.toLocaleString('de-DE', { minimumFractionDigits: 2 })} EUR\n\n` +
    `Die Kaution beträgt 3 Bruttomonatsmieten (${deposit.toLocaleString('de-DE', { minimumFractionDigits: 2 })} EUR).\n` +
    `Der Gesamtvertragswert beläuft sich auf ${totalContractValue.toLocaleString('de-DE', { minimumFractionDigits: 2 })} EUR.`
  );

  addSection('§4 AUSSTATTUNG',
    `Die Büros verfügen über folgende Ausstattungsmerkmale:\n${Array.from(new Set(offices.flatMap(o => o.features))).map(f => `- ${f}`).join('\n')}`
  );

  addSection('§5 NUTZUNG',
    'Die Räume dürfen ausschließlich zu gewerblichen Bürozwecken genutzt werden. Eine Untervermietung bedarf der schriftlichen Zustimmung des Vermieters.'
  );

  addSection('§6 NEBENKOSTEN',
    'In der Nebenkostenpauschale sind folgende Leistungen enthalten:\n- Heizung, Strom, Wasser\n- Highspeed Internetnutzung\n- Allgemeinstrom und Beleuchtung\n\nDer Reinigungsservice umfasst die wöchentliche Reinigung der Mietflächen sowie die tägliche Reinigung der Gemeinschaftsflächen.'
  );

  addSection('§7 SONSTIGES',
    'Der Mieter erhält 24/7 Zugang zum Gebäude.\nDie Nutzung der Konferenzräume ist nach Verfügbarkeit inklusive.\nParkplätze können separat angemietet werden.'
  );

  // Signatures
  y += 20;
  if (y > 250) {
    doc.addPage();
    y = 30;
  }

  doc.text(`Ort, Datum: Berlin, den ${today}`, margin, y);

  y += 30;
  doc.line(margin, y, margin + 70, y);
  doc.line(margin + 90, y, margin + 160, y);

  y += 5;
  doc.text('Unterschrift Vermieter', margin, y);
  doc.text('Unterschrift Mieter', margin + 90, y);

  y += 5;
  doc.text('(BusinessCenter Premium)', margin, y);
  doc.text(`(${data.companyName})`, margin + 90, y);

  // Save
  doc.save(`Mietvertrag_BusinessCenter_${data.companyName.replace(/\s+/g, '_')}.pdf`);
};
