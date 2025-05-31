import { Component, OnInit } from '@angular/core';
import { IMCRecordService } from '../../services/imcrecord.service';
import { IMCRecord } from '../../models/imcRecord.model';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-imc-analytics',

  templateUrl: './imc-analytics.component.html',
  styleUrl: './imc-analytics.component.scss'
})
export class ImcAnalyticsComponent implements OnInit{
     imcRecords: IMCRecord[] = [];

  barChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  pieChartData: ChartData<'pie'> = { labels: ['Insuffisance pondérale', 'Poids normal', 'Surpoids', 'Obésité'], datasets: [] };
  lineChartData: ChartData<'line'> = { labels: [], datasets: [] };

  constructor(private imcService: IMCRecordService) {}

 selectedPatientId: string = 'all';
patientIds: string[] = [];

ngOnInit(): void {
  this.imcService.getAll().subscribe({
    next: (records) => {
      this.imcRecords = records;
      this.patientIds = [...new Set(records.map(r => r.patientId))];
      this.updateCharts();
    },
    error: (err) => console.error('Failed to load IMC records', err),
  });
}

onPatientChange() {
  this.updateCharts();
}
  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

updateCharts() {
  const filtered = this.selectedPatientId === 'all'
    ? this.imcRecords
    : this.imcRecords.filter(r => r.patientId === this.selectedPatientId);

  this.prepareBarChart(filtered);
  this.preparePieChart(filtered);
  this.prepareLineChart(filtered);
}

prepareBarChart(records: IMCRecord[]) {
  this.barChartData = {
    labels: records.map(r => r.patientId || 'Inconnu'),
    datasets: [
      {
        label: 'Taille (cm)',
        data: records.map(r => r.tailleCm),
        backgroundColor: 'rgba(54, 162, 235, 0.6)'
      },
      {
        label: 'Poids (kg)',
        data: records.map(r => r.poidsKg),
        backgroundColor: 'rgba(255, 206, 86, 0.6)'
      },
      {
        label: 'IMC',
        data: records.map(r => r.imc ?? null),
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      }
    ]
  };
}

preparePieChart(records: IMCRecord[]) {
  const counts = { 'insuffisance pondérale': 0, 'poids normal': 0, 'surpoids': 0, 'obésité': 0 };

  records.forEach(r => {
    const cat = r.imcCategory?.toLowerCase();
    if (cat && cat in counts) {
      counts[cat as keyof typeof counts]++;
    }
  });

  this.pieChartData = {
    labels: ['Insuffisance pondérale', 'Poids normal', 'Surpoids', 'Obésité'],
    datasets: [
      {
        label: 'Répartition IMC',
        data: [
          counts['insuffisance pondérale'],
          counts['poids normal'],
          counts['surpoids'],
          counts['obésité']
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ]
      }
    ]
  };
}

prepareLineChart(records: IMCRecord[]) {
  const patientGroups: { [patientId: string]: IMCRecord[] } = {};

  records.forEach(record => {
    if (!record.patientId || !record.dateEnregistrement) return;
    if (!patientGroups[record.patientId]) {
      patientGroups[record.patientId] = [];
    }
    patientGroups[record.patientId].push(record);
  });

  Object.values(patientGroups).forEach(group =>
    group.sort((a, b) =>
      new Date(a.dateEnregistrement!).getTime() - new Date(b.dateEnregistrement!).getTime()
    )
  );

  const allDates = new Set<string>();
  records.forEach(r => {
    if (r.dateEnregistrement) {
      allDates.add(new Date(r.dateEnregistrement).toISOString().split('T')[0]);
    }
  });
  const sortedDates = Array.from(allDates).sort();

  this.lineChartData.labels = sortedDates;

  this.lineChartData.datasets = Object.entries(patientGroups).map(([patientId, group]) => {
    const dateToIMC: { [date: string]: number | null } = {};
    sortedDates.forEach(d => dateToIMC[d] = null);
    group.forEach(r => {
      const dateKey = new Date(r.dateEnregistrement!).toISOString().split('T')[0];
      dateToIMC[dateKey] = r.imc ?? null;
    });

    return {
      label: `Patient ${patientId}`,
      data: sortedDates.map(d => dateToIMC[d]),
      fill: false,
      tension: 0.2,
      borderColor: this.getRandomColor()
    };
  });
}}