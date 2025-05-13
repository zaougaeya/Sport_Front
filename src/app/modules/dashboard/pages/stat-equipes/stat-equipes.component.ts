import { Component, OnInit } from '@angular/core';
import { MatchService } from '../../services/match.service';
import { EquipeService } from '../../services/equipe.service';
import { ChartData, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-stat-equipes',
  standalone: true,
  imports: [
    NgChartsModule,
    NgxSliderModule
  ],
  templateUrl: './stat-equipes.component.html',
  styleUrls: ['./stat-equipes.component.scss']
})
export class StatEquipesComponent implements OnInit {

  public chartData: ChartData<'bar', number[], string> = {
    labels: [],
    datasets: []
  };

public chartType: 'bar' = 'bar';

  constructor(
    private matchService: MatchService,
    private equipeService: EquipeService
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.matchService.getStatistiquesParEquipe().subscribe(statsObject => {
      const statsMap: Map<string, Map<string, number>> = new Map(
        Object.entries(statsObject).map(([key, value]) => [key, new Map(Object.entries(value))])
      );

      this.equipeService.getAllEquipes().subscribe(equipes => {
        const labels: string[] = [];
        const scores: number[] = [];
        const jaunes: number[] = [];
        const rouges: number[] = [];

        equipes.forEach(equipe => {
          const stat = statsMap.get(equipe.id!);
          if (stat) {
            labels.push(equipe.nameEquipe);
            scores.push(stat.get("score") ?? 0);
            jaunes.push(stat.get("cartonsJaunes") ?? 0);
            rouges.push(stat.get("cartonsRouges") ?? 0);
          }
        });

        this.chartData = {
          labels,
          datasets: [
            { label: 'Scores', data: scores, backgroundColor: 'rgba(75, 192, 192, 0.6)' },
            { label: 'Cartons Jaunes', data: jaunes, backgroundColor: 'rgba(255, 205, 86, 0.6)' },
            { label: 'Cartons Rouges', data: rouges, backgroundColor: 'rgba(255, 99, 132, 0.6)' }
          ]
        };
      });
    });
  }

 public chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: {
        color: 'black',
        font: {
          size: 15,
        },
        autoSkip: false,
        maxRotation: 45,
        minRotation: 45
      }
    },
    y: {
      ticks: {
        color: 'black',
        font: {
          size: 15
        }
      }
    }
  },
  plugins: {
    legend: {
      labels: {
        color: 'black',
        font: {
          size: 15 // ✅ Taille de la légende ici
        }
      }
    }
  }
};


minValue = Date.parse('2025-01-01'); // timestamp minimal
maxValue = Date.now(); // timestamp maximal

value = this.minValue;
highValue = this.maxValue;

sliderOptions: Options = {
  floor: this.minValue,
  ceil: this.maxValue,
  translate: (val: number): string => {
    return new Date(val).toLocaleDateString();
  }
};

onDateRangeChange(): void {
  const startDate = new Date(this.value).toISOString().split('T')[0];
  const endDate = new Date(this.highValue).toISOString().split('T')[0];
  this.loadStatsWithDates(startDate, endDate);
}

loadStatsWithDates(startDate : string, endDate : string){
  this.matchService.getStatistiquesParEquipeEtDates(startDate, endDate)
}


}
