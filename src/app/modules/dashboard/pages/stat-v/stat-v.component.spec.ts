import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatVComponent } from './stat-v.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common'; // ✅ Pour *ngFor, *ngIf

describe('StatVComponent', () => {
  let component: StatVComponent;
  let fixture: ComponentFixture<StatVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StatVComponent,              // ✅ Composant standalone
        HttpClientTestingModule,     // ✅ Pour les appels HTTP simulés
        ReactiveFormsModule,         // ✅ Pour les formulaires réactifs
        FormsModule,                 // ✅ Pour ngModel
        BrowserAnimationsModule,     // ✅ Pour animations Angular
        CommonModule                 // ✅ Pour *ngFor, *ngIf dans les templates
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StatVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
