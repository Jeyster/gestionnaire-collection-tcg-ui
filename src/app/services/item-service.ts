import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item';
import { PriceHistory } from '../interfaces/price-history';
import { ItemSearchFiltersDto } from '../components/items/item-search/item-search-filters-dto';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  searchItems(filters: ItemSearchFiltersDto) {
    return this.http.get<Item[]>('/gestionnaire-collection-tcg/v1/items', {
      params: Object.fromEntries(
        Object.entries(filters)
          .filter(([_, v]) => v !== null && v !== undefined)
          .map(([k, v]) => [k, String(v)])
      )
    });
  }

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
