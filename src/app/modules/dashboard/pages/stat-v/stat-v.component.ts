import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../commandes/commande.service';
import { Commande } from '../commandes/commande.model';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { CommonModule } from '@angular/common';

Chart.register(
  BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend
);

@Component({
  standalone: true,
  selector: 'app-stat-v',
  templateUrl: './stat-v.component.html',
  styleUrls: ['./stat-v.component.scss'],
  imports: [CommonModule],
})
export class StatVComponent implements OnInit {
  commandes: Commande[] = [];
  produitsStatistiques: { [key: string]: { occurrences: number; quantiteTotale: number } } = {};
  produitsTrie: { nom: string; occurrences: number; quantiteTotale: number }[] = [];
  chart: any;

  triPar: 'occurrences' | 'quantiteTotale' = 'quantiteTotale';

  revenueChart: any;
  regroupementPar: 'jour' | 'semaine' = 'jour';
  revenusParDate: { [key: string]: number } = {};

  constructor(private commandeService: CommandeService) {}

  ngOnInit(): void {
    this.getAllCommandes();
  }

  getAllCommandes() {
    this.commandeService.getAllCommandes().subscribe({
      next: (data) => {
        this.commandes = data;
        this.processSalesData();
        this.processRevenueData();
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des commandes :', err);
      }
    });
  }

  processSalesData() {
    this.produitsStatistiques = {};
    this.commandes.forEach((commande) => {
      const produitsDejaComptesDansCetteCommande = new Set<string>();
      commande.produits?.forEach((produit) => {
        const nomProduit = produit.produit.nom;
        if (!this.produitsStatistiques[nomProduit]) {
          this.produitsStatistiques[nomProduit] = { occurrences: 0, quantiteTotale: 0 };
        }
        this.produitsStatistiques[nomProduit].quantiteTotale += produit.quantite;
        if (!produitsDejaComptesDansCetteCommande.has(nomProduit)) {
          this.produitsStatistiques[nomProduit].occurrences++;
          produitsDejaComptesDansCetteCommande.add(nomProduit);
        }
      });
    });

    this.trierProduits();
    this.generateChart();
  }

  trierProduits() {
    this.produitsTrie = Object.entries(this.produitsStatistiques)
      .map(([nom, stats]) => ({ nom, occurrences: stats.occurrences, quantiteTotale: stats.quantiteTotale }))
      .sort((a, b) => {
        if (this.triPar === 'occurrences') {
          return b.occurrences - a.occurrences;
        } else {
          return b.quantiteTotale - a.quantiteTotale;
        }
      });
  }

  changerTri(critere: 'occurrences' | 'quantiteTotale') {
    this.triPar = critere;
    this.trierProduits();
    this.generateChart();
  }

  generateChart() {
    const labels = this.produitsTrie.map(p => p.nom);
    const data = this.produitsTrie.map(p => this.triPar === 'occurrences' ? p.occurrences : p.quantiteTotale);
    const labelGraphique = this.triPar === 'occurrences' ? 'Nombre de Commandes' : 'Quantité Totale Vendue';

    const generateColor = (index: number, total: number) => {
      const hue = (index * 360 / total) % 360;
      return `hsl(${hue}, 70%, 60%)`;
    };

    const backgroundColors = data.map((_, i) => generateColor(i, data.length));
    const borderColors = backgroundColors.map(c => shadeColor(c, -20));

    function shadeColor(hsl: string, percent: number) {
      const hslRegex = /hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/;
      const match = hsl.match(hslRegex);
      if (!match) return hsl;
      let h = Number(match[1]);
      let s = Number(match[2]);
      let l = Number(match[3]);
      l = Math.max(0, Math.min(100, l + percent));
      return `hsl(${h}, ${s}%, ${l}%)`;
    }

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('productChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: labelGraphique,
          data: data,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.dataset.label}: ${ctx.raw}`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: labelGraphique }
          }
        }
      }
    });
  }

  processRevenueData() {
    this.revenusParDate = {};
    this.commandes.forEach(cmd => {
      const date = new Date(cmd.dateCommande);
      let cle: string;

      if (this.regroupementPar === 'jour') {
        cle = date.toISOString().split('T')[0];
      } else {
        const firstDayOfWeek = new Date(date);
        firstDayOfWeek.setDate(date.getDate() - date.getDay());
        cle = firstDayOfWeek.toISOString().split('T')[0];
      }

      const total = cmd.produits?.reduce((acc, p) => acc + (p.quantite * p.produit.prix), 0) || 0;

      if (!this.revenusParDate[cle]) {
        this.revenusParDate[cle] = 0;
      }
      this.revenusParDate[cle] += total;
    });

    this.generateRevenueChart();
  }

  generateRevenueChart() {
    const entries = Object.entries(this.revenusParDate).sort(([a], [b]) => a.localeCompare(b));
    const labels = entries.map(e => e[0]);
    const data = entries.map(e => e[1]);

    const backgroundColor = 'rgba(54, 162, 235, 0.5)';
    const borderColor = 'rgba(54, 162, 235, 1)';

    if (this.revenueChart) {
      this.revenueChart.destroy();
    }

    this.revenueChart = new Chart('revenueChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Chiffre d’affaires (TND)',
          data: data,
          backgroundColor,
          borderColor,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          tooltip: {
            callbacks: {
              label: ctx => `TND${ctx.raw}`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Montant (TND)' }
          }
        }
      }
    });
  }

  changerRegroupement(type: 'jour' | 'semaine') {
    this.regroupementPar = type;
    this.processRevenueData();
  }
}