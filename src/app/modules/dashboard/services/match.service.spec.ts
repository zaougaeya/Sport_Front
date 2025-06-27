import { TestBed } from '@angular/core/testing';
import { MatchService } from './match.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MatchService', () => {
  let service: MatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // <-- Ajout indispensable
      providers: [MatchService]
    });
    service = TestBed.inject(MatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
