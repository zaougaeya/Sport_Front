import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../users/models/user.model';
import { EquipeMedicale } from '../../../EquipesMedicales/models/equipes-medicales.model';
import { ConsultationsService } from '../../services/consultations.service';
import { UserService } from '../../../users/services/user.service';
import { EquipesMedicalesService } from '../../../EquipesMedicales/services/equipes-medicales.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ajout-consultation',
  templateUrl: './ajout-consultation.component.html',
  styleUrl: './ajout-consultation.component.scss'
})
export class AjoutConsultationComponent implements OnInit{

  consultationForm: FormGroup;
  allUsers: User[] = [];
  allEquipes: EquipeMedicale[] = [];

  constructor(
    private fb: FormBuilder,
    private consultationService: ConsultationsService,
    private userService: UserService,
    private equipesService: EquipesMedicalesService,
    private snackBar: MatSnackBar
  ) {
    this.consultationForm = this.fb.group({
      userId: ['', Validators.required],
      equipeMedicaleId: ['', Validators.required],
      dateConsultation: ['', Validators.required],
      rapport: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => this.allUsers = users,
      error: (err) => {
        console.error('Erreur lors du chargement des utilisateurs:', err);
        this.snackBar.open('Échec du chargement des utilisateurs', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });

    this.equipesService.getAllEquipes().subscribe({
      next: (equipes) => this.allEquipes = equipes,
      error: (err) => {
        console.error('Erreur lors du chargement des équipes médicales:', err);
        this.snackBar.open('Échec du chargement des équipes médicales', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  onSubmit(): void {
    if (this.consultationForm.invalid) return;

    const formValue = this.consultationForm.value;

    const payload = {
      userId: formValue.userId,
      equipeMedicaleId: formValue.equipeMedicaleId,
      dateConsultation: new Date(formValue.dateConsultation).toISOString(),
      rapport: formValue.rapport,
      feedbacks: []
    };

    this.consultationService.createConsultation(payload).subscribe({
      next: response => {
        console.log('Consultation ajoutée avec succès:', response);
        this.snackBar.open('Consultation ajoutée avec succès', 'Fermer', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
        this.consultationForm.reset();
      },
      error: err => {
        console.error('Erreur lors de l’ajout de la consultation:', err);
        this.snackBar.open('Erreur lors de l’ajout de la consultation', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}


