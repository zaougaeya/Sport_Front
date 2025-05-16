import { Component, OnInit } from '@angular/core';
import { ReservationConsultationService } from '../../services/reservation-consultation.service';
import { UserService } from '../../../users/services/user.service';
import { EquipesMedicalesService } from '../../../EquipesMedicales/services/equipes-medicales.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../../../EquipesMedicales/components/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-list-reservations-consultations',
  templateUrl: './list-reservations-consultations.component.html',
  styleUrl: './list-reservations-consultations.component.scss'
})
export class ListReservationsConsultationsComponent implements OnInit{

   reservations: any[] = [];
  users: any[] = [];
  equipes: any[] = [];

  constructor(private reservationService: ReservationConsultationService,
    private userService : UserService,
    private equipeService : EquipesMedicalesService,
    public dialog : MatDialog
  ) {}
  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;

      this.equipeService.getAllEquipes().subscribe(equipes => {
        this.equipes = equipes;

        this.reservationService.getAllReservations().subscribe(reservations => {
          this.reservations = reservations.map(r => ({
            ...r,
            medecin: this.users.find(u => u.id === r.medecinId),
            equipeMedicale: this.equipes.find(e => e.id === r.equipeMedicaleId)
          }));
        });
      });
    });
  }

  convertDurationToMinutes(duration: string): number {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?/;
    const matches = duration.match(regex);

    if (!matches) return 0;

    const hours = parseInt(matches[1] || '0', 10);
    const minutes = parseInt(matches[2] || '0', 10);

    return hours * 60 + minutes;
  }

  openDeleteConfirmDialog(reservationId?: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '300px',
      data: { equipeId: reservationId },
      disableClose: true,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.deleteReservation(reservationId!);
      }
    });
  }

  deleteReservation(reservationId: string): void {
    this.reservationService.deleteReservation(reservationId).subscribe({
      next: () => this.loadAllData(),
      error: (err) => console.error('Error deleting reservation:', err)
    });
  }
}