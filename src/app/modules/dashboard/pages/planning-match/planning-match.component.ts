import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  DayPilot,
  DayPilotCalendarComponent,
  DayPilotModule,
  DayPilotMonthComponent,
  DayPilotNavigatorComponent
} from '@daypilot/daypilot-lite-angular';
import { MatchService } from '../../services/match.service';
import { Match } from '../../models/match.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Terrain } from '../../models/terrain.model';
import { Equipe } from '../../models/equipe.model';
import { EquipeService } from '../../services/equipe.service';
import { TerrainService } from '../../services/terrain.service';

@Component({
  selector: 'app-planning-match',
  templateUrl: './planning-match.component.html',
  styleUrls: ['./planning-match.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, DayPilotModule]
})
export class PlanningMatchComponent implements AfterViewInit {
  @ViewChild('day') day!: DayPilotCalendarComponent;
  @ViewChild('week') week!: DayPilotCalendarComponent;
  @ViewChild('month') month!: DayPilotMonthComponent;
  @ViewChild('navigator') nav!: DayPilotNavigatorComponent;

  matches: any[] = [];
  events: DayPilot.EventData[] = [];
  date = DayPilot.Date.today();

  terrains: Terrain[] = [];
  equipes: Equipe[] = [];

  isFormVisible = false;
  newMatch: Match = {
    startDate: new Date(),
    endDate: new Date(),
    type: '',
    matchJoue: false
  };

  currentView: 'day' | 'week' | 'month' = 'day';

  // Ajoutez cette propriété pour configurer le navigator
  configNavigator: DayPilot.NavigatorConfig = {
    showMonths: 3,
    selectMode: 'Month',
    onVisibleRangeChanged: (args: any) => {
      this.changeDate(args.date);
    }
  };


  constructor(
    private matchService: MatchService,
    private equipeService: EquipeService,
    private terrainService: TerrainService
  ) { }

  ngAfterViewInit(): void {
    this.loadMatches();
    this.loadEquipes();
    this.loadTerrains();

    this.configDay.visible = true;
    this.configWeek.visible = false;
    this.configMonth.visible = false;
  }

  loadMatches(): void {
    this.matchService.getAllMatches().subscribe({
      next: (data) => {
        this.matches = Array.isArray(data) ? data : [];
        this.loadMatchesAsEvents();
      },
      error: (err) => console.error('Erreur de chargement des matchs', err)
    });
  }

  loadMatchesAsEvents(): void {
    this.events = this.matches.map((match) => ({
      id: match.id,
      start: new DayPilot.Date(match.startDate),
      end: new DayPilot.Date(match.endDate),
      text: match.type || 'Match', // Titre de l'événement (type de match)
      backColor: match.matchJoue ? '#2ecc71' : '#e74c3c', // Couleur de fond en fonction du statut du match
      tooltip: `Match: ${match.type}\nÉquipe 1: ${match.equipe1?.nom}\nÉquipe 2: ${match.equipe2?.nom}\nTerrain: ${match.terrain?.nom}`, // Détails supplémentaires
    }));
  }

//chargement du nouveau match dans le calendrier 
  onSubmit(): void {
    const matchToAdd: Match = {
      ...this.newMatch,
      id: Date.now().toString(),
      equipe1: this.equipes.find((equipe) => equipe.id === this.newMatch.idEquipe1),
      equipe2: this.equipes.find((equipe) => equipe.id === this.newMatch.idEquipe2),
      terrain: this.terrains.find((terrain) => terrain.id === this.newMatch.idTerrain)
    };

    if (!matchToAdd.id) {
      console.error('Le match doit avoir un ID valide.');
      return;
    }

    const startDate = new DayPilot.Date(matchToAdd.startDate);
    const endDate = new DayPilot.Date(matchToAdd.endDate);



    this.day.control.events.add({
      id: matchToAdd.id,
      start: new DayPilot.Date(startDate),
      end: new DayPilot.Date(endDate),
      text: matchToAdd.type,
      backColor: '#00ff00'
    });

    this.matchService.createMatch(matchToAdd).subscribe(() => {
      // this.isFormVisible = false;
      this.loadMatches();
    });
  }

  get formattedEndDate(): string {
    return new Date(this.newMatch.endDate).toISOString().slice(0, 16);
  }


  async onTimeRangeSelected(args: any) {
    const form = [
      {
        name: "Type du Match",
        id: "type",
        type: "select",
        options: [
          { name: "-- Sélectionner --", id: "" },
          { name: "Football", id: "foot" },
          { name: "Handball", id: "hand" },
          { name: "Basketball", id: "basket" }
        ]
      },
      { name: "Début", id: "startDate", type: "datetime", dateFormat: "yyyy-MM-ddTHH:mm" },
      { name: "Fin", id: "endDate", type: "datetime", dateFormat: "yyyy-MM-ddTHH:mm" },
      {
        name: "Équipe 1",
        id: "idEquipe1",
        type: "select",
        options: [
          { name: "-- Sélectionner --", id: "" },
          ...this.equipes
            .filter(e => e.id !== undefined)
            .map(e => ({ name: e.nameEquipe, id: e.id as string }))
        ]
      },
      {
        name: "Équipe 2",
        id: "idEquipe2",
        type: "select",
        options: [
          { name: "-- Sélectionner --", id: "" },
          ...this.equipes
            .filter(e => e.id !== undefined)
            .map(e => ({ name: e.nameEquipe, id: e.id as string }))
        ]
      },
      {
        name: "Terrain",
        id: "idTerrain",
        type: "select",
        options: [
          { name: "-- Sélectionner --", id: "" },
          ...this.terrains
            .filter(t => t.id !== undefined)
            .map(t => ({ name: t.name, id: t.id as string }))
        ]
      },
      { name: "Match joué ?", id: "matchJoue", type: "checkbox" }
    ];

    const defaultData = {
      type: "",
      idEquipe2: "",
      idEquipe1: "",
      idTerrain: "",
      startDate: args.start.toString(),
      endDate: args.end.toString(),
      matchJoue: false,
      scoreEquipe1: null, // Ajouter les valeurs par défaut des scores
      scoreEquipe2: null  // Ajouter les valeurs par défaut des scores
    };

    const modal = await DayPilot.Modal.form(form, defaultData);

    args.control.clearSelection();

    if (modal.canceled) return;

    const data = modal.result;

    // Vérification que les champs obligatoires ne sont pas vides
    if (!data.idEquipe1 || !data.idEquipe2 || !data.idTerrain || !data.startDate || !data.endDate) {
      alert("Tous les champs (équipe, terrain et dates) sont obligatoires !");
      return; // Ne pas poursuivre la création du match
    }

    // Conversion des dates
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    // Vérification de la différence entre startDate et endDate
    const diffInMilliseconds = endDate.getTime() - startDate.getTime();
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);  // Convertir la différence en heures

    // Vérification si startDate est supérieur à endDate
    if (startDate > endDate) {
      alert("La date début ne peut pas être supérieure à la date du fin.");
      return;  // Ne pas poursuivre la création du match
    }

    if (diffInHours > 3) {
      alert("La différence entre l'heure de début et de fin ne doit pas dépasser 3 heures.");
      return;  // Ne pas poursuivre la création du match
    }

    const matchToAdd: Match = {
      id: DayPilot.guid(),
      startDate,
      endDate,
      type: data.type,
      idEquipe1: data.idEquipe1,
      idEquipe2: data.idEquipe2,
      idTerrain: data.idTerrain,
      equipe1: this.equipes.find(e => e.id === data.idEquipe1),
      equipe2: this.equipes.find(e => e.id === data.idEquipe2),
      terrain: this.terrains.find(t => t.id === data.idTerrain),
      matchJoue: data.matchJoue,
      scoreEquipe1: data.scoreEquipe1,  // Assurez-vous que les scores sont définis ici
      scoreEquipe2: data.scoreEquipe2   // Même chose ici
    };

    // Ajouter visuellement au calendrier
    args.control.events.add({
      id: matchToAdd.id,
      start: new DayPilot.Date(matchToAdd.startDate),
      end: new DayPilot.Date(matchToAdd.endDate),
      text: matchToAdd.type,
      backColor: matchToAdd.matchJoue ? "#2ecc71" : "#e74c3c",
      equipe1: matchToAdd.equipe1,
      equipe2: matchToAdd.equipe2,
      terrain: matchToAdd.terrain
    });

    // Sauvegarder dans la base
    this.matchService.createMatch(matchToAdd).subscribe(() => {
      this.loadMatches(); // Recharge les données pour être sûr que tout est à jour
    });
  }



  loadEquipes(): void {
    this.equipeService.getAllEquipes().subscribe({
      next: (data) => {
        this.equipes = data;
      },
      error: (err) => console.error('Erreur chargement équipes', err)
    });
  }

  loadTerrains(): void {
    this.terrainService.getAllTerrains().subscribe({
      next: (data) => {
        this.terrains = data;
      },
      error: (err) => console.error('Erreur chargement terrains', err)
    });
  }

  changeDate(date: DayPilot.Date): void {
    this.configDay.startDate = date;
    this.configWeek.startDate = date;
    this.configMonth.startDate = date;
  }

  viewDay(): void {
    this.currentView = 'day';
    this.updateView();
  }

  viewWeek(): void {
    this.currentView = 'week';
    this.updateView();
  }

  viewMonth(): void {
    this.currentView = 'month';
    this.updateView();
  }

  updateView(): void {
    this.configDay.visible = this.currentView === 'day';
    this.configWeek.visible = this.currentView === 'week';
    this.configMonth.visible = this.currentView === 'month';
  }

  configDay: DayPilot.CalendarConfig = {
    durationBarVisible: false,
    onTimeRangeSelected: this.onTimeRangeSelected.bind(this),
     onEventClick: (args: any) => {
      // Exemple de popup avec les détails du match
      const match = this.matches.find(m => m.id === args.e.id);
      if (match) {
        alert(`Détails du Match:\nType: ${match.type}\nÉquipe 1: ${match.equipe1?.nom}\nÉquipe 2: ${match.equipe2?.nom}\nTerrain: ${match.terrain?.nom}`);
      }
    },
  };


  configWeek: DayPilot.CalendarConfig = {
    viewType: 'Week',
    durationBarVisible: false,
    onTimeRangeSelected: this.onTimeRangeSelected.bind(this),
    onEventClick: this.onEventClick.bind(this),
    onBeforeEventRender: this.onBeforeEventRender.bind(this),

    visible: false
  };


  configMonth: DayPilot.MonthConfig = {
    visible: false,
    eventBarVisible: false,
    onTimeRangeSelected: this.onTimeRangeSelected.bind(this),
    onEventClick: this.onEventClick.bind(this),
  };

  onBeforeEventRender(args: any) {
    const dp = args.control;
    args.data.areas = [
      {
        top: 3,
        right: 3,
        width: 20,
        height: 20,
        symbol: "/icons/daypilot.svg#minichevron-down-2",
        fontColor: "#fff",
        toolTip: "Menu",
        action: "ContextMenu",
      },
      {
        top: 3,
        right: 25,
        width: 20,
        height: 20,
        symbol: "/icons/daypilot.svg#x-circle",
        fontColor: "#fff",
        toolTip: "Supprimer le match",
        action: "None",
        onClick: async (args: any) => {
          dp.events.remove(args.source);
        }
      }
    ];
  }

  async onEventClick(args: any) {
    // Création du formulaire avec les champs à modifier
    
    const form = [
      { name: "Type", id: "type" },
      { name: "Début", id: "startDate", type: "datetime", dateFormat: "yyyy-MM-ddTHH:mm" },
      { name: "Fin", id: "endDate", type: "datetime", dateFormat: "yyyy-MM-ddTHH:mm" },
      
      {
        name: "Couleur", id: "backColor", type: "select", options: [
          { name: "Rouge", id: "#e74c3c" },
          { name: "Vert", id: "#2ecc71" },
          { name: "Bleu", id: "#3498db" }
        ]
      },
      {
        name: "Équipe 1",
        id: "idEquipe1",
        type: "select",
        options: [
          { name: "-- Sélectionner --", id: "" },
          ...this.equipes
            .filter(e => e.id !== undefined)
            .map(e => ({ name: e.nameEquipe, id: e.id as string }))
        ]
      },
      {
        name: "Équipe 2",
        id: "idEquipe2",
        type: "select",
        options: [
          { name: "-- Sélectionner --", id: "" },
          ...this.equipes
            .filter(e => e.id !== undefined)
            .map(e => ({ name: e.nameEquipe, id: e.id as string }))
        ]
      },
      {
        name: "Terrain",
        id: "idTerrain",
        type: "select",
        options: [
          { name: "-- Sélectionner --", id: "" },
          ...this.terrains
            .filter(t => t.id !== undefined)
            .map(t => ({ name: t.name, id: t.id as string }))
        ]
      }
    ];

    const eventData = args.e.data; // Données de l'événement sélectionné

    // Récupérer les objets équipe et terrain à partir de leurs IDs
    const equipe1 = this.equipes.find(e => e.id === eventData.idEquipe1);
    const equipe2 = this.equipes.find(e => e.id === eventData.idEquipe2);
    const terrain = this.terrains.find(t => t.id === eventData.idTerrain);

    // Préparer les données du formulaire avec les noms des équipes et du terrain
    const defaultData = {
      type: eventData.text,
      startDate: eventData.start.toString(),
      endDate: eventData.end.toString(),
      matchJoue: eventData.backColor === "#2ecc71", // Vérification de l'état du match joué (si la couleur est verte)
      backColor: eventData.backColor,
      idEquipe1: eventData.idEquipe1, // Envoie l'ID de l'équipe 1
      idEquipe2: eventData.idEquipe2, // Envoie l'ID de l'équipe 2
      idTerrain: eventData.idTerrain, // Envoie l'ID du terrain
      equipe1Name: equipe1 ? equipe1.nameEquipe : '', // Nom de l'équipe 1 pour l'affichage
      equipe2Name: equipe2 ? equipe2.nameEquipe : '', // Nom de l'équipe 2 pour l'affichage
      terrainName: terrain ? terrain.name : '', // Nom du terrain pour l'affichage
      scoreEquipe1: null, // Ajouter les valeurs par défaut des scores
      scoreEquipe2: null
    };

    // Affichage du formulaire avec les données par défaut
    const modal = await DayPilot.Modal.form(form, defaultData);

    // Si l'utilisateur annule la modification
    if (modal.canceled) return;

    const updatedData = modal.result;

    // Vous pouvez maintenant récupérer les noms des équipes et du terrain et les envoyer au backend via les IDs
    const matchToUpdate = {
      id: eventData.id, // L'ID de l'événement existant
      startDate: new Date(updatedData.startDate),
      endDate: new Date(updatedData.endDate),
      type: updatedData.type,
      idEquipe1: updatedData.idEquipe1,
      idEquipe2: updatedData.idEquipe2,
      idTerrain: updatedData.idTerrain,
      equipe1Name: updatedData.equipe1Name, // Nom de l'équipe 1
      equipe2Name: updatedData.equipe2Name, // Nom de l'équipe 2
      terrainName: updatedData.terrainName, // Nom du terrain
      matchJoue: updatedData.matchJoue,
    };

    // Envoi des données mises à jour au backend
    this.matchService.updateMatch(matchToUpdate.id, matchToUpdate).subscribe(() => {
      this.loadMatches(); // Recharge les matchs pour être sûr que tout est à jour
    });
  }

  

}
