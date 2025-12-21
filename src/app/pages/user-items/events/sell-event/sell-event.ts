import { Component, Input } from '@angular/core';
import { UserItem } from '../../user-item';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

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

}
