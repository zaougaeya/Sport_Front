import { Component, OnInit } from '@angular/core';
import { EquipeService } from '../../services/equipe.service';
import { Equipe } from '../../models/equipe.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NameEquipePipe } from '../../pipe/nameequipe.pipe';
import { Nameterrainpipe } from '../../pipe/nameterrain.pipe';
import { AlertComponent } from '../alert/alert.component';
import { Joueur } from '../../models/joueur.model';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.scss'],
  imports: [CommonModule, FormsModule, HttpClientModule, NameEquipePipe, Nameterrainpipe, AlertComponent],
  standalone: true
})

export class EquipeComponent implements OnInit {
  equipes: Equipe[] = [];
  newEquipe: Equipe = { id: '', nameEquipe: '', logo: '' };
  editedEquipe: { [key: string]: Equipe } = {};
  editMode: { [key: string]: boolean } = {};

  joueursParEquipe: { [equipeId: string]: any[] } = {};
  joueursVisibles: { [equipeId: string]: boolean } = {};

  showAddEquipe = false;
  message: string = '';
  alertType: 'success' | 'error' = 'success';
  errorMessage = '';

  constructor(private equipeService: EquipeService) { }

  ngOnInit(): void {
    this.loadEquipes();
  }

  toggleJoueurs(equipeId: string): void {
    this.joueursVisibles[equipeId] = !this.joueursVisibles[equipeId];

    if (this.joueursVisibles[equipeId] && !this.joueursParEquipe[equipeId]) {
      this.equipeService.getJoueursByEquipe(equipeId).subscribe({
        next: (data) => this.joueursParEquipe[equipeId] = data,
        error: () => console.error("Erreur lors du chargement des joueurs de l'équipe"),
      });
    }
  }


  loadEquipes(): void {
    this.equipeService.getAllEquipes().subscribe({
      next: (data: Equipe[]) => this.equipes = data,
      error: () => this.errorMessage = 'Erreur de chargement des équipes.'
    });
  }

  toggleAddEquipe(): void {
    this.showAddEquipe = true;
    // Pas besoin d'initialiser l'ID ici car MongoDB le générera automatiquement
    this.newEquipe = { nameEquipe: '', logo: '' };  // Retirer l'ID vide
  }

  closeAddEquipe(): void {
    this.showAddEquipe = false;
  }

  cancelAddEquipe(): void {
    // Réinitialiser l'équipe sans l'ID
    this.newEquipe = { nameEquipe: '', logo: '' };
    this.showAddEquipe = false;
  }

  onAddEquipe(): void {
    // Assurer que l'ID n'est pas inclus dans l'objet
    // MongoDB générera automatiquement un ID
    this.equipeService.createEquipe(this.newEquipe).subscribe({
      next: () => {
        this.loadEquipes();
        this.message = 'Équipe ajoutée avec succès.';
        this.alertType = 'success';
        this.showAddEquipe = false;
        console.log(this.newEquipe); // Afficher l'objet sans ID
      },
      error: () => {
        this.message = 'Erreur lors de l\'ajout.';
        this.alertType = 'error';
      }
    });

  }

  editEquipe(equipe: Equipe): void {
    if (!equipe.id) {
      console.error('ID de l\'équipe est manquant');
      return;
    }

    // Logique pour mettre en mode édition
    this.editMode[equipe.id] = true;
    this.editedEquipe[equipe.id] = { ...equipe };
  }

  cancelEdit(id: string): void {
    if (!id) {
      console.error('ID de l\'équipe est manquant');
      return;
    }

    this.editMode[id] = false;
    delete this.editedEquipe[id];
  }

  saveEquipe(id: string): void {
    if (!id || !this.editedEquipe[id]) {
      console.error('ID de l\'équipe est manquant ou les données sont invalides');
      return;
    }

    this.equipeService.updateEquipe(id, this.editedEquipe[id]).subscribe({
      next: () => {
        this.loadEquipes();
        this.message = 'Équipe mise à jour.';
        this.alertType = 'success';
        this.editMode[id] = false;
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour:', err);
        this.message = 'Erreur lors de la mise à jour.';
        this.alertType = 'error';
      }
    });
  }

  deleteEquipe(id: string): void {
    if (!id) {
      console.error('ID de l\'équipe est manquant');
      return;
    }

    if (confirm('Confirmer la suppression de cette équipe ?')) {
      this.equipeService.deleteEquipe(id).subscribe({
        next: () => {
          this.loadEquipes();
          this.message = 'Équipe supprimée.';
          this.alertType = 'success';
        },
        error: () => {
          this.message = 'Erreur lors de la suppression.';
          this.alertType = 'error';
        }
      });
    }
  }

  closeAlert() {
    this.message = ''; // Ferme l'alerte
  }

}
