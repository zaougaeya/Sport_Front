import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthComponent } from './auth.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ // <-- ici, pas declarations !
        AuthComponent,                 // composant standalone dans imports
        AngularSvgIconModule.forRoot(), // module requis pour SvgIconRegistryService
        HttpClientTestingModule    // <-- ajoute ça !

      ],
      schemas: [NO_ERRORS_SCHEMA],      // optionnel pour ignorer erreurs template
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
