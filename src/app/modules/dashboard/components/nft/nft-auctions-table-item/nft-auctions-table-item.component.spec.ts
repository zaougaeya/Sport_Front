import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NftAuctionsTableItemComponent } from './nft-auctions-table-item.component';
import { AngularSvgIconModule } from 'angular-svg-icon'; // Importation du module AngularSvgIcon
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Requis pour SvgIconRegistryService

describe('NftAuctionsTableItemComponent', () => {
  let component: NftAuctionsTableItemComponent;
  let fixture: ComponentFixture<NftAuctionsTableItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NftAuctionsTableItemComponent, // Le composant lui-même (s'il est standalone)
        HttpClientTestingModule, // Nécessaire pour les services qui effectuent des requêtes HTTP (comme AngularSvgIcon)
        AngularSvgIconModule.forRoot() // Importation du module SVG avec la configuration racine
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftAuctionsTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
