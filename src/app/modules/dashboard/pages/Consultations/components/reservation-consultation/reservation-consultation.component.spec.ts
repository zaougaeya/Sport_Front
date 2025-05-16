import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationConsultationComponent } from './reservation-consultation.component';

describe('ReservationConsultationComponent', () => {
  let component: ReservationConsultationComponent;
  let fixture: ComponentFixture<ReservationConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationConsultationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservationConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
