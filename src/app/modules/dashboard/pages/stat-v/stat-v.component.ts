import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../commandes/commande.service';
import { Commande } from '../commandes/commande.model';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

Chart.register(
  BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend
);

@Component({
  selector: 'app-stat-v',
  templateUrl: './stat-v.component.html',
  styleUrls: ['./stat-v.component.scss']
})
export class StatVComponent implements OnInit {
  commandes: Commande[] = [];
  produitsStatistiques: { [key: string]: { occurrences: number; quantiteTotale: number } } = {};
  produitsTrie: { nom: string; occurrences: number; quantiteTotale: number }[] = [];
  chart: any;
  triPar: 'occurrences' | 'quantiteTotale' = 'quantiteTotale'; // Critère de tri par défaut

  constructor(private commandeService: CommandeService) {}

  ngOnInit(): void {
    this.getAllCommandes();
  }

  /**
   * Récupérer toutes les commandes depuis le service
   */
  getAllCommandes() {
    this.commandeService.getAllCommandes().subscribe({
      next: (data) => {
        this.commandes = data;
        this.processSalesData();
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des commandes :', err);
      }
    });
  }

  /**
   * Traiter les données de vente pour identifier les produits les plus commandés et les quantités totales
   */
  processSalesData() {
    this.produitsStatistiques = {}; // Réinitialiser le compteur
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

  /**
   * Trier les produits en fonction du critère sélectionné
   */
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

  /**
   * Changer le critère de tri et mettre à jour l'affichage
   * @param critere Le critère de tri ('occurrences' ou 'quantiteTotale')
   */
  changerTri(critere: 'occurrences' | 'quantiteTotale') {
    this.triPar = critere;
    this.trierProduits();
    this.generateChart(); // Régénérer le graphique après le tri
  }

  /**
   * Générer le graphique
   */
 generateChart() {
  const labels = this.produitsTrie.map(p => p.nom);
  const data = this.produitsTrie.map(p => this.triPar === 'occurrences' ? p.occurrences : p.quantiteTotale);
  const labelGraphique = this.triPar === 'occurrences' ? 'Nombre de Commandes' : 'Quantité Totale Vendue';

  // Fonction pour générer une couleur HSL unique (hue variant selon l'index)
  const generateColor = (index: number, total: number) => {
    const hue = (index * 360 / total) % 360;
    return `hsl(${hue}, 70%, 60%)`; // Saturation et luminosité fixes pour des couleurs vives
  };

  const backgroundColors = data.map((_, i) => generateColor(i, data.length));
  const borderColors = backgroundColors.map(c => shadeColor(c, -20));

  // Assombrir une couleur HSL (en convertissant temporairement en RGB)
  function shadeColor(hsl: string, percent: number) {
    // hsl(x, y%, z%) => parse
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
}