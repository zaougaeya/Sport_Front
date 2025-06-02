import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionDeJeu } from '../models/SessionDejeu';

@Injectable({
  providedIn: 'root'
})
export class ListeSessionService {
  private apiUrl = 'http://localhost:7071/api/sessions';

  constructor(private http: HttpClient) { }

  getAllSessions(): Observable<SessionDeJeu[]> {
    return this.http.get<SessionDeJeu[]>(`${this.apiUrl}`);
  }

  getSessionById(id: string): Observable<SessionDeJeu> {
    return this.http.get<SessionDeJeu>(`${this.apiUrl}/${id}`);
  }

  createSession(session: SessionDeJeu): Observable<SessionDeJeu> {
    return this.http.post<SessionDeJeu>(this.apiUrl, session);
  }

  updateSession(id: string, session: SessionDeJeu): Observable<SessionDeJeu> {
    return this.http.put<SessionDeJeu>(`${this.apiUrl}/${id}`, session);
  }

  deleteSession(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getSessionsByType(type: string): Observable<SessionDeJeu[]> {
    return this.http.get<SessionDeJeu[]>(`${this.apiUrl}/type/${type}`);
  }

  getSessionsByStatut(statut: string): Observable<SessionDeJeu[]> {
    return this.http.get<SessionDeJeu[]>(`${this.apiUrl}/statut/${statut}`);
  }

  getSessionsByTerrain(terrainId: string): Observable<SessionDeJeu[]> {
    return this.http.get<SessionDeJeu[]>(`${this.apiUrl}/terrain/${terrainId}`);
  }

  searchSessions(dateDebut: string, dateFin: string, typeMatch: string): Observable<SessionDeJeu[]> {
    const url = `http://localhost:7071/api/sessions/search?dateDebut=${dateDebut}&dateFin=${dateFin}&typeMatch=${typeMatch}`;
    return this.http.get<SessionDeJeu[]>(url);
  }

}
