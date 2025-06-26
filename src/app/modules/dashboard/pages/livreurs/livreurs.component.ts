import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LivreurService } from './livreur.service';
import { Livreur } from './livreur.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  standalone: true,
  selector: 'app-livreur',
  templateUrl: './livreurs.component.html',
  styleUrls: ['./livreurs.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
})
export class LivreursComponent implements OnInit {
  livreurForm: FormGroup;
  livreurs: Livreur[] = [];
  p: number = 1;

  constructor(
    private fb: FormBuilder,
    private livreurService: LivreurService,
    private router: Router
  ) {
    this.livreurForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      numeroTelephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      statutLivreur: ['DISPONIBLE', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllLivreurs();
  }

  getAllLivreurs(): void {
    this.livreurService.getAllLivreurs().subscribe({
      next: (data) => this.livreurs = data,
      error: (err) => console.error('Erreur lors du chargement des livreurs', err),
    });
  }

  onSubmit(): void {
    if (this.livreurForm.valid) {
      this.livreurService.ajouterLivreur(this.livreurForm.value).subscribe({
        next: () => {
          this.livreurForm.reset();
          this.getAllLivreurs();
        },
        error: (err) => console.error('Erreur lors de l\'ajout:', err),
      });
    }
  }
}
