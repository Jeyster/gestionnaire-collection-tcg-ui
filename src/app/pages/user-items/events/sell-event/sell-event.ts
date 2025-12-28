import { Component, Input } from '@angular/core';
import { UserItem } from '../../../../shared/interfaces/user-item';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { USER_ITEM_STATUS_CONFIG } from '../../../../shared/configs/user-item-status.config';
import { UserItemStatus } from '../../../../shared/enums/user-item-status';

@Component({
  selector: 'app-sell-event',
  imports: [
    CommonModule,
    MatIcon
  ],
  templateUrl: './sell-event.html',
  styleUrls: [
    './sell-event.css',
    '../event.css'
  ],
  standalone: true
})
export class SellEvent {

  @Input()
  userItem!: UserItem;

  protected readonly UserItemStatus = UserItemStatus;
  protected readonly UserItemStatusConfig = USER_ITEM_STATUS_CONFIG;

}
