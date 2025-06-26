import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarMobileMenuComponent } from './navbar-mobile-menu.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularSvgIconModule } from 'angular-svg-icon'; // Importation de AngularSvgIconModule

describe('NavbarMobileMenuComponent', () => {
  let component: NavbarMobileMenuComponent;
  let fixture: ComponentFixture<NavbarMobileMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NavbarMobileMenuComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        AngularSvgIconModule.forRoot() // Fournit SvgIconRegistryService et SvgLoader
      ],
      // SvgIconRegistryService est fourni par AngularSvgIconModule.forRoot(), donc pas besoin de le lister ici explicitement
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
