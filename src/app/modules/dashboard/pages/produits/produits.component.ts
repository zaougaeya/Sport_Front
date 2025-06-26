import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProduitService, Produit } from './produit.service';
import { CategoryService, Categorie } from '../categories/category.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  standalone: true,
  selector: 'app-produit',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgxPaginationModule],
})
export class ProduitsComponent implements OnInit {
  produitForm!: FormGroup;
  produits: Produit[] = [];
  categories: Categorie[] = [];
  categorieMap: { [key: string]: string } = {};
  isEditing: boolean = false;
  currentPage: number = 1;
  ruptureProduits: string[] = [];
  showAlert: boolean = false;
  genres: string[] = ['HOMME', 'FEMME', 'ENFANT', 'TOUT'];

  produit: Produit = {
    id: '',
    nom: '',
    description: '',
    prix: 0,
    quantiteEnStock: 0,
    imageUrl: '',
    pourcentagePromotion: 0,
    genreProduit: 'HOMME',
    categorie: {
      nom: '',
      description: ''
    },
    disponible: false,
    statutProduit: 'RUPTURE_DE_STOCK',
    dateAjout: new Date()
  };

  constructor(
    private fb: FormBuilder,
    private produitService: ProduitService,
    private categorieService: CategoryService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.chargerProduits();
    this.chargerCategories();
  }

  searchTerm: string = '';

  get filteredProduits() {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      return this.produits;
    }
    const term = this.searchTerm.toLowerCase();
    return this.produits.filter(p =>
      p.nom.toLowerCase().includes(term) ||
      p.categorie?.nom?.toLowerCase().includes(term)
    );
  }

  initForm(): void {
    const currentDateISO = new Date().toISOString();
    this.produitForm = this.fb.group({
      nom: [this.produit.nom, Validators.required],
      description: [this.produit.description, Validators.required],
      prix: [this.produit.prix, [Validators.required, Validators.min(0)]],
      quantiteEnStock: [this.produit.quantiteEnStock, [Validators.required, Validators.min(0)]],
      imageUrl: [this.produit.imageUrl, Validators.required],
      pourcentagePromotion: [this.produit.pourcentagePromotion, [Validators.min(0), Validators.max(100)]],
      genreProduit: [this.produit.genreProduit, Validators.required],
      categorie: [this.produit.categorie, Validators.required],
      statutProduit: [this.produit.statutProduit, Validators.required],
      dateAjout: [currentDateISO]
    });
  }

  chargerProduits(): void {
    this.produitService.getAllProduits().subscribe((data) => {
      this.produits = data;
      this.checkRuptureStock();
    });
  }

  checkRuptureStock(): void {
    this.ruptureProduits = this.produits
      .filter(p => p.quantiteEnStock === 0)
      .map(p => p.nom);

    if (this.ruptureProduits.length > 0) {
      this.showAlert = true;

      setTimeout(() => {
        this.showAlert = false;
      }, 5000);
    }
  }

  chargerCategories(): void {
    this.categorieService.getAllCategories().subscribe((cats) => {
      this.categories = cats;
      this.categorieMap = {};
      cats.forEach(cat => {
        if (cat.id !== undefined) {
          this.categorieMap[cat.id] = cat.nom;
        }
      });
    });
  }

  onSubmit(): void {
    if (this.produitForm.invalid) return;

    const formValue = this.produitForm.value;
    const produit: Produit = {
      ...formValue,
      disponible: formValue.quantiteEnStock > 0,
      statutProduit: formValue.quantiteEnStock > 0 ? 'EN_STOCK' : 'RUPTURE_DE_STOCK',
    };

    if (this.isEditing && this.produit.id) {
      this.produitService.modifierProduit(this.produit.id, produit).subscribe(() => {
        this.resetForm();
        this.chargerProduits();
      });
    } else {
      this.produitService.ajouterProduit(produit).subscribe(() => {
        this.resetForm();
        this.chargerProduits();
      });
    }
  }

  modifier(produit: Produit): void {
    this.isEditing = true;
    this.produit = produit;
    this.produitForm.patchValue({
      ...produit,
      categorie: typeof produit.categorie === 'string' ? produit.categorie : produit.categorie.id || produit.categorie
    });
  }

  supprimer(id?: string): void {
    if (!id) return;

    const confirmation = window.confirm('Voulez-vous vraiment supprimer ce produit ?');

    if (confirmation) {
      this.produitService.supprimerProduit(id).subscribe(() => {
        this.chargerProduits();
      });
    }
  }

  getNomCategorie(categorieId: string | undefined): string {
    if (!categorieId) {
      return 'Catégorie inconnue';
    }

    const categorie = this.categories.find(cat => cat.id === categorieId);
    return categorie ? categorie.nom : 'Catégorie inconnue';
  }

  resetForm(): void {
    this.produitForm.reset();
    this.isEditing = false;
    this.produit = {
      id: '',
      nom: '',
      description: '',
      prix: 0,
      quantiteEnStock: 0,
      imageUrl: '',
      pourcentagePromotion: 0,
      genreProduit: 'HOMME',
      categorie: {
        nom: '',
        description: ''
      },
      disponible: false,
      statutProduit: 'RUPTURE_DE_STOCK',
      dateAjout: new Date()
    };
  }
}