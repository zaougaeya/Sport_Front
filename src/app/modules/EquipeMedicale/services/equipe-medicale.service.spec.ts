import { TestBed } from '@angular/core/testing';

import { EquipeMedicaleService } from './equipe-medicale.service';

describe('EquipeMedicaleService', () => {
  let service: EquipeMedicaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipeMedicaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
