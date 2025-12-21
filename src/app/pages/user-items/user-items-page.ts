import { Component, inject } from '@angular/core';
import { ItemService } from '../../services/item-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, startWith, Subject, switchMap, tap } from 'rxjs';
import { Item } from '../../shared/interfaces/item';
import { UserService } from '../../services/user-service';
import { User } from '../../shared/interfaces/user';
import { UserItemService } from '../../services/user-item-service';
import { UserItem } from './user-item';
import { CommonModule } from '@angular/common';
import { UserItemCard } from './user-item-card/user-item-card';
import { MatDialog } from '@angular/material/dialog';
import { AddUserItemDialog } from './dialogs/add-user-item-dialog/add-user-item-dialog';
import { SellUserItem } from './dialogs/sell-user-item-dialog/sell-user-item';
import { OpenUserItem } from './dialogs/open-user-item-dialog/open-user-item';
import { AddUserItem } from './dialogs/add-user-item-dialog/add-user-item';
import { EditUserItem } from './dialogs/edit-user-item-dialog/edit-user-item';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BackButton } from '../../shared/components/back-button/back-button';

@Component({
  selector: 'app-user-items',
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    BackButton, 
    UserItemCard
  ],
  templateUrl: './user-items-page.html',
  styleUrls: [
    './user-items-page.css',
    '../../shared/css/page.css'
  ],
  standalone: true
})
export class UserItemsPage {

  private route = inject(ActivatedRoute);

  protected user!: User;
  protected itemId!: string;
  protected item$: Observable<Item>;
  protected item!: Item;
  protected userItems$: Observable<UserItem[]>;

  private reload$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private itemService: ItemService,
    private userItemService: UserItemService,
    private dialog: MatDialog
  ) {
    this.user = this.userService.getLoggedUser();
    this.itemId = this.route.snapshot.paramMap.get('item-id')!;
    this.item$ = this.itemService.getItem(this.itemId)
      .pipe(
        tap(item => {
          this.item = item;
        })
      );

    this.userItems$ = this.reload$.pipe(
      startWith(void 0), // 👈 charge au démarrage
      switchMap(() =>
        this.userItemService.getUserItems(
          String(this.user.id),
          this.itemId
        )
      )
    );
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(AddUserItemDialog, {
      width: '400px',
      data: {
        userId: this.user.id,
        itemId: Number(this.itemId)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.userItemService.addUserItem(result).subscribe(() => {
        this.reload$.next(); // 🔥 RAFRAÎCHISSEMENT GARANTI
      });
    });
  }

  onEdit(userItemId: number, editUserItem: EditUserItem) {
    this.userItemService.editUserItem(String(userItemId), editUserItem).subscribe(() => {
      this.reload$.next();
    });
  }

  onSell(userItemId: number, sellUserItem: SellUserItem) {
    this.userItemService.sellUserItem(String(userItemId), sellUserItem).subscribe(() => {
      this.reload$.next();
    });
  }

  onOpen(userItemId: number, openUserItem: OpenUserItem) {
    this.userItemService.openUserItem(String(userItemId), openUserItem).subscribe(() => {
      this.reload$.next();
    });
  }

  onDuplicate(addUserItem: AddUserItem) {
    this.userItemService.addUserItem(addUserItem).subscribe(() => {
      this.reload$.next();
    });
  }

  onDelete(userItemId: number) {
    this.userItemService.deleteUserItem(String(userItemId)).subscribe(() => {
      this.reload$.next();
    });
  }

}
