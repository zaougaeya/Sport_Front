import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatEquipesComponent } from './stat-equipes.component';

describe('StatEquipesComponent', () => {
  let component: StatEquipesComponent;
  let fixture: ComponentFixture<StatEquipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatEquipesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatEquipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
