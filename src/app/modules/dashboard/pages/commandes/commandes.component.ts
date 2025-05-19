import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../commandes/commande.service';
import { Commande } from '../commandes/commande.model';
import { Livreur } from '../livreurs/livreur.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent implements OnInit {
  pageSize = 3; // Nombre d'éléments par page
  currentPage = 1; // Page actuelle
  totalPages = 0; 
  commandes: Commande[] = [];
  livreursDisponibles: Livreur[] = [];
  selectedLivreur: { [idCommande: string]: string } = {};

  constructor(private commandeService: CommandeService) {}

  ngOnInit(): void {
    this.getAllCommandes();
    this.getLivreursDisponibles();
  }

  // 🔄 Récupérer toutes les commandes
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

  // 🔄 Récupérer tous les livreurs disponibles
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

  // 🔄 Corrigé : ID Livreurs en premier, ID Commandes en second
  affecterLivreur(idLivreur: string, idCommande: string) {
    console.log('ID Livreur:', idLivreur);
    console.log('ID Commande:', idCommande);

    if (!idLivreur) {
      Swal.fire('Erreur', 'Veuillez sélectionner un livreur', 'error');
      return;
    }

    // 👉 On appelle le service avec l'ordre correct
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

  // 🔄 Supprimer une commande
  supprimerCommande(idCommande: string) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Cette action est irréversible !',
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
            Swal.fire('Supprimé !', 'La commande a été supprimée.', 'success');
            this.getAllCommandes();
          },
          error: (err) => {
            console.error("Erreur lors de la suppression de la commande :", err);
            Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression', 'error');
          }
        });
      }
    });
  }
}
