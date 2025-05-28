import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduitService, Produit } from 'src/app/modules/dashboard/pages/produits/produit.service';
import { CategoryService, Categorie } from 'src/app/modules/dashboard/pages/categories/category.service';
import { NftSingleCardComponent } from 'src/app/modules/dashboard/components/nft/nft-single-card/nft-single-card.component';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-nft',
  standalone: true,
  imports: [CommonModule, FormsModule, NftSingleCardComponent],
  template: `
    <div class="p-6">

      <!-- Barre de filtres -->
      <div class="flex gap-4 items-center mb-6">

        <!-- Bouton Nos catégories -->
        <div class="relative">
          <button (click)="toggleDropdown()" class="flex items-center px-4 py-2 rounded-md bg-gray-100 text-sm font-medium text-gray-700 hover:bg-gray-200 border border-gray-300">
            Nos catégories ☰  
          </button>
          <div *ngIf="dropdownOpen" 
               class="absolute mt-2 w-56 rounded-md shadow-md bg-gray-50 border border-gray-300 z-50 animate-fade-in">
            <div class="py-1 text-sm">
              <button (click)="filtrerParCategorie('')" 
                      class="block w-full text-left px-4 py-2 text-black hover:bg-gray-100">
                Toutes
              </button>
              <button *ngFor="let cat of categories"
                      (click)="filtrerParCategorie(cat.nom)"
                      class="block w-full text-left px-4 py-2 text-black hover:bg-gray-100">
                {{ cat.nom }}
              </button>
            </div>
          </div>
        </div>

       <!-- Bouton Nouveautés -->
<button (click)="filtrerParNouveautes()"
        class="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 text-sm font-medium text-gray-700
               hover:bg-gray-200 border border-gray-300 cursor-pointer transition-colors duration-200"
        style="width: auto; min-width: auto;">
  ✨ Nouveautés
</button>

<!-- Bouton Promo -->
<button (click)="filtrerParPromo()"
        class="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 text-sm font-medium text-gray-700
               hover:bg-gray-200 border border-gray-300 cursor-pointer transition-colors duration-200"
        style="width: auto; min-width: auto;">
  🎉 Promo
</button>

<!-- Bouton Meilleures Ventes -->
<button (click)="filtrerParMeilleuresVentes()" 
  class="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 text-sm font-medium text-gray-700
               hover:bg-gray-200 border border-gray-300 cursor-pointer transition-colors duration-200"
        style="width: auto; min-width: auto;">
  🔥 Meilleures Ventes
</button>

      </div>

      <!-- Grille des produits -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <ng-container *ngFor="let produit of produitsFiltres">
          <nft-single-card [produit]="produit"></nft-single-card>
        </ng-container>
      </div>
    </div>
  `
})
export class NftComponent implements OnInit {
  nft: Produit[] = [];
  categories: Categorie[] = [];
  produitsFiltres: Produit[] = [];
  dropdownOpen: boolean = false;

  constructor(
    private produitService: ProduitService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(cats => {
      this.categories = cats;
    });

    this.produitService.getAllProduits().subscribe(produits => {
      this.nft = produits;
      this.produitsFiltres = produits;
    });
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

filtrerParMeilleuresVentes(): void {
  this.produitsFiltres = [...this.nft].sort((a, b) => {
    return (b.nbCommandes || 0) - (a.nbCommandes || 0);
  });

  this.dropdownOpen = false;
}



  filtrerParPromo(): void {
    this.produitsFiltres = this.nft.filter(p => p.pourcentagePromotion && p.pourcentagePromotion > 0);
    this.dropdownOpen = false;
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }
  

}
