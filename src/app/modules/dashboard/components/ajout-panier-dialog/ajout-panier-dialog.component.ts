import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PanierService } from 'src/app/core/services/panierService';
import { CommandeService } from 'src/app/core/services/commande.service'; // ✅ adapte le chemin si besoin
import confetti from 'canvas-confetti';
@Component({
  selector: 'app-ajout-panier-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './ajout-panier-dialog.component.html',
  styleUrls: ['./ajout-panier-dialog.component.scss']
})
export class AjoutPanierDialogComponent {
  quantite: number = 1;
  ajoutReussi = false;
  messageAjout: string = '';
  private userId: string = '683622ef0170a3176cd30a59'; // Valeur par défaut



 
  constructor(
    public dialogRef: MatDialogRef<AjoutPanierDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private panierService: PanierService,
    private commandeService: CommandeService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = storedUserId;
    }
  }

  ajouterAuPanier(): void {
    if (!this.userId) {
      this.messageAjout = 'Veuillez vous connecter avant d\'ajouter un produit.';
      return;
    }

    const produitId = this.data.produit.id || this.data.produit._id;

    this.panierService.ajouterProduitAuPanier(this.userId, produitId, this.quantite).subscribe({
      next: () => {
        this.ajoutReussi = true;
        this.messageAjout = 'Produit ajouté au panier avec succès !';
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout au panier :', error);
        this.messageAjout = 'Erreur lors de l\'ajout au panier.';
      }
    });
  }

  commander(): void {
  this.commandeService.creerCommande().subscribe({
    next: (commande) => {
      const montant = commande?.montantTotal || 0;
      const promo = commande?.promotionMessage || ''; // si tu veux exposer ce champ depuis le backend
      const messageDeBase = 'Votre commande est bien passée. Merci pour votre confiance !';

      if (montant > 400) {
        this.lancerConfetti();
        this.snackBar.open(`${messageDeBase} 🎁 Bonus : ${promo || 'vous avez reçu une promotion !'}`, 'Fermer', {
          duration: 7000
        });
      } else {
        this.snackBar.open(messageDeBase, 'Fermer', {
          duration: 5000
        });
      }

      this.dialogRef.close(true);
    },
    error: (error) => {
      const message = error?.error || 'Une erreur est survenue lors de la commande.';
      this.snackBar.open(message, 'Fermer', {
        duration: 5000
      });
    }
  });
}
lancerConfetti(): void {
  confetti({
    particleCount: 150,
    spread: 90,
    origin: { y: 0.6 },
  });
}
  annuler(): void {
    this.dialogRef.close();
  }

  continuerAchats(): void {
    this.dialogRef.close('continuer');
  }

  incrementerQuantite(): void {
    if (this.quantite < this.data.produit.quantiteEnStock) {
      this.quantite++;
    }
  }

  decrementerQuantite(): void {
    if (this.quantite > 1) {
      this.quantite--;
    }
  }

  calculPrixPromo(prix: number, pourcentage: number): number {
    return prix - (prix * pourcentage / 100);
  }

  onQuantiteChange(): void {
    if (this.quantite < 1) {
      this.quantite = 1;
    }
    if (this.quantite > this.data.produit.quantiteEnStock) {
      this.quantite = this.data.produit.quantiteEnStock;
    }
  }
}
