import { Component, OnInit } from '@angular/core';
import {ReservationService} from "../reservation/reservation.service";
import {Reservation} from "../reservation/reservation.model";
import  {Materiel} from "../materiels/materiel.model";

@Component({
  selector: 'app-reservation-history',
  templateUrl: './reservation-history.component.html',
  styleUrls: ['./reservation-history.component.scss']
})
export class ReservationHistoryComponent implements OnInit {
  reservations: Reservation[] = [];
  freeReservationEarned = false;

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.loadUserReservations();
  }

  loadUserReservations(): void {
    this.reservationService.getUserReservations().subscribe(data => {
      this.reservations = data;
      this.freeReservationEarned = data.length > 0 && data.length % 10 === 0;
    });
  }
}
