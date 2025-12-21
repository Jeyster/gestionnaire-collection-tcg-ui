import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { UserItem } from '../../user-item';

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
  
}
