// src/app/shared/pipes/nameterrain.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { TerrainService } from '../services/terrain.service';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Pipe({
  name: 'nameterrain',
  standalone: true, 
  pure: false
})
export class Nameterrainpipe implements PipeTransform {
  private terrainNames: { [id: string]: string } = {};

  constructor(private terrainService: TerrainService) {}

  transform(id: string): string | null {
    if (!id) return null;

    if (this.terrainNames[id]) {
      return this.terrainNames[id];
    }

    this.terrainService.getTerrainById(id).subscribe((terrain) => {
        
      if (terrain) {
        this.terrainNames[id] = terrain.name    ;
      } else {
        this.terrainNames[id] = 'Équipe inconnue';
      }
    });

    return this.terrainNames[id] ?? '...';
  }
}
