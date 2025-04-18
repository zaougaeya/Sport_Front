import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NftComponent } from './pages/nft/nft.component';
import { PodcastComponent } from './pages/podcast/podcast.component';
import { MatchComponent } from './pages/match/match.component';
import { EquipeComponent } from './pages/equipe/equipe.component';
import { TerrainComponent } from './pages/terrain/terrain.component';

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
