import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item';
import { PriceHistory } from '../interfaces/price-history';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getItem(itemId: string) {
    return this.http.get<Item>('/gestionnaire-collection-tcg/v1/items/' + itemId);
  }

  getItemsByGameIdAndItemTypeId(gameId: string, itemTypeId: string) {
    return this.http.get<Item[]>(
      '/gestionnaire-collection-tcg/v1/items?game-id=' + gameId +
      '&item-type-id=' + itemTypeId
    );
  }

  getPriceHistories(itemId: string) {
    return this.http.get<PriceHistory[]>('/gestionnaire-collection-tcg/v1/items/' + itemId + '/price-histories');
  }

}
