import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesComponent } from './categories.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // ✅ Ajout FormsModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CategoriesComponent,           // ✅ standalone component
        HttpClientTestingModule,       // ✅ pour les appels HTTP
        ReactiveFormsModule,           // ✅ pour FormGroup si utilisé
        FormsModule,                   // ✅ requis pour ngForm et ngModel
        BrowserAnimationsModule        // ✅ pour animations Angular
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
