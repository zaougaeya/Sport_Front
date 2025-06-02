import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NftComponent } from './pages/nft/nft.component';
import { PodcastComponent } from './pages/podcast/podcast.component';
import { MatchComponent } from './pages/match/match.component';
import { EquipeComponent } from './pages/equipe/equipe.component';
import { TerrainComponent } from './pages/terrain/terrain.component';
import { PlanningMatchComponent } from './pages/planning-match/planning-match.component';
import { StatEquipesComponent } from './pages/stat-equipes/stat-equipes.component';
import { SessionListComponent } from './pages/liste-session/liste-session.component';
import { SessionJeuComponent } from './pages/session-jeu/session-jeu.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'nfts', pathMatch: 'full' },
      { path: 'nfts', component: NftComponent },
      { path: 'match', component: MatchComponent },
      { path: 'equipe', component: EquipeComponent },
      { path: 'terrain', component: TerrainComponent },
      { path: 'planning', component: PlanningMatchComponent },
      { path: 'session', component: SessionListComponent },
      { path: 'sessionJeu', component: SessionJeuComponent },
     // { path: 'statiqtique-equipe', component: StatEquipesComponent },
      { path: 'podcast', component: PodcastComponent },
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
