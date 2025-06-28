import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PodcastComponent } from './podcast.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularSvgIconModule } from 'angular-svg-icon'; // Importation de AngularSvgIconModule

describe('PodcastComponent', () => {
  let component: PodcastComponent;
  let fixture: ComponentFixture<PodcastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PodcastComponent,
        HttpClientTestingModule, // Nécessaire pour les services SVG et tout autre service HTTP
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        AngularSvgIconModule.forRoot() // Fournit SvgIconRegistryService et SvgLoader
      ],
      // SvgIconRegistryService est maintenant fourni par AngularSvgIconModule.forRoot()
      // Donc la ligne 'SvgIconRegistryService' dans 'providers' n'est plus nécessaire.
    }).compileComponents();

    fixture = TestBed.createComponent(PodcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
