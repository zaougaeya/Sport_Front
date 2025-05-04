import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/services/produit.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { categorie } from 'src/app/core/models/categorie';
import { produit } from 'src/app/core/models/produit';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ContactModalComponent, FormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    products: produit[] = [];
    filteredProducts: produit[] = [];
    categories: categorie[] = [];
    searchCategory: string = '';
    isModalVisible = false;
  
    constructor(private productService: ProductService, private categoryService: CategorieService) {}
  
    ngOnInit(): void {
      this.loadProducts();
      this.loadCategories();
    }
  
    showModal(event: Event) {
      event.preventDefault();
      this.isModalVisible = true;
    }
  
    hideModal() {
      this.isModalVisible = false;
    }
  
    loadProducts(): void {
      this.productService.getAllProducts().subscribe((data: produit[]) => {
        this.products = data;
        this.filteredProducts = data; // Initially display all products
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
  
    onSearch(): void {
      if (this.searchCategory) {
        const searchLower = this.searchCategory.toLowerCase();
        this.filteredProducts = this.products.filter(product => {
          const categoryName = this.findCategoryById(product.categoryprod).toLowerCase();
          return categoryName.includes(searchLower);
        });
      } else {
        this.filteredProducts = this.products;
      }
    }
  
    sortByPriceLowToHigh(): void {
      this.filteredProducts.sort((a, b) => a.prix - b.prix);
    }
  }