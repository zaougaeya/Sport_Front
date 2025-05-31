import { Component } from '@angular/core';
import { IMCRecord } from '../../models/imcRecord.model';
import { IMCRecordService } from '../../services/imcrecord.service';
import { Router } from '@angular/router';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-imc-record',

  templateUrl: './imc-record.component.html',
  styleUrl: './imc-record.component.scss'
})
export class ImcRecordComponent {
 imcData: IMCRecord = {
    patientId: '',
    tailleCm: 0,
    poidsKg: 0
  };

  result?: IMCRecord;

  constructor(private imcService: IMCRecordService,private router: Router) {}
  calculerIMC() {
    this.imcService.ajouterIMC(this.imcData).subscribe({
      next: (res) => this.result = res,
      error: (err) => console.error(err)
    });
  }
 getRecommendation(category?: string): string {
  switch (category?.trim().toLowerCase()) {
    case 'insuffisance pondérale':
      return 'Poids insuffisant. Il est conseillé de consulter un professionnel de santé pour un suivi nutritionnel.';
    case 'poids normal':
      return 'Poids normal. Continuez à maintenir une alimentation équilibrée et une activité physique régulière.';
    case 'surpoids':
      return 'Surpoids. Il est recommandé de surveiller votre alimentation et d’augmenter l’activité physique.';
    case 'obésité':
      return 'Obésité. Consultez un professionnel de santé pour établir un plan personnalisé.';
    default:
      return 'Catégorie inconnue. Veuillez vérifier les données saisies.';
  }
}
normalizeIMC(imc: number): number {
  const capped = Math.min(imc, 40);
  return (capped / 40) * 100; // percentage
}

getColor(category?: string): 'primary' | 'accent' | 'warn' {
  switch (category) {
    case 'Insuffisance pondérale':
      return 'accent';
    case 'Poids normal':
      return 'primary';
    case 'Surpoids':
    case 'Obésité':
      return 'warn';
    default:
      return 'primary';
  }
}
getGaugeColor(category?: string): string {
  switch (category) {
    case 'Insuffisance pondérale':
      return '#ff9800'; // orange
    case 'Poids normal':
      return '#4caf50'; // green
    case 'Surpoids':
      return '#f44336'; // red
    case 'Obésité':
      return '#b71c1c'; // dark red
    default:
      return '#9e9e9e'; // grey
  }
}

isCategory(category: string): boolean {
  return this.result?.imcCategory?.toLowerCase() === category.toLowerCase();
}
 // Determine if consultation should be recommended
  shouldRecommendConsultation(category?: string): boolean {
    if (!category) return false;
    const cat = category.trim().toLowerCase();
    return cat === 'insuffisance pondérale' || cat === 'surpoids' || cat === 'obésité';
  }

  // Navigate to the reservation page
  goToReservation() {
    this.router.navigate(['/dashboard/reserverConsultation']);
  }

  downloadPdf() {
     if (!this.result) return;

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  const title = 'Rapport IMC';
  const date = new Date().toLocaleString();
  const imcValue = this.result.imc?.toFixed(2) ?? 'N/A';
  const category = this.result.imcCategory ?? 'Inconnue';
  const advice = this.getRecommendation(this.result.imcCategory);

  const categoryColorMap: any = {
    'Insuffisance pondérale': '#ff9800',
    'Poids normal': '#4caf50',
    'Surpoids': '#f44336',
    'Obésité': '#b71c1c',
    'Inconnue': '#9e9e9e'
  };
  const catColor = categoryColorMap[category] || '#9e9e9e';

  doc.setFontSize(22);
  doc.setTextColor(33, 33, 33);
  doc.text(title, pageWidth / 2, 20, { align: 'center' });

  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(`Date : ${date}`, 20, 30);

  doc.setDrawColor(200);
  doc.setFillColor(245, 245, 245);
  doc.rect(15, 40, pageWidth - 30, 40, 'F');

  doc.setTextColor(0);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text(`Patient ID :`, 20, 50);
  doc.text(`IMC :`, 20, 58);
  doc.text(`Catégorie :`, 20, 66);

  doc.setFont('helvetica', 'normal');
  doc.text(this.imcData.patientId || 'N/A', 60, 50);
  doc.text(imcValue, 60, 58);
  doc.setTextColor(catColor);
  doc.text(category, 60, 66);

  doc.setTextColor(0);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text(`Conseil personnalisé :`, 20, 85);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  const splitAdvice = doc.splitTextToSize(advice, pageWidth - 40);
  doc.text(splitAdvice, 20, 95);

  // Capture the gauge SVG as canvas image using html2canvas
  const gaugeElement = document.getElementById('gaugeContainer');
  if (gaugeElement) {
    html2canvas(gaugeElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 60, 135, 90, 60); // x, y, width, height

      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text(`Ce rapport a été généré automatiquement via l'application de suivi IMC.`, 20, 280);
      doc.text(`© 2025 - Clinique Santé & Bien-être`, 20, 285);

      doc.save(`rapport_imc_${this.imcData.patientId || 'patient'}.pdf`);
    });
  } else {
    // fallback if the gauge doesn't exist
    doc.save(`rapport_imc_${this.imcData.patientId || 'patient'}.pdf`);
  }
}}