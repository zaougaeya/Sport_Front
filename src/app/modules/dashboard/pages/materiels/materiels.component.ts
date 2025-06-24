import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MaterielService} from "./materiel.service";
import {Materiel} from "./materiel.model";

@Component({
  selector: 'app-materiels',
  templateUrl: './materiels.component.html',
  styleUrls: ['./materiels.component.scss']
})
export class MaterielsComponent implements OnInit {
  materielForm!: FormGroup;
  selectedFile: File | null = null;
  selectedFileUrl: string | null = null;
  successMessage: string = '';
  showForm = true;
  showTable = false;

  materiels: Materiel[] = [];
  filteredMateriels: Materiel[] = [];
  editingMaterielId: string | null = null;


  // Pagination
  currentPage = 1;
  pageSize = 6;

  // Recherche
  filterBy: 'name' | 'sportType' = 'name';
  searchTerm: string = '';

  // Champs dynamiques pour le formulaire
  fields = [
    { label: 'Nom du matériel', control: 'name', type: 'text', placeholder: 'Ex: Ballon' },
    { label: 'Type de sport', control: 'sportType', type: 'select', options: ['football', 'basketball', 'tennis','Padel'] },
    { label: 'Quantité', control: 'quantity', type: 'number', placeholder: 'Ex: 10' },
    { label: 'Prix (TND)', control: 'price', type: 'number', placeholder: 'Ex: 5.99' }, // ✅ AJOUT
    { label: 'Couleur', control: 'color', type: 'text', placeholder: 'Ex: Rouge' },
    { label: 'État', control: 'state', type: 'select', options: ['neuf', 'usagé', 'endommagé'] },
    { label: 'Note interne', control: 'description', type: 'textarea', placeholder: 'Remarques...' }
  ];

  constructor(
    private fb: FormBuilder,
    private materielService: MaterielService
  ) {}

  ngOnInit(): void {
    this.materielForm = this.fb.group({
      name: ['', Validators.required],
      sportType: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      price: [0, Validators.required] ,// ✅ AJOUT
      color: ['', Validators.required],
      state: ['', Validators.required],
      description: ['']
    });

    this.fetchMateriels();
  }

  toggleView(view: 'form' | 'table'): void {
    this.showForm = view === 'form';
    this.showTable = view === 'table';
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Pour afficher un aperçu
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFileUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  submitForm(): void {
    if (this.materielForm.invalid) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    // Si modification
    if (this.editingMaterielId) {
      const updatedMateriel: Materiel = {
        id: this.editingMaterielId,
        ...this.materielForm.value,
        imageUrl: this.selectedFileUrl // Optionnel, à adapter selon ta logique backend
      };

      this.materielService.modifierMateriel(updatedMateriel).subscribe({
        next: () => {
          this.successMessage = "Matériel modifié avec succès.";
          this.resetForm();
          this.fetchMateriels();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (err) => console.error("Erreur modification", err)
      });
    }
    // Sinon, création
    else {
      if (!this.selectedFile) {
        alert("Veuillez sélectionner une image.");
        return;
      }

      const formData = new FormData();
      formData.append('name', this.materielForm.get('name')?.value);
      formData.append('sportType', this.materielForm.get('sportType')?.value);
      formData.append('quantity', this.materielForm.get('quantity')?.value);
      formData.append('price', this.materielForm.get('price')?.value);
      formData.append('color', this.materielForm.get('color')?.value);
      formData.append('state', this.materielForm.get('state')?.value);
      formData.append('noteInterne', this.materielForm.get('description')?.value || '');
      formData.append('image', this.selectedFile);

      //const token = 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiI2ODMzMmQ1MTRkYWUyYzE5ZWUwNjJjMjUiLCJyb2xlIjoiQURNSU4iLCJqb2IiOiJFTlRSQUlORVVSIiwiaWF0IjoxNzQ4NzgwMDU0LCJleHAiOjE3NDg4NjY0NTR9._weo242BoJDPp_qEI9z2l2npf12j9NZ6pAVDHPzfxq7lzr5OvfKpAxAdOAeX_4xQ';

      this.materielService.createMaterielWithImage(formData).subscribe({
        next: () => {
          this.successMessage = "Matériel ajouté avec succès.";
          this.resetForm();
          this.fetchMateriels();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (err) => console.error("Erreur ajout", err)
      });
    }
  }


  cancelForm(): void {
    this.resetForm();
  }
  resetForm(): void {
    this.materielForm.reset();
    this.selectedFile = null;
    this.selectedFileUrl = null;
    this.editingMaterielId = null;
  }
  fetchMateriels(): void {
    this.materielService.getAllMateriel().subscribe({
      next: (data) => {
        this.materiels = data;
        this.filteredMateriels = data;
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des matériels", err);
      }
    });
  }

  onFilterChange() {
    const term = this.searchTerm.toLowerCase().trim();

    if (term === '') {
      // Si rien tapé, on affiche tout
      this.filteredMateriels = [...this.materiels];
    } else {
      this.filteredMateriels = this.materiels.filter(m => {
        // On prépare les valeurs à comparer en minuscules
        const name = (m.name || '').toLowerCase();
        const sport = (m.sportType || '').toLowerCase();

        // On teste si la recherche est incluse dans le nom ou le sport
        return name.includes(term) || sport.includes(term);
      });
    }

    this.currentPage = 1;
  }



  paginatedMateriels(): Materiel[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredMateriels.slice(start, end);
  }

  totalPages(): number {
    return Math.ceil(this.filteredMateriels.length / this.pageSize);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }

  editMateriel(mat: Materiel): void {
    this.toggleView('form');
    this.materielForm.patchValue(mat);
    this.selectedFileUrl = mat.imageUrl || null;
    this.selectedFile = null;
    this.editingMaterielId = mat.id ?? null;
  }

  deleteMateriel(id: string | number): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce matériel ?")) {
      this.materielService.supprimerMateriel(id).subscribe({
        next: () => {
          this.successMessage = "Matériel supprimé avec succès.";
          this.fetchMateriels(); // Recharge la liste
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (err) => {
          console.error("Erreur suppression", err);
          alert("Une erreur est survenue lors de la suppression.");
        }
      });
    }
  }
}
