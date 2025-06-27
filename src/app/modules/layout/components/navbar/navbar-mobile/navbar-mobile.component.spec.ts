import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarMobileComponent } from '../navbar-mobile/navbar-mobilecomponent'; // Correction nom fichier
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';  // <-- Ajout important

describe('NavbarMobileComponent', () => {
  let component: NavbarMobileComponent;
  let fixture: ComponentFixture<NavbarMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NavbarMobileComponent,
        AngularSvgIconModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,   // <-- Fournit ActivatedRoute
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
