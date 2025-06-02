import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  ChartDataset,
  Plugin
} from 'chart.js';
import { Equipe } from '../../models/equipe.model';
import { EquipeService } from '../../services/equipe.service';
import { CommonModule } from '@angular/common'; // 👈 à importer

@Component({
   imports: [CommonModule], // 👈 ajoute CommonModule ici
  selector: 'app-stat-equipes',
  standalone: true,
  templateUrl: './stat-equipes.component.html',
  styleUrls: ['./stat-equipes.component.scss']
})
export class StatEquipesComponent implements AfterViewInit {
  @Input() match: any;
  @Output() close = new EventEmitter<void>();
  @Input() equipes: Equipe[] = [];

  @ViewChild('barCanvas') barCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fautesCanvas') fautesCanvas!: ElementRef<HTMLCanvasElement>;

  barChart!: Chart;
  fautesChart!: Chart;

  statistiques: {
    nomStat: string;
    valeurEquipe1: number;
    valeurEquipe2: number;
  }[] = [];

  private readonly valueLabelPlugin: Plugin = {
    id: 'valueLabelPlugin',
    afterDatasetsDraw(chart: Chart) {
      const ctx = chart.ctx;
      ctx.save();

      chart.data.datasets.forEach((dataset: ChartDataset, datasetIndex: number) => {
        const meta = chart.getDatasetMeta(datasetIndex);

        meta.data.forEach((bar: any, index: number) => {
          const value = dataset.data[index];
          if (typeof value === 'number' && bar) {
            const bgColor = dataset.backgroundColor as string;
            ctx.fillStyle = 'black';

            ctx.font = '12px sans-serif';
            ctx.textBaseline = 'middle';

            const padding = 6;
            let xPos: number;
            let textAlign: CanvasTextAlign;

            if (datasetIndex === 0) {
              // équipe 1 => valeur à gauche de la barre
              xPos = bar.x - padding;
              textAlign = 'right';
            } else {
              // équipe 2 => valeur à droite de la barre
              xPos = bar.x + bar.width + padding;
              textAlign = 'left';
            }

            ctx.textAlign = textAlign;
            ctx.fillText(value.toString(), xPos, bar.y);
          }
        });
      });

      ctx.restore();
    }
  };

  constructor(private equipeService: EquipeService) {}

  ngAfterViewInit() {
    if (this.match) {
      this.loadEquipes();
      this.setStatistiques();
    }
  }

  loadEquipes(): void {
    this.equipeService.getAllEquipes().subscribe({
      next: (data) => {
        this.equipes = data;
        this.createBarChart();
        this.createFautesChart();
      },
      error: (err) => console.error('Erreur chargement équipes', err)
    });
  }

  getEquipesName(id: string): string {
    const equipe = this.equipes.find(t => String(t.id) === String(id));
    return equipe ? equipe.nameEquipe : 'Equipe Inexistante';
  }

  setStatistiques() {
    this.statistiques = [
      {
        nomStat: 'Score',
        valeurEquipe1: this.match?.scoreEquipe1 ?? 0,
        valeurEquipe2: this.match?.scoreEquipe2 ?? 0
      },
      {
        nomStat: 'Cartons Jaunes',
        valeurEquipe1: this.match?.cartonsJaunesEquipe1 ?? 0,
        valeurEquipe2: this.match?.cartonsJaunesEquipe2 ?? 0
      },
      {
        nomStat: 'Cartons Rouges',
        valeurEquipe1: this.match?.cartonsRougesEquipe1 ?? 0,
        valeurEquipe2: this.match?.cartonsRougesEquipe2 ?? 0
      },
      {
        nomStat: 'Fautes',
        valeurEquipe1: this.match?.fautesEquipe1 ?? 0,
        valeurEquipe2: this.match?.fautesEquipe2 ?? 0
      }
    ];
  }

  createBarChart() {
    const labelEquipe1 = this.getEquipesName(this.match.idEquipe1);
    const labelEquipe2 = this.getEquipesName(this.match.idEquipe2);

    const data = {
      labels: ['Cartons jaunes', 'Cartons rouges'],
      datasets: [
        {
          label: labelEquipe1,
          data: [
            this.match.cartonsJaunesEquipe1 ?? 0,
            this.match.cartonsRougesEquipe1 ?? 0
          ],
          backgroundColor: '#000000',
          stack: 'stack1',
        },
        {
          label: labelEquipe2,
          data: [
            this.match.cartonsJaunesEquipe2 ?? 0,
            this.match.cartonsRougesEquipe2 ?? 0
          ],
          backgroundColor: '#dc3545',
          stack: 'stack1',
        }
      ]
    };

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data,
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: {
            display: true,
            text: 'Cartons jaunes & rouges'
          },
          tooltip: {
            enabled: false
          }
        },
        scales: {
          x: {
            stacked: true,
            display: false,
            beginAtZero: true,
            ticks: { precision: 0 },
            grid: { display: false }
          },
          y: {
            stacked: true,
            display: false,
            grid: { display: false }
          }
        }
      },
      plugins: [this.valueLabelPlugin]
    };

    this.barChart = new Chart(this.barCanvas.nativeElement, config);
  }

  createFautesChart() {
    const labelEquipe1 = this.getEquipesName(this.match?.idEquipe1);
    const labelEquipe2 = this.getEquipesName(this.match?.idEquipe2);

    const data = {
      labels: ['Fautes'],
      datasets: [
        {
          label: labelEquipe1,
          data: [this.match?.fautesEquipe1 ?? 0],
          backgroundColor: '#000000',
          stack: 'stack1',
        },
        {
          label: labelEquipe2,
          data: [this.match?.fautesEquipe2 ?? 0],
          backgroundColor: '#dc3545',
          stack: 'stack1',
        }
      ]
    };

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data,
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: {
            display: true,
            text: 'Nombre de Fautes'
          },
          tooltip: {
            enabled: false
          }
        },
        scales: {
          x: {
            stacked: true,
            display: false,
            beginAtZero: true,
            ticks: { precision: 0 },
            grid: { display: false }
          },
          y: {
            stacked: true,
            display: false,
            grid: { display: false }
          }
        }
      },
      plugins: [this.valueLabelPlugin]
    };

    this.fautesChart = new Chart(this.fautesCanvas.nativeElement, config);
  }

  onClose() {
    if (this.barChart) this.barChart.destroy();
    if (this.fautesChart) this.fautesChart.destroy();
    this.close.emit();
  }
}
