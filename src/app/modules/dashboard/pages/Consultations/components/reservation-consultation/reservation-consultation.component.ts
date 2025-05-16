import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquipeMedicale } from '../../../EquipesMedicales/models/equipes-medicales.model';
import { User } from '../../../users/models/user.model';
import { UserService } from '../../../users/services/user.service';
import { ReservationConsultationService } from '../../services/reservation-consultation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConsultationsService } from '../../services/consultations.service';
import { EquipesMedicalesService } from '../../../EquipesMedicales/services/equipes-medicales.service';

@Component({
  selector: 'app-reservation-consultation',
  templateUrl: './reservation-consultation.component.html',
  styleUrl: './reservation-consultation.component.scss'
})
export class ReservationConsultationComponent implements OnInit {
 reservationForm!: FormGroup;
  equipes: any[] = [];
  filteredMembres: any[] = [];
  minDate: string = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private equipeService: EquipesMedicalesService,
    private reservationService: ReservationConsultationService, // ✅ use correct service
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.fetchEquipes();
  }

  initForm(): void {
    this.reservationForm = this.fb.group({
      equipeMedicaleId: ['', Validators.required],
      medecinId: ['', Validators.required],
      dateConsultation: ['', Validators.required],
      motifConsultation: ['', Validators.required],
      moyenCommunication: ['', Validators.required],
      dureeConsultation: ['', [Validators.required, Validators.min(5)]]
    });
  }

  fetchEquipes(): void {
    this.equipeService.getAllEquipes().subscribe((data: any[]) => {
      this.equipes = data;
    });
  }

  onEquipeChange(event: Event): void {
    const selectedId = (event.target as HTMLSelectElement).value;
    const selectedEquipe = this.equipes.find(e => e.id === selectedId);
    this.filteredMembres = selectedEquipe ? selectedEquipe.membres : [];
  }

 onSubmit(): void {
  if (this.reservationForm.valid) {
    const formData = this.reservationForm.value;

    const selectedMedecin = this.filteredMembres.find(m => m.id === formData.medecinId);

    const reservationPayload = {
      ...formData,
      statutConsultation: 'à traiter',
      specialite: selectedMedecin?.profession || 'Non spécifiée',
      dureeConsultation: `PT${formData.dureeConsultation}M`  // ✅ Convert minutes to ISO 8601 duration
    };

    this.reservationService.createReservation(reservationPayload).subscribe({
      next: response => {
        console.log('Réservation ajoutée:', response);
        this.snackBar.open('Réservation créée avec succès !', 'Fermer', { duration: 3000 });
        this.reservationForm.reset();
        this.filteredMembres = [];
      },
      error: error => {
        console.error('Erreur lors de la réservation:', error);
        this.snackBar.open('Erreur lors de la création de la réservation.', 'Fermer', { duration: 3000 });
      }
    });
  }
}}