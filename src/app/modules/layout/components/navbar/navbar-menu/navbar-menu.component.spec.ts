import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarMenuComponent } from './navbar-menu.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // <-- Indispensable

describe('NavbarMenuComponent', () => {
  let component: NavbarMenuComponent;
  let fixture: ComponentFixture<NavbarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NavbarMenuComponent,
        AngularSvgIconModule.forRoot(),
        HttpClientTestingModule,  // <-- Ajout ici
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            snapshot: { paramMap: { get: (key: string) => null } }
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
