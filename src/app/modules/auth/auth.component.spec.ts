import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthComponent } from './auth.component';
import { AngularSvgIconModule } from 'angular-svg-icon'; // Importation du module AngularSvgIcon
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Requis pour SvgIconRegistryService

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AuthComponent, // Le composant lui-même (s'il est standalone)
        HttpClientTestingModule, // Nécessaire pour les services qui effectuent des requêtes HTTP (comme AngularSvgIcon)
        AngularSvgIconModule.forRoot() // Importation du module SVG avec la configuration racine
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
