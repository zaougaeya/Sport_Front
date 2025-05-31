import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImcAnalyticsComponent } from './imc-analytics.component';

describe('ImcAnalyticsComponent', () => {
  let component: ImcAnalyticsComponent;
  let fixture: ComponentFixture<ImcAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImcAnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImcAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
