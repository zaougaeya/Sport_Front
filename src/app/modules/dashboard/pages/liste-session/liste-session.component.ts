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

  resultatsDisponibles: boolean | null = null; // null = pas encore recherché
  selectedEquipeId: string = '';
  choixEquipe1 = false;
  choixEquipe2 = false;
  sessionSelectionnee: any;
  openPopUp = false


  constructor(
    private sessionService: ListeSessionService,
    private terrainService: TerrainService,
    private equipeService: EquipeService
  ) { }


  ngOnInit(): void {
    // this.loadAllSessions();
    this.loadTerrains();
    this.loadEquipes();
  }

  loadAllSessions(): void {
    this.sessionService.getAllSessions().subscribe((data) => {
      this.sessions = data.map(session => ({
        ...session,
        startDate: new Date(session.startDate),
        endDate: new Date(session.endDate),
      }));
      this.resultatsDisponibles = null;
      console.log('Sessions converties avec Date:', this.sessions);
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
    if (!id) return 'Inconnu';
    const terrain = this.terrains.find(t => t.id.toString().trim() === id.toString().trim());
    return terrain ? terrain.name : 'Inconnu';
  }

  getNomEquipe(id?: string): string {
    if (!id) return 'Inconnue';
    const equipe = this.equipes.find(e => e.id?.toString().trim() === id.toString().trim());
    return equipe ? equipe.nameEquipe : 'Inconnue';
  }


  searchSessions(): void {
    if (this.dateDebut && this.dateFin && this.typeMatch) {
      // Vider la liste avant de lancer la recherche
      this.sessions = [];
      this.resultatsDisponibles = null;
      const dateDebutISO = new Date(this.dateDebut).toString(); // format ISO avec heure
      const dateFinISO = new Date(this.dateFin).toString();

      console.log('dateDebut ISO:', new Date(this.dateDebut).toISOString());
      console.log('dateFin ISO:', new Date(this.dateFin).toISOString());
      console.log("this.dateDebut:", this.dateDebut); // Devrait afficher 2025-05-29T14:30
      console.log("this.dateFin:", this.dateFin);     // Devrait afficher 2025-05-29T16:30

      console.log("Avant appel API:");
      console.log("Date début envoyée:", this.dateDebut);
      console.log("Date fin envoyée:", this.dateFin);

      const dateTESTDebut = this.toDatetimeLocalString(new Date(this.dateDebut))
      const dateTESTFin = this.toDatetimeLocalString(new Date(this.dateFin))


      console.log(`Recherche sessions entre ${dateTESTDebut} et ${dateTESTFin} pour typeMatch=${this.typeMatch}`);

      this.sessionService
        .searchSessions(dateTESTDebut, dateTESTFin, this.typeMatch)
        .subscribe({
          next: (data) => {
            console.log("Résultat reçu du backend:", data);
            this.sessions = data.map(session => ({
              ...session,
              startDate: new Date(session.startDate),
              endDate: new Date(session.endDate),
            }));
            this.resultatsDisponibles = this.sessions.length > 0;
          },
          error: (err) => {
            console.error("Erreur lors de la recherche:", err);
            alert("Une erreur est survenue lors de la recherche. Détail : " + (err?.message || err));

          }
        });
    } else {
      alert('Veuillez remplir tous les champs.');
    }

  }

  toDatetimeLocalString(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }




  resetSearch(): void {
    this.dateDebut = '';
    this.dateFin = '';
    this.typeMatch = '';
    this.resultatsDisponibles = null;
    this.loadAllSessions();
  }

  creerSession(): void {
    // Redirection à adapter selon le routeur (Angular Router)
    console.log('Redirection vers page création session');
    // ex: this.router.navigate(['/creer-session']);
  }


  openDetails(session: SessionDeJeu): void {
    this.sessionSelectionnee = session;
    this.openPopUp = true;
    this.choixEquipe1 = false;
    this.choixEquipe2 = false;
  }

  rejoindre(session: SessionDeJeu) {
    console.log("SESSION ", session);

  }


  closePopup(): void {
    this.openPopUp = false;
  }

  confirmerRejoindre(): void {
    //rEJOINDRE EQUIPE 
    var idSelected = null
    if (this.choixEquipe1) {
      idSelected = this.sessionSelectionnee?.idEquipe1
    } else if (this.choixEquipe2) {
      idSelected = this.sessionSelectionnee?.idEquipe2
    } 


    this.sessionService
      .rejoindreSession(this.sessionSelectionnee?.id, idSelected)
      .subscribe({
        next: (data) => {
          console.error("succes:");

        },
        error: (err) => {
          console.error("Erreur lors de la recherche:", err);
          alert("Une erreur est survenue lors de la recherche. Détail : " + (err?.message || err));

        }
      });
  }


}
