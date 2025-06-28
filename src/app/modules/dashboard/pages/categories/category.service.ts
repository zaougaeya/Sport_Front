import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Categorie {
  id?: string;
  nom: string;
  description: string;
}

@Injectable({
  providedIn: 'root' // <-- Assure-toi que `providedIn: 'root'` est bien présent
})
export class CategoryService {
  private baseUrl = 'http://localhost:8087/api/categories'; // Remplace par ton backend

  constructor(private http: HttpClient) {}

  ajouterCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(`${this.baseUrl}/add`, categorie);
  }

  getAllCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.baseUrl}`); 
  }

  supprimerCategorie(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
    
  }  
  
  modifierCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.put<Categorie>(`${this.baseUrl}/${categorie.id}`, categorie); 
  }
}
