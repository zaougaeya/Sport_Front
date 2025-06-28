import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produit } from 'src/app/modules/dashboard/pages/produits/produit.service'; // Vérifie le chemin d'import
import { LucideIconsModule } from 'src/app/shared/lucide-icons.module'; // Si tu utilises Lucide Icons
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AjoutPanierDialogComponent } from 'src/app/modules/dashboard/components/ajout-panier-dialog/ajout-panier-dialog.component';

@Component({
  selector: 'nft-single-card',
  standalone: true,
  imports: [
    CommonModule,
    LucideIconsModule,
    MatDialogModule
  ],
  template: `
    <div class="relative w-full max-w-sm flex flex-col overflow-hidden rounded-xl border bg-card shadow hover:shadow-lg transition duration-150 ease-in-out h-96">
      <div class="absolute top-2 right-2 flex items-center gap-1 z-20">
        <div *ngIf="produit.pourcentagePromotion > 0"
             class="inline-flex items-center gap-1 bg-pink-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-md hover:bg-pink-600 cursor-pointer transition-colors duration-200">
          🎉 Promo
        </div>
        <div *ngIf="isNew"
             class="inline-flex bg-yellow-400 text-yellow-900 text-xs font-semibold px-2 py-0.5 rounded-full shadow-md hover:bg-yellow-500 cursor-pointer transition-colors duration-200">
          Nouveau
        </div>
      </div>

      <div [ngStyle]="{ 'background-image': 'url(' + produit.imageUrl + ')' }"
           class="produit-image h-48 w-full bg-cover bg-center rounded-t-xl">
      </div>

      <div class="p-4 flex flex-col justify-between flex-1 space-y-2 overflow-hidden">
        <h3 class="text-lg font-semibold text-foreground break-words whitespace-normal">
          {{ produit.nom }}
        </h3>

        <div class="flex items-center justify-between text-sm mt-1">
          <div class="text-primary font-semibold flex items-center gap-2">
            <span *ngIf="produit.pourcentagePromotion > 0" class="line-through text-gray-500">
              {{ produit.prix | number:'1.2-2' }} DT
            </span>
            <span>
              {{ calculPrixPromo(produit.prix, produit.pourcentagePromotion) | number:'1.2-2' }} DT
            </span>
          </div>
          <span *ngIf="produit.quantiteEnStock > 0" class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
            En stock
          </span>
          <span *ngIf="produit.quantiteEnStock === 0" class="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
            Rupture
          </span>
        </div>

        <div class="mt-3 flex justify-between items-center gap-2">
          <button (click)="toggleDetails()"
                  class="flex-1 rounded-md bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted/70">
            Détails
          </button>

          <button (click)="ouvrirDialoguePanier(produit)"
                  class="rounded-md bg-primary p-2 text-white hover:bg-primary/90 flex items-center justify-center">
            <lucide-icon name="shopping-cart" class="h-4 w-4"></lucide-icon>
          </button>
        </div>
      </div>

      <div *ngIf="showDetails" class="absolute z-10 top-2 left-2 right-2 bg-white border rounded-lg p-3 shadow-lg max-h-40 overflow-auto">
        <div class="text-sm font-semibold">{{ produit.nom }}</div>
        <p class="text-xs text-muted-foreground mt-1">{{ produit.description }}</p>
      </div>
    </div>
  `,
  styles: [`
    .produit-image {
      transition: transform 0.3s ease, filter 0.3s ease;
      will-change: transform, filter;
      cursor: pointer;
    }
    .produit-image:hover {
      transform: scale(1.05);
      filter: brightness(1.1);
    }
  `]
})
export class NftSingleCardComponent implements OnChanges {
  @Input() produit!: Produit;
  showDetails = false;
  isNew = false;
  private timeoutId: any;

  constructor(private dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['produit'] && this.produit.dateAjout) {
      const dateAjout = new Date(this.produit.dateAjout);
      const maintenant = new Date();
      const diffTemps = maintenant.getTime() - dateAjout.getTime();
      const diffJours = diffTemps / (1000 * 3600 * 24);
      this.isNew = diffJours <= 7;
    } else {
      this.isNew = false;
    }
  }

  calculPrixPromo(prix?: number, promo?: number): number {
    if (!prix) return 0;
    if (!promo || promo <= 0) return prix;
    return prix - (prix * promo / 100);
  }

  toggleDetails(): void {
    this.showDetails = true;
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.showDetails = false;
    }, 3000);
  }

  ouvrirDialoguePanier(produit: Produit): void {
    this.dialog.open(AjoutPanierDialogComponent, {
      data: { produit },
      width: '700px',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      disableClose: true
    });
  }
}
