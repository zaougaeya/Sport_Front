import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  // 🔧 À personnaliser si besoin
  private readonly baseUrl = 'http://localhost:8087/api/panier';

 
    private readonly userId = '683cd30c75078b686d4e44b5'; // statique pour l'instant
  private readonly token = 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiI2ODNjZDMwYzc1MDc4YjY4NmQ0ZTQ0YjUiLCJyb2xlIjoiVVNFUiIsImpvYiI6IkpPVUVVUiIsImlhdCI6MTc0ODgxNjY4NCwiZXhwIjoxNzQ4OTAzMDg0fQ.65eIQwo1CbuA1ovDUEV3F5t0Vf7ISKbqtQYffVGFFEjEoFg5IXjl0fBcZKxoLwWH';

  constructor(private http: HttpClient) {}

private getHeaders(): HttpHeaders {
  return new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });
}

 ajouterProduitAuPanier(userId: string, produitId: string, quantite: number): Observable<any> {
  const url = `${this.baseUrl}/ajouter?userId=${userId}&produitId=${produitId}&quantite=${quantite}`;
  const headers = this.getHeaders();  // getHeaders ajoute le Bearer
  return this.http.post<any>(url, {}, { headers });
}


  // ✅ Récupérer le panier de l'utilisateur
  getPanier(): Observable<any> {
    const url = `${this.baseUrl}/utilisateur/${this.userId}`;
    return this.http.get<any>(url, { headers: this.getHeaders() });
  }

  // ✅ Supprimer un produit du panier
  supprimerProduit(produitId: string): Observable<any> {
    const url = `${this.baseUrl}/supprimer?userId=${this.userId}&produitId=${produitId}`;
    return this.http.delete<any>(url, { headers: this.getHeaders() });
  }

  // ✅ Vider tout le panier
  viderPanier(): Observable<any> {
    const url = `${this.baseUrl}/vider/${this.userId}`;
    return this.http.delete<any>(url, { headers: this.getHeaders() });
  }


getProduitsDuPanier(): Observable<any> {
  const url = `${this.baseUrl}/produits/${this.userId}`;
  return this.http.get<any>(url, { headers: this.getHeaders() });
}


}
