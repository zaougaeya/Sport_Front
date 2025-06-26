import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BottomNavbarComponent } from './bottom-navbar.component';
import { SvgIconRegistryService, SvgLoader } from 'angular-svg-icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BottomNavbarComponent', () => {
  let component: BottomNavbarComponent;
  let fixture: ComponentFixture<BottomNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BottomNavbarComponent, // standalone component
        HttpClientTestingModule,
        BrowserAnimationsModule // pour animations éventuelles
      ],
      providers: [
        SvgIconRegistryService,
        SvgLoader // Ajouter SvgLoader, dépendance de SvgIconRegistryService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});