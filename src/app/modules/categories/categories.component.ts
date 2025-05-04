import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CategorieService } from 'src/app/Services/categorie.service';
import { categorie } from 'src/app/core/models/categorie';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, HttpClientModule] 
})
export class CategoriesComponent implements OnInit {
  namecat: string = '';
  picturecat: string = '';
  categories: categorie[] = [];
  categoryToEdit: categorie | null = null;

  constructor(private categorieService: CategorieService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categorieService.getAllCategories().subscribe(
      (data: categorie[]) => {
        this.categories = data;
      },
      error => {
        console.error('Error loading categories:', error);
      }
    );
  }

  saveCategory(categoryForm: NgForm) {
    if (categoryForm.valid) {
      const newCategory: categorie = {
        namecat: this.namecat,
        picturecat: this.picturecat
      };

      this.categorieService.addCategory(newCategory).subscribe(
        response => {
          alert('Catégorie ajoutée avec succès');
          this.loadCategories();
          this.namecat = '';
          this.picturecat = '';
          categoryForm.resetForm();
        },
        error => {
          console.error('Erreur lors de l\'ajout de la catégorie :', error);
          alert('Erreur lors de l\'ajout de la catégorie');
        }
      );
    }
  }

  deleteCategory(category: categorie) {
    if (!category._id) {
      console.error('ID de catégorie non défini :', category);
      alert('Impossible de supprimer la catégorie car l\'ID est non défini.');
      return;
    }

    if (confirm(`Voulez-vous vraiment supprimer la catégorie ${category.namecat} ?`)) {
      this.categorieService.deleteCategory(category._id).subscribe(
        response => {
          alert('Catégorie supprimée avec succès');
          this.loadCategories(); // Rechargez la liste des catégories après la suppression
        },
        error => {
          console.error(`Erreur lors de la suppression de la catégorie ${category.namecat} :`, error);
          alert(`Erreur lors de la suppression de la catégorie ${category.namecat}`);
        }
      );
    }
  }

  openEditModal(category: categorie) {
    this.categoryToEdit = { ...category };
  }

  updateCategory() {
    if (!this.categoryToEdit || !this.categoryToEdit._id) {
      console.error('ID de catégorie non défini pour la mise à jour :', this.categoryToEdit);
      alert('Impossible de mettre à jour la catégorie car l\'ID est non défini.');
      return;
    }

    this.categorieService.updateCategory({ ...this.categoryToEdit }).subscribe(
      response => {
        alert('Catégorie mise à jour avec succès');
        this.loadCategories();
        this.categoryToEdit = null; // Clear the edit category
      },
      error => {
        console.error('Erreur lors de la mise à jour de la catégorie :', error);
        alert('Erreur lors de la mise à jour de la catégorie');
      }
    );
  }
}
