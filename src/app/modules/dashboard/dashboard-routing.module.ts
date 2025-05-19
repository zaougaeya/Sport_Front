import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NftComponent } from './pages/nft/nft.component';
import { PodcastComponent } from './pages/podcast/podcast.component';
import { LivreursComponent } from './pages/livreurs/livreurs.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProduitsComponent } from './pages/produits/produits.component';
import { CommandesComponent } from './pages/commandes/commandes.component';
import { StatVComponent } from './pages/stat-v/stat-v.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'nfts', pathMatch: 'full' },
      { path: 'nfts', component: NftComponent },
      { path: 'podcast', component: PodcastComponent },
      { path: 'livreurs', component: LivreursComponent },
      {path:'categories',component:CategoriesComponent},
      {path:'produits', component:ProduitsComponent},
      {path:'commandes',component:CommandesComponent},
      {path:'stat-v',component:StatVComponent},
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
