import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationConsultationComponent } from './components/reservation-consultation/reservation-consultation.component';
import { ListReservationsConsultationsComponent } from './components/list-reservations-consultations/list-reservations-consultations.component';
import { UpdateReservationConsultationComponent } from './components/update-reservation-consultation/update-reservation-consultation.component';

const routes: Routes = [
  { path: 'ajouter', component: ReservationConsultationComponent },
  { path: 'listReservationsConsultations', component: ListReservationsConsultationsComponent },
  { path: 'updateReservationsConsultations', component: UpdateReservationConsultationComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationConsultationRoutingModule { }
