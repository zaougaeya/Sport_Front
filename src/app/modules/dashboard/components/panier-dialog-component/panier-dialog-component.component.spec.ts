import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierDialogComponentComponent } from './panier-dialog-component.component';

describe('PanierDialogComponentComponent', () => {
  let component: PanierDialogComponentComponent;
  let fixture: ComponentFixture<PanierDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanierDialogComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanierDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
