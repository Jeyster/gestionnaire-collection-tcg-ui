import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserItem } from '../interfaces/user-item';
import { AddUserItem } from '../interfaces/add-user-item';

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

  addUserItem(addUserItem: AddUserItem) {
    return this.http.post(
      '/gestionnaire-collection-tcg/v1/user-items',
      addUserItem
    );
  }

}
