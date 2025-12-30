import { Component, Input } from '@angular/core';
import { ItemPriceHistory } from '../../../pages/item-price-histories/item-price-history';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-cardmarket-infos-compact',
  imports: [
    CommonModule,
    RouterLink,
    MatIconButton,
    MatIcon,
    MatTooltip
  ],
  templateUrl: './item-cardmarket-infos-compact.html',
  styleUrl: './item-cardmarket-infos-compact.css',
  standalone: true
})
export class ItemCardmarketInfosCompact {

  @Input()
  itemPriceHistory!: ItemPriceHistory;

}
