import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
//import {ReservationModule} from "./pages/reservation/reservation.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
//import {FullCalendarModule} from "@fullcalendar/angular";
import {MaterielsComponent} from "./pages/materiels/materiels.component";
import { ReservationRoutingModule } from './pages/reservation/reservation-routing.module';
import { GestionreservationRoutingModule } from './pages/gestionreservation/gestionreservation-routing.module';
import {ReservationComponent} from "./pages/reservation/reservation.component";
import {ReservationModule} from "./pages/reservation/reservation.module";
import {ReservationHistoryComponent} from "./pages/reservation-history/reservation-history.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {NgxPaginationModule} from "ngx-pagination";
import {MatCardModule} from "@angular/material/card";
import {ReservationDetailComponent} from "./pages/reservationDetail/reservationDetail.component";
// ... other imports

@NgModule({
  declarations: [
MaterielsComponent, ReservationComponent, ReservationHistoryComponent,ReservationDetailComponent
  ],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,

    // ReservationModule,
    MatProgressSpinnerModule,
      ReservationRoutingModule,
      GestionreservationRoutingModule,

    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxPaginationModule,
    MatCardModule,


    //FullCalendarModule

    // ... other imports
  ],
})
export class DashboardModule {}
