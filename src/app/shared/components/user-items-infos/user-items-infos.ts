import { Component, Input } from '@angular/core';
import { Item } from '../../interfaces/item';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { USER_ITEM_STATUS_CONFIG } from '../../configs/user-item-status.config';
import { UserItemStatus } from '../../enums/user-item-status';

@Component({
  selector: 'app-user-items-infos',
  imports: [
    CommonModule,
    RouterLink,
    MatIcon,
    MatButton
  ],
  templateUrl: './user-items-infos.html',
  styleUrl: './user-items-infos.css',
})
export class UserItemsInfos {

  @Input()
  item!: Item;
  
  @Input()
  userItemsCount: number | null = null;

  @Input()
  inStockUserItemsCount: number | null = null;

  @Input()
  openedUserItemsCount: number | null = null;

  @Input()
  soldUserItemsCount: number | null = null;

  protected readonly UserItemStatus = UserItemStatus;
  protected readonly UserItemStatusConfig = USER_ITEM_STATUS_CONFIG;

}
