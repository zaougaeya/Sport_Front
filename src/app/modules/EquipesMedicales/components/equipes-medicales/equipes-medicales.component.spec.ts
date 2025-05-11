import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipesMedicalesComponent } from './equipes-medicales.component';

describe('EquipesMedicalesComponent', () => {
  let component: EquipesMedicalesComponent;
  let fixture: ComponentFixture<EquipesMedicalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipesMedicalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EquipesMedicalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
