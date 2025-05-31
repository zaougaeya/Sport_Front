import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeSuccessDialogComponent } from './commande-success-dialog.component';

describe('CommandeSuccessDialogComponent', () => {
  let component: CommandeSuccessDialogComponent;
  let fixture: ComponentFixture<CommandeSuccessDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandeSuccessDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommandeSuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
