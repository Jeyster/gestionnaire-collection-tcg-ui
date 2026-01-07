import { Component, Input } from '@angular/core';
import { Item } from '../../interfaces/item';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-user-items-infos-compact',
  imports: [
    RouterLink,
    MatIconButton,
    MatIcon,
    MatTooltip
  ],
  templateUrl: './user-items-infos-compact.html',
  styleUrl: './user-items-infos-compact.css',
})
export class UserItemsInfosCompact {

  @Input()
  item!: Item;

  @Input()
  userItemsCount!: number;

}
