import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquipeMedicale } from '../../models/equipes-medicales.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipesMedicalesService } from '../../services/equipes-medicales.service';
import { User } from 'src/app/modules/users/models/user.model';
import { UserService } from 'src/app/modules/users/services/user.service';

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
    private userService: UserService
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

    const payload: EquipeMedicale = {
      nomEquipeMedicale: formValue.nomEquipeMedicale,
      descEquipeMedicale: formValue.descEquipeMedicale,
      membres: formValue.membres.map((id: string) => ({ id })),
      consultations: this.equipeData.consultations || []
    };

    this.equipesService.updateEquipeMedicale(this.equipeId, payload).subscribe({
      next: () => this.router.navigate(['/equipes']),
      error: (err) => console.error('Error updating equipe:', err)
    });
  }
}
