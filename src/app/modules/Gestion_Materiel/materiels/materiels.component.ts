import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Materiel } from "../../../core/models/materiel.model";
import { MaterielService } from "./materiel.service";
import { NotificationService } from "../notification.service";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-materiels',
  templateUrl: './materiels.component.html',
  styleUrls: ['./materiels.component.scss']
})
export class MaterielsComponent implements OnInit {
  materiels: Materiel[] = [];
  materiel: Materiel = { id: '', name: '', sportType: '', quantity: 1, color: '', state: 'neuf', noteInterne: '', imageUrl: '' };
  isEditMode = false;
  successMessage = '';
  errorMessage = '';
  selectedFile: File | null = null;
  searchTerm: string = '';
  filteredMateriels: Materiel[] = [];
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  sportTypes: string[] = [
    'Football',
    'Basketball',
    'Tennis',
    'Padel',
    'Natation',
    'Athlétisme',
    'Cyclisme',
    // Ajoutez d'autres types de sports selon vos besoins
  ];
  afficherListeMateriels: boolean = false; // Pour contrôler l'affichage de la liste
  selectedFileUrl: SafeUrl | string = '';

  constructor(
    private materielService: MaterielService,
    private router: Router,
    private notificationService: NotificationService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getMateriels(); // Récupérez la liste au chargement du composant
  }

  getMateriels(): void {
    this.materielService.getAllMateriel().subscribe(
      (data) => {
        this.materiels = data;
        this.filteredMateriels = [...this.materiels]; // Initialisez la liste filtrée
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la récupération des matériels.';
        console.error(error);
        this.notificationService.showError(this.errorMessage);
      }
    );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.selectedFileUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.selectedFile));
    } else {
      this.selectedFileUrl = '';
    }
  }

  ajouterMateriel(): void {
    const formData = new FormData();
    formData.append('name', this.materiel.name);
    formData.append('sportType', this.materiel.sportType || '');
    formData.append('quantity', String(this.materiel.quantity));
    formData.append('color', this.materiel.color || '');
    formData.append('state', this.materiel.state || '');
    formData.append('noteInterne', this.materiel.noteInterne || '');
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.materielService.createMaterielWithImage(formData).subscribe({
      next: (response) => {
        this.notificationService.showSuccess('Matériel ajouté avec succès.');
        this.resetForm();
        this.getMateriels(); // Recharger la liste après l'ajout
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de l\'ajout du matériel.';
        console.error('Erreur lors de l\'ajout du matériel avec image :', error);
        this.notificationService.showError(this.errorMessage);
      }
    });
  }

  modifierMateriel(materiel: Materiel): void {
    this.materiel = { ...materiel };
    this.isEditMode = true;
    this.afficherListeMateriels = false; // Cacher la liste lors de la modification (optionnel)
  }

  supprimerMateriel(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce matériel ?')) {
      this.materielService.supprimerMateriel(id).subscribe({
        next: () => {
          this.notificationService.showSuccess('Matériel supprimé avec succès.');
          this.getMateriels(); // Recharger la liste après la suppression
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors de la suppression du matériel.';
          console.error(error);
          this.notificationService.showError(this.errorMessage);
        }
      });
    }
  }

  resetForm(): void {
    this.materiel = { id: '', name: '', sportType: '', quantity: 1, color: '', state: 'neuf', noteInterne: '', imageUrl: '' };
    this.isEditMode = false;
    this.selectedFile = null;
    this.selectedFileUrl = '';
  }

  filterMateriels(): void {
    this.filteredMateriels = this.materiels.filter(mat =>
      mat.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (mat.sportType && mat.sportType.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
      String(mat.quantity).includes(this.searchTerm) ||
      (mat.color && mat.color.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
      mat.state.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (mat.noteInterne && mat.noteInterne.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  sortTable(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredMateriels.sort((a, b) => {
      const valueA = (a as any)[this.sortColumn];
      const valueB = (b as any)[this.sortColumn];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        return this.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      } else {
        return 0;
      }
    });
  }

  toggleListeMateriels(): void {
    this.afficherListeMateriels = !this.afficherListeMateriels;
    if (this.afficherListeMateriels && this.materiels.length === 0) {
      this.getMateriels(); // Charger la liste si elle n'est pas déjà chargée
    }
  }

  openMaterielListNewPage(): void {
    this.router.navigate(['/materiels']); // Assurez-vous que votre route est correcte
  }

  // Nouvelle méthode pour gérer la recherche
  effectuerRecherche(): void {
    this.filterMateriels();
  }
}

