import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SessionListComponent } from './liste-session.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SessionListComponent', () => {
  let component: SessionListComponent;
  let fixture: ComponentFixture<SessionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SessionListComponent],
      imports: [HttpClientTestingModule],  // <-- Ajouté pour HttpClient
      schemas: [NO_ERRORS_SCHEMA],         // Pour ignorer erreurs liées au template
    }).compileComponents();

    fixture = TestBed.createComponent(SessionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
