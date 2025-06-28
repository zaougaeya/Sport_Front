import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { Produit } from 'src/app/modules/dashboard/pages/produits/produit.service';

@Component({
  selector: 'app-recommendation-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './app-recommendation-dialog.component.html',
  styleUrls: ['./app-recommendation-dialog.component.scss']
})
export class RecommendationDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public produits: Produit[],
    public dialogRef: MatDialogRef<RecommendationDialogComponent>
  ) {
    console.log('✅ Produits reçus pour recommandation :', this.produits);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
