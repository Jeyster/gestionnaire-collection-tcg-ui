import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Item } from '../../../../shared/interfaces/item';
import { MatIconModule } from '@angular/material/icon';
import { ItemInfos } from '../../../../shared/components/item-infos/item-infos';
import { ItemService } from '../../../../services/item-service';
import { Observable } from 'rxjs';
import { ItemPriceHistory } from '../../../item-price-histories/item-price-history';
import { CommonModule } from '@angular/common';
import { ItemCardmarketInfosCompact } from '../../../../shared/components/item-cardmarket-infos-compact/item-cardmarket-infos-compact';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule, 
    RouterLink,
    ItemInfos,
    ItemCardmarketInfosCompact
  ],
  templateUrl: './item-card.html',
  styleUrls: [
    './item-card.css',
    '../../../../shared/css/card.css'
  ]
})
export class ItemCard {

  @Input() 
  item!: Item;

  private itemService = inject(ItemService);

  protected lastPriceHistory$!: Observable<ItemPriceHistory>;

  ngOnInit() {
    this.lastPriceHistory$ = this.itemService.getLastPriceHistory(String(this.item.id));
  }


}
