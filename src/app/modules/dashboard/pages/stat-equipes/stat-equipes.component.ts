import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { Match } from '../../models/match.model';
import { Equipe } from '../../models/equipe.model';
import { EquipeService } from '../../services/equipe.service';

@Component({
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
  @ViewChild('pieCanvas') pieCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fautesCanvas') fautesCanvas!: ElementRef<HTMLCanvasElement>;
  constructor(
    private equipeService: EquipeService
    //private dialog: MatDialog // 💡 ajoute ça
  ) { }
  barChart!: Chart;  // Graphique pour la barre simple des cartons
  pieChart!: Chart;  // Graphique pour le pie chart des scores
  fautesChart!: Chart;

  ngAfterViewInit() {
    if (this.match) {
      this.loadEquipes(); // On commence par charger les équipes
    }
  }
  loadEquipes(): void {
    this.equipeService.getAllEquipes().subscribe({
      next: (data) => {
        this.equipes = data;
        console.log('Équipes chargées :', this.equipes);

        // ✅ Une fois que les équipes sont bien là, on peut créer les graphiques
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


  // Fonction pour créer un graphique à barres simples pour les cartons
  createBarChart() {
    const labelEquipe1 = this.getEquipesName(this.match.idEquipe1);
    const labelEquipe2 = this.getEquipesName(this.match.idEquipe2);

    console.log("label", this.match.idEquipe1);


    const data = {
      labels: ['Cartons jaunes', 'Cartons rouges'],
      datasets: [
        {
          label: labelEquipe1,
          data: [
            this.match.cartonsJaunesEquipe1 ?? 0,
            this.match.cartonsRougesEquipe1 ?? 0
          ],
          backgroundColor: 'grey',
          borderRadius: 5,
          barThickness: 15,
        },
        {
          label: labelEquipe2,
          data: [
            this.match.cartonsJaunesEquipe2 ?? 0,
            this.match.cartonsRougesEquipe2 ?? 0
          ],
          backgroundColor: 'red',
          borderRadius: 5,
          barThickness: 15,
        }
      ]
    };

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Comparaison des Cartons'
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 10 // Limiter la longueur de la barre si nécessaire
          },
          y: {
            ticks: {
              stepSize: 1, // Définit l'incrément à 1, donc seulement des entiers seront affichés
              precision: 0 // Cela garantit que les valeurs sur l'axe Y sont des entiers
            }
          }
        }
      }
    };

    // Création du graphique Bar Chart
    this.barChart = new Chart(this.barCanvas.nativeElement, config);
  }


  // createPieChart() {
  //   const data = {
  //     labels: [this.match?.equipe1?.nameEquipe || 'Équipe 1', this.match?.equipe2?.nameEquipe || 'Équipe 2'],
  //     datasets: [{
  //       label: 'Scores',
  //       data: [
  //         this.match?.scoreEquipe1 ?? 0,
  //         this.match?.scoreEquipe2 ?? 0
  //       ],
  //       backgroundColor: ['#007bff', '#dc3545']
  //     }]
  //   };

  //   const config: ChartConfiguration<'pie'> = {
  //     type: 'pie',
  //     data,
  //     options: {
  //       responsive: true,
  //       plugins: {
  //         legend: { position: 'top' },
  //         title: {
  //           display: true,
  //           text: 'Répartition des Scores'
  //         }
  //       }
  //     }
  //   };

  //   // Création du graphique Pie Chart
  //   this.pieChart = new Chart(this.pieCanvas.nativeElement, config);
  // }

  createFautesChart() {
    const labelEquipe1 = this.getEquipesName(this.match?.idEquipe1);
    const labelEquipe2 = this.getEquipesName(this.match?.idEquipe2);

    const data = {
      labels: ['Fautes'],
      datasets: [
        {
          label: labelEquipe1,
          data: [this.match?.fautesEquipe1 ?? 0],
          backgroundColor: 'grey',
          borderRadius: 5,
          barThickness: 15,
        },
        {
          label: labelEquipe2,
          data: [this.match?.fautesEquipe2 ?? 0],
          backgroundColor: 'red',
          borderRadius: 5,
          barThickness: 15,
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
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Comparaison des Fautes'
          }
        },
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            ticks: {
              precision: 0
            }
          }
        }
      }
    };

    this.fautesChart = new Chart(this.fautesCanvas.nativeElement, config);
  }



  onClose() {
    // Vérification avant de détruire les graphiques
    if (this.barChart) {
      this.barChart.destroy();
    }
    if (this.pieChart) {
      this.pieChart.destroy();
    }
    if (this.fautesChart) {
      this.fautesChart.destroy();
    }
    this.close.emit();
  }


}