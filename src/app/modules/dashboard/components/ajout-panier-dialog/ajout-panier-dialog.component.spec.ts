import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutPanierDialogComponent } from './ajout-panier-dialog.component';

describe('AjoutPanierDialogComponent', () => {
  let component: AjoutPanierDialogComponent;
  let fixture: ComponentFixture<AjoutPanierDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutPanierDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutPanierDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
