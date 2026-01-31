import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UserItem } from '../../../../shared/interfaces/user-item';
import { EditUserItem } from './edit-user-item';
import { MatIconModule } from '@angular/material/icon';
import { UserItemStatus } from '../../../../shared/enums/user-item-status';
import { USER_ITEM_STATUS_CONFIG } from '../../../../shared/configs/user-item-status.config';
import { BusinessObjectDialogShell } from '../../../../shared/components/dialogs/business-object-dialog-shell/business-object-dialog-shell';
import { AbstractBusinessObjectDialog } from '../../../../shared/components/dialogs/abstract-business-object-dialog';

@Component({
  selector: 'app-edit-user-item-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    BusinessObjectDialogShell
  ],
  templateUrl: './edit-user-item-dialog.html',
  styleUrls: [
    './edit-user-item-dialog.css',
    '../../../../shared/components/dialogs/business-object-dialog-shell/business-object-dialog-shell.css'
  ]
})
export class EditUserItemDialog extends AbstractBusinessObjectDialog<EditUserItem> {

  protected readonly UserItemStatus = UserItemStatus;
  protected readonly UserItemStatusConfig = USER_ITEM_STATUS_CONFIG;

  protected status: UserItemStatus;
  protected isSold: Boolean;
  protected isOpened: Boolean;
  
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { userItem: UserItem}
  ) {
      super();

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

  protected buildPayload(): EditUserItem {
    const value = this.form.value;

    return {
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
  }

}
