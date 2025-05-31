import { Component, OnInit } from '@angular/core';
import { ConsultationsService } from '../../services/consultations.service';
import { Consultation } from '../../models/consultation.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ReservationConsultationService } from '../../services/reservation-consultation.service';
import { UserService } from '../../../users/services/user.service';
import { EquipesMedicalesService } from '../../../EquipesMedicales/services/equipes-medicales.service';
import { catchError, forkJoin, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-list-consultations',
  templateUrl: './list-consultations.component.html',
  styleUrl: './list-consultations.component.scss'
})
export class ListConsultationsComponent implements OnInit{
 consultations: any[] = [];

  constructor(
    private consultationService: ConsultationsService,
    private reservationService: ReservationConsultationService,
    private userService: UserService,
    private equipeService: EquipesMedicalesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadConsultations();
  }

  loadConsultations(): void {
    this.consultationService.getConsultations().pipe(
      switchMap((consultations) =>
        this.reservationService.getAllReservations().pipe(
          switchMap((reservations) => {
            const enrichedObservables = consultations.map((c: any) => {
              const reservation = reservations.find(r => r.id === c.reservationId);

              let medecinName = 'Inconnu';
              let equipeName = 'Inconnue';

              const medecin$ = reservation?.medecinId
                ? this.userService.getUserById(reservation.medecinId).pipe(
                    map(user => `${user?.nom ?? 'Nom inconnu'} ${user?.prenom ?? ''}`.trim()),
                    catchError(() => of('Inconnu'))
                  )
                : of('Inconnu');

              const equipe$ = reservation?.equipeMedicaleId
                ? this.equipeService.getEquipeById(reservation.equipeMedicaleId).pipe(
                    map(equipe => equipe?.nomEquipeMedicale ?? 'Inconnue'),
                    catchError(() => of('Inconnue'))
                  )
                : of('Inconnue');

              return forkJoin([medecin$, equipe$]).pipe(
                map(([medecinNom, equipeNom]) => ({
                  ...c,
                  reservation,
                  medecinName: medecinNom,
                  equipeName: equipeNom,
                  dureeEnMinutes: this.convertDurationToMinutes(reservation?.dureeConsultation)
                }))
              );
            });

            return forkJoin(enrichedObservables);
          })
        )
      )
    ).subscribe({
      next: (enrichedConsultations) => {
        this.consultations = enrichedConsultations;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des consultations enrichies', err);
        this.snackBar.open('Erreur lors du chargement des consultations', 'Fermer', {
          duration: 3000,
        });
      }
    });
  }

  convertDurationToMinutes(duration: string): string {
    if (!duration) return '';
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?/;
    const match = duration.match(regex);
    if (!match) return '';

    const hours = parseInt(match[1] || '0', 10);
    const minutes = parseInt(match[2] || '0', 10);
    const totalMinutes = hours * 60 + minutes;
    return `${totalMinutes} min`;
  }

  deleteConsultation(id: string): void {
    if (confirm('Voulez-vous vraiment supprimer cette consultation ?')) {
      this.consultationService.deleteConsultation(id).subscribe({
        next: () => {
          this.snackBar.open('Consultation supprimée avec succès', 'Fermer', { duration: 3000 });
          this.loadConsultations();
        },
        error: (err) => {
          console.error('Erreur lors de la suppression', err);
          this.snackBar.open('Erreur lors de la suppression', 'Fermer', { duration: 3000 });
        }
      });
    }
  }
}