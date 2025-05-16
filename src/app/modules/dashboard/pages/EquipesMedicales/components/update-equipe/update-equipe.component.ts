import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquipeMedicale } from '../../models/equipes-medicales.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipesMedicalesService } from '../../services/equipes-medicales.service';
import { User } from 'src/app/modules/users/models/user.model';
import { UserService } from 'src/app/modules/users/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-equipe',
  
  templateUrl: './update-equipe.component.html',
  styleUrl: './update-equipe.component.scss'
})
export class UpdateEquipeComponent implements OnInit{ 
 equipeForm!: FormGroup;
  equipeId!: string;
  equipeData!: EquipeMedicale;
  allUsers: User[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private equipesService: EquipesMedicalesService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.equipeForm = this.fb.group({
      nomEquipeMedicale: ['', Validators.required],
      descEquipeMedicale: ['', Validators.required],
      membres: [[]]  // multiple user IDs
    });
  }

  ngOnInit(): void {
    this.equipeId = this.route.snapshot.paramMap.get('id')!;
    this.getEquipeData();
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => this.allUsers = users,
      error: (err) => {
        console.error('Error fetching users:', err);
        alert('Failed to load users');
      }
    });
  }

  getEquipeData(): void {
    this.equipesService.getEquipeById(this.equipeId).subscribe({
      next: (data) => {
        this.equipeData = data;
        this.populateForm();
      },
      error: (err) => console.error('Error fetching equipe data:', err)
    });
  }

  populateForm(): void {
    this.equipeForm.patchValue({
      nomEquipeMedicale: this.equipeData.nomEquipeMedicale,
      descEquipeMedicale: this.equipeData.descEquipeMedicale,
      membres: this.equipeData.membres?.map((user: User) => user.id) || []
    });
  }

  onSubmit(): void {
  if (this.equipeForm.invalid) return;

  const formValue = this.equipeForm.value;

  const payload = {
    nomEquipeMedicale: formValue.nomEquipeMedicale,
    descEquipeMedicale: formValue.descEquipeMedicale,
    membres: formValue.membres.map((id: string) => ({ id }))
  };

  this.equipesService.updateEquipeMedicale(this.equipeId, payload).subscribe({
    next: () => {
      this.snackBar.open('Équipe médicale mise à jour avec succès', 'Fermer', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['success-snackbar']
      });
      this.router.navigate(['/equipes-medicales']); // Optional: redirect after update
    },
    error: (err) => {
      console.error('Erreur lors de la mise à jour de l\'équipe :', err);
      this.snackBar.open('Erreur lors de la mise à jour de l’équipe', 'Fermer', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  });
}}