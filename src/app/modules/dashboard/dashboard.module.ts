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

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    DashboardRoutingModule,
    MatchComponent,
    EquipeComponent,
    TerrainComponent,
    AlertComponent,
    PlanningMatchComponent,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
})
export class DashboardModule { }