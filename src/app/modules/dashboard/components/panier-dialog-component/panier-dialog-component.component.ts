import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PanierService } from 'src/app/core/services/panierService';

@Component({
  selector: 'app-panier-dialog',
   standalone: true,
    imports: [
      CommonModule,
      FormsModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule
    ],
   templateUrl: './panier-dialog-component.component.html',
  styleUrls: ['./panier-dialog-component.component.scss']
})
   

export class PanierDialogComponent implements OnInit {
  produits: { produit: any, quantite: number }[] = [];

  constructor(
    private panierService: PanierService,
    private dialogRef: MatDialogRef<PanierDialogComponent>
  ) {}

  ngOnInit() {
    this.chargerPanier();
  }

  chargerPanier() {
    this.panierService.getProduitsDuPanier().subscribe(res => {
  console.log('Produits du panier :', res);
  this.produits = res || [];
});

  }

  supprimerProduit(produitId: string) {
    this.panierService.supprimerProduit(produitId).subscribe(() => {
      this.chargerPanier();
    });
  }

  viderPanier() {
    this.panierService.viderPanier().subscribe(() => {
      this.chargerPanier();
    });
  }

  fermer() {
    this.dialogRef.close();
  }




 
}




