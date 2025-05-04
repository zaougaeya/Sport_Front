import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Materiel } from "../../../core/models/materiel.model";

@Injectable({
  providedIn: 'root'
})
export class MaterielService {
  private baseUrl = 'http://localhost:8081/api/materiels'; // L'URL de votre API backend

  constructor(private http: HttpClient) { }

  ajouterMateriel(materiel: Materiel): Observable<Materiel> {
    return this.http.post<Materiel>(`${this.baseUrl}`, materiel); // POST sur l'URL de base pour ajouter
  }

  createMaterielWithImage(formData: FormData): Observable<Materiel> {
    return this.http.post<Materiel>(`${this.baseUrl}/upload`, formData);
  }

  getAllMateriel(): Observable<Materiel[]> {
    return this.http.get<Materiel[]>(`${this.baseUrl}`);
  }

  supprimerMateriel(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  modifierMateriel(materiel: Materiel): Observable<Materiel> {
    return this.http.put<Materiel>(`${this.baseUrl}/${materiel.id}`, materiel);
  }

  getAvailableMateriel(): Observable<Materiel[]> {
    return this.http.get<Materiel[]>(`${this.baseUrl}/available`);
  }

  getMaterielByCategory(category: string): Observable<Materiel[]> {
    return this.http.get<Materiel[]>(`${this.baseUrl}/category/${category}`);
  }

  getMaterielById(id: string): Observable<Materiel> {
    return this.http.get<Materiel>(`${this.baseUrl}/${id}`);
  }

  getBySportType(sportType: string): Observable<Materiel[]> {
    return this.http.get<Materiel[]>(`${this.baseUrl}/sport-type/${sportType}`);
  }

  getByColor(color: string): Observable<Materiel[]> {
    return this.http.get<Materiel[]>(`${this.baseUrl}/color/${color}`);
  }

  getByState(state: string): Observable<Materiel[]> {
    return this.http.get<Materiel[]>(`${this.baseUrl}/state/${state}`);
  }
}
