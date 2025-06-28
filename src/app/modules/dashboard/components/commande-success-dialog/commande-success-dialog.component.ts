import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-commande-success-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './commande-success-dialog.component.html',
  styleUrls: ['./commande-success-dialog.component.scss']
})
export class CommandeSuccessDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CommandeSuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { messageBase: string, messagePromo?: string }
  ) {}

  fermer() {
    this.dialogRef.close();
  }
}
