import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import {Materiel} from "../materiels/materiel.model";
import {MaterielService} from "../materiels/materiel.service";
import {ReservationService} from "./reservation.service";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  materiels: Materiel[] = [];
  filteredMateriels: Materiel[] = [];
  reservedDates: { startDate: string; endDate: string }[] = [];
  selectedMateriel: Materiel | null = null;

  searchTerm = '';
  sportFilter = '';
  reservationForm!: FormGroup;

  currentPage = 1;
  pageSize = 8;

  constructor(
    private materielService: MaterielService,
    private reservationService: ReservationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.fetchMateriels();
    this.reservationForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      note: ['']
    });
  }

  fetchMateriels() {
    this.materielService.getAllMateriel().subscribe({
      next: (data) => {
        this.materiels = data;
        this.applyFilter();
      },
      error: () => {
        Swal.fire('Erreur', 'Impossible de récupérer les matériels', 'error');
      }
    });
  }

  applyFilter() {
    this.filteredMateriels = this.materiels.filter((m) =>
      (!this.searchTerm || m.name.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (!this.sportFilter || m.sportType?.toLowerCase() === this.sportFilter.toLowerCase())
    );
  }

  get pagedMateriels() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredMateriels.slice(start, start + this.pageSize);
  }

  selectMateriel(m: Materiel) {
    this.selectedMateriel = m;
    this.reservationForm.reset();

    this.reservationService.getReservationsByMateriel(m.id).subscribe({
      next: (reservations) => {
        this.reservedDates = reservations.map(r => ({
          startDate: r.startDate,
          endDate: r.endDate
        }));
      },
      error: () => {
        Swal.fire('Erreur', 'Impossible de récupérer les réservations', 'error');
      }
    });
  }

  isDateReserved(date: Date): boolean {
    return this.reservedDates.some(range => {
      const start = new Date(range.startDate);
      const end = new Date(range.endDate);
      return date >= start && date <= end;
    });
  }
  filterDate = (date: Date | null): boolean => {
    if (!date) return false;
    return !this.isDateReserved(date);
  };

  submitReservation() {
    if (!this.selectedMateriel) return;

    const { startDate, endDate, note } = this.reservationForm.value;

    this.reservationService.createReservation({
      materiel: this.selectedMateriel,
      startDate,
      endDate,
      note
    }).subscribe({
      next: () => {
        Swal.fire('Succès', 'Réservation effectuée', 'success');
        this.selectedMateriel = null;
        this.fetchMateriels();
      },
      error: () => {
        Swal.fire('Erreur', 'Réservation impossible', 'error');
      }


    });
  }
}
