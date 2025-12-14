import { Component } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  imports: [
    MatDialogActions,
    MatDialogContent
  ],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css',
  standalone: true
})
export class ConfirmDialog {

  constructor(private dialogRef: MatDialogRef<ConfirmDialog>) {}

  cancel() {
    this.dialogRef.close(false);
  }

  confirm() {
    this.dialogRef.close(true);
  }

}
