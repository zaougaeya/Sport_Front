import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutConsultationComponent } from './components/ajout-consultation/ajout-consultation.component';

const routes: Routes = [
  //{ path: '', component: ListeConsultationsComponent },
  { path: 'ajouter', component: AjoutConsultationComponent },
  //{ path: 'modifier/:id', component: ModifierConsultationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultationsRoutingModule { }
