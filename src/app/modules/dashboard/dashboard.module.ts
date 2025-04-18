import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NameEquipePipe } from './pipe/nameequipe.pipe';
import { Nameterrainpipe } from './pipe/nameterrain.pipe';
import { MatchComponent } from './pages/match/match.component';
import { EquipeComponent } from './pages/equipe/equipe.component';
import { TerrainComponent } from './pages/terrain/terrain.component';

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    DashboardRoutingModule,
    NameEquipePipe,
    Nameterrainpipe,
    MatchComponent,
    EquipeComponent,
    TerrainComponent,
  ],
})
export class DashboardModule { }