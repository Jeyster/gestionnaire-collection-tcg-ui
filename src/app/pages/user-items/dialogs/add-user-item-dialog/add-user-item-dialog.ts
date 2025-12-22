import { Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AddUserItem } from './add-user-item';
import { MatIconModule } from '@angular/material/icon';
import { StringUtil } from '../../../../services/string-util';

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
    '../user-item-dialog.css'
  ]
})
export class AddUserItemDialog {

  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<AddUserItemDialog>);
  private stringUtil = inject(StringUtil);

  protected form: FormGroup;
  
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { userId: number; itemId: number }
  ) {
      this.form = this.fb.group({
        purchasePrice: [null, [Validators.required, Validators.min(0)]],
        purchaseDate: [null, Validators.required],
        purchaseComment: [null]
      }); 
  }

  submit() {
    if (this.form.invalid) return;

    const value = this.form.value;

    const payload: AddUserItem = {
      userId: this.data.userId,
      itemId: this.data.itemId,
      purchasePrice: value.purchasePrice!,
      purchaseDate: this.stringUtil.toLocalISOString(value.purchaseDate!), // ✅ ISO
      purchaseComment: value.purchaseComment ?? ''
    };

    this.dialogRef.close(payload);
  }

  cancel() {
    this.dialogRef.close();
  }
}
