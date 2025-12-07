import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getItemByGameIdAndItemTypeId(gameId: string, itemTypeId: string) {
    return this.http.get<Item[]>(
      '/gestionnaire-collection-tcg/v1/items?game-id=' + gameId +
      '&item-type-id=' + itemTypeId
    );
  }

}
