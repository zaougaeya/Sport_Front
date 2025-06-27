import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanningMatchComponent } from './planning-match.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import du module pour HttpClient

describe('PlanningMatchComponent', () => {
  let component: PlanningMatchComponent;
  let fixture: ComponentFixture<PlanningMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PlanningMatchComponent,
        HttpClientTestingModule  // Ajout ici
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanningMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
