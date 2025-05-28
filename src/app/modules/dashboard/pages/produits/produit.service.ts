import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorie } from '../categories/category.service';

export interface Produit {
  id?: string;
  nom: string;
  description: string;
  prix: number;
  quantiteEnStock: number;
  imageUrl: string;
  disponible: boolean;
  pourcentagePromotion: number;
  genreProduit: 'HOMME' | 'FEMME' | 'ENFANT';
  statutProduit: 'EN_STOCK' | 'RUPTURE_DE_STOCK';
  categorie: Categorie;
  dateAjout: Date;
   nbCommandes?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  private apiUrl = 'http://localhost:8087/api/produits';

  constructor(private http: HttpClient) {}

  getAllProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiUrl);
  }

  ajouterProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.apiUrl, produit);
  }

  modifierProduit(id: string, produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiUrl}/${id}`, produit);
  }

  supprimerProduit(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}
