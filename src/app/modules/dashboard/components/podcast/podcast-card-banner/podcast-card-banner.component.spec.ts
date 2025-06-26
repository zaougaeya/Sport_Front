import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PodcastCardBannerComponent } from './podcast-card-banner.component';
import { AngularSvgIconModule } from 'angular-svg-icon'; // Importation du module AngularSvgIcon
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Requis pour SvgIconRegistryService

describe('PodcastCardBannerComponent', () => {
  let component: PodcastCardBannerComponent;
  let fixture: ComponentFixture<PodcastCardBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PodcastCardBannerComponent, // Le composant lui-même (s'il est standalone)
        HttpClientTestingModule, // Nécessaire pour les services qui effectuent des requêtes HTTP (comme AngularSvgIcon)
        AngularSvgIconModule.forRoot() // Importation du module SVG avec la configuration racine
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PodcastCardBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
