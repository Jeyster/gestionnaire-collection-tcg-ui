import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item';
import { UserItem } from '../interfaces/user-item';

@Injectable({
  providedIn: 'root'
})
export class UserItemService {

  constructor(private http: HttpClient) { }

  getUserItems(userId: string, itemId: string) {
    return this.http.get<UserItem[]>(
      '/gestionnaire-collection-tcg/v1/user-items?userId=' + userId + '&itemId=' + itemId
    );
  }

}
