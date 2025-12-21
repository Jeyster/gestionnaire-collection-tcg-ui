import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserItem } from '../pages/user-items/user-item';
import { AddUserItem } from '../pages/user-items/dialogs/add-user-item-dialog/add-user-item';
import { SellUserItem } from '../pages/user-items/dialogs/sell-user-item-dialog/sell-user-item';
import { OpenUserItem } from '../pages/user-items/dialogs/open-user-item-dialog/open-user-item';
import { EditUserItem } from '../pages/user-items/dialogs/edit-user-item-dialog/edit-user-item';

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
  
  editUserItem(id: string, editUserItem: EditUserItem) {
    return this.http.put(
      '/gestionnaire-collection-tcg/v1/user-items/' + id, 
      editUserItem
    );
  }

  sellUserItem(id: string, sellUserItem: SellUserItem) {
    return this.http.put(
      '/gestionnaire-collection-tcg/v1/user-items/' + id + '/sell', 
      sellUserItem
    );
  }
  
  openUserItem(id: string, openUserItem: OpenUserItem) {
    return this.http.put(
      '/gestionnaire-collection-tcg/v1/user-items/' + id + '/open', 
      openUserItem
    );
  }

  deleteUserItem(id: string) {
    return this.http.delete('/gestionnaire-collection-tcg/v1/user-items/' + id);
  }

}
