import { TestBed } from '@angular/core/testing';

import { ListeSessionService } from './liste-session.service';

describe('ListeSessionService', () => {
  let service: ListeSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListeSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
