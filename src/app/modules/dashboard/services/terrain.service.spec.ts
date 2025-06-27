import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import nécessaire
import { TerrainService } from './terrain.service';

describe('TerrainService', () => {
  let service: TerrainService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule] // Fournit HttpClient utilisé dans le service
    });
    service = TestBed.inject(TerrainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
