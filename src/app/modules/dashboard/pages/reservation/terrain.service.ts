import { Injectable } from '@angular/core';
import { Terrain } from './terrain.model';

@Injectable({ providedIn: 'root' })
export class TerrainService {
  private terrains: Terrain[] = [
    {
      id: '1', name: 'Stade El Menzah', governorate: 'Tunis',
      sportType: 'Football', latitude: 36.8411, longitude: 10.2011
    },
    {
      id: '2', name: 'Tennis Club de Tunis', governorate: 'Tunis',
      sportType: 'Tennis', latitude: 36.8183, longitude: 10.1655
    },
    {
      id: '3', name: 'Padel Center Gammarth', governorate: 'Tunis',
      sportType: 'Padel', latitude: 36.9102, longitude: 10.2695
    }
  ];

  getTerrains(): Terrain[] {
    return this.terrains;
  }

  getById(id: string): Terrain | undefined {
    return this.terrains.find(t => t.id === id);
  }
}
