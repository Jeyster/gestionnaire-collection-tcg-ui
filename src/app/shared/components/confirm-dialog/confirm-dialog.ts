import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-confirm-dialog',
  imports: [
    MatButton,
    MatDialogActions,
    MatIcon
  ],
  templateUrl: './confirm-dialog.html',
  styleUrls: [
    './confirm-dialog.css'
  ],
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
