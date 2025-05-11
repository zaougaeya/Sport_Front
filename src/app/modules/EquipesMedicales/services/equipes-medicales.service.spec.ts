import { TestBed } from '@angular/core/testing';

import { EquipesMedicalesService } from './equipes-medicales.service';

describe('EquipesMedicalesService', () => {
  let service: EquipesMedicalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipesMedicalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
