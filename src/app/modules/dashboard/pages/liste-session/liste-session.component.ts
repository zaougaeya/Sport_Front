import { Component, OnInit } from '@angular/core';
import { SessionDeJeu } from '../../models/SessionDejeu';
import { ListeSessionService } from '../../services/liste-session.service';
import { Terrain } from '../../models/terrain.model';
import { TerrainService } from '../../services/terrain.service';
import { Equipe } from '../../models/equipe.model';
import { EquipeService } from '../../services/equipe.service';

@Component({
  selector: 'app-session-list',
  templateUrl: './liste-session.component.html',
  styleUrls: ['./liste-session.component.scss']
})
export class SessionListComponent implements OnInit {
  sessions: SessionDeJeu[] = [];
  terrains: Terrain[] = [];
  equipes: Equipe[] = [];

  dateDebut: string = '';
  dateFin: string = '';
  typeMatch: string = '';

  resultatsDisponibles: boolean | null = null;
  selectedEquipeId: string = '';
  choixEquipe1 = false;
  choixEquipe2 = false;
  sessionSelectionnee: SessionDeJeu | null = null;
  openPopUp = false;

  afficherFormulaireCreation = false;

  nouvelleSession = {
    startDate: '',
    endDate: '',
    terrainId: '',
    typeMatch: '',
    maxJoueurs: 22,
    idEquipe1: '',
    idEquipe2: '',
    joueursInscrits: 0,
    statut: 'ouverte'
  };

  constructor(
    private sessionService: ListeSessionService,
    private terrainService: TerrainService,
    private equipeService: EquipeService
  ) {}

  ngOnInit(): void {
    this.loadTerrains();
    this.loadEquipes();
    this.loadAllSessions();
  }

  loadAllSessions(): void {
    this.sessionService.getAllSessions().subscribe((data) => {
      this.sessions = data.map(session => ({
        ...session,
        startDate: new Date(session.startDate),
        endDate: new Date(session.endDate),
      }));
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

  searchSessions(): void {
    if (this.dateDebut && this.dateFin && this.typeMatch) {
      this.sessions = [];
      this.resultatsDisponibles = null;
      const dateDebutISO = this.toDatetimeLocalString(new Date(this.dateDebut));
      const dateFinISO = this.toDatetimeLocalString(new Date(this.dateFin));

      this.sessionService.searchSessions(dateDebutISO, dateFinISO, this.typeMatch).subscribe({
        next: (data) => {
          this.sessions = data.map(session => ({
            ...session,
            startDate: new Date(session.startDate),
            endDate: new Date(session.endDate),
          }));
          this.resultatsDisponibles = this.sessions.length > 0;
        },
        error: (err) => {
          alert("Erreur lors de la recherche : " + (err?.message || err));
        }
      });
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  }

  toDatetimeLocalString(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  resetSearch(): void {
    this.dateDebut = '';
    this.dateFin = '';
    this.typeMatch = '';
    this.resultatsDisponibles = null;
    this.loadAllSessions();
  }

  creerSession(): void {
    this.afficherFormulaireCreation = true;
  }

  annulerCreation(): void {
    this.afficherFormulaireCreation = false;
    this.nouvelleSession = {
      startDate: '',
      endDate: '',
      terrainId: '',
      typeMatch: '',
      maxJoueurs: 22,
      idEquipe1: '',
      idEquipe2: '',
      joueursInscrits: 0,
      statut: 'ouverte'
    };
  }

  confirmerCreation(): void {
    const nouvelleSessionObj: SessionDeJeu = {
      nom: '', // à compléter si nécessaire
      equipe1Joueurs: [],
      id: '',
      startDate: new Date(this.nouvelleSession.startDate),
      endDate: new Date(this.nouvelleSession.endDate),
      typeMatch: this.nouvelleSession.typeMatch,
      terrainId: this.nouvelleSession.terrainId,
      idEquipe1: this.nouvelleSession.idEquipe1,
      idEquipe2: this.nouvelleSession.idEquipe2,
      maxJoueurs: this.nouvelleSession.maxJoueurs,
      joueursInscrits: this.nouvelleSession.joueursInscrits || 0,
      joueurs: [],
      statut: this.nouvelleSession.statut || 'ouverte'
    };

    this.sessionService.createSession(nouvelleSessionObj).subscribe({
      next: () => {
        alert('Session créée avec succès !');
        this.afficherFormulaireCreation = false;
        this.loadAllSessions();
      },
      error: (err) => {
        alert("Erreur lors de la création de la session : " + (err?.message || err));
      }
    });
  }

  openDetails(session: SessionDeJeu): void {
    this.sessionSelectionnee = session;
    this.openPopUp = true;
    this.choixEquipe1 = false;
    this.choixEquipe2 = false;
  }

  rejoindre(session: SessionDeJeu): void {
    // À implémenter selon logique métier
  }

  closePopup(): void {
    this.openPopUp = false;
  }

  confirmerRejoindre(): void {
    let idSelected: string | null = null;
    if (this.choixEquipe1) idSelected = this.sessionSelectionnee?.idEquipe1 ?? null;
    if (this.choixEquipe2) idSelected = this.sessionSelectionnee?.idEquipe2 ?? null;

    if (this.sessionSelectionnee?.id && idSelected) {
      this.sessionService.rejoindreSession(this.sessionSelectionnee.id, idSelected).subscribe({
        next: () => {
          alert("Inscription réussie !");
        },
        error: (err) => {
          alert("Erreur lors de l'inscription : " + (err?.message || err));
        }
      });
    } else {
      alert("Veuillez sélectionner une équipe.");
    }
  }
}
