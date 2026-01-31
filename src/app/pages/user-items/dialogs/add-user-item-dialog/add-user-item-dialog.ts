import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AddUserItem } from './add-user-item';
import { MatIconModule } from '@angular/material/icon';
import { USER_ITEM_STATUS_CONFIG } from '../../../../shared/configs/user-item-status.config';
import { UserItemStatus } from '../../../../shared/enums/user-item-status';
import { AbstractBusinessObjectDialog } from '../../../../shared/components/dialogs/abstract-business-object-dialog';
import { BusinessObjectDialogShell } from '../../../../shared/components/dialogs/business-object-dialog-shell/business-object-dialog-shell';

@Component({
  selector: 'app-add-user-item-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatDialogTitle,
    BusinessObjectDialogShell
  ],
  templateUrl: './add-user-item-dialog.html',
  styleUrls: [
    './add-user-item-dialog.css',
    '../user-item-dialog.css'
  ]
})
export class AddUserItemDialog extends AbstractBusinessObjectDialog<AddUserItem> {

  protected readonly UserItemStatus = UserItemStatus;
  protected readonly UserItemStatusConfig = USER_ITEM_STATUS_CONFIG;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { userId: number; itemId: number }
  ) {
    super();

    this.form = this.fb.group({
      purchasePrice: [null, [Validators.required, Validators.min(0)]],
      purchaseDate: [null, Validators.required],
      purchaseComment: [null]
    });
  }

  protected buildPayload(): AddUserItem {
    const v = this.form.value;

    return {
      userId: this.data.userId,
      itemId: this.data.itemId,
      purchasePrice: v.purchasePrice!,
      purchaseDate: this.stringUtil.toLocalISOString(v.purchaseDate!),
      purchaseComment: v.purchaseComment ?? ''
    };
  }
}

