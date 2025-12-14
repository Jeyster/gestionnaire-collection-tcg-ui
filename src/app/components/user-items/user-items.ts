import { Component, inject } from '@angular/core';
import { ItemService } from '../../services/item-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, startWith, Subject, switchMap, tap } from 'rxjs';
import { Item } from '../../interfaces/item';
import { UserService } from '../../services/user-service';
import { User } from '../../interfaces/user';
import { UserItemService } from '../../services/user-item-service';
import { UserItem } from '../../interfaces/user-item';
import { CommonModule } from '@angular/common';
import { UserItemCard } from './user-item-card/user-item-card';
import { MatDialog } from '@angular/material/dialog';
import { AddUserItemDialog } from './add-user-item-dialog/add-user-item-dialog';

@Component({
  selector: 'app-user-items',
  imports: [
    CommonModule, 
    UserItemCard 
  ],
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

  retour() {
    this.router.navigate(['/games', this.item.game.id, 'item-types', this.item.itemType.id, 'items']);
  }

  onDelete(userItemId: number) {
    this.userItemService.deleteUserItem(String(userItemId)).subscribe(() => {
      this.reload$.next();
    });
  }

}
