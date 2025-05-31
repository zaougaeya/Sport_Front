import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutConsultationComponent } from './components/ajout-consultation/ajout-consultation.component';
import { ListConsultationsComponent } from './components/list-consultations/list-consultations.component';
import { CalendrierMedecinComponent } from './components/calendrier-medecin/calendrier-medecin.component';
import { ImcRecordComponent } from './components/imc-record/imc-record.component';
import { ImcAnalyticsComponent } from './components/imc-analytics/imc-analytics.component';

const routes: Routes = [
  //{ path: '', component: ListeConsultationsComponent },
  { path: 'ajouter', component: AjoutConsultationComponent },
  { path: 'listConsultations', component: ListConsultationsComponent },
  { path: 'calendrier-medecin', component: CalendrierMedecinComponent },
  { path: 'imcRecord', component: ImcRecordComponent },
  { path: 'imcAnalytics', component: ImcAnalyticsComponent },
  

  

  //{ path: 'modifier/:id', component: ModifierConsultationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultationsRoutingModule { }
