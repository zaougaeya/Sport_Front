import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PanierService } from 'src/app/core/services/panierService';
import { CommandeService } from 'src/app/core/services/commande.service';
import { CommandeSuccessDialogComponent } from '../commande-success-dialog/commande-success-dialog.component';
import confetti from 'canvas-confetti';

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
  commandeEnCours: boolean = false;

  constructor(
    private panierService: PanierService,
    private commandeService: CommandeService,
    private dialogRef: MatDialogRef<PanierDialogComponent>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.chargerPanier();
  }

  chargerPanier(): void {
    this.panierService.getProduitsDuPanier().subscribe(res => {
      console.log('Produits du panier :', res);
      this.produits = res || [];
    });
  }

  supprimerProduit(produitId: string): void {
    this.panierService.supprimerProduit(produitId).subscribe(() => {
      this.chargerPanier();
    });
  }

  viderPanier(): void {
    this.panierService.viderPanier().subscribe(() => {
      this.chargerPanier();
    });
  }

  fermer(): void {
    this.dialogRef.close();
  }

  commander(): void {
    if (this.commandeEnCours) return;

    this.commandeEnCours = true;

    this.commandeService.creerCommande().subscribe({
      next: (response: any) => {
        const commande = response.commande;
        const montant = commande?.montantTotal || 0;
        const messagePromo = response.messagePromo || null;
        const messageBase = `Votre commande est effectuée avec succès.\nUn e-mail de confirmation vous a été envoyé.\nMerci pour votre confiance !`;

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
}
