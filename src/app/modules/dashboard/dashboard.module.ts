import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule } from 'angular-calendar';
import { CalendarDateFormatter, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NameEquipePipe } from './pipe/nameequipe.pipe';
import { Nameterrainpipe } from './pipe/nameterrain.pipe';
import { MatchComponent } from './pages/match/match.component';
import { EquipeComponent } from './pages/equipe/equipe.component';
import { TerrainComponent } from './pages/terrain/terrain.component';
import { AlertComponent } from './pages/alert/alert.component';
import { PlanningMatchComponent } from './pages/planning-match/planning-match.component';
import { NgChartsModule } from 'ng2-charts';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { StatEquipesComponent } from './pages/stat-equipes/stat-equipes.component';
import { SessionListComponent } from './pages/liste-session/liste-session.component';
import { SessionJeuComponent } from './pages/session-jeu/session-jeu.component';

@NgModule({
  declarations :[
        SessionListComponent,
        SessionJeuComponent,
            

  ],
  
  imports: [
    NgxSliderModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    DashboardRoutingModule,
    MatchComponent,
    StatEquipesComponent,
    EquipeComponent,
    TerrainComponent,
    AlertComponent,
    PlanningMatchComponent,
    NgChartsModule,  // <= ajoute cette ligne
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule { }