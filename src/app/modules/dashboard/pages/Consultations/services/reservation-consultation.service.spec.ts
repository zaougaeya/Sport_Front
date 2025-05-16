import { TestBed } from '@angular/core/testing';

import { ReservationConsultationService } from './reservation-consultation.service';

describe('ReservationConsultationService', () => {
  let service: ReservationConsultationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationConsultationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
