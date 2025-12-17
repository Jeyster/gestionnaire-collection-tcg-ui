import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-confirm-dialog',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatIconModule
  ],
  templateUrl: './confirm-dialog.html',
  styleUrls: [
    './confirm-dialog.css',
    '../../../shared/css/dialog.css'
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
