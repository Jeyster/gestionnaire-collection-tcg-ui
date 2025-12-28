import { Component, Input } from '@angular/core';
import { UserItem } from '../../../../shared/interfaces/user-item';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { USER_ITEM_STATUS_CONFIG } from '../../../../shared/configs/user-item-status.config';
import { UserItemStatus } from '../../../../shared/enums/user-item-status';

@Component({
  selector: 'app-purchase-event',
  imports: [
    CommonModule,
    MatIcon
  ],
  templateUrl: './purchase-event.html',
  styleUrls: [
    './purchase-event.css',
    '../event.css'
  ],
  standalone: true
})
export class PurchaseEvent {

  @Input()
  userItem!: UserItem;

  protected readonly UserItemStatus = UserItemStatus;
  protected readonly UserItemStatusConfig = USER_ITEM_STATUS_CONFIG;

}
