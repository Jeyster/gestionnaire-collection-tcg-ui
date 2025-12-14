import { Component, Input } from '@angular/core';
import { UserItem } from '../../../interfaces/user-item';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-item-card',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './user-item-card.html',
  styleUrl: './user-item-card.css',
  standalone: true
})
export class UserItemCard {

    @Input() userItem!: UserItem;

}
