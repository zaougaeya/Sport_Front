import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // <-- Import du module de test HttpClient
import { EquipeService } from './equipe.service';

describe('EquipeService', () => {
  let service: EquipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],   // <-- Ajout du module ici
    });
    service = TestBed.inject(EquipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
