import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private readonly baseUrl = 'http://localhost:8087/api/commandes';
  private readonly userId = '683622ef0170a3176cd30a59'; // statique pour l'instant
  private readonly token = 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiI2ODM2MjJlZjAxNzBhMzE3NmNkMzBhNTkiLCJyb2xlIjoiVVNFUiIsImpvYiI6IkpPVUVVUiIsImlhdCI6MTc0ODY4NjU4NywiZXhwIjoxNzQ4NzcyOTg3fQ.MWBJu2P5642a-uC7v9WsVlAmg9ywGpMhCgpqHKicBZ2kXQO1OeQReIe9OF7afm2Q';

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
