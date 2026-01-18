import { Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UserItem } from '../../../../shared/interfaces/user-item';
import { EditUserItem } from './edit-user-item';
import { MatIconModule } from '@angular/material/icon';
import { StringUtil } from '../../../../services/string-util';
import { UserItemStatus } from '../../../../shared/enums/user-item-status';
import { USER_ITEM_STATUS_CONFIG } from '../../../../shared/configs/user-item-status.config';

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
    '../user-item-dialog.css'
  ]
})
export class EditUserItemDialog {

  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<EditUserItemDialog>);
  private stringUtil = inject(StringUtil);

  protected readonly UserItemStatus = UserItemStatus;
  protected readonly UserItemStatusConfig = USER_ITEM_STATUS_CONFIG;

  protected status: UserItemStatus;
  protected isSold: Boolean;
  protected isOpened: Boolean;
  protected form: FormGroup;
  
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { userItem: UserItem}
  ) {
      this.status = this.data.userItem.status;

      this.isSold = this.status === UserItemStatus.SOLD;
      this.isOpened = this.status === UserItemStatus.OPENED;

      const purchaseDate = this.data.userItem.purchaseDate
      ? new Date(this.data.userItem.purchaseDate)
      : null;

      const sellingOrOpeningDate = this.data.userItem.sellingOrOpeningDate
      ? new Date(this.data.userItem.sellingOrOpeningDate)
      : null;

      this.form = this.fb.group({
        purchase: this.fb.group({
          price: [this.data.userItem.purchasePrice, Validators.required],
          date: [purchaseDate, Validators.required],
          comment: [this.data.userItem.purchaseComment]
        }),

        sellingOrOpening: this.fb.group({
          price: [this.data.userItem.sellingPrice],
          date: [sellingOrOpeningDate],
          comment: [this.data.userItem.sellingOrOpeningComment]
        })
      });

  }

  submit() {
    if (this.form.invalid) return;

    const value = this.form.value;

    const payload: EditUserItem = {
      purchasePrice: value.purchase.price!,
      purchaseDate: this.stringUtil.toLocalISOString(value.purchase.date!), // ✅ ISO
      purchaseComment: value.purchase.comment ?? '',

      ...(this.isSold && {
        sellingPrice: value.sellingOrOpening.price,
        sellingOrOpeningDate: this.stringUtil.toLocalISOString(value.sellingOrOpening.date),
        sellingOrOpeningComment: value.sellingOrOpening.comment
      }),

      ...(this.isOpened && {
        sellingOrOpeningDate: this.stringUtil.toLocalISOString(value.sellingOrOpening.date),
        sellingOrOpeningComment: value.sellingOrOpening.comment
      })
    };

    this.dialogRef.close(payload);
  }

  cancel() {
    this.dialogRef.close();
  }
}
