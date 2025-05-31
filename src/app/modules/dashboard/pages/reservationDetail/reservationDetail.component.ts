import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Materiel } from '../materiels/materiel.model';
import { ReservationService } from '../reservation/reservation.service';
import {MaterielService} from "../materiels/materiel.service";

@Component({
  selector: 'app-reservationDetail',
  templateUrl: './reservationDetail.component.html',
  styleUrls: ['./reservationDetail.scss']
})
export class ReservationDetailComponent implements OnInit {
  materielId!: string;
  materiel!: Materiel;
  reservations: any[] = [];
  disableDates: Date[] = [];
  reservationForm!: FormGroup;
  showForm = false;

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private materielService: MaterielService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.materielId = this.route.snapshot.paramMap.get('materielId')!;
    this.loadMateriel();
    this.loadReservations();

    this.reservationForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      note: ['']
    });
  }

  loadMateriel() {
    this.materielService.getMaterielById(this.materielId).subscribe({
      next: (res) => (this.materiel = res),
      error: () => Swal.fire('Erreur', 'Échec du chargement du matériel', 'error')
    });
  }

  loadReservations() {
    this.reservationService.getReservationsByMateriel(this.materielId).subscribe({
      next: (res) => {
        this.reservations = res;
        this.disableDates = this.getDisabledDatesFromReservations(res);
      },
      error: () => Swal.fire('Erreur', 'Impossible de récupérer les réservations', 'error')
    });
  }

  getDisabledDatesFromReservations(reservations: any[]): Date[] {
    const disabled: Date[] = [];
    reservations.forEach(res => {
      const start = new Date(res.startDate);
      const end = new Date(res.endDate);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        disabled.push(new Date(d));
      }
    });
    return disabled;
  }

  isDateAvailable = (d: Date | null): boolean => {
    if (!d) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // reset heure
    d.setHours(0, 0, 0, 0);
    return (
      d >= today &&
      !this.disableDates.some(disabled => disabled.toDateString() === d.toDateString())
    );
  };

  onDateSelection() {
    const start = this.reservationForm.value.startDate;
    const end = this.reservationForm.value.endDate;

    if (start && end && this.isDateAvailable(start) && this.isDateAvailable(end)) {
      this.showForm = true;
    } else {
      this.showForm = false;
    }
  }

  submitReservation() {
    if (this.reservationForm.invalid) {
      console.warn('Formulaire invalide');
      return;
    }

    const payload = {
      materiel: { id: this.materielId },
      startDate: this.reservationForm.value.startDate,
      endDate: this.reservationForm.value.endDate,
      note: this.reservationForm.value.note,
    };

    this.reservationService.createReservation(payload).subscribe({
      next: () => {
        Swal.fire('Succès', 'Réservation effectuée avec succès !', 'success');
        this.showForm = false;
        this.reservationForm.reset();
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Erreur', 'Échec de la réservation', 'error');
      }
    });
  }

}
