import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationConsultationService } from '../../services/reservation-consultation.service';
import { UserService } from '../../../users/services/user.service';
import { EquipesMedicalesService } from '../../../EquipesMedicales/services/equipes-medicales.service';
import { ConsultationsService } from '../../services/consultations.service';

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
    private equipeService: EquipesMedicalesService,
    private consultationService: ConsultationsService
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
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;
    const [_, h, m, s] = match;
    return (parseInt(h || '0') * 60) + parseInt(m || '0') + (parseInt(s || '0') > 0 ? 1 : 0);
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
          const formattedDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
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
    const specSet = new Set<string>();

    if (equipe) {
      equipe.membres.forEach((m: any) => specSet.add(m.specialite));
      if (selectedSpecialite && !specSet.has(selectedSpecialite)) {
        specSet.add(selectedSpecialite);
      }
    } else if (selectedSpecialite) {
      specSet.add(selectedSpecialite);
    }

    this.specialites = Array.from(specSet);
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
   if (this.reservationForm.invalid) { return; }

  const formValue     = this.reservationForm.value;
  const dateIso       = new Date(formValue.dateConsultation).toISOString();
  const dureeIso      = this.minutesToIsoDuration(formValue.dureeConsultation);

  const payload = {
    ...formValue,
    dateConsultation : dateIso,
    dureeConsultation: dureeIso
  };

  this.reservationService.updateReservation(this.reservationId, payload).subscribe({
    next: (updatedRes) => {          // <-- receive what backend saved
      /** 1️⃣ If the backend already created & returned a consultationId
       *     we do *not* create another one.
       */
      if (
        formValue.statutConsultation === 'VALIDEE' &&
        !updatedRes.consultationId      // backend did **not** create one
      ) {
        const consultation = {
          reservationId    : updatedRes.id,
          userId           : updatedRes.medecinId,
          equipeMedicaleId : updatedRes.equipeMedicaleId,
          dateConsultation : updatedRes.dateConsultation,
          rapport          : ''
        };

        this.consultationService.createConsultation(consultation).subscribe({
          next : () => this.router.navigate(['/reservations']),
          error: err => console.error('Erreur création consultation', err)
        });
      } else {
        // Backend already linked a consultation or status ≠ VALIDEE
        this.router.navigate(['/reservations']);
      }
    },
    error: err => console.error('Erreur update reservation', err)
  });
}}