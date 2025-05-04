import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commande } from '../models/commande.model';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private apiUrl = 'http://localhost:3000/commande'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  createCommande(commande: Commande): Observable<Commande> {
    return this.http.post<Commande>(`${this.apiUrl}/`, commande);
  }

  getAllCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.apiUrl}/`);
  }

  getCommandeById(id: string): Observable<Commande> {
    return this.http.get<Commande>(`${this.apiUrl}/${id}`);
  }

  updateCommande(id: string, commande: Commande): Observable<Commande> {
    return this.http.put<Commande>(`${this.apiUrl}/${id}`, commande);
  }

  deleteCommande(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
