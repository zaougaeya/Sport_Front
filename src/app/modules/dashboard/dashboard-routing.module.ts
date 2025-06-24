import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NftComponent } from './pages/nft/nft.component';
import { PodcastComponent } from './pages/podcast/podcast.component';
import {MaterielsComponent} from "./pages/materiels/materiels.component";
import {ReservationComponent} from "./pages/reservation/reservation.component";
import {ReservationHistoryComponent} from "./pages/reservation-history/reservation-history.component";
import {ReservationDetailComponent} from "./pages/reservationDetail/reservationDetail.component";
import {GestionreservationComponent} from "./pages/gestionreservation/gestionreservation.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'nfts', pathMatch: 'full' },
      { path: 'nfts', component: NftComponent },
      { path: 'podcast', component: PodcastComponent },
      { path: 'materiels', component: MaterielsComponent},
      { path: 'materiels', component: MaterielsComponent},
      { path: 'gestion_reservation', component:GestionreservationComponent},
      {path: 'reservations', component: ReservationComponent},
      { path: 'historique', component: ReservationHistoryComponent },
      { path: 'reservationDetails/:materielId', component: ReservationDetailComponent},
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
