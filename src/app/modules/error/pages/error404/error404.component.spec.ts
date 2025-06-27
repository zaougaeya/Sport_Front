import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Error404Component } from './error404.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // <-- IMPORTANT

describe('Error404Component', () => {
  let component: Error404Component;
  let fixture: ComponentFixture<Error404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Error404Component,
        AngularSvgIconModule.forRoot(),
        HttpClientTestingModule   // <-- Ajout indispensable ici
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Error404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
