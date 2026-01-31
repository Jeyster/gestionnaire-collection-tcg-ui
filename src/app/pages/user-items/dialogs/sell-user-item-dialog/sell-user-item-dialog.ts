import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UserItem } from '../../../../shared/interfaces/user-item';
import { SellUserItem } from './sell-user-item';
import { MatIconModule } from '@angular/material/icon';
import { PurchaseEvent } from '../../events/purchase-event/purchase-event';
import { USER_ITEM_STATUS_CONFIG } from '../../../../shared/configs/user-item-status.config';
import { UserItemStatus } from '../../../../shared/enums/user-item-status';
import { BusinessObjectDialogShell } from '../../../../shared/components/dialogs/business-object-dialog-shell/business-object-dialog-shell';
import { AbstractBusinessObjectDialog } from '../../../../shared/components/dialogs/abstract-business-object-dialog';

@Component({
  selector: 'app-sell-user-item-dialog',
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
  templateUrl: './sell-user-item-dialog.html',
  styleUrls: [
    './sell-user-item-dialog.css',
    '../../../../shared/components/dialogs/business-object-dialog-shell/business-object-dialog-shell.css'
  ]
})
export class SellUserItemDialog extends AbstractBusinessObjectDialog<SellUserItem> {

  protected readonly UserItemStatus = UserItemStatus;
  protected readonly UserItemStatusConfig = USER_ITEM_STATUS_CONFIG;

  
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { userItem: UserItem}
  ) {
    super();
    
    this.form = this.fb.group({
      sellingPrice: [null, [Validators.required, Validators.min(0)]],
      sellingDate: [null, Validators.required],
      sellingComment: [null]
    }); 

  }

  protected buildPayload(): SellUserItem {
    const value = this.form.value;

    return {
      sellingPrice: value.sellingPrice!,
      sellingDate: this.stringUtil.toLocalISOString(value.sellingDate!), // ✅ ISO
      sellingComment: value.sellingComment ?? ''
    };
  }

}
