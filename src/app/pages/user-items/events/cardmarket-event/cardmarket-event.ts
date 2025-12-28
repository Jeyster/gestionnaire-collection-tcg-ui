import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { ItemPriceHistory } from '../../../item-price-histories/item-price-history';

@Component({
  selector: 'app-cardmarket-event',
  imports: [
    CommonModule,
    MatIcon
  ],
  templateUrl: './cardmarket-event.html',
  styleUrls: [
    './cardmarket-event.css',
    '../event.css'
  ],
  standalone: true
})
export class CardmarketEvent {

  @Input()
  itemPriceHistory!: ItemPriceHistory;

}
