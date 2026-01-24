import { Component, Input } from '@angular/core';
import { Item } from '../../interfaces/item';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-items-infos-card',
  imports: [
    CommonModule,
    RouterLink,
    MatIcon
  ],
  templateUrl: './user-items-infos-card.html',
  styleUrl: './user-items-infos-card.css',
})
export class UserItemsInfosCard {

  @Input() item!: Item;

  @Input() currentUserItemsCount!: number | null;
  @Input() openedUserItemsCount!: number | null;
  @Input() soldUserItemsCount!: number | null;

}
