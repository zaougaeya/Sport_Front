import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileMenuComponent } from './profile-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router'; // Importation de ActivatedRoute
import { of } from 'rxjs'; // Pour simuler des observables

describe('ProfileMenuComponent', () => {
  let component: ProfileMenuComponent;
  let fixture: ComponentFixture<ProfileMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProfileMenuComponent,
        BrowserAnimationsModule
      ],
      providers: [
        // Fournir un mock pour ActivatedRoute car il est une dépendance courante pour les composants liés à la route.
        // Si ProfileMenuComponent utilise ActivatedRoute, ce mock est essentiel.
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
    fixture = TestBed.createComponent(ProfileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
