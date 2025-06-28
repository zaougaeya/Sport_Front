import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduitService, Produit } from 'src/app/modules/dashboard/pages/produits/produit.service';
import { CategoryService, Categorie } from 'src/app/modules/dashboard/pages/categories/category.service';
import { NftSingleCardComponent } from 'src/app/modules/dashboard/components/nft/nft-single-card/nft-single-card.component';
import { LucideIconsModule } from 'src/app/shared/lucide-icons.module';
import { MatIconModule } from '@angular/material/icon';
import { PanierDialogComponent } from '../../components/panier-dialog-component/panier-dialog-component.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RecommendationService } from 'src/app/core/services/RecommendationService';
import { PanierService } from 'src/app/core/services/panierService';
import { RecommendationDialogComponent } from '../../components/app-recommendation-dialog/app-recommendation-dialog.component';

@Component({
  selector: 'app-nft',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, NftSingleCardComponent, MatIconModule, LucideIconsModule],
  template: `
    <style>
      /* Effet zoom doux + éclaircissement sur les images */
      .produit-image {
        transition: transform 0.3s ease, filter 0.3s ease;
        will-change: transform, filter;
      }
      .produit-image:hover {
        transform: scale(1.05);
        filter: brightness(1.1);
        cursor: pointer;
      }
    </style>

    <div class="p-6">

      <div class="flex gap-4 items-center mb-6">

        <div class="relative">
          <button (click)="toggleDropdown()" class="flex items-center px-4 py-2 rounded-md bg-gray-100 text-sm font-medium text-gray-700 hover:bg-gray-200 border border-gray-300">
            Nos catégories ☰
          </button>
          <div *ngIf="dropdownOpen" class="absolute mt-2 w-56 rounded-md shadow-md bg-gray-50 border border-gray-300 z-50">
            <div class="py-1 text-sm">
              <button (click)="filtrerParCategorie('')" class="block w-full text-left px-4 py-2 text-black hover:bg-gray-100">Toutes</button>
              <button *ngFor="let cat of categories"
                      (click)="filtrerParCategorie(cat.nom)"
                      class="block w-full text-left px-4 py-2 text-black hover:bg-gray-100">
                {{ cat.nom }}
              </button>
            </div>
          </div>
        </div>

        <button (click)="filtrerParNouveautes()" class="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 text-sm font-medium text-gray-700
                         hover:bg-gray-200 border border-gray-300 cursor-pointer transition-colors duration-200"
        style="width: auto; min-width: auto;">✨ Nouveautés</button>
        <button (click)="filtrerParPromo()" class="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 text-sm font-medium text-gray-700
                         hover:bg-gray-200 border border-gray-300 cursor-pointer transition-colors duration-200"
        style="width: auto; min-width: auto;">🎉 Promo</button>
        <button (click)="filtrerParMeilleuresVentes()" class="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 text-sm font-medium text-gray-700
                         hover:bg-gray-200 border border-gray-300 cursor-pointer transition-colors duration-200"
        style="width: auto; min-width: auto;">🔥 Meilleures Ventes</button>

        <div class="relative">
          <button (click)="toggleSliderPrix()"
                           class="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 text-sm font-medium text-gray-700
                         hover:bg-gray-200 border border-gray-300 cursor-pointer transition-colors duration-200"
        style="width: auto; min-width: auto;">
              Filtrer par prix
          </button>

          <div *ngIf="sliderPrixOpen" class="absolute mt-2 w-80 p-4 bg-white shadow-lg border border-gray-300 rounded-xl z-50">
            <label class="block text-sm text-gray-600 mb-2">Fourchette de prix :</label>
            <div class="flex justify-between text-xs mb-1 text-gray-600">
              <span>Min: {{ prixMin }}DNT</span>
              <span>Max: {{ prixMax }}DNT</span>
            </div>
            <div class="relative h-6">
              <input type="range" min="0" [max]="prixMaxGlobal" [(ngModel)]="prixMin"
                                 class="absolute w-full z-20 h-1 bg-transparent accent-blue-500">
              <input type="range" min="0" [max]="prixMaxGlobal" [(ngModel)]="prixMax"
                                 class="absolute w-full z-10 h-1 bg-transparent accent-pink-500">
            </div>
            <div class="text-center text-sm mt-2">
              Affichage des produits entre <strong>{{ prixMin }}TND</strong> et <strong>{{ prixMax }}TND</strong>
            </div>
            <div class="mt-3 text-center">
              <button (click)="filtrerParPlagePrix()" class="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 text-sm font-medium text-gray-700
                         hover:bg-gray-200 border border-gray-300 cursor-pointer transition-colors duration-200"
        style="width: auto; min-width: auto;">
                Appliquer
              </button>
            </div>
          </div>
        </div>

        <div class="ml-auto relative">
          <button  (click)="ouvrirPanier()"
            class="rounded-md bg-primary p-2 text-white hover:bg-primary/90 flex items-center justify-center"
            aria-label="Voir le panier"
          >
            <lucide-icon name="shopping-cart" class="h-5 w-5"></lucide-icon>
          </button>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-4 mb-6">
        <div class="flex-grow flex justify-center">
          <div class="relative w-full max-w-2xl">
            <input
              type="text"
              [(ngModel)]="rechercheTexte"
              (input)="appliquerFiltreRecherche()"
              placeholder="Rechercher un produit par nom , par catégorie..."
              class="w-full py-2 pl-10 pr-4 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"/>
            </svg>
          </div>
        </div>

        <div class="flex gap-2 items-center">
          <button *ngFor="let genre of ['TOUT', 'HOMME', 'FEMME', 'ENFANT']"
                          (click)="genreSelectionne = genre; appliquerFiltreRecherche()"
                          [ngClass]="{
                            'bg-pink-500 text-white': genreSelectionne === genre,
                            'bg-gray-100 text-gray-700 hover:bg-gray-200': genreSelectionne !== genre
                          }"
                          class="px-3 py-1 rounded-full text-sm font-medium border border-gray-300 transition duration-200">
            {{ genre }}
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <ng-container *ngFor="let produit of produitsFiltres">
            <!-- J'ajoute la classe 'produit-image' à l'image dans le composant interne -->
            <nft-single-card [produit]="produit"></nft-single-card>
          </ng-container>
        </div>
      </div>
    </div>
  `
})
export class NftComponent implements OnInit {
  nft: Produit[] = [];
  categories: Categorie[] = [];
  produitsFiltres: Produit[] = [];

  dropdownOpen: boolean = false;
  sliderPrixOpen: boolean = false;
  rechercheTexte: string = '';
  genreSelectionne: string = 'TOUT';
  prixMin: number = 0;
  prixMax: number = 1000;
  prixMaxGlobal: number = 1000;

  constructor(
    private produitService: ProduitService,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private recommendationService: RecommendationService,
    private panierService: PanierService,
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(cats => {
      this.categories = cats;
    });

    this.produitService.getAllProduits().subscribe(produits => {
      this.nft = produits;
      this.produitsFiltres = produits;

      const prixList = produits.map(p => p.prix);
      this.prixMaxGlobal = Math.max(...prixList);
      this.prixMax = this.prixMaxGlobal;
      this.prixMin = 0;
    });

    this.panierService.getProduitsDuPanier().subscribe(
      produitsPanier => {
        if (!produitsPanier || produitsPanier.length === 0) {
          setTimeout(() => {
            this.getAndShowHistoricalRecommendations();
          }, 3000);
        }
      },
      error => {
        this.getAndShowHistoricalRecommendations();
      }
    );
  }

  private getAndShowHistoricalRecommendations(): void {
    this.recommendationService.getRecommandationsHistoriques().subscribe(
      recommandations => {
        if (recommandations && recommandations.length > 0) {
          this.dialog.open(RecommendationDialogComponent, {
   width: '80%',
            data: recommandations,
  maxWidth: '900px',
  panelClass: 'custom-dialog-container'
});
        }
      },
      error => {
        // Gestion d'erreur possible ici
      }
    );
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleSliderPrix(): void {
    this.sliderPrixOpen = !this.sliderPrixOpen;
  }

  filtrerParCategorie(categorieNom: string): void {
    this.dropdownOpen = false;
    this.produitsFiltres = categorieNom
      ? this.nft.filter(p => p.categorie.nom === categorieNom)
      : this.nft;
  }

  filtrerParNouveautes(): void {
    const aujourdHui = new Date();
    const ilYA7Jours = new Date();
    ilYA7Jours.setDate(aujourdHui.getDate() - 7);

    this.produitsFiltres = this.nft.filter(p => {
      const dateAjout = new Date(p.dateAjout);
      return dateAjout >= ilYA7Jours;
    });

    this.dropdownOpen = false;
  }

  filtrerParPromo(): void {
    this.produitsFiltres = this.nft.filter(p => p.pourcentagePromotion && p.pourcentagePromotion > 0);
    this.dropdownOpen = false;
  }

  filtrerParMeilleuresVentes(): void {
    this.produitsFiltres = [...this.nft].sort((a, b) => (b.nbCommandes || 0) - (a.nbCommandes || 0));
    this.dropdownOpen = false;
  }

  filtrerParPlagePrix(): void {
    this.produitsFiltres = this.nft.filter(p =>
      p.prix >= this.prixMin && p.prix <= this.prixMax
    );
    this.sliderPrixOpen = false;
  }

  appliquerFiltreRecherche(): void {
    const recherche = this.rechercheTexte.toLowerCase();
    const genre = this.genreSelectionne.toLowerCase();

    this.produitsFiltres = this.nft.filter(p => {
      const correspondNom = p.nom?.toLowerCase().includes(recherche);
      const correspondCategorie = p.categorie?.nom?.toLowerCase().includes(recherche);
      const correspondGenre = genre === 'tout' || p.genreProduit?.toLowerCase() === genre;
      return (correspondNom || correspondCategorie) && correspondGenre;
    });
  }

  ouvrirPanier(): void {
    this.dialog.open(PanierDialogComponent, {
      width: '700px',
    });
  }
}
