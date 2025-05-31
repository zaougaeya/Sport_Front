import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NftComponent } from './pages/nft/nft.component';
import { PodcastComponent } from './pages/podcast/podcast.component';
import { EquipesMedicalesComponent } from './pages/EquipesMedicales/components/equipes-medicales/equipes-medicales.component';
import { ListEquipesComponent } from './pages/EquipesMedicales/components/list-equipes/list-equipes.component';
import { UpdateEquipeComponent } from './pages/EquipesMedicales/components/update-equipe/update-equipe.component';
import { AjoutConsultationComponent } from './pages/Consultations/components/ajout-consultation/ajout-consultation.component';
import { ReservationConsultationComponent } from './pages/Consultations/components/reservation-consultation/reservation-consultation.component';
import { ListReservationsConsultationsComponent } from './pages/Consultations/components/list-reservations-consultations/list-reservations-consultations.component';
import { UpdateReservationConsultationComponent } from './pages/Consultations/components/update-reservation-consultation/update-reservation-consultation.component';
import { ListConsultationsComponent } from './pages/Consultations/components/list-consultations/list-consultations.component';
import { CalendrierMedecinComponent } from './pages/Consultations/components/calendrier-medecin/calendrier-medecin.component';
import { ImcRecordComponent } from './pages/Consultations/components/imc-record/imc-record.component';
import { ImcAnalyticsComponent } from './pages/Consultations/components/imc-analytics/imc-analytics.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'nfts', pathMatch: 'full' },
      { path: 'nfts', component: NftComponent },
      { path: 'podcast', component: PodcastComponent },
      { path: 'equipesMedicales', component: EquipesMedicalesComponent },
      { path: 'listeEquipesMedicales', component: ListEquipesComponent },
      { path: 'equipesMedicales/update/:id', component: UpdateEquipeComponent },
      { path: 'consultations', component: AjoutConsultationComponent },
      { path: 'reserverConsultation', component: ReservationConsultationComponent },
      { path: 'listReservationsConsultations', component: ListReservationsConsultationsComponent },
      { path: 'reservations/update/:id', component: UpdateReservationConsultationComponent },
      { path: 'listConsultations', component: ListConsultationsComponent },
      { path: 'calendrier-medecin', component: CalendrierMedecinComponent },
      { path: 'imcRecord', component: ImcRecordComponent },
      { path: 'imcAnalytics', component: ImcAnalyticsComponent },


      

 
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
