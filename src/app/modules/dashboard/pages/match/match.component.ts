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
import { AlertComponent } from "../alert/alert.component";
import { StatEquipesComponent } from "../stat-equipes/stat-equipes.component";
//import { PopupAlertComponent } from '../../../popup-alert/popup-alert.component'; // adapte le chemin

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [CommonModule,
    FormsModule, HttpClientModule, AlertComponent, StatEquipesComponent],
  templateUrl: './match.component.html',
  styleUrl: './match.component.scss'
})
export class MatchComponent implements OnInit {
matchsJoues: any;
  constructor(private matchService: MatchService,
    private equipeService: EquipeService,
    private terrainService: TerrainService,
    //private dialog: MatDialog // 💡 ajoute ça
  ) { }

  matches: any[] = [];  // Tableau pour stocker les matchs
  newMatch: Match = {} as Match
  showAddMatch: boolean = false
  today: string = ''

  equipes: Equipe[] = [];
  terrains: Terrain[] = [];
  errorMessage: string = '';
  editMode: { [key: string]: boolean } = {};
  editedMatch: { [key: string]: any } = {};

  message: string = '';
  alertType: 'success' | 'error' = 'success';

  //Pagination
  currentPage: number = 1;
  itemsPerPage: number = 5;

  ngOnInit(): void {
    this.today = new Date().toISOString()
    this.loadMatches();
    this.loadEquipes();
    this.loadTerrains();
  }

  cancelAddMatch() {
    this.newMatch = {} as Match;

    // Vérifiez les propriétés manquantes et initialisez-les si nécessaire
    if (!this.newMatch.matchJoue) {
      this.newMatch.matchJoue = false;  // Valeur par défaut pour matchJoue
    }
  }
  toggleAddMatch() {
    this.newMatch = {} as Match;
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
      !this.newMatch.startDate ||
      !this.newMatch.endDate
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

    console.log(this.newMatch);


    this.matchService.createMatch(this.newMatch).subscribe({
      next: (createdMatch) => {
        if (createdMatch) {
          this.matches.push(createdMatch);  // Si l'objet est bien retourné
          console.log('save succées ', createdMatch);
          this.message = '✅ Match ajouté avec succès !';
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
        this.newMatch = {} as Match;
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
    // Si match déjà joué ET scores renseignés, empêcher l'édition
    if (match.matchJoue && match.scoreEquipe1 !== null && match.scoreEquipe2 !== null) {
      alert("❌ Ce match a déjà été joué et ne peut plus être modifié !");
      return;
    }

    this.editMode[match.id] = true;

    // Copier les données existantes dans editedMatch pour les modifier
    this.editedMatch[match.id] = { ...match };

    const rawDate = new Date(match.date);
    const rawStartDate = new Date(match.startDate);
    const formattedStartDate = rawStartDate.toISOString().slice(0, 16);
    this.editedMatch[match.id].startDate = formattedStartDate;

    const rawEndDate = new Date(match.endDate);
    const formattedEndDate = rawEndDate.toISOString().slice(0, 16);
    this.editedMatch[match.id].endDate = formattedEndDate;

  }

  //partie statistique
  selectedMatch: any = null;

  openStats(match: any) {
    this.selectedMatch = match;
  }

  closeStats() {
    this.selectedMatch = null;
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

  saveMatch(id: string): void {
    const match = this.editedMatch[id];
    match.id = id;

    const champsManquants: string[] = [];
    if (!match.idEquipe1) champsManquants.push("Équipe 1");
    if (!match.idEquipe2) champsManquants.push("Équipe 2");
    if (!match.idTerrain) champsManquants.push("Terrain");
    if (!match.startDate) champsManquants.push("Date de début");
    if (!match.endDate) champsManquants.push("Date de fin");
    if (!match.type) champsManquants.push("Type");


    if (champsManquants.length > 0) {
      this.message = `❌ Les champs suivants sont obligatoires : ${champsManquants.join(", ")}.`;
      this.alertType = 'error';
      setTimeout(() => {
        this.message = '';
      }, 5000);
      return;
    }

    // Vérifier que les scores sont valides
    if (match.scoreEquipe1 == null || match.scoreEquipe1 < 0 || match.scoreEquipe2 == null || match.scoreEquipe2 < 0) {
      alert("❌ Les scores doivent être renseignés et positifs !");
      return;
    }

    if (match.cartonsJaunesEquipe1 != null && match.cartonsJaunesEquipe1 < 0 ||
      match.cartonsRougesEquipe1 != null && match.cartonsRougesEquipe1 < 0 ||
      match.cartonsJaunesEquipe2 != null && match.cartonsJaunesEquipe2 < 0 ||
      match.cartonsRougesEquipe2 != null && match.cartonsRougesEquipe2 < 0) {
      alert("❌ Les cartons (jaunes ou rouges) ne peuvent pas être négatifs !");
      return;
    }

    // Si un score est renseigné (différent de -1), on force matchJoue = true
    if (match.scoreEquipe1 !== null && match.scoreEquipe2 !== null) {
      match.matchJoue = true;
    }

    this.matchService.updateMatch(match.id, match).subscribe({
      next: () => {
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
        console.error("Erreur lors de la mise à jour du match.");
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

  getTerrainName(id: string): string {
    const terrain = this.terrains.find(t => t.id === id);
    return terrain ? terrain.name : 'Terrain Inexistant';
  }

  getEquipesName(id: string): string {
    const equipe = this.equipes.find(t => t.id === id);
    return equipe ? equipe.nameEquipe : 'Equipe Inexistante';
  }

  getEquipeLogo(idEquipe: string | number): string | null {
    const equipe = this.equipes.find(e => e.id === idEquipe);
    return equipe ? equipe.logo : null;
  }


  // Recherche
  searchMatchTerm: string = '';

  // Tri
  sortMatchColumn: string = '';
  sortMatchDirection: 'asc' | 'desc' = 'asc';

  get filteredMatches() {
    if (!this.searchMatchTerm) return this.matches;

    const term = this.searchMatchTerm.toLowerCase();
    return this.matches.filter(match =>
      this.getEquipesName(match.idEquipe1).toLowerCase().includes(term) ||
      this.getEquipesName(match.idEquipe2).toLowerCase().includes(term) ||
      this.getTerrainName(match.idTerrain).toLowerCase().includes(term) ||
      new Date(match.date).toLocaleDateString('fr-FR').toLowerCase().includes(term) ||
      match.scoreEquipe1.toString().includes(term) ||
      match.scoreEquipe2.toString().includes(term) ||
      (`${match.scoreEquipe1} - ${match.scoreEquipe2}`).includes(term)
    );
  }


  get totalPages(): number {
    return Math.ceil(this.filteredMatches.length / this.itemsPerPage);
  }

  get displayedMatches() {
    let arr = [...this.filteredMatches];

    // Tri
    if (this.sortMatchColumn) {
      arr.sort((a, b) => {
        let valA: string | number, valB: string | number;

        switch (this.sortMatchColumn) {
          case 'equipe1':
            valA = this.getEquipesName(a.idEquipe1).toLowerCase();
            valB = this.getEquipesName(b.idEquipe1).toLowerCase();
            break;

          case 'equipe2':
            valA = this.getEquipesName(a.idEquipe2).toLowerCase();
            valB = this.getEquipesName(b.idEquipe2).toLowerCase();
            break;

          case 'terrain':
            valA = this.getTerrainName(a.idTerrain).toLowerCase();
            valB = this.getTerrainName(b.idTerrain).toLowerCase();
            break;

          case 'date':
            valA = new Date(a.date).getTime();
            valB = new Date(b.date).getTime();
            break;

          case 'score':
            valA = a.scoreEquipe1 * 10000 + a.scoreEquipe2;
            valB = b.scoreEquipe1 * 10000 + b.scoreEquipe2;
            break;

          default:
            valA = ''; valB = '';
        }

        if (valA < valB) return this.sortMatchDirection === 'asc' ? -1 : 1;
        if (valA > valB) return this.sortMatchDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // Pagination 
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return arr.slice(startIndex, endIndex);
  }


  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }


  //tri
  sortMatchesBy(column: string) {
    if (this.sortMatchColumn !== column) {
      this.sortMatchColumn = column;
      this.sortMatchDirection = 'asc';
    } else if (this.sortMatchDirection === 'asc') {
      this.sortMatchDirection = 'desc';
    } else {
      this.sortMatchColumn = '';
      this.sortMatchDirection = 'asc';
    }
  }

  getMatchSortIcon(column: string): string {
    if (this.sortMatchColumn === column) {
      return this.sortMatchDirection === 'asc' ? '⬆️' : '⬇️';
    }
    return '⇅';
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
