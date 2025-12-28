import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { UserItem } from '../../../../shared/interfaces/user-item';
import { USER_ITEM_STATUS_CONFIG } from '../../../../shared/configs/user-item-status.config';
import { UserItemStatus } from '../../../../shared/enums/user-item-status';

@Component({
  selector: 'app-open-event',
  imports: [
    CommonModule,
    MatIcon
  ],
  templateUrl: './open-event.html',
  styleUrls: [
    './open-event.css',
    '../event.css'
  ],
  standalone: true
})
export class OpenEvent {

  @Input()
  userItem!: UserItem;

  protected readonly UserItemStatus = UserItemStatus;
  protected readonly UserItemStatusConfig = USER_ITEM_STATUS_CONFIG;
  
}
