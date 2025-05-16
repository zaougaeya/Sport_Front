import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationConsultationService } from '../../services/reservation-consultation.service';
import { UserService } from '../../../users/services/user.service';
import { EquipesMedicalesService } from '../../../EquipesMedicales/services/equipes-medicales.service';

@Component({
  selector: 'app-update-reservation-consultation',

  templateUrl: './update-reservation-consultation.component.html',
  styleUrl: './update-reservation-consultation.component.scss'
})
export class UpdateReservationConsultationComponent implements OnInit {
  reservationForm!: FormGroup;
  reservationId!: string;
  users: any[] = [];
  equipes: any[] = [];
  filteredUsers: any[] = [];
  specialites: string[] = [];

 constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationConsultationService,
    private userService: UserService,
    private equipeService: EquipesMedicalesService
  ) {}
  ngOnInit(): void {
    this.reservationId = this.route.snapshot.paramMap.get('id') || '';

    this.reservationForm = this.fb.group({
      medecinId: ['', Validators.required],
      equipeMedicaleId: ['', Validators.required],
      dateConsultation: ['', Validators.required],
      motifConsultation: ['', Validators.required],
      moyenCommunication: ['', Validators.required],
      dureeConsultation: ['', [Validators.required, Validators.min(1)]],
      specialite: ['', Validators.required],
      statutConsultation: ['A_TRAITER', Validators.required],
      isUrgent: ['non', Validators.required]
    });

    this.loadInitialData();
  }

  private isoDurationToMinutes(duration: string): number {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const match = duration.match(regex);

    if (!match) return 0;

    const hours = parseInt(match[1] || '0', 10);
    const minutes = parseInt(match[2] || '0', 10);
    const seconds = parseInt(match[3] || '0', 10);

    return hours * 60 + minutes + Math.ceil(seconds / 60);
  }

  private minutesToIsoDuration(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `PT${h > 0 ? `${h}H` : ''}${m > 0 ? `${m}M` : ''}`;
  }

  loadInitialData(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;

      this.equipeService.getAllEquipes().subscribe(equipes => {
        this.equipes = equipes;

        this.reservationService.getReservationById(this.reservationId).subscribe(res => {
          const date = new Date(res.dateConsultation);
          const yyyy = date.getFullYear();
          const mm = ('0' + (date.getMonth() + 1)).slice(-2);
          const dd = ('0' + date.getDate()).slice(-2);
          const formattedDate = `${yyyy}-${mm}-${dd}`;
          const dureeMinutes = this.isoDurationToMinutes(res.dureeConsultation);

          this.reservationForm.patchValue({
            medecinId: res.medecinId,
            equipeMedicaleId: res.equipeMedicaleId,
            dateConsultation: formattedDate,
            motifConsultation: res.motifConsultation,
            moyenCommunication: res.moyenCommunication,
            dureeConsultation: dureeMinutes,
            specialite: res.specialite,
            statutConsultation: res.statutConsultation,
            isUrgent: res.isUrgent
          });

          this.updateSpecialites(res.equipeMedicaleId);
          this.updateFilteredUsers(res.equipeMedicaleId);
        });
      });
    });
  }

  updateSpecialites(equipeId: string): void {
    const equipe = this.equipes.find(e => e.id === equipeId);
    const selectedSpecialite = this.reservationForm.get('specialite')?.value;

    if (equipe) {
      const specialiteSet = new Set<string>(
        equipe.membres.map((m: any) => m.specialite as string)
      );

      if (selectedSpecialite && !specialiteSet.has(selectedSpecialite)) {
        specialiteSet.add(selectedSpecialite);
      }

      this.specialites = Array.from(specialiteSet);
    } else {
      this.specialites = selectedSpecialite ? [selectedSpecialite] : [];
    }
  }

  updateFilteredUsers(equipeId: string): void {
    const equipe = this.equipes.find(e => e.id === equipeId);
    if (equipe) {
      const memberIds = equipe.membres.map((m: any) => m.id);
      this.filteredUsers = this.users.filter(u => memberIds.includes(u.id));
    } else {
      this.filteredUsers = [];
    }
  }

  onEquipeChange(): void {
    const selectedEquipeId = this.reservationForm.get('equipeMedicaleId')?.value;
    this.updateSpecialites(selectedEquipeId);
    this.updateFilteredUsers(selectedEquipeId);

    this.reservationForm.patchValue({
      medecinId: '',
      specialite: ''
    });
  }

  updateReservation(): void {
    if (this.reservationForm.valid) {
      const formValue = this.reservationForm.value;

      const dureeIso = this.minutesToIsoDuration(formValue.dureeConsultation);
      const dateIso = new Date(formValue.dateConsultation).toISOString();

      const updatedReservation = {
        ...formValue,
        dureeConsultation: dureeIso,
        dateConsultation: dateIso
      };

      this.reservationService.updateReservation(this.reservationId, updatedReservation).subscribe({
        next: () => this.router.navigate(['/reservations']),
        error: err => console.error('Error updating reservation:', err)
      });
    }
  }
}