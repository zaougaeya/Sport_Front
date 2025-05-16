import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationConsultationRoutingModule } from './reservation-consultation-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { ReservationConsultationComponent } from './components/reservation-consultation/reservation-consultation.component';
import { BrowserModule } from '@angular/platform-browser';
import { ListReservationsConsultationsComponent } from './components/list-reservations-consultations/list-reservations-consultations.component';
import { UpdateReservationConsultationComponent } from './components/update-reservation-consultation/update-reservation-consultation.component';

@NgModule({
  declarations: [
    ReservationConsultationComponent,
    ListReservationsConsultationsComponent,
    UpdateReservationConsultationComponent

    
  ],
  imports: [
    CommonModule,
    ReservationConsultationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule
  ]
})
export class ReservationConsultationModule { }
