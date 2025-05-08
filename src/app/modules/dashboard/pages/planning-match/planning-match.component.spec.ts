import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningMatchComponent } from './planning-match.component';

describe('PlanningMatchComponent', () => {
  let component: PlanningMatchComponent;
  let fixture: ComponentFixture<PlanningMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanningMatchComponent]
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
