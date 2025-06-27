import { Component, OnInit } from '@angular/core';
import { Match } from '../../models/match.model';
import { Terrain } from '../../models/terrain.model';
import { Equipe } from '../../models/equipe.model';
import { MatchService } from '../../services/match.service';
import { TerrainService } from '../../services/terrain.service';
import { EquipeService } from '../../services/equipe.service';
import { UserService } from '../../services/user.service';

import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-session-list',
  templateUrl: './liste-session.component.html',
  styleUrls: ['./liste-session.component.scss']
})
export class SessionListComponent implements OnInit {

  match: Match[] = [];
  terrains: Terrain[] = [];
  equipes: Equipe[] = [];

  dateDebut: string = '';
  dateFin: string = '';
  type: string = '';
  resultatsDisponibles: boolean | null = null;

  selectedEquipeId: string = '';
  choixEquipe1 = false;
  choixEquipe2 = false;
  sessionSelectionnee!: Match;
  openPopUp = false;
  today: string = '';

  afficherFormulaireCreation = false;
  equipeCibleNom: string = ''; // ← Ajouté ici

  nouvelleSession = {
    startDate: '',
    endDate: '',
    idTerrain: '',
    type: '',
    idEquipe1: '',
    idEquipe2: '',
    scoreEquipe1: 0,
    scoreEquipe2: 0,
  };

  constructor(
    private matchService: MatchService,
    private terrainService: TerrainService,
    private equipeService: EquipeService,
    private authservice: UserService,

    private router: Router
  ) { }

  ngOnInit(): void {
    this.today = new Date().toISOString().split("T")[0];
    this.loadTerrains();
    this.loadEquipes();
    this.loadAllMatches();
  }

  loadAllMatches(): void {
    this.matchService.getAllMatches().subscribe((data) => {
      this.match = data.map(match => ({
        ...match,
        startDate: new Date(match.startDate),
        endDate: new Date(match.endDate),
      }));

      console.log('Matchs avec équipes:', this.match);  // <-- vérifier ici

      this.resultatsDisponibles = null;
    });
  }

  loadTerrains(): void {
    this.terrainService.getAllTerrains().subscribe((data: Terrain[]) => {
      this.terrains = data;
    });
  }

  loadEquipes(): void {
    this.equipeService.getAllEquipes().subscribe((data: Equipe[]) => {
      this.equipes = data;
    });
  }

  getNomTerrain(id: string): string {
    const terrain = this.terrains.find(t => t.id.toString().trim() === id?.toString().trim());
    return terrain ? terrain.name : 'Inconnu';
  }

  getNomEquipe(id?: string): string {
    const equipe = this.equipes.find(e => e.id?.toString().trim() === id?.toString().trim());
    return equipe ? equipe.nameEquipe : 'Inconnue';
  }

  searchMatchs(): void {
    if (this.dateDebut && this.dateFin && this.type) {
      this.match = [];
      this.resultatsDisponibles = null;

      const dateDebutISO = new Date(this.dateDebut).toISOString().split('T')[0];
      const dateFinISO = new Date(this.dateFin).toISOString().split('T')[0];

      this.matchService.searchMatchs(dateDebutISO, dateFinISO, this.type).subscribe({
        next: (data) => {
          this.match = data.map(match => ({
            ...match,
            startDate: new Date(match.startDate),
            endDate: new Date(match.endDate),
            equipe1: this.equipes.find(e => e.id === match.idEquipe1),
            equipe2: this.equipes.find(e => e.id === match.idEquipe2),
          }));


          this.resultatsDisponibles = this.match.length > 0;
        },
        error: (err) => {
          alert("Erreur lors de la recherche : " + (err?.message || err));
        }
      });
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  }

  resetSearch(): void {
    this.dateDebut = '';
    this.dateFin = '';
    this.type = '';
    this.resultatsDisponibles = null;
    this.loadAllMatches();
  }

  creerSession(): void {
    this.afficherFormulaireCreation = true;
  }

  annulerCreation(): void {
    this.afficherFormulaireCreation = false;
    this.nouvelleSession = {
      startDate: '',
      endDate: '',
      idTerrain: '',
      type: '',
      idEquipe1: '',
      idEquipe2: '',
      scoreEquipe1: 0,
      scoreEquipe2: 0
    };
  }

  confirmerCreation(): void {
    const nouvelleSessionObj: Match = {
      id: '',
      startDate: new Date(this.nouvelleSession.startDate),
      endDate: new Date(this.nouvelleSession.endDate),
      type: this.nouvelleSession.type,
      idTerrain: this.nouvelleSession.idTerrain,
      idEquipe1: this.nouvelleSession.idEquipe1,
      idEquipe2: this.nouvelleSession.idEquipe2,
      scoreEquipe1: Number(this.nouvelleSession.scoreEquipe1),
      scoreEquipe2: Number(this.nouvelleSession.scoreEquipe2),
      matchJoue: false
    };

    this.matchService.createMatch(nouvelleSessionObj).subscribe({
      next: () => {
        alert('Session créée avec succès !');
        this.afficherFormulaireCreation = false;
        this.loadAllMatches();
      },
      error: (err) => {
        alert("Erreur lors de la création de la session : " + (err?.message || err));
      }
    });
  }

  openDetails(session: Match): void {
    const user = window.sessionStorage.getItem('auth-user'); // 🔁 Utilise ton vrai système d’auth
    const userId = user ? JSON.parse(user).id : null;

    console.log(userId);

    this.authservice.getAllUsers().subscribe((joueurs: User[]) => {

      const joueursEquipe1 = joueurs

        .filter((u: User) => u.equipeId === session.idEquipe1)
        .map((u: User) => u.iduser);

      const joueursEquipe2 = joueurs
        .filter((u: User) => u.equipeId === session.idEquipe2)
        .map((u: User) => u.iduser
        );


      const dejaInscrit = joueursEquipe1.includes(userId!) || joueursEquipe2.includes(userId!);
      console.log(window.sessionStorage);
      console.log(joueursEquipe1.includes(userId!))
      console.log(joueursEquipe2.includes(userId!))
      if (dejaInscrit) {
        alert("❌ Vous êtes déjà inscrit à cette session !");
        return;
      }
      else {
        this.sessionSelectionnee = session;
        this.openPopUp = true;
        this.choixEquipe1 = false;
        this.choixEquipe2 = false;
      }
    })
  }


  rejoindre(session: Match): void {
    const idEquipe1 = session.idEquipe1;
    const idEquipe2 = session.idEquipe2;

    const nbJoueursEquipe1 = session.joueurInscrit1 || 0;
    const nbJoueursEquipe2 = session.joueurInscrit2 || 0;

    const user = window.sessionStorage.getItem('auth-user'); // 🔁 Utilise ton vrai système d’auth
    const userId = user ? JSON.parse(user).id : null;

    console.log(userId);

    this.authservice.getAllUsers().subscribe((joueurs: User[]) => {

      const joueursEquipe1 = joueurs

        .filter((u: User) => u.equipeId === session.idEquipe1)
        .map((u: User) => u.iduser);

      const joueursEquipe2 = joueurs
        .filter((u: User) => u.equipeId === session.idEquipe2)
        .map((u: User) => u.iduser
        );


      const dejaInscrit = joueursEquipe1.includes(userId!) || joueursEquipe2.includes(userId!);
      console.log(window.sessionStorage);
      console.log(joueursEquipe1.includes(userId!))
      console.log(joueursEquipe2.includes(userId!))

      if (dejaInscrit) {
        alert("❌ Vous êtes déjà inscrit à cette session !");
        return;
      }
      else {
        let equipeCibleId: string = '';
        this.equipeCibleNom = ''; // reset

        if (nbJoueursEquipe1 < 11) {
          equipeCibleId = idEquipe1;
        } else if (nbJoueursEquipe2 < 11) {
          equipeCibleId = idEquipe2;
        } else {
          alert("Les deux équipes sont complètes !");
          return;
        }

        const equipe = this.equipes.find(e => e.id === equipeCibleId);
        this.equipeCibleNom = equipe ? equipe.nameEquipe : 'Inconnue';

        const confirmation = window.confirm(`Voulez-vous vous inscrire dans l'équipe ${this.equipeCibleNom} ?`);
        if (!confirmation) return;

        this.matchService.rejoindreSession(session.id!, equipeCibleId).subscribe({

          next: () => {
            alert(`Inscription réussie à l'équipe ${this.equipeCibleNom} !`);
            this.router.navigate(['/dashboard/nfts']);
          },
          error: (err) => {
            alert("Erreur lors de l'inscription : " + (err?.message || err));
          }
        });
      }

    });
  }


  closePopup(): void {
    this.openPopUp = false;
  }

  confirmerRejoindre(): void {
    let idSelected: string | null = null;

    if (this.choixEquipe1) {
      idSelected = this.sessionSelectionnee?.idEquipe1 ?? null;
    } else if (this.choixEquipe2) {
      idSelected = this.sessionSelectionnee?.idEquipe2 ?? null;
    }

    if (this.sessionSelectionnee?.id && idSelected) {
      const equipe = this.equipes.find(e => e.id === idSelected);
      this.equipeCibleNom = equipe ? equipe.nameEquipe : 'Inconnue';

      this.matchService.rejoindreSession(this.sessionSelectionnee.id, idSelected).subscribe({
        next: () => {
          alert(`Inscription réussie à l'équipe ${this.equipeCibleNom} !`);
          this.router.navigate(['/dashboard/nfts']);
          this.closePopup();
        },
        error: (err) => {
          alert("Erreur lors de l'inscription : " + (err?.message || err));
        }
      });
    } else {
      alert("Veuillez sélectionner une équipe.");
    }
  }

  getEmojiTypeMatch() {
    if (this.type === 'foot') return '⚽';
    if (this.type === 'hand') return '🤾';
    return '🏅';
  }
}
