import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../reservation/reservation.model';
import {Materiel} from "../materiels/materiel.model";

@Component({
  selector: 'app-gestionreservation',
  templateUrl: './gestionreservation.component.html',
  styleUrls: ['./gestionreservation.component.scss']
})
export class GestionreservationComponent implements OnInit {
  reservations: Reservation[] = [];
  materiels: Materiel[] = [];
  loading = true;

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.fetchReservations();
  }

  fetchReservations(): void {
    this.loading = true;
    this.reservationService.getReservations().subscribe({
      next: (res) => {
        this.reservations = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des réservations :', err);
        this.loading = false;
      }
    });
  }

  confirmPaiement(res: Reservation): void {
    if (!res.id) return;

    this.reservationService.confirmPaiement(res.id).subscribe({
      next: (updatedRes) => {
        res.status = updatedRes.status;
        res.paid = updatedRes.paid ?? (updatedRes.status === 'PAID');
      },
      error: (err) => {
        console.error('❌ Erreur :', err);
        alert('Erreur : ' + (err?.error?.message || JSON.stringify(err.error)));
      }
    });
  }



}
