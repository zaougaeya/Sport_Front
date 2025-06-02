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
    matchJoue: false,
    idEquipe1: '',
    idEquipe2: ''
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
    this.events = this.matches.map((match) => {
      const equipe1 = this.equipes.find(e => e.id === match.idEquipe1);
      const equipe2 = this.equipes.find(e => e.id === match.idEquipe2);
      const terrain = this.terrains.find(t => t.id === match.idTerrain);

      return {
        id: match.id,
        start: new DayPilot.Date(match.startDate),
        end: new DayPilot.Date(match.endDate),
        text: match.type || 'Match',
        backColor: match.matchJoue ? '#2ecc71' : '#e74c3c',
        tooltip: `Match: ${match.type}
Équipe 1: ${equipe1?.nameEquipe || '-'}
Équipe 2: ${equipe2?.nameEquipe || '-'}
Terrain: ${terrain?.name || '-'}`,

        // Pour onEventClick
        idEquipe1: match.idEquipe1,
        idEquipe2: match.idEquipe2,
        idTerrain: match.idTerrain
      };
    });

    console.log("Événements chargés :", this.events);
  }





  get formattedEndDate(): string {
    return new Date(this.newMatch.endDate).toISOString().slice(0, 16);
  }


  loadEquipes(): void {
    this.equipeService.getAllEquipes().subscribe({
      next: (data) => {
        this.equipes = data;
        console.log(this.equipes, " equipe calendar");

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
    viewType: 'Day',
    durationBarVisible: false,
    onEventClick: this.onEventClick.bind(this),

    visible: false
  };

  configWeek: DayPilot.CalendarConfig = {
    viewType: 'Week',
    durationBarVisible: false,
    // onTimeRangeSelected: this.onTimeRangeSelected.bind(this),
    onEventClick: this.onEventClick.bind(this),
    // onBeforeEventRender: this.onBeforeEventRender.bind(this),

    visible: false
  };


  configMonth: DayPilot.MonthConfig = {
    visible: false,
    eventBarVisible: false,
    // onTimeRangeSelected: this.onTimeRangeSelected.bind(this),
    onEventClick: this.onEventClick.bind(this),
  };

  async onEventClick(args: any) {
    if (!this.equipes?.length || !this.terrains?.length) {
      await DayPilot.Modal.alert("Les équipes ou terrains ne sont pas encore chargés.");
      return;
    }

    const data = args.e.data;

    const equipe1 = this.equipes.find(e => e.id === data.idEquipe1);
    const equipe2 = this.equipes.find(e => e.id === data.idEquipe2);
    const terrain = this.terrains.find(t => t.id === data.idTerrain);

    const details = `
  <style>
    h2 {
      text-align: center;
      margin-bottom: 15px;
      color: #2c3e50;
      font-family: Arial, sans-serif;
      font-weight: bold;
      font-size: 18px;
    }
    b {
      color: #34495e;
      font-family: Arial, sans-serif;
    }
    .detail-line {
      margin-bottom: 8px;
      font-family: Arial, sans-serif;
    }
  </style>

  <h2>Détails Match</h2>
  <div class="detail-line"><b>Type :</b> ${data.text}</div>
  <div class="detail-line"><b>Date Début :</b> ${new Date(data.start).toLocaleString()}</div>
  <div class="detail-line"><b>Date Fin :</b> ${new Date(data.end).toLocaleString()}</div>
  <div class="detail-line"><b>Équipe 1 :</b> ${equipe1?.nameEquipe || '-'}</div>
  <div class="detail-line"><b>Équipe 2 :</b> ${equipe2?.nameEquipe || '-'}</div>
  <div class="detail-line"><b>Terrain :</b> ${terrain?.name || '-'}</div>
  `;

    await DayPilot.Modal.alert(details);
  }



}
