import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ArticleService } from '../../services/article.service';
import { PanierService } from '../../Services/panier.service'; // import the PanierService
import { categorie } from '../../core/models/categorie';
import { article } from '../../core/models/article';
import { HttpClientModule } from '@angular/common/http';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SessionService } from '../../Services/session.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, HttpClientModule, CommonModule],
})
export class ArticleComponent implements OnInit {
  categories: categorie[] = [];
  articles: (article & { categoryObject: categorie | null })[] = [];
  filteredArticles: (article & { categoryObject: categorie | null })[] = [];
  newArticle: article = {
    namearti: '',
    desc: '',
    prix: 0,
    picturearti: '',
    Quantite: 0,
    category: '',
    dateAdded: new Date(),
    discount: 0,
    prixApresRemise: 0
  };
  articleToEdit: article | null = null;
  searchTerm: string = '';

  constructor(private articleService: ArticleService, private panierService: PanierService,sessionService:SessionService) {}

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    forkJoin({
      categories: this.articleService.getAllCategories(),
      articles: this.articleService.getAllArticles(),
    }).subscribe(
      ({ categories, articles }) => {
        this.categories = categories;
        this.articles = articles.map(article => {
          const category = this.categories.find(cat => cat._id === article.category);
          return { ...article, categoryObject: category ?? null };
        });
        this.filteredArticles = this.articles;
      },
      error => {
        console.error('Error loading initial data:', error);
      }
    );
  }

  saveArticle() {
    this.articleService.addArticle(this.newArticle).subscribe(
      response => {
        alert('Article ajouté avec succès');
        this.loadInitialData();
        this.resetForm();
      },
      error => {
        console.error('Erreur lors de l\'ajout de l\'article :', error);
        alert('Erreur lors de l\'ajout de l\'article');
      }
    );
  }

  searchArticle() {
    this.filteredArticles = this.articles.filter(article =>
      article.namearti.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  updateArticleCategory(categoryId: string) {
    if (this.articleToEdit) {
      this.articleToEdit.category = categoryId;
    }
  }

  deleteArticle(article: article) {
    if (!article._id) {
      console.error('ID de l\'article non défini :', article);
      alert('Impossible de supprimer l\'article car l\'ID est non défini.');
      return;
    }

    if (confirm(`Voulez-vous vraiment supprimer l'article ${article.namearti} ?`)) {
      this.articleService.deleteArticle(article._id).subscribe(
        response => {
          alert('Article supprimé avec succès');
          this.loadInitialData();
        },
        error => {
          console.error(`Erreur lors de la suppression de l'article ${article.namearti} :`, error);
          alert(`Erreur lors de la suppression de l'article ${article.namearti}`);
        }
      );
    }
  }

  openEditModal(article: article) {
    this.articleToEdit = { ...article };
  }

  updateArticle() {
    if (!this.articleToEdit || !this.articleToEdit._id) {
      console.error('ID de l\'article non défini pour la mise à jour :', this.articleToEdit);
      alert('Impossible de mettre à jour l\'article car l\'ID est non défini.');
      return;
    }

    this.articleService.updateArticle({ ...this.articleToEdit }).subscribe(
      response => {
        alert('Article mis à jour avec succès');
        this.loadInitialData();
        this.articleToEdit = null;
      },
      error => {
        console.error('Erreur lors de la mise à jour de l\'article :', error);
        alert('Erreur lors de la mise à jour de l\'article');
      }
    );
  }

  resetForm() {
    this.newArticle = {
      namearti: '',
      desc: '',
      prix: 0,
      picturearti: '',
      Quantite: 0,
      category: '',
      dateAdded: new Date(),
      discount: 0,
      prixApresRemise: 0
    };
  }

  calculateDiscountedPrice(price: number, discount: number): number {
    if (discount > 0 && discount <= 100) {
      return price - (price * (discount / 100));
    }
    return price; 
  }

  findCategoryById(id?: string): string {
    const safeId = id ?? '';
    const category = this.categories.find(cat => cat._id === safeId);
    return category ? category.namecat : 'Non disponible';
  }

  // New method to add an article to the cart
  addToCart(article: article) {
    if (article._id) {
      this.panierService.addArticleToPanier(article._id, 1).subscribe(
        response => {
          alert('Article ajouté au panier avec succès');
        },
        error => {
          console.error('Erreur lors de l\'ajout de l\'article au panier :', error);
          alert('Erreur lors de l\'ajout de l\'article au panier');
        }
      );
    } else {
      console.error('ID de l\'article non défini :', article);
      alert('Impossible d\'ajouter l\'article au panier car l\'ID est non défini.');
    }
  }
}
