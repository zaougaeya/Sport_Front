import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { CategorieService } from '../Services/categorie.service';
import { categorie } from '../core/models/categorie';
import { article } from '../core/models/article';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PanierService } from '../Services/panier.service';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule 
  ],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class Article2Component implements OnInit {
  articles: article[] = [];
  categories: categorie[] = [];
  articleToEdit: article | null = null;
  searchTerm: string = '';
  filteredArticles: article[] = [];

  constructor(private articleService: ArticleService, private categoryService: CategorieService,
    panierservices:PanierService) {}

  ngOnInit(): void {
    this.loadArticles();
    this.loadCategories();
  }
  loadArticles(): void {
    this.articleService.getAllArticles().subscribe((data: article[]) => {
      this.articles = data;
      this.filteredArticles = data; // Initially display all articles
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe((data: categorie[]) => {
      this.categories = data;
    });
  }

  findCategoryById(categoryId: string): string {
    const category = this.categories.find(cat => cat._id === categoryId);
    return category ? category.namecat : 'Unknown Category';
  }

  calculateDiscountedPrice(price: number, discount: number): number {
    if (discount > 0 && discount <= 100) {
      return price - (price * (discount / 100));
    }
    return price;
  }
  showPromoArticles(): void {
    this.filteredArticles = this.articles.filter(article => article.discount > 0);
  }

  onSearch(): void {
    if (this.searchTerm) {
      this.filteredArticles = this.articles.filter(article =>
        article.namearti.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredArticles = this.articles;
    }
  }
  

  addToCart(article: article): void {
    if (article._id) {
      this.panierservices.addArticleToPanier(article._id, 1).subscribe(
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
