import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Item } from '../../../../shared/interfaces/item';
import { ItemService } from '../../../../services/item-service';
import { Observable } from 'rxjs';
import { ItemPriceHistory } from '../../../item-price-histories/item-price-history';
import { CommonModule } from '@angular/common';
import { ItemCardmarketInfosCompact } from '../../../../shared/components/item-cardmarket-infos-compact/item-cardmarket-infos-compact';
import { UserItemsInfosCompact } from '../../../../shared/components/user-items-infos-compact/user-items-infos-compact';
import { UserService } from '../../../../services/user-service';
import { UserItemService } from '../../../../services/user-item-service';
import { ItemInfosCompact } from '../../../../shared/components/item-infos-compact/item-infos-compact';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ItemInfosCompact,
    ItemCardmarketInfosCompact,
    UserItemsInfosCompact
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

  private userService = inject(UserService);
  private itemService = inject(ItemService);
  private userItemService = inject(UserItemService);
  
  protected user = this.userService.getLoggedUser();

  protected userItemsCount$!: Observable<number>;
  protected currentUserItemsCount$!: Observable<number>;
  protected lastPriceHistory$!: Observable<ItemPriceHistory>;
  
  /**
   * ngOnInit because component must be created to have its item input
   * and then be able to use it.
   */
  ngOnInit() {
    this.userItemsCount$ = this.userItemService.getUserItemsCount(String(this.user.id), String(this.item.id));
    this.currentUserItemsCount$ = this.userItemService.getUserItemsInStockCount(String(this.user.id), String(this.item.id));
    this.lastPriceHistory$ = this.itemService.getLastPriceHistory(String(this.item.id));
  }

}
