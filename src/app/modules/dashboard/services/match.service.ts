import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match } from '../models/match.model';
@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private apiUrl = 'http://localhost:8081/api/matches'; // adapte selon ton endpoint backend

  constructor(private http: HttpClient) { }

// ✅ créer un match
  createMatch(match: Match): Observable<Match> {
    
    
    return this.http.post<Match>(`${this.apiUrl}`, match);
  }

   // ✅ récupérer tous les matchs
   getAllMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.apiUrl}`);
  }

  //✅ récupérer match par id
  getMatchById(id: string): Observable<Match> {
    return this.http.get<Match>(`${this.apiUrl}/${id}`);
  }

  // ✅ mettre à jour un  match 
  updateMatch(id: string, match: Match): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/update/${id}`, match);
  }

  // ✅ Supprimer un match
  deleteMatch(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete/${id}`);
  }

  // ✅ Affecter deux équipes à un match
  affecterEquipes(matchId: string, equipeId1: string, equipeId2: string): Observable<Match> {
    return this.http.post<Match>(`${this.apiUrl}/${matchId}/affecter-equipes`, { equipeId1, equipeId2 });
  }

   // ✅ Affecter un terrain
   affecterTerrain(matchId: string, terrainId: string): Observable<Match> {
    return this.http.post<Match>(`${this.apiUrl}/${matchId}/affecter-terrain`, { terrainId });
  }

  // ✅ Affecter une date
  affecterDate(matchId: string, date: Date): Observable<Match> {
    return this.http.post<Match>(`${this.apiUrl}/${matchId}/affecter-date`, { date });
  }

   // ✅ Affecter un score
   affecterScores(matchId: string, score1: number, score2: number): Observable<Match> {
    return this.http.post<Match>(`${this.apiUrl}/${matchId}/affecter-scores`, { score1, score2 });
  }
  // ✅ Obtenir les statistiques d’un match
  getStatistiques(matchId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${matchId}/statistiques`);
  }


}
