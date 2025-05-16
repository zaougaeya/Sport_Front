import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EquipeMedicale } from '../models/equipes-medicales.model';

@Injectable({
  providedIn: 'root'
})
export class EquipesMedicalesService {

  
  private apiUrl = 'http://localhost:8081/equipes'; // adjust if different

  constructor(private http: HttpClient) { }

  createEquipe(equipe: EquipeMedicale): Observable<EquipeMedicale> {
    return this.http.post<EquipeMedicale>(this.apiUrl, equipe);
  }

  getAllEquipes(): Observable<EquipeMedicale[]> {
    return this.http.get<EquipeMedicale[]>(this.apiUrl);
  }

  deleteEquipe(id: string): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}

 // Update the medical team
  updateEquipeMedicale(id: string, equipe: EquipeMedicale): Observable<EquipeMedicale> {
    return this.http.put<EquipeMedicale>(`${this.apiUrl}/${id}`, equipe);
  }

  // You can add other methods if necessary, like fetching a single equipe by ID
  getEquipeById(id: string): Observable<EquipeMedicale> {
    return this.http.get<EquipeMedicale>(`${this.apiUrl}/${id}`);
  }
}
