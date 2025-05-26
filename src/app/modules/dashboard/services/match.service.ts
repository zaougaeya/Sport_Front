import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match } from '../models/match.model';
//import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private apiUrl = 'http://localhost:7071/api/matches'; // adapte selon ton endpoint backend

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
  updateMatch(id: string, match: Match): Observable<Match> {
    return this.http.put<Match>(`${this.apiUrl}/${id}`, match);
  }

  updateMatchScore(id: string, scoreEquipe1: number, scoreEquipe2: number): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${id}/score?scoreEquipe1=${scoreEquipe1}&scoreEquipe2=${scoreEquipe2}`, {});
  }

  // ✅ Supprimer un match
  deleteMatch(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
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
  // ✅ Obtenir les statistiques d’une équipe
// Dans le service MatchService
getStatistiquesParEquipe(): Observable<Map<string, Map<string, number>>> {
  return this.http.get<Map<string, Map<string, number>>>(`${this.apiUrl}/statistiques`);
}

getStatistiquesParEquipeEtDates(dateD: string, dateF: string): Observable<Map<string, Map<string, number>>> {
  console.log(dateD);
  console.log(dateF);
  
  return this.http.get<Map<string, Map<string, number>>>(`${this.apiUrl}/statistiques/${dateD}/${dateF}`);
}



}
