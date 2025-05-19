import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatVComponent } from './stat-v.component';

describe('StatVComponent', () => {
  let component: StatVComponent;
  let fixture: ComponentFixture<StatVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatVComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
