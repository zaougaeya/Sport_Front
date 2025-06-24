import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationQrComponent } from './reservation-qr.component';

describe('ReservationQrComponent', () => {
  let component: ReservationQrComponent;
  let fixture: ComponentFixture<ReservationQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationQrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservationQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
