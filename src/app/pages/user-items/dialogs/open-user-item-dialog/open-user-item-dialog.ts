import { Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UserItem } from '../../user-item';
import { OpenUserItem } from './open-user-item';
import { MatIconModule } from '@angular/material/icon';
import { PurchaseEvent } from '../../events/purchase-event/purchase-event';
import { StringUtil } from '../../../../services/string-util';

@Component({
  selector: 'app-open-user-item-dialog',
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
    MatIconModule,
    PurchaseEvent
  ],
  templateUrl: './open-user-item-dialog.html',
  styleUrls: [
    './open-user-item-dialog.css',
    '../user-item-dialog.css'
  ]
})
export class OpenUserItemDialog {

  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<OpenUserItemDialog>);
  private stringUtil = inject(StringUtil);

  protected form = this.fb.group({
    openingDate: [null, Validators.required],
    openingComment: [null]
  }); 
  
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { userItem: UserItem}
  ) {}

  submit() {
    if (this.form.invalid) return;

    const value = this.form.value;

    const payload: OpenUserItem = {
      openingDate: this.stringUtil.toLocalISOString(value.openingDate!), // ✅ ISO
      openingComment: value.openingComment ?? ''
    };

    this.dialogRef.close(payload);
  }

  cancel() {
    this.dialogRef.close();
  }
}
