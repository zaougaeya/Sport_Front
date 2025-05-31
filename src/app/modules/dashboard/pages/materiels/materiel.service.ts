import { Injectable } from '@angular/core';
import {Materiel} from "./materiel.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

interface MaterielPage {
  content: Materiel[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class MaterielService {
  private baseUrl = 'http://localhost:8084/api/materiels';

  constructor(private http: HttpClient) { }

  // ✅ Cas sans image
  ajouterMateriel(materiel: Materiel): Observable<Materiel> {
    return this.http.post<Materiel>(`${this.baseUrl}`, materiel)
      .pipe(catchError(this.handleError));
  }

  // ✅ Cas avec image (upload via FormData)
  createMaterielWithImage(formData: FormData): Observable<Materiel> {
    return this.http.post<Materiel>(`${this.baseUrl}/upload`, formData)
      .pipe(catchError(this.handleError));
  }

  // ✅ Liste complète
  getAllMateriel(): Observable<Materiel[]> {
    return this.http.get<Materiel[]>(`${this.baseUrl}`)
      .pipe(catchError(this.handleError));
  }

  // ✅ Liste paginée, recherche, tri
  getMaterielsPaginated(
    page: number,
    size: number,
    searchTerm: string = '',
    sortColumn: string = '',
    sortDirection: 'asc' | 'desc' = 'asc'
  ): Observable<MaterielPage> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (searchTerm) {
      params = params.set('searchTerm', searchTerm);
    }

    if (sortColumn) {
      params = params.set('sort', `${sortColumn},${sortDirection}`);
    }

    return this.http.get<MaterielPage>(`${this.baseUrl}/paginated`, { params })
      .pipe(catchError(this.handleError));
  }

  // ✅ Suppression
  supprimerMateriel(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // ✅ Modification
  modifierMateriel(materiel: Materiel): Observable<Materiel> {
    return this.http.put<Materiel>(`${this.baseUrl}/${materiel.id}`, materiel)
      .pipe(catchError(this.handleError));
  }

  // ✅ Filtres spécifiques
  getAvailableMateriel(): Observable<Materiel[]> {
    return this.http.get<Materiel[]>(`${this.baseUrl}/available`)
      .pipe(catchError(this.handleError));
  }

  getMaterielByCategory(category: string): Observable<Materiel[]> {
    return this.http.get<Materiel[]>(`${this.baseUrl}/category/${category}`)
      .pipe(catchError(this.handleError));
  }

  getMaterielById(id: string | number): Observable<Materiel> {
    return this.http.get<Materiel>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getBySportType(sportType: string): Observable<Materiel[]> {
    return this.http.get<Materiel[]>(`${this.baseUrl}/sport-type/${sportType}`)
      .pipe(catchError(this.handleError));
  }

  getByColor(color: string): Observable<Materiel[]> {
    return this.http.get<Materiel[]>(`${this.baseUrl}/color/${color}`)
      .pipe(catchError(this.handleError));
  }

  getByState(state: string): Observable<Materiel[]> {
    return this.http.get<Materiel[]>(`${this.baseUrl}/state/${state}`)
      .pipe(catchError(this.handleError));
  }

  // ✅ Gestion des erreurs centralisée
  private handleError(error: any) {
    console.error('Une erreur est survenue:', error);
    return throwError(() => new Error('Erreur lors de la communication avec le serveur.'));
  }
}
