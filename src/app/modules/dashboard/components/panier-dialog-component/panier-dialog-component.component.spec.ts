import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanierDialogComponent } from './panier-dialog-component.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PanierService } from 'src/app/core/services/panierService';
import { CommandeService } from 'src/app/core/services/commande.service';
import { of } from 'rxjs';

describe('PanierDialogComponent', () => {
  let component: PanierDialogComponent;
  let fixture: ComponentFixture<PanierDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PanierDialogComponent, // Comme il est standalone
        MatDialogModule,
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: { close: jasmine.createSpy('close') }
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },
        {
          provide: PanierService,
          useValue: {
            getProduitsDuPanier: () => of([]),
            supprimerProduit: () => of({}),
            viderPanier: () => of({})
          }
        },
        {
          provide: CommandeService,
          useValue: {
            creerCommande: () => of({
              commande: { montantTotal: 500 },
              messagePromo: 'Félicitations ! Livraison gratuite.'
            })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PanierDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
