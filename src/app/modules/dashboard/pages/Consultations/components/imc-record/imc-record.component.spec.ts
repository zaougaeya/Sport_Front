import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImcRecordComponent } from './imc-record.component';

describe('ImcRecordComponent', () => {
  let component: ImcRecordComponent;
  let fixture: ComponentFixture<ImcRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImcRecordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImcRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
