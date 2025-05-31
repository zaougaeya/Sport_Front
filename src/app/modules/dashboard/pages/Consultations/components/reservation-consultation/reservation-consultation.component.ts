import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquipeMedicale } from '../../../EquipesMedicales/models/equipes-medicales.model';
import { User } from '../../../users/models/user.model';
import { UserService } from '../../../users/services/user.service';
import { ReservationConsultationService } from '../../services/reservation-consultation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConsultationsService } from '../../services/consultations.service';
import { EquipesMedicalesService } from '../../../EquipesMedicales/services/equipes-medicales.service';
import { ReservationConsultation } from '../../models/reservationConsultation.model';
import { CreneauReservationService } from '../../services/creneau-reservation.service';

@Component({
  selector: 'app-reservation-consultation',
  templateUrl: './reservation-consultation.component.html',
  styleUrl: './reservation-consultation.component.scss'
})
export class ReservationConsultationComponent implements OnInit {
 reservationForm!: FormGroup;
  equipes: any[] = [];
  filteredMembres: any[] = [];
minDate: Date = new Date();  
reservedDates: { start: Date; end: Date }[] = [];
readonly WORK_START = 8; // 8 AM
readonly WORK_END = 18;  // 6 PM
availableTimeSlots: string[] = [];
  constructor(
    private fb: FormBuilder,
    private equipeService: EquipesMedicalesService,
    private reservationService: ReservationConsultationService,
    private creneauService: CreneauReservationService, // ✅ use correct service
    private snackBar: MatSnackBar
  ) {}

   ngOnInit(): void {
    this.initForm();
    this.fetchEquipes();
  this.reservationForm.get('dateConsultation')?.valueChanges.subscribe(() => {
  this.reservationForm.get('heureConsultation')?.reset(); // reset on date change
  this.generateAvailableTimeSlots();
});
this.reservationForm.get('dureeConsultation')?.valueChanges.subscribe(() => {
  this.reservationForm.get('heureConsultation')?.reset(); // reset on duration change
  this.generateAvailableTimeSlots();
});




this.reservationForm.get('medecinId')?.valueChanges.subscribe((medecinId) => {
  this.reservationForm.get('heureConsultation')?.reset(); // reset slot if medecin changes
  if (medecinId) {
    this.loadReservedDates(medecinId);
  }
});

  }

  initForm(): void {
  this.reservationForm = this.fb.group({
  equipeMedicaleId: ['', Validators.required],
  medecinId: ['', Validators.required],
  dateConsultation: ['', Validators.required],
  heureConsultation: ['', Validators.required],
  motifConsultation: ['', Validators.required],
  moyenCommunication: ['', Validators.required],
  dureeConsultation: ['', [Validators.required, Validators.min(5)]]
});}

  fetchEquipes(): void {
    this.equipeService.getAllEquipes().subscribe((data: EquipeMedicale[]) => {
      this.equipes = data;
    });
  }

  onEquipeChange(event: Event): void {
    const selectedId = (event.target as HTMLSelectElement).value;
    const selectedEquipe = this.equipes.find(e => e.id === selectedId);
    this.filteredMembres = selectedEquipe ? selectedEquipe.membres : [];
    this.reservationForm.patchValue({ medecinId: '' });
    this.reservedDates = [];
  }
onMedecinChange(event: Event): void {
  const medecinId = (event.target as HTMLSelectElement).value;
  this.reservationForm.patchValue({ medecinId }); // optional: not needed if already two-way bound
  // No need to manually call loadReservedDates anymore — handled in valueChanges
}


loadReservedDates(medecinId: string): void {
  this.reservationService.getAllReservations().subscribe((reservations: any[]) => {
    const medecinReservations = reservations
      .filter(r => r.medecinId === medecinId)
      .map(r => {
        const start = new Date(r.dateConsultation);
        const durationMinutes = parseInt(r.dureeConsultation.replace('PT', '').replace('M', '')) || 0;
        const end = new Date(start.getTime() + durationMinutes * 60000);
        return { start, end };
      });

    this.reservedDates = medecinReservations;

    // Only generate slots if both date and duration are set
    if (
      this.reservationForm.get('dateConsultation')?.value &&
      this.reservationForm.get('dureeConsultation')?.value
    ) {
      this.generateAvailableTimeSlots();
    }
  });
}

generateAvailableTimeSlots(): void {
  const selectedDate: Date = this.reservationForm.get('dateConsultation')?.value;
  if (!selectedDate) {
    this.availableTimeSlots = [];
    return;
  }

  const intervalMinutes = 30;
  const slots: string[] = [];

  for (let hour = this.WORK_START; hour < this.WORK_END; hour++) {
    for (let min = 0; min < 60; min += intervalMinutes) {
      const slot = new Date(selectedDate);
      slot.setHours(hour, min, 0, 0);

      const slotEnd = new Date(slot.getTime() + this.reservationForm.get('dureeConsultation')?.value * 60000);

      const conflict = this.reservedDates.some(res => {
        return slot < res.end && slotEnd > res.start;
      });

      if (!conflict) {
        slots.push(slot.toTimeString().substring(0, 5)); // Format: HH:MM
      }
    }
  }

  this.availableTimeSlots = slots;
}

  dateFilter = (date: Date | null): boolean => {
  if (!date) return false;

  // Exclure les jours qui ont déjà au moins une réservation
  const dateString = date.toISOString().split('T')[0];

  return !this.reservedDates.some(res => {
    const resDateString = res.start.toISOString().split('T')[0];
    return resDateString === dateString;
  });
};


onSubmit(): void {
  if (this.reservationForm.valid) {
    const formData = this.reservationForm.value;
    const [hours, minutes] = formData.heureConsultation.split(':').map(Number);

    const startDate = new Date(formData.dateConsultation);
    startDate.setHours(hours, minutes, 0, 0);

    const durationMinutes = formData.dureeConsultation;
    const endDate = new Date(startDate.getTime() + durationMinutes * 60000);

    const hasConflict = this.reservedDates.some(res => {
      return (startDate < res.end) && (endDate > res.start);
    });

    if (hasConflict) {
      this.snackBar.open('Ce créneau est déjà réservé !', 'Fermer', { duration: 3000 });
      return;
    }
const selectedMedecin = this.filteredMembres.find(m => m.id === formData.medecinId);

   // Helper functions inside onSubmit or declared outside as class methods
    function formatTime(date: Date): string {
      const h = date.getHours().toString().padStart(2, '0');
      const m = date.getMinutes().toString().padStart(2, '0');
      return `${h}:${m}`;
    }

    function formatDate(date: Date): string {
      return date.toISOString().substring(0, 10);
    }

    const creneauPayload = {
      date: formatDate(startDate),             // e.g. "2025-05-18"
      heureDebut: formatTime(startDate),       // e.g. "09:30"
      heureFin: formatTime(endDate),            // e.g. "10:00"
      medecinId: formData.medecinId,
      medecinName: selectedMedecin ? `${selectedMedecin.nom} ${selectedMedecin.prenom}` : 'Médecin inconnu',
      disponible: true
    };

    // ✅ Use the correct service to create the creneau
    this.creneauService.createCreneau(creneauPayload).subscribe({
      next: (creneau: any) => {
        const reservation: ReservationConsultation = {
          ...formData,
          dateConsultation: startDate,
          dureeConsultation: `PT${durationMinutes}M`,
          statutConsultation: 'A_VENIR',
          specialite: this.filteredMembres.find(m => m.id === formData.medecinId)?.profession || 'Non spécifiée',
          patientId: null,
          isUrgent: null,
          creneauId: creneau.id
        };

        this.reservationService.createReservation(reservation).subscribe({
          next: () => {
            this.snackBar.open('Réservation enregistrée avec succès', 'Fermer', { duration: 3000 });
            this.reservationForm.reset();
            this.filteredMembres = [];
            this.reservedDates = [];
          },
          error: (err) => {
            this.snackBar.open('Erreur lors de la réservation', 'Fermer', { duration: 3000 });
            console.error('Erreur réservation:', err);
          }
        });
      },
      error: (err) => {
        if (err.status === 409) {
          this.snackBar.open('Créneau déjà pris pour ce médecin !', 'Fermer', { duration: 3000 });
        } else {
          this.snackBar.open('Erreur lors de la création du créneau', 'Fermer', { duration: 3000 });
        }
        console.error('Erreur creneau:', err);
      }
    });
  }
}
}