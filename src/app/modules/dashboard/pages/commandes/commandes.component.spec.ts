import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommandesComponent } from './commandes.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('CommandesComponent', () => {
  let component: CommandesComponent;
  let fixture: ComponentFixture<CommandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommandesComponent,            // ✅ standalone
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        RouterTestingModule           // ✅ utile si ActivatedRoute ou routerLink sont utilisés
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
