import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultationsRoutingModule } from './consultations-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AjoutConsultationComponent } from './components/ajout-consultation/ajout-consultation.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { ListConsultationsComponent } from './components/list-consultations/list-consultations.component';
import { CalendrierMedecinComponent } from './components/calendrier-medecin/calendrier-medecin.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ImcRecordComponent } from './components/imc-record/imc-record.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgChartsModule } from 'ng2-charts';
import { ImcAnalyticsComponent } from './components/imc-analytics/imc-analytics.component';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  declarations: [
    AjoutConsultationComponent,
    ListConsultationsComponent,
    CalendrierMedecinComponent,
    ImcRecordComponent,
    ImcAnalyticsComponent
    
    
  ],
  imports: [
    CommonModule,
    
    ConsultationsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
   NgChartsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    FullCalendarModule,
    
    FormsModule,
    MatInputModule,
   MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
MatProgressBarModule,
MatSelectModule,
MatFormFieldModule,
NgCircleProgressModule.forRoot({
      // Default config (you can override in the component)
      radius: 60,
      outerStrokeWidth: 10,
      innerStrokeWidth: 5,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300
    }),  ],
    
})

export class ConsultationsModule { }
