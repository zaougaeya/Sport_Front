import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReservationsConsultationsComponent } from './list-reservations-consultations.component';

describe('ListReservationsConsultationsComponent', () => {
  let component: ListReservationsConsultationsComponent;
  let fixture: ComponentFixture<ListReservationsConsultationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListReservationsConsultationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListReservationsConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
