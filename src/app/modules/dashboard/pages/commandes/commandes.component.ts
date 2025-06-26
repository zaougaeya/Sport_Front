import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../commandes/commande.service';
import { Commande } from '../commandes/commande.model';
import { Livreur } from '../livreurs/livreur.model';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  standalone: true,
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss'],
  imports: [CommonModule, FormsModule, NgxPaginationModule],
})
export class CommandesComponent implements OnInit {
  pageSize = 3;
  currentPage = 1;
  totalPages = 0;
  commandes: Commande[] = [];
  livreursDisponibles: Livreur[] = [];
  selectedLivreur: { [idCommande: string]: string } = {};

  constructor(private commandeService: CommandeService) {}

  ngOnInit(): void {
    this.getAllCommandes();
    this.getLivreursDisponibles();
  }

  getAllCommandes() {
    this.commandeService.getAllCommandes().subscribe({
      next: (data) => {
        this.commandes = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des commandes :', err);
      }
    });
  }

  getLivreursDisponibles() {
    this.commandeService.getLivreursDisponibles().subscribe({
      next: (data) => {
        this.livreursDisponibles = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des livreurs :', err);
      }
    });
  }

  affecterLivreur(idLivreur: string, idCommande: string) {
    if (!idLivreur) {
      Swal.fire('Erreur', 'Veuillez sélectionner un livreur', 'error');
      return;
    }

    this.commandeService.affecterLivreur(idLivreur, idCommande).subscribe({
      next: () => {
        Swal.fire('Succès', 'Livreur affecté avec succès', 'success');
        this.getAllCommandes();
        this.getLivreursDisponibles();
      },
      error: (err) => {
        console.error("Erreur lors de l'affectation du livreur :", err);
        Swal.fire('Erreur', 'Une erreur est survenue lors de l\'affectation', 'error');
      }
    });
  }

  supprimerCommande(idCommande: string) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Cette commande sera supprimée définitivement !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.commandeService.supprimerCommande(idCommande).subscribe({
          next: () => {
            Swal.fire('Supprimée !', 'La commande a été supprimée.', 'success');
            this.getAllCommandes();
          },
          error: (err) => {
            console.error("Erreur lors de la suppression de la commande :", err);
            Swal.fire('Erreur', err.error?.error || 'Une erreur est survenue', 'error');
          }
        });
      }
    });
  }

  searchText: string = '';

  get commandesFiltrees() {
    if (!this.searchText || this.searchText.trim() === '') {
      return this.commandes;
    }

    const search = this.searchText.toLowerCase().trim();

    return this.commandes.filter(commande =>
      commande.nomClient.toLowerCase().includes(search) ||
      commande.montantTotal.toString().includes(search) ||
      new Date(commande.dateCommande).toLocaleDateString('fr-FR').includes(search)
    );
  }
}
