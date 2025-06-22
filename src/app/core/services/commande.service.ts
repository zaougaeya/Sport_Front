import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private readonly baseUrl = 'http://localhost:8087/api/commandes';
  private readonly userId = '683cd30c75078b686d4e44b5'; 
  private readonly token = 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiI2ODNjZDMwYzc1MDc4YjY4NmQ0ZTQ0YjUiLCJyb2xlIjoiVVNFUiIsImpvYiI6IkpPVUVVUiIsImlhdCI6MTc0ODgxNjY4NCwiZXhwIjoxNzQ4OTAzMDg0fQ.65eIQwo1CbuA1ovDUEV3F5t0Vf7ISKbqtQYffVGFFEjEoFg5IXjl0fBcZKxoLwWH';

  constructor(private http: HttpClient) {}

private getHeaders(): HttpHeaders {
    return new HttpHeaders({
        'Content-Type': 'application/json',
    
        'Authorization': `Bearer ${this.token}` 
       
    });
  }

  creerCommande(): Observable<any> {
    const url = `${this.baseUrl}/creer/${this.userId}`;
    return this.http.post(url, null, { headers: this.getHeaders() });
  }
}
