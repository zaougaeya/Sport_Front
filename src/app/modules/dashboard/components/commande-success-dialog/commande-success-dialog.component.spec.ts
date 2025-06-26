import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommandeSuccessDialogComponent } from './commande-success-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; // Importation de MatDialogRef et MAT_DIALOG_DATA

describe('CommandeSuccessDialogComponent', () => {
  let component: CommandeSuccessDialogComponent;
  let fixture: ComponentFixture<CommandeSuccessDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommandeSuccessDialogComponent, // composant standalone
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        // Fournir un mock pour MatDialogRef et MAT_DIALOG_DATA
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} } // Si votre dialogue utilise des données passées
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CommandeSuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
