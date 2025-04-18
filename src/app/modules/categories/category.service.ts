import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Categorie {
  _id?: number;
  nom: string;
  description: string;
}

@Injectable({
  providedIn: 'root' // <-- Assure-toi que `providedIn: 'root'` est bien présent
})
export class CategoryService {
  private baseUrl = 'http://localhost:8081/api/categories'; // Remplace par ton backend

  constructor(private http: HttpClient) {}

  ajouterCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(`${this.baseUrl}/add`, categorie);
  }

  getAllCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.baseUrl}`); 
  }

  supprimerCategorie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  modifierCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.put<Categorie>(`${this.baseUrl}/update/${categorie._id}`, categorie);
  }
}
