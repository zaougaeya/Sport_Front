import { Component, OnInit } from '@angular/core';
import { CategoryService, Categorie } from './category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  standalone: true,
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  imports: [CommonModule, FormsModule, NgxPaginationModule],
})
export class CategoriesComponent implements OnInit {
  categorie: Categorie = {
    nom: '',
    description: '',
  };

  categories: Categorie[] = [];
  successMessage: string = '';
  isEditMode: boolean = false;
  currentCategoryId: string | undefined;
  p: number = 1;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des catégories :', error);
      },
    });
  }

  ajouterCategorie() {
    if (this.isEditMode && this.currentCategoryId) {
      const updatedCat = {
        ...this.categorie,
        id: this.currentCategoryId,
      };
      this.categoryService.modifierCategorie(updatedCat).subscribe({
        next: () => {
          this.successMessage = 'Catégorie mise à jour avec succès !';
          this.resetForm();
          this.getCategories();
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour de la catégorie :', error);
        },
      });
    } else {
      this.categoryService.ajouterCategorie(this.categorie).subscribe({
        next: () => {
          this.successMessage = 'Catégorie ajoutée avec succès !';
          this.resetForm();
          this.getCategories();
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout de la catégorie :', error);
        },
      });
    }

    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  supprimerCategorie(id: string) {
    if (confirm('Voulez-vous vraiment supprimer cette catégorie ?')) {
      this.categoryService.supprimerCategorie(id).subscribe({
        next: () => {
          this.successMessage = 'Catégorie supprimée avec succès !';
          this.getCategories();
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: (error) => {
          console.error("Erreur lors de la suppression :", error);
        },
      });
    }
  }

  modifierCategorie(cat: Categorie) {
    this.categorie = { ...cat };
    this.currentCategoryId = cat.id;
    this.isEditMode = true;

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }

  resetForm() {
    this.categorie = { nom: '', description: '' };
    this.isEditMode = false;
    this.currentCategoryId = undefined;
  }
}
