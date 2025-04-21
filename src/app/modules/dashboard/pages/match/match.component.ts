import { Component, OnInit } from '@angular/core';
import { Match } from '../../models/match.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ important pour ngModel
import { Equipe } from '../../models/equipe.model';
import { Terrain } from '../../models/terrain.model';
import { MatchService } from '../../services/match.service';
import { HttpClientModule } from '@angular/common/http';
import { EquipeService } from '../../services/equipe.service';
import { TerrainService } from '../../services/terrain.service';
import { NameEquipePipe } from '../../pipe/nameequipe.pipe';
import { Nameterrainpipe } from '../../pipe/nameterrain.pipe';
import { AlertComponent } from "../alert/alert.component";
//import { MatDialog, MatDialogModule } from '@angular/material/dialog';
//import { PopupAlertComponent } from '../../../popup-alert/popup-alert.component'; // adapte le chemin

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [CommonModule,
    FormsModule, HttpClientModule, NameEquipePipe, Nameterrainpipe, AlertComponent],
  templateUrl: './match.component.html',
  styleUrl: './match.component.scss'
})
export class MatchComponent implements OnInit {
  constructor(private matchService: MatchService,
    private equipeService: EquipeService,
    private terrainService: TerrainService,
    //private dialog: MatDialog // 💡 ajoute ça
  ) { }

  matches: any[] = [];  // Tableau pour stocker les matchs
  newMatch: Match = {}
  showAddMatch: boolean = false

  equipes: Equipe[] = [];
  terrains: Terrain[] = [];
  errorMessage: string = '';
  editMode: { [key: number]: boolean } = {};
  editedMatch: { [key: number]: any } = {};

  message: string = '';
  alertType: 'success' | 'error' = 'success';

  ngOnInit(): void {
    this.loadMatches();
    this.loadEquipes();
    this.loadTerrains();
  }

  cancelAddMatch() { this.newMatch = {}; }
  toggleAddMatch() {
    this.newMatch = {};
    this.showAddMatch = true;
  }

  closeAlert() {
    this.message = ''; // Ferme l'alerte
  }

  onAddMatch() {
    if (
      !this.newMatch.idEquipe1 ||
      !this.newMatch.idEquipe2 ||
      !this.newMatch.idTerrain ||
      !this.newMatch.date
    ) {
      this.message = '❌ Tous les champs sont obligatoires.';
      this.alertType = 'error';
      setTimeout(() => {
        this.message = '';
      }, 5000);
      return;
    }
    if (this.newMatch.idEquipe1 === this.newMatch.idEquipe2) {
      alert("❌ Vous ne pouvez pas jouer un match avec deux fois la même équipe !");
      return;
    }
    this.matchService.createMatch(this.newMatch).subscribe({
      next: (createdMatch) => {
        if (createdMatch) {
          this.matches.push(createdMatch);  // Si l'objet est bien retourné
          console.log('save succées ', createdMatch);
          this.message = '✅ Terrain ajouté avec succès !';
          this.alertType = 'success';
          setTimeout(() => {
            this.message = '';
          }, 3000);
        } else {
          this.message = '❌ Erreur lors de l’ajout du match.';
          this.alertType = 'error';

          setTimeout(() => {
            this.message = '';
          }, 3000);
          this.loadMatches(); // Si rien n’est retourné, recharge depuis l’API
        }
        this.newMatch = {};
        this.showAddMatch = false;
        this.errorMessage = ''; // Réinitialise le message d’erreur si besoin
      },
      error: (err) => {
        console.error('Erreur lors de l’ajout du match', err);
        this.errorMessage = 'Erreur lors de l’ajout du match.';
      }
    });
  }


  closeAddMatch() {
    this.showAddMatch = false;
  }


  editMatch(match: any): void {
    this.editMode[match.id] = true;

    // Copier les données existantes dans editedMatch pour les modifier
    this.editedMatch[match.id] = { ...match };

    // Forcer la conversion de la date reçue (en string ISO) vers un format valide pour datetime-local
    const rawDate = new Date(match.date);
    const formattedDate = rawDate.toISOString().slice(0, 16);
    this.editedMatch[match.id].date = formattedDate;
  }



  // editMatch(match: any): void {
  //   this.editedMatch[match.id] = {
  //     idEquipe1: match.idEquipe1,
  //     idEquipe2: match.idEquipe2,
  //     idTerrain: match.idTerrain,
  //     date: match.date
  //   };

  // }


  loadMatches() {
    this.matchService.getAllMatches().subscribe({
      next: (data) => {
        this.matches = Array.isArray(data) ? data : [];
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('❌ Erreur de chargement des matchs', err);
        this.errorMessage = 'Erreur lors du chargement des matchs.';
      }
    });
  }

  saveMatch(id: number): void {
    const match = this.editedMatch[id];
    match.id = id;

    if (this.editedMatch[id].idEquipe1 === this.editedMatch[id].idEquipe2) {
      alert("❌ Vous ne pouvez pas jouer un match avec deux fois la même équipe !");
      return;
    }
    this.matchService.updateMatch(match.id, match).subscribe({
      next: () => {
        // Recharge les matchs à jour depuis le backend
        this.loadMatches();
        this.editMode[id] = false;
        this.message = '✅ Match modifié avec succès !';
        this.alertType = 'success';
        setTimeout(() => {
          this.message = '';
        }, 3000);
      },
      error: () => {
        this.message = '❌ Erreur lors de la modification du Match.';
        this.alertType = 'error';
        setTimeout(() => {
          this.message = '';
        }, 3000);
        this.errorMessage = 'Erreur lors de la sauvegarde du match.';
        console.error("erreur");

      }
    });
  }



  cancelEdit(id: number): void {
    this.editMode[id] = false;
    delete this.editedMatch[id];
  }

  loadEquipes(): void {
    this.equipeService.getAllEquipes().subscribe({
      next: (data) => {
        this.equipes = data;
        console.log('Équipes chargées :', this.equipes);
      },
      error: (err) => console.error('Erreur chargement équipes', err)
    });
  }

  loadTerrains(): void {
    this.terrainService.getAllTerrains().subscribe({
      next: (data) => {
        this.terrains = data;
        console.log("terrains", this.terrains);

      },
      error: (err) => console.error('Erreur chargement terrains', err)
    });
  }

  deleteMatch(id: string): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce match ?")) {
      this.matchService.deleteMatch(id).subscribe({
        next: () => {
          this.loadMatches();
          this.message = '✅ Match supprimé avec succès !';
          this.alertType = 'success';

          setTimeout(() => {
            this.message = '';
          }, 3000);
        },
        error: () => {
          this.message = '❌ Erreur lors de la suppression du Match.';
          this.alertType = 'error';
          setTimeout(() => {
            this.message = '';
          }, 3000);
          this.errorMessage = "Erreur lors de la suppression du match.";
          console.error("Erreur de suppression !");
        }
      });
    }
  }


}
