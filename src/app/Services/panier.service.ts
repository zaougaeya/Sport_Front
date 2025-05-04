import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';
import { Panier } from '../models/panier.model';
import { article } from '../core/models/article';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private apiUrl = 'http://localhost:3000/panier';

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  getPanier(): Observable<Panier> {
    const userId = this.sessionService.getUserId();

    if (!userId) {
      throw new Error('User ID not found in session');
    }

    return this.http.get<Panier>(`${this.apiUrl}/${userId}`);
  }

  updatePanier(panier: Panier): Observable<Panier> {
    const userId = this.sessionService.getUserId();

    if (!userId) {
      throw new Error('User ID not found in session');
    }

    return this.http.put<Panier>(`${this.apiUrl}/${userId}`, panier);
  }

  generateQRCode(panierId: string): Observable<any> {
    const userId = this.sessionService.getUserId();

    if (!userId) {
      throw new Error('User ID not found in session');
    }

    return this.http.get<any>(`${this.apiUrl}/qr/${panierId}`);
  }

  clearPanier(panierId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${panierId}`);
  }

  addArticleToPanier(articleId: string, quantity: number): Observable<Panier> {
    const userId = this.sessionService.getUserId();
    return this.http.post<Panier>(`${this.apiUrl}/${userId}/addarticle`, { articleId, quantity });
  }

  addProductToPanier(productId: string, quantity: number): Observable<Panier> {
    const userId = this.sessionService.getUserId();
    console.log(userId);

    return this.http.post<Panier>(`${this.apiUrl}/${userId}/addproduct`, { productId, quantity });
  }
  
 

}
