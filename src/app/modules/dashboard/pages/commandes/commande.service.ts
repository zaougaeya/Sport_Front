// src/app/services/commande.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commande } from '../commandes/commande.model'
import { Livreur } from '../livreurs/livreur.model'

@Injectable({
  providedIn: 'root',
})
export class CommandeService {
  private baseUrl = 'http://localhost:8087/api/commandes';
  private livreurUrl = 'http://localhost:8087/api/livreurs';

  constructor(private http: HttpClient) {}

  getAllCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.baseUrl}/all`);
  }

  /**
   * ✅ Récupérer tous les livreurs disponibles
   */
  getLivreursDisponibles(): Observable<Livreur[]> {
    return this.http.get<Livreur[]>(`${this.livreurUrl}/disponibles`);
  }

  /**
   * ✅ Affecter un livreur à une commande
   * @param commandeId L'identifiant de la commande
   * @param livreurId L'identifiant du livreur
   */
 affecterLivreur(idLivreur: string, idCommandes: string | string[]): Observable<any> {
  // On s'assure que c'est un tableau (si c'est un string, on le met dans un tableau)
  const commandes = Array.isArray(idCommandes) ? idCommandes : [idCommandes];

  console.log("Commandes envoyées :", commandes); // ➡️ Pour vérifier les données envoyées

  // On stringify le tableau pour le convertir en JSON
  const body = JSON.stringify(commandes);

  // ➡️ Envoi de la requête avec le bon header Content-Type
  return this.http.post(`http://localhost:8087/api/livreurs/${idLivreur}/assigner-commandes`, body, {
    headers: { 'Content-Type': 'application/json' }
  });
}  
supprimerCommande(idCommande: string): Observable<any> {
  return this.http.delete(`${this.baseUrl}/supprimer-commande/${idCommande}`);
}




}
