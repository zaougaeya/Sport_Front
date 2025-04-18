// src/app/shared/pipes/nameequipe.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { EquipeService } from '../services/equipe.service';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Pipe({
  name: 'nameequipe',
  standalone: true, 
  pure: false
})
export class NameEquipePipe implements PipeTransform {
  private equipeNames: { [id: string]: string } = {};

  constructor(private equipeService: EquipeService) {}

  transform(id: string): string | null {
    if (!id) return null;

    if (this.equipeNames[id]) {
      return this.equipeNames[id];
    }

    this.equipeService.getEquipeById(id).subscribe((equipe) => {
        
      if (equipe) {
        this.equipeNames[id] = equipe.nameEquipe;
      } else {
        this.equipeNames[id] = 'Équipe inconnue';
      }
    });

    return this.equipeNames[id] ?? '...';
  }
}
