// src/app/services/commande.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Categorie {
    idCommande: string;
  montantTotal: number;
  dateCommande: string;
  adresseLivraison: string;
  nomClient: string;
  emailClient: string;
  telephoneClient: string;
  statutCommande: StatutCommande;
 // produits: CommandeProduit[];
  // Si tu veux utiliser les objets livreur et client plus tard :
  livreur?: any;
  client?: any;

  }
  export enum StatutCommande {
    EN_PREPARATION = 'EN_PREPARATION',
    EXPEDIEE = 'EXPEDIEE',
    LIVREE = 'LIVREE',
    ANNULEE = 'ANNULEE'
  }
@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private baseUrl = 'http://localhost:8081/api/commandes';

  constructor(private http: HttpClient) {}

  getAllCommandes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }
}
