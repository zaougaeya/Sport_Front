import { TestBed } from '@angular/core/testing';

import { CreneauReservationService } from './creneau-reservation.service';

describe('CreneauReservationService', () => {
  let service: CreneauReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreneauReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
