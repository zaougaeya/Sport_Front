import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produit } from 'src/app/modules/dashboard/pages/produits/produit.service';
import { LucideIconsModule } from 'src/app/shared/lucide-icons.module';

@Component({
  selector: 'nft-single-card',
  standalone: true,
  imports: [
    CommonModule,
    LucideIconsModule,
  ],
  template: `
    <div class="relative w-full max-w-sm flex flex-col overflow-hidden rounded-xl border bg-card shadow hover:shadow-lg transition duration-150 ease-in-out h-96">

      <!-- Conteneur badges en haut à droite -->
      <!-- Conteneur badges en haut à droite -->
<div class="absolute top-2 right-2 flex items-center gap-1 z-20">
  <!-- Badge Promo -->
  <div *ngIf="produit.pourcentagePromotion && produit.pourcentagePromotion > 0" 
       class="inline-flex items-center gap-1 bg-pink-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-md
              hover:bg-pink-600 cursor-pointer transition-colors duration-200">
    🎉 Promo
  </div>

  <!-- Badge Nouveau -->
  <div *ngIf="isNew" 
       class="inline-flex bg-yellow-400 text-yellow-900 text-xs font-semibold px-2 py-0.5 rounded-full shadow-md
              hover:bg-yellow-500 cursor-pointer transition-colors duration-200">
    Nouveau
  </div>
</div>


      <!-- Image -->
      <div [ngStyle]="{ 'background-image': 'url(' + produit.imageUrl + ')' }"
           class="h-48 w-full bg-cover bg-center rounded-t-xl">
      </div>

      <!-- Contenu -->
      <div class="p-4 flex flex-col justify-between flex-1 space-y-2 overflow-hidden">

        <h3 class="text-lg font-semibold text-foreground break-words whitespace-normal">{{ produit.nom }}</h3>

        <div class="flex items-center justify-between text-sm mt-1">
          <div class="text-primary font-semibold flex items-center gap-2">
            <span *ngIf="produit.pourcentagePromotion && produit.pourcentagePromotion > 0" class="line-through text-gray-500">
              {{ produit.prix | number:'1.2-2' }}DT
            </span>
            <span>
              {{ calculPrixPromo(produit.prix, produit.pourcentagePromotion) | number:'1.2-2' }}DT
            </span>
          </div>
          <span *ngIf="produit.quantiteEnStock > 0" class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
            En stock
          </span>
          <span *ngIf="produit.quantiteEnStock === 0" class="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
            Rupture
          </span>
        </div>

        <!-- Boutons -->
        <div class="mt-3 flex justify-between items-center gap-2">
          <button (click)="toggleDetails()"
                  class="flex-1 rounded-md bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted/70">
            Détails
          </button>

          <button (click)="addToCart()"
                  class="rounded-md bg-primary p-2 text-white hover:bg-primary/90 flex items-center justify-center">
            <lucide-icon name="shopping-cart" class="h-4 w-4"></lucide-icon>
          </button>
        </div>
      </div>

      <!-- Popup Détails -->
      <div *ngIf="showDetails" class="absolute z-10 top-2 left-2 right-2 bg-white border rounded-lg p-3 shadow-lg max-h-40 overflow-auto">
        <div class="text-sm font-semibold">{{ produit.nom }}</div>
        <p class="text-xs text-muted-foreground mt-1">{{ produit.description }}</p>
      </div>
    </div>
  `
})
export class NftSingleCardComponent implements OnChanges {
  @Input() produit!: Produit;
  showDetails = false;
  isNew = false;
  private timeoutId: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['produit'] && this.produit?.dateAjout) {
      const dateAjout = new Date(this.produit.dateAjout);
      const maintenant = new Date();
      const diffTemps = maintenant.getTime() - dateAjout.getTime();
      const diffJours = diffTemps / (1000 * 3600 * 24);
      this.isNew = diffJours <= 7; // produit ajouté il y a 7 jours ou moins
    } else {
      this.isNew = false;
    }
  }

  calculPrixPromo(prix: number, promo: number): number {
    if (!promo || promo <= 0) return prix;
    return prix - (prix * promo / 100);
  }

  toggleDetails() {
    this.showDetails = true;
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.showDetails = false;
    }, 3000);
  }

  addToCart() {
    console.log('Produit ajouté au panier :', this.produit.nom);
  }
}
