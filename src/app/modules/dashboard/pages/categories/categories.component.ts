import { Component, OnInit } from '@angular/core';
import { CategoryService, Categorie } from './category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
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
      // Mode édition → mettre à jour
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
      // Mode ajout
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

    // Masquer le message après 3s
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  supprimerCategorie(id: string) {
    console.log('Suppression demandée pour ID:', id, typeof id);
    if (confirm('Voulez-vous vraiment supprimer cette catégorie ?')) {
      this.categoryService.supprimerCategorie(id).subscribe({
        next: () => {
          this.successMessage = 'Catégorie supprimée avec succès !';
          this.getCategories(); // Actualiser la liste
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
    this.categorie = { ...cat }; // Remplir le formulaire avec les données de la catégorie
    this.currentCategoryId = cat.id;
    this.isEditMode = true;

    // Défilement vers le haut uniquement
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Faire défiler la page vers le haut
    }, 100); // Petit délai pour s'assurer que la page se positionne bien
  }



  resetForm() {
    this.categorie = {  nom: '', description: '' };
    this.isEditMode = false;
    this.currentCategoryId = undefined;
  }
  
}
