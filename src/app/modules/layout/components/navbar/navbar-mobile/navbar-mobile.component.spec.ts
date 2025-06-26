import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router'; // Importation de ActivatedRoute
import { of } from 'rxjs'; // Pour simuler ActivatedRoute
import { NavbarMobileMenuComponent } from './navbar-mobile-menu/navbar-mobile-menu.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

describe('NavbarMobileMenuComponent', () => {
  let component: NavbarMobileMenuComponent;
  let fixture: ComponentFixture<NavbarMobileMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NavbarMobileMenuComponent, // Composant standalone
        HttpClientTestingModule,
        BrowserAnimationsModule,
        AngularSvgIconModule.forRoot() // Fournit SvgIconRegistryService et SvgLoader
      ],
      providers: [
        // ActivatedRoute manquant, on le mocke
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            snapshot: {
              paramMap: {
                get: (key: string) => null
              }
            }
          }
        },
        // SvgIconRegistryService est fourni par AngularSvgIconModule.forRoot(),
        // donc pas besoin de le lister ici explicitement, sauf si vous avez une configuration spéciale.
        // SvgIconRegistryService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarMobileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
