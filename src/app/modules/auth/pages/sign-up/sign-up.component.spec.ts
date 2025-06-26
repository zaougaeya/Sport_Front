import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { ActivatedRoute } from '@angular/router'; // Importation de ActivatedRoute
import { of } from 'rxjs'; // Pour simuler des observables

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SignUpComponent // Le composant lui-même (s'il est standalone)
      ],
      providers: [
        // Fournir un mock pour ActivatedRoute car il est une dépendance courante pour les composants liés à la route.
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}), // Mock minimal pour params
            snapshot: {
              paramMap: {
                get: (key: string) => null // Mock minimal pour snapshot.paramMap.get
              }
            }
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
