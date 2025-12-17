import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AddUserItem } from '../../../interfaces/add-user-item';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-user-item-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogActions,
    MatDialogContent,
    MatIconModule
  ],
  templateUrl: './add-user-item-dialog.html',
  styleUrls: [
    './add-user-item-dialog.css',
    '../../../shared/css/dialog.css'
  ]
})
export class AddUserItemDialog {

  protected form: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddUserItemDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: { userId: number; itemId: number }
  ) {
      this.form = this.fb.group({
        purchasePrice: [null, [Validators.required, Validators.min(0)]],
        purchaseDate: [null, Validators.required],
        comment: ['']
      }); 
  }

  submit() {
    if (this.form.invalid) return;

    const value = this.form.value;

    const payload: AddUserItem = {
      userId: this.data.userId,
      itemId: this.data.itemId,
      purchasePrice: value.purchasePrice!,
      purchaseDate: this.toLocalISOString(value.purchaseDate!), // ✅ ISO
      comment: value.comment ?? ''
    };

    this.dialogRef.close(payload);
  }

  private toLocalISOString(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T00:00:00`;
  }

  cancel() {
    this.dialogRef.close();
  }
}
