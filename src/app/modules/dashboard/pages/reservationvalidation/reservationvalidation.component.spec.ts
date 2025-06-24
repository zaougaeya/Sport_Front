import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationvalidationComponent } from './reservationvalidation.component';

describe('ReservationvalidationComponent', () => {
  let component: ReservationvalidationComponent;
  let fixture: ComponentFixture<ReservationvalidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationvalidationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservationvalidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
