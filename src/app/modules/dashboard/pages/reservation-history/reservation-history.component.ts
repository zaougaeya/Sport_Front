import { Component, OnInit } from '@angular/core';
import { Reservation } from '../reservation/reservation.model';
import { ReservationService } from '../reservation/reservation.service';

@Component({
  selector: 'app-reservation-history',
  templateUrl: './reservation-history.component.html',
  styleUrls: ['./reservation-history.component.scss']
})
export class ReservationHistoryComponent implements OnInit {
  reservations: Reservation[] = [];
  calendarEvents: any[] = [];
  loading = true;

  // Filtrage
  selectedStatus = '';
  filterStart: string | null = null;
  filterEnd: string | null = null;

  // Image zoom
  selectedImage: string | null = null;

  calendarOptions: any = {
    initialView: 'dayGridMonth',
    events: [],
    height: 'auto'
  };
  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.reservationService.getUserReservations().subscribe({
      next: data => {
        this.reservations = data;
        this.buildCalendarEvents();
        this.loading = false;
      },
      error: err => {
        console.error('Erreur lors du chargement des réservations', err);
        this.loading = false;
      }
    });
  }

  get filteredReservations(): Reservation[] {
    return this.reservations.filter(r => {
      const matchesStatus = this.selectedStatus ? r.status === this.selectedStatus : true;
      const startMatch = this.filterStart ? new Date(r.startDate) >= new Date(this.filterStart) : true;
      const endMatch = this.filterEnd ? new Date(r.endDate) <= new Date(this.filterEnd) : true;
      return matchesStatus && startMatch && endMatch;
    });
  }

  buildCalendarEvents(): void {
    this.calendarEvents = this.reservations.map(r => ({
      title: r.materielName || 'Réservation',
      start: r.startDate,
      end: r.endDate,
      color: r.status === 'PAID' ? '#16a34a' : r.status === 'CANCELLED' ? '#dc2626' : '#facc15'
    }));
  }

  onImgError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/img/placeholder.png';
  }

  openImageModal(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }

  closeImageModal(): void {
    this.selectedImage = null;
  }
}
