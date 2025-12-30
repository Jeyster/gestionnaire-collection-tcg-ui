import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { ItemPriceHistory } from '../../../pages/item-price-histories/item-price-history';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-item-cardmarket-infos',
  imports: [
    CommonModule,
    RouterLink,
    MatIcon,
    MatButton
  ],
  templateUrl: './item-cardmarket-infos.html',
  styleUrls: [
    './item-cardmarket-infos.css'
  ],
  standalone: true
})
export class ItemCardmarketInfos {

  @Input()
  itemPriceHistory!: ItemPriceHistory;

  @Input()
  showHistoryButton!: boolean;

}
