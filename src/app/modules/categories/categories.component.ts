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

  categories: Categorie[] = [];  // Liste des catégories à afficher
  successMessage: string = '';   // Message de succès après ajout

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();  // Récupérer les catégories au démarrage
  }

  // Méthode pour récupérer toutes les catégories
  getCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;  // Mettre à jour la liste des catégories
        console.log('Catégories récupérées :', categories);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des catégories :', error);
      },
    });
  }

  // Méthode pour ajouter une catégorie
  ajouterCategorie() {
    this.categoryService.ajouterCategorie(this.categorie).subscribe({
      next: (response) => {
        console.log('Catégorie ajoutée :', response);
        this.successMessage = 'Catégorie ajoutée avec succès !';
        this.categorie = { nom: '', description: '' }; // Réinitialiser le formulaire

        // Réactualiser la liste des catégories après ajout
        this.getCategories();

        // Masquer le message après 3 secondes
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout de la catégorie :', error);
      },
    });
  }
}
