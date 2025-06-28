import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Error404Component } from './error404.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularSvgIconModule } from 'angular-svg-icon'; // Importation de AngularSvgIconModule

describe('Error404Component', () => {
  let component: Error404Component;
  let fixture: ComponentFixture<Error404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Error404Component,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        AngularSvgIconModule.forRoot() // Fournit SvgIconRegistryService et SvgLoader
      ],
      // SvgIconRegistryService est fourni par AngularSvgIconModule.forRoot(), donc pas besoin de le lister ici explicitement
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Error404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
