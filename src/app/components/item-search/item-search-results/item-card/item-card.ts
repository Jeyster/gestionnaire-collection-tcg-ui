import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Item } from '../../../../interfaces/item';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule, 
    RouterLink
  ],
  templateUrl: './item-card.html',
  styleUrls: [
    './item-card.css',
    '../../../../shared/css/card.css'
  ]
})
export class ItemCard {
  @Input() item!: Item;
}
