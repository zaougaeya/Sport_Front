import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EquipesMedicalesComponent } from './pages/EquipesMedicales/components/equipes-medicales/equipes-medicales.component';
import { EquipesMedicalesModule } from './pages/EquipesMedicales/equipes-medicales.module';
import { ConsultationsModule } from './pages/Consultations/consultations.module';
import { ReservationConsultationModule } from './pages/Consultations/reservation-consultation.module';



@NgModule({
  declarations: [
    
    
 
  ],
  imports: [DashboardRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    EquipesMedicalesModule,
    ConsultationsModule,
    ReservationConsultationModule,
    
    
  ],
})
export class DashboardModule {}