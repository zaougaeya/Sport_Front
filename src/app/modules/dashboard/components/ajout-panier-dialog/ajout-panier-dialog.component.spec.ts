import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AjoutPanierDialogComponent } from './ajout-panier-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AjoutPanierDialogComponent', () => {
  let component: AjoutPanierDialogComponent;
  let fixture: ComponentFixture<AjoutPanierDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AjoutPanierDialogComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => {} } },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            produit: { nom: 'Produit Test', pourcentagePromotion: 10 } // Mock données attendues
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutPanierDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});