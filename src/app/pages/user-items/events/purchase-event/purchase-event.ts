import { Component, Input } from '@angular/core';
import { UserItem } from '../../user-item';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

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

}
