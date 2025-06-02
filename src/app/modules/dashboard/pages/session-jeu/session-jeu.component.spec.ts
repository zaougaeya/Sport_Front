import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionJeuComponent } from './session-jeu.component';

describe('SessionJeuComponent', () => {
  let component: SessionJeuComponent;
  let fixture: ComponentFixture<SessionJeuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionJeuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SessionJeuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
