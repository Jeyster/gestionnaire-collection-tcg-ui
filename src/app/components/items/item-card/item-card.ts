import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Item } from '../../../interfaces/item';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './item-card.html',
  styleUrls: ['./item-card.css']
})
export class ItemCard {
  @Input() item!: Item;
}
