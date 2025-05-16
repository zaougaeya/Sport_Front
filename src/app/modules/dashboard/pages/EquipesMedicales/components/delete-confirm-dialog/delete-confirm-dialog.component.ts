import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-delete-confirm-dialog',
  
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrl: './delete-confirm-dialog.component.scss'
})
export class DeleteConfirmDialogComponent {
constructor(
    public dialogRef: MatDialogRef<DeleteConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Access the passed data (equipeId)
  ) { }

  onNoClick(): void {
    this.dialogRef.close(); // Close the dialog without action
  }

  onConfirm(): void {
    this.dialogRef.close('confirm'); // Close the dialog and confirm the delete
  }
}
