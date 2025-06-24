import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReservationComponent} from "./reservation.component";
import {ReservationHistoryComponent} from "../reservation-history/reservation-history.component";
import {ReservationDetailComponent} from "../reservationDetail/reservationDetail.component";

const routes: Routes = [
  { path: '', component: ReservationComponent },
  { path: 'history', component: ReservationHistoryComponent },
  { path: ':materielId', component: ReservationDetailComponent }, // 🧭 redirection vers page avec calendrier + form

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule {}
