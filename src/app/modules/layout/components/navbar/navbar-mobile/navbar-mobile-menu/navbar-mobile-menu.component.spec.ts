import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarMobileMenuComponent } from './navbar-mobile-menu.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('NavbarMobileMenuComponent', () => {
  let component: NavbarMobileMenuComponent;
  let fixture: ComponentFixture<NavbarMobileMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NavbarMobileMenuComponent,       // Composant standalone
        AngularSvgIconModule.forRoot(),  // Module SVG avec provider
        HttpClientTestingModule          // Mock HttpClient pour tests
      ],
      providers: [
        {
          provide: ActivatedRoute,       // Mock ActivatedRoute
          useValue: {
            params: of({}),              // Observable des params, vide ici
            snapshot: { paramMap: { get: () => null } } // snapshot mocké
          }
        }
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
