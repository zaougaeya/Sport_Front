import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConsultationsComponent } from './list-consultations.component';

describe('ListConsultationsComponent', () => {
  let component: ListConsultationsComponent;
  let fixture: ComponentFixture<ListConsultationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListConsultationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
