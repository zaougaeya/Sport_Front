import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private readonly baseUrl = 'http://localhost:8087/api/commandes';
  private readonly userId = '683622ef0170a3176cd30a59'; 
  private readonly token = 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiI2ODM2MjJlZjAxNzBhMzE3NmNkMzBhNTkiLCJyb2xlIjoiVVNFUiIsImpvYiI6IkpPVUVVUiIsImlhdCI6MTc0ODY0NzAwMCwiZXhwIjoxNzQ4NzMzNDAwfQ.EUqw5fH-kvS2Y8QytMns1ce9bL1Vd_8voP6_2rLfxkvOym5MZ1nECZd8pzrt0OYt'; 

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  }

  // ✅ Appel à POST /api/commandes/creer/{userId}
  creerCommande(): Observable<any> {
    const url = `${this.baseUrl}/creer/${this.userId}`;
    return this.http.post(url, null, { headers: this.getHeaders() });
  }
}
