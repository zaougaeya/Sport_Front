import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Equipe } from '../models/equipe.model';
import { catchError, Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EquipeService {
  
  private baseUrl = 'http://localhost:7071/api/equipes';
  constructor(private http: HttpClient) { }
  getAllEquipes(): Observable<Equipe[]> {
    return this.http.get<Equipe[]>(`${this.baseUrl}`);
  }

  getEquipeById(id: string): Observable<Equipe | null> {
    if (!id) return of(null);
    return this.http.get<Equipe>(`${this.baseUrl}/${id}`).pipe(
      catchError(() => of(null))
    );
  }

  // createEquipe(equipe: Equipe): Observable<Equipe> {
  //   return this.http.post<Equipe>(this.baseUrl, equipe);
  // }
  createEquipe(formData: FormData): Observable<Equipe> {
    return this.http.post<Equipe>(this.baseUrl, formData);
  }

  updateEquipe(id: string, equipe: Equipe): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, equipe);
  }

  deleteEquipe(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getUsersByEquipe(equipeId: string) {
    return this.http.get<any[]>(`${this.baseUrl}/${equipeId}/users`);
  }

}

