import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Error500Component } from './error500.component';
import { AngularSvgIconModule } from 'angular-svg-icon'; // Importation du module AngularSvgIcon
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Requis pour SvgIconRegistryService

describe('Error500Component', () => {
  let component: Error500Component;
  let fixture: ComponentFixture<Error500Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Error500Component, // Le composant lui-même (s'il est standalone)
        HttpClientTestingModule, // Nécessaire pour les services qui effectuent des requêtes HTTP (comme AngularSvgIcon)
        AngularSvgIconModule.forRoot() // Importation du module SVG avec la configuration racine
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Error500Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
