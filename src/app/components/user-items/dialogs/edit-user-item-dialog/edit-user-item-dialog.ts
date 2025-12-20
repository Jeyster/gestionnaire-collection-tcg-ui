import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UserItem } from '../../../../interfaces/user-item';
import { EditUserItem } from '../../../../interfaces/edit-user-item';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-user-item-dialog',
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
  templateUrl: './edit-user-item-dialog.html',
  styleUrls: [
    './edit-user-item-dialog.css',
    '../../../../shared/css/dialog.css'
  ]
})
export class EditUserItemDialog {

  protected form: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditUserItemDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: { userItem: UserItem}
  ) {
      const purchaseDate = this.data.userItem.purchaseDate
      ? new Date(this.data.userItem.purchaseDate)
      : null;

      this.form = this.fb.group({
        purchasePrice: [this.data.userItem.purchasePrice, Validators.required],
        purchaseDate: [purchaseDate, Validators.required],
        purchaseComment: [this.data.userItem.purchaseComment]
      }); 
  }

  submit() {
    if (this.form.invalid) return;

    const value = this.form.value;

    const payload: EditUserItem = {
      purchasePrice: value.purchasePrice!,
      purchaseDate: this.toLocalISOString(value.purchaseDate!), // ✅ ISO
      purchaseComment: value.purchaseComment ?? ''
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
