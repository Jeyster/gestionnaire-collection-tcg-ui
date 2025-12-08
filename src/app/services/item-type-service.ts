import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemType } from '../interfaces/item-type';

@Injectable({
  providedIn: 'root'
})
export class ItemTypeService {

  constructor(private http: HttpClient) { }

  getItemTypes() {
    return this.http.get<ItemType[]>('/gestionnaire-collection-tcg/v1/item-types');
  }

  getItemType(itemTypeId: string) {
    return this.http.get<ItemType>('/gestionnaire-collection-tcg/v1/item-types/' + itemTypeId);
  }

  getItemTypesByGameId(gameId: string) {
    return this.http.get<ItemType[]>('/gestionnaire-collection-tcg/v1/games/' + gameId + '/item-types');
  }

}
