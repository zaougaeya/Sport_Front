import { Component , OnInit } from '@angular/core';
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
//import { MatDialog, MatDialogModule } from '@angular/material/dialog';
//import { PopupAlertComponent } from '../../../popup-alert/popup-alert.component'; // adapte le chemin

@Component({
  selector: 'app-match',
  standalone: true,
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
  imports: [CommonModule, HttpClientModule, FormsModule, NameEquipePipe,
    Nameterrainpipe,],
})
export class MatchComponent implements OnInit {
  constructor(private matchService: MatchService,
    private equipeService: EquipeService,
  private terrainService: TerrainService,
  //private dialog: MatDialog // 💡 ajoute ça
  ) {}

  matches: any[] = [];  // Tableau pour stocker les matchs
  newMatch : Match = {}
  showAddMatch : boolean = false

  equipes: Equipe[] = [];
  terrains: Terrain[] = [];
  errorMessage: string = '';
  editMode: { [key: number]: boolean } = {};
  editedMatch: { [key: number]: any } = {};

  ngOnInit(): void {
    this.loadMatches();
    this.loadEquipes();
    this.loadTerrains();
  }
  
  cancelAddMatch(){this.newMatch = {};}
  toggleAddMatch(){this.newMatch = {};
                   this.showAddMatch = true;}

                  
 onAddMatch() {
  if (this.newMatch.idEquipe1 === this.newMatch.idEquipe2) {
    alert("❌ Vous ne pouvez pas jouer un match avec deux fois la même équipe !");
    return;
  }  
        this.matchService.createMatch(this.newMatch).subscribe({
         next: (createdMatch) => {
            if (createdMatch) {
            this.matches.push(createdMatch);  // Si l'objet est bien retourné
            } else {
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
    this.editedMatch[match.id] = {
      equipe1: match.equipe1,
      equipe2: match.equipe2,
      terrain: match.terrain,
      date: match.date
    };
  }


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

    this.matchService.updateMatch(match.id,match).subscribe({
      next: () => {
        // Recharge les matchs à jour depuis le backend
        this.loadMatches();
        this.editMode[id] = false;
        
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la sauvegarde du match.';
      }
    });
  }



  cancelEdit(id: number): void {
    this.editMode[id] = false;
    delete this.editedMatch[id];
  }
  
  loadEquipes(): void {
    this.equipeService.getAllEquipes().subscribe({
      next: (data) => this.equipes = data,
      error: (err) => console.error('Erreur chargement équipes', err)
    });
  }
  loadTerrains(): void {
    this.terrainService.getAllTerrains().subscribe({
      next: (data) => this.terrains = data,
      error: (err) => console.error('Erreur chargement terrains', err)
    });
  }

}
