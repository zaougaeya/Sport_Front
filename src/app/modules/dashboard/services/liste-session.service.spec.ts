import { TestBed } from '@angular/core/testing';
import { ListeSessionService } from './liste-session.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // <-- important !

describe('ListeSessionService', () => {
  let service: ListeSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // <-- Ajout ici
    });
    service = TestBed.inject(ListeSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
