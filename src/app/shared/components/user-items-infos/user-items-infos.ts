import { Component, Input } from '@angular/core';
import { Item } from '../../interfaces/item';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';

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
  currentUserItemsCount: number | null = null;

}
