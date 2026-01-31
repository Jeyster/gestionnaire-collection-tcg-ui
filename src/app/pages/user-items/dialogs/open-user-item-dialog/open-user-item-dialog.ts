import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UserItem } from '../../../../shared/interfaces/user-item';
import { OpenUserItem } from './open-user-item';
import { MatIconModule } from '@angular/material/icon';
import { PurchaseEvent } from '../../events/purchase-event/purchase-event';
import { USER_ITEM_STATUS_CONFIG } from '../../../../shared/configs/user-item-status.config';
import { UserItemStatus } from '../../../../shared/enums/user-item-status';
import { BusinessObjectDialogShell } from '../../../../shared/components/dialogs/business-object-dialog-shell/business-object-dialog-shell';
import { AbstractBusinessObjectDialog } from '../../../../shared/components/dialogs/abstract-business-object-dialog';

@Component({
  selector: 'app-open-user-item-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    BusinessObjectDialogShell,
    PurchaseEvent
  ],
  templateUrl: './open-user-item-dialog.html',
  styleUrls: [
    './open-user-item-dialog.css',
    '../../../../shared/components/dialogs/business-object-dialog-shell/business-object-dialog-shell.css'
  ]
})
export class OpenUserItemDialog extends AbstractBusinessObjectDialog<OpenUserItem> {

  protected readonly UserItemStatus = UserItemStatus;
  protected readonly UserItemStatusConfig = USER_ITEM_STATUS_CONFIG;
  
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { userItem: UserItem}
  ) {
    
    super();

    this.form = this.fb.group({
      openingDate: [null, Validators.required],
      openingComment: [null]
    }); 
    
  }

  protected buildPayload(): OpenUserItem {
    const value = this.form.value;

    return {
      openingDate: this.stringUtil.toLocalISOString(value.openingDate!), // ✅ ISO
      openingComment: value.openingComment ?? ''
    };
  }

}
