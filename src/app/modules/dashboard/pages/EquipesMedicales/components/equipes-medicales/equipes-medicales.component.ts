import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquipesMedicalesService } from '../../services/equipes-medicales.service';
import { EquipeMedicale } from '../../models/equipes-medicales.model';
import { User } from 'src/app/modules/users/models/user.model';
import { UserService } from 'src/app/modules/users/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-equipes-medicales',
 
  templateUrl: './equipes-medicales.component.html',
  styleUrl: './equipes-medicales.component.scss'
})
export class EquipesMedicalesComponent implements OnInit{

 equipeForm: FormGroup;
  allUsers: User[] = [];

  constructor(
    private fb: FormBuilder,
    private equipesService: EquipesMedicalesService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.equipeForm = this.fb.group({
      nomEquipeMedicale: ['', Validators.required],
      descEquipeMedicale: ['', Validators.required],
      membres: [[]] // <-- form field for selected members
    });
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => this.allUsers = users,
      error: (err) => {
        console.error('Error fetching users:', err);
        alert('Failed to load users');
      }
    });
  }

  onSubmit(): void {
  if (this.equipeForm.invalid) return;

  const formValue = this.equipeForm.value;

  const payload = {
    nomEquipeMedicale: formValue.nomEquipeMedicale,
    descEquipeMedicale: formValue.descEquipeMedicale,
    membres: formValue.membres.map((id: string) => ({ id })),
    consultations: []
  };

  this.equipesService.createEquipe(payload).subscribe({
    next: response => {
      console.log('Equipe created successfully:', response);
      this.snackBar.open('Équipe médicale ajoutée avec succès', 'Fermer', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['success-snackbar']
      });
      this.equipeForm.reset(); // optional: reset the form after success
    },
    error: err => {
      console.error('Failed to create equipe:', err);
      this.snackBar.open('Erreur lors de l’ajout de l’équipe', 'Fermer', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  });
}}