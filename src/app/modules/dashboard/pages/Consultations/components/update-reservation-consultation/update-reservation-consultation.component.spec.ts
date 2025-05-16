import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReservationConsultationComponent } from './update-reservation-consultation.component';

describe('UpdateReservationConsultationComponent', () => {
  let component: UpdateReservationConsultationComponent;
  let fixture: ComponentFixture<UpdateReservationConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateReservationConsultationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateReservationConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
