import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileMenuComponent } from './profile-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProfileMenuComponent', () => {
  let component: ProfileMenuComponent;
  let fixture: ComponentFixture<ProfileMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProfileMenuComponent,
        BrowserAnimationsModule,
        RouterTestingModule,
        AngularSvgIconModule.forRoot(),   // ← Important pour SvgIconRegistryService
        HttpClientTestingModule           // ← Important pour HttpClient utilisé par angular-svg-icon
      ],
      schemas: [NO_ERRORS_SCHEMA], 
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
