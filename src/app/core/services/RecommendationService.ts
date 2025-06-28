import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Importer le type Produit existant (vérifie le chemin exact si besoin)
import { Produit } from 'src/app/modules/dashboard/pages/produits/produit.service';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  private apiUrl = 'http://localhost:8087/api/recommandation'; // URL de base de ton backend

  private readonly userId = '683cd30c75078b686d4e44b5'; // statique pour l'instant
  private readonly token = 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiI2ODNjZDMwYzc1MDc4YjY4NmQ0ZTQ0YjUiLCJyb2xlIjoiVVNFUiIsImpvYiI6IkpPVUVVUiIsImlhdCI6MTc0ODgxNjY4NCwiZXhwIjoxNzQ4OTAzMDg0fQ.65eIQwo1CbuA1ovDUEV3F5t0Vf7ISKbqtQYffVGFFEjEoFg5IXjl0fBcZKxoLwWH';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    // Assure-toi que le token est au format 'Bearer votreToken'
    return new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
  }

  /**
   * Récupère les produits recommandés pour l'utilisateur statique en se basant sur son historique d'achats.
   * Cette méthode utilise l'endpoint '/historique/{userId}' de ton backend.
   * @returns Un Observable de tableau de produits.
   */
  getRecommandationsHistoriques(): Observable<Produit[]> {
    const headers = this.getHeaders();
    // Appel à l'endpoint spécifique pour l'historique d'achats
    console.log(`Appel à l'API de recommandation historique: ${this.apiUrl}/historique/${this.userId}`);
    return this.http.get<Produit[]>(`${this.apiUrl}/historique/${this.userId}`, { headers });
  }

  // L'ancienne méthode 'getRecommandations()' est supprimée car elle ne correspond plus
  // à l'objectif des recommandations basées sur l'historique avec un panier vide.
}
