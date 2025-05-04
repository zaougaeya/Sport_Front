import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { ProductService } from 'src/app/Services/produit.service';
import { categorie } from 'src/app/core/models/categorie';
import { produit } from 'src/app/core/models/produit';
import { PanierService } from 'src/app/Services/panier.service';

@Component({
  selector: 'app-categories',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, HttpClientModule, CommonModule]
})
export class ProductComponent implements OnInit {
  categories: categorie[] = [];
  products: (produit & { categoryObject: categorie | null })[] = [];
  newProduct: produit = {
    nameprod: '',
    desc: '',
    prix: 0,
    pictureprod: '',
    quantiteprod: 0,
    categoryprod: '',
    dateAddedprod: new Date()
  };
  productToEdit: produit | null = null;

  constructor(private productService: ProductService,
    private panierService: PanierService // Corrected service injection
  ) {}

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    forkJoin({
      categories: this.productService.getAllCategories(),
      products: this.productService.getAllProducts()
    }).subscribe(
      ({ categories, products }) => {
        this.categories = categories;
        this.products = products.map(product => {
          const category = this.categories.find(cat => cat._id === product.categoryprod);
          return { ...product, categoryObject: category ?? null };
        });
      },
      error => {
        console.error('Error loading initial data:', error);
      }
    );
  }

  saveProduct() {
    this.productService.addProduct(this.newProduct).subscribe(
      response => {
        alert('Produit ajouté avec succès');
        this.loadInitialData();
        this.resetForm();
      },
      error => {
        console.error('Erreur lors de l\'ajout du produit :', error);
        alert('Erreur lors de l\'ajout du produit');
      }
    );
  }

  updateProductCategory(categoryId: string) {
    if (this.productToEdit) {
      this.productToEdit.categoryprod = categoryId;
    }
  }

  deleteProduct(product: produit) {
    if (!product._id) {
      console.error('ID de produit non défini :', product);
      alert('Impossible de supprimer le produit car l\'ID est non défini.');
      return;
    }

    if (confirm(`Voulez-vous vraiment supprimer le produit ${product.nameprod} ?`)) {
      this.productService.deleteProduct(product._id).subscribe(
        response => {
          alert('Produit supprimé avec succès');
          this.loadInitialData();
        },
        error => {
          console.error(`Erreur lors de la suppression du produit ${product.nameprod} :`, error);
          alert(`Erreur lors de la suppression du produit ${product.nameprod}`);
        }
      );
    }
  }

  openEditModal(product: produit) {
    this.productToEdit = { ...product };
  }

  updateProduct() {
    if (!this.productToEdit || !this.productToEdit._id) {
      console.error('ID de produit non défini pour la mise à jour :', this.productToEdit);
      alert('Impossible de mettre à jour le produit car l\'ID est non défini.');
      return;
    }

    this.productService.updateProduct({ ...this.productToEdit }).subscribe(
      response => {
        alert('Produit mis à jour avec succès');
        this.loadInitialData();
        this.productToEdit = null;
      },
      error => {
        console.error('Erreur lors de la mise à jour du produit :', error);
        alert('Erreur lors de la mise à jour du produit');
      }
    );
  }

  resetForm() {
    this.newProduct = {
      nameprod: '',
      desc: '',
      prix: 0,
      pictureprod: '',
      quantiteprod: 0,
      categoryprod: '',
      dateAddedprod: new Date()
    };
  }

  findCategoryById(id?: string): string {
    const safeId = id ?? '';
    const category = this.categories.find(cat => cat._id === safeId);
    return category ? category.namecat : 'Non disponible';
  }
  addToCart(product: produit) {
    if (product._id) {
      this.panierService.addProductToPanier(product._id, 1).subscribe(
        response => {
          alert('Produit ajouté au panier avec succès');
        },
        error => {
          console.error('Erreur lors de l\'ajout du produit au panier :', error);
          alert('Erreur lors de l\'ajout du produit au panier');
        }
      );
    } else {
      console.error('ID de produit non défini :', product);
      alert('Impossible d\'ajouter le produit au panier car l\'ID est non défini.');
    }
  }

}
