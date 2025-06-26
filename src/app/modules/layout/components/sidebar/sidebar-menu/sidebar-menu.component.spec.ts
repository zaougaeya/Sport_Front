import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarMenuComponent } from './sidebar-menu.component';
import { AngularSvgIconModule } from 'angular-svg-icon'; // Importation du module AngularSvgIcon
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Requis pour SvgIconRegistryService

describe('SidebarMenuComponent', () => {
  let component: SidebarMenuComponent;
  let fixture: ComponentFixture<SidebarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SidebarMenuComponent, // Le composant lui-même (s'il est standalone)
        HttpClientTestingModule, // Nécessaire pour les services qui effectuent des requêtes HTTP (comme AngularSvgIcon)
        AngularSvgIconModule.forRoot() // Importation du module SVG avec la configuration racine
      ],
      // SvgIconRegistryService est fourni par AngularSvgIconModule.forRoot(), donc pas besoin de le lister ici explicitement
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
