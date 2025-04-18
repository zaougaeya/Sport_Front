import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Terrain } from '../models/terrain.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TerrainService {
  private baseUrl = 'http://localhost:8081/api/terrains';
  constructor(private http: HttpClient) { }
  getAllTerrains(): Observable<Terrain[]> {
    return this.http.get<Terrain[]>(this.baseUrl);
  }

  getTerrainById(id: string): Observable<Terrain> {
    return this.http.get<Terrain>(`${this.baseUrl}/${id}`);
  }

  createTerrain(terrain: Terrain): Observable<any> {
    return this.http.post(this.baseUrl, terrain);
  }

  updateTerrain(id: string, terrain: Terrain): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, terrain);
  }

  deleteTerrain(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}


