import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SessionJeuComponent } from './session-jeu.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // <--- Import pour tests HttpClient

describe('SessionJeuComponent', () => {
  let component: SessionJeuComponent;
  let fixture: ComponentFixture<SessionJeuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SessionJeuComponent],
      imports: [HttpClientTestingModule],  // <--- Ajoute ceci pour fournir HttpClient dans les tests
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionJeuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
