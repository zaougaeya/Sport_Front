// livreur.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livreur } from './livreur.model';

@Injectable({
  providedIn: 'root'
})
export class LivreurService {
  private baseUrl = 'http://localhost:8087/api/livreurs';

  constructor(private http: HttpClient) {}

  ajouterLivreur(livreur: Livreur): Observable<Livreur> {
    return this.http.post<Livreur>(this.baseUrl, livreur); 
  }

  getAllLivreurs(): Observable<Livreur[]> {
    return this.http.get<Livreur[]>(this.baseUrl);
  }

  supprimerLivreur(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  modifierLivreur(livreur: Livreur): Observable<Livreur> {
    return this.http.put<Livreur>(`${this.baseUrl}/${livreur.idLivreur}`, livreur);
  }

  getLivreurById(id: string): Observable<Livreur> {
    return this.http.get<Livreur>(`${this.baseUrl}/${id}`);
  }
  getLivreursDisponibles(): Observable<Livreur[]> {
    return this.http.get<Livreur[]>(`${this.baseUrl}/disponibles`);
  }
}

