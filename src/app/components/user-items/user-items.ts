import { Component, inject } from '@angular/core';
import { ItemService } from '../../services/item-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Item } from '../../interfaces/item';
import { UserService } from '../../services/user-service';
import { User } from '../../interfaces/user';
import { UserItemService } from '../../services/user-item-service';
import { UserItem } from '../../interfaces/user-item';
import { CommonModule } from '@angular/common';
import { UserItemCard } from './user-item-card/user-item-card';
import { AddUserItemForm } from './add-user-item-form/add-user-item-form';

@Component({
  selector: 'app-user-items',
  imports: [CommonModule, UserItemCard, AddUserItemForm],
  templateUrl: './user-items.html',
  styleUrl: './user-items.css',
  standalone: true
})
export class UserItems {

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  protected user!: User;
  protected itemId!: string;
  protected item$: Observable<Item>;
  protected item!: Item;
  protected userItems$: Observable<UserItem[]>;

  protected showAddForm = false;

  constructor(
    private userService: UserService,
    private itemService: ItemService,
    private userItemService: UserItemService
  ) {
    this.user = this.userService.getLoggedUser();
    this.itemId = this.route.snapshot.paramMap.get('item-id')!;
    this.item$ = this.itemService.getItem(this.itemId)
      .pipe(
        tap(item => {
          this.item = item;
        })
      );

    this.userItems$ = this.userItemService.getUserItems(String(this.user.id), this.itemId);
  }

  retour() {
    this.router.navigate(['/games', this.item.game.id, 'item-types', this.item.itemType.id, 'items']);
  }

  refresh() {
    this.userItems$ = this.userItemService.getUserItems(
      String(this.user.id),
      this.itemId
    );
  }


}
