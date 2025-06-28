import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NftSingleCardComponent } from './nft-single-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Produit } from 'src/app/modules/dashboard/pages/produits/produit.service'; // adapte le chemin si besoin

describe('NftSingleCardComponent', () => {
  let component: NftSingleCardComponent;
  let fixture: ComponentFixture<NftSingleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NftSingleCardComponent,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NftSingleCardComponent);
    component = fixture.componentInstance;

    // Mock complet conforme à l'interface Produit
    const mockProduit: Produit = {
      id: '1',
      nom: 'Produit test',
      description: 'Description test',
      prix: 100,
      quantiteEnStock: 10,
      imageUrl: 'https://via.placeholder.com/150',
      pourcentagePromotion: 20,
      genreProduit: 'HOMME',
      categorie: {
        nom: 'Catégorie test',
        description: 'Description catégorie test',
        id: 'cat1' // si id est attendu dans categorie
      },
      disponible: true,
      statutProduit: 'EN_STOCK',
      dateAjout: new Date()
    };

    component.produit = mockProduit;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
