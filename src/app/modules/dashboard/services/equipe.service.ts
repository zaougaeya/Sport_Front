import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Equipe } from '../models/equipe.model';
import { catchError, Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EquipeService {
  private baseUrl = 'http://localhost:8081/api/equipes';
  constructor(private http: HttpClient) { }
  getAllEquipes(): Observable<Equipe[]> {
    return this.http.get<Equipe[]>(`${this.baseUrl}`);
  }

  getEquipeById(id: string): Observable<Equipe | null> {
    if (!id) return of(null);
    return this.http.get<Equipe>(`http://localhost:8081/api/equipes/${id}`).pipe(
      catchError(() => of(null)) // en cas d'erreur
    );
  }

  createEquipe(equipe: Equipe): Observable<Equipe> {
    return this.http.post<Equipe>(this.baseUrl, equipe);
  }

  updateEquipe(id: string, equipe: Equipe): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, equipe);
  }

  deleteEquipe(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

