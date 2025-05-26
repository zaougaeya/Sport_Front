import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Terrain, TerrainCreationDTO } from '../models/terrain.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TerrainService {
  private baseUrl = 'http://localhost:7071/api/terrains';
  constructor(private http: HttpClient) { }
  getAllTerrains(): Observable<Terrain[]> {
    return this.http.get<Terrain[]>(this.baseUrl);
  }

  getTerrainById(id: string): Observable<Terrain> {
    return this.http.get<Terrain>(`${this.baseUrl}/${id}`);
  }

  createTerrain(terrain: TerrainCreationDTO): Observable<Terrain> {
    return this.http.post<Terrain>(this.baseUrl, terrain);
  }
  

  updateTerrain(id: string, terrain: Terrain): Observable<Terrain> {
    return this.http.put<Terrain>(`${this.baseUrl}/${id}`, terrain);
  }

  deleteTerrain(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}


