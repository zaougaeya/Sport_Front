import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PanierService } from 'src/app/core/services/panierService';
import { CommandeService } from 'src/app/core/services/commande.service';
import confetti from 'canvas-confetti';

// Import du dialog success (à adapter si dossier différent)
import { CommandeSuccessDialogComponent } from '../commande-success-dialog/commande-success-dialog.component';

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
    MatIconModule
  ],
  templateUrl: './ajout-panier-dialog.component.html',
  styleUrls: ['./ajout-panier-dialog.component.scss']
})
export class AjoutPanierDialogComponent {
  quantite: number = 1;
  ajoutReussi = false;
  messageAjout: string = '';
  private userId: string = '683cd30c75078b686d4e44b5'; // Valeur par défaut
  
  commandeEnCours: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AjoutPanierDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private panierService: PanierService,
    private commandeService: CommandeService,
    private dialog: MatDialog,
    private router: Router
  ) {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = storedUserId;
    }

    // Sécurité : initialisation minimale de data.produit
    if (!this.data) {
      this.data = {};
    }
    if (!this.data.produit) {
      this.data.produit = {
        nom: 'Produit inconnu',
        description: '',
        imageUrl: '',
        prix: 0,
        pourcentagePromotion: 0,
        quantiteEnStock: 0,
        id: null,
        _id: null
      };
    }
  }

  ajouterAuPanier(): void {
    if (!this.userId) {
      this.messageAjout = 'Veuillez vous connecter avant d\'ajouter un produit.';
      return;
    }

    const produitId = this.data.produit?.id || this.data.produit?._id;
    if (!produitId) {
      this.messageAjout = 'Produit invalide.';
      return;
    }

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
    if (this.commandeEnCours) {
      return;
    }
    this.commandeEnCours = true;

    this.commandeService.creerCommande().subscribe({
      next: (response: any) => {
        const commande = response.commande;
        const montant = commande?.montantTotal || 0;
        const messagePromo = response.messagePromo || null;
        const messageBase = `Votre commande est effectuée avec succès.
Un e-mail de confirmation vous a été envoyé.
Merci pour votre confiance !`;

        if (montant > 400 && messagePromo) {
          this.lancerConfetti();
        }

        this.dialog.open(CommandeSuccessDialogComponent, {
          data: { messageBase, messagePromo },
          width: '350px'
        });

        this.dialogRef.close(true);
        this.commandeEnCours = false;
      },
      error: (error) => {
        const message = error?.error || 'Une erreur est survenue lors de la commande.';
        alert(message);
        this.commandeEnCours = false;
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
    if (this.quantite < (this.data.produit?.quantiteEnStock ?? 0)) {
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
    if (this.quantite > (this.data.produit?.quantiteEnStock ?? 0)) {
      this.quantite = this.data.produit.quantiteEnStock;
    }
  }
}
