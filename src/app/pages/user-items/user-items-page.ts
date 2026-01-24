import { Component, inject } from '@angular/core';
import { ItemService } from '../../services/item-service';
import { ActivatedRoute } from '@angular/router';
import { startWith, Subject, switchMap } from 'rxjs';
import { UserService } from '../../services/user-service';
import { UserItemService } from '../../services/user-item-service';
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
import { ItemInfos } from '../../shared/components/item-infos/item-infos';
import { USER_ITEM_STATUS_CONFIG } from '../../shared/configs/user-item-status.config';
import { UserItemStatus } from '../../shared/enums/user-item-status';
import { ItemCardmarketInfos } from '../../shared/components/item-cardmarket-infos/item-cardmarket-infos';
import { UserItemsInfos } from '../../shared/components/user-items-infos/user-items-infos';

@Component({
  selector: 'app-user-items-page',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    BackButton,
    ItemInfos,
    ItemCardmarketInfos,
    UserItemCard,
    UserItemsInfos
  ],
  templateUrl: './user-items-page.html',
  styleUrls: [
    './user-items-page.css',
    '../../shared/css/page.css',
    '../../shared/css/meta-item-infos.css'
  ],
  standalone: true
})
export class UserItemsPage {

  protected readonly UserItemStatus = UserItemStatus;
  protected readonly UserItemStatusConfig = USER_ITEM_STATUS_CONFIG;

  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  private userService = inject(UserService);
  private itemService = inject(ItemService);
  private userItemService = inject(UserItemService);

  protected user = this.userService.getLoggedUser();
  protected itemId = this.route.snapshot.paramMap.get('itemId')!;

  protected item$ = this.itemService.getItem(this.itemId);
  protected lastPriceHistory$ = this.itemService.getLastPriceHistory(this.itemId);

  private reload$ = new Subject<void>();
  protected userItems$ = this.reload$.pipe(
    startWith(void 0), // 👈 charge au démarrage
    switchMap(() =>
      this.userItemService.getUserItems(
        String(this.user.id),
        this.itemId
      )
    )
  );

  protected userItemsCount$ = this.reload$.pipe(
    startWith(void 0), // 👈 charge au démarrage
    switchMap(() =>
      this.userItemService.getUserItemsCount(
        String(this.user.id),
        this.itemId
      )
    )
  );
  
  protected inStockUserItemsCount$ = this.reload$.pipe(
    startWith(void 0), // 👈 charge au démarrage
    switchMap(() =>
      this.userItemService.getUserItemsInStockCount(
        String(this.user.id),
        this.itemId
      )
    )
  );
  
  protected soldUserItemsCount$ = this.reload$.pipe(
    startWith(void 0), // 👈 charge au démarrage
    switchMap(() =>
      this.userItemService.getSoldUserItemsCount(
        String(this.user.id),
        this.itemId
      )
    )
  );
  
  protected openedUserItemsCount$ = this.reload$.pipe(
    startWith(void 0), // 👈 charge au démarrage
    switchMap(() =>
      this.userItemService.getOpenedUserItemsCount(
        String(this.user.id),
        this.itemId
      )
    )
  );
  
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
