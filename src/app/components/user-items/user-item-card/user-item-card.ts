import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserItem } from '../../../interfaces/user-item';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../utils/confirm-dialog/confirm-dialog';
import { SellUserItemDialog } from '../sell-user-item-dialog/sell-user-item-dialog';
import { OpenUserItemDialog } from '../open-user-item-dialog/open-user-item-dialog';
import { AddUserItem } from '../../../interfaces/add-user-item';

@Component({
  selector: 'app-user-item-card',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './user-item-card.html',
  styleUrl: './user-item-card.css',
  standalone: true
})
export class UserItemCard {

  @Input() userItem!: UserItem;

  @Output() sell = new EventEmitter<any>();
  @Output() open = new EventEmitter<any>();
  @Output() duplicate = new EventEmitter<AddUserItem>();
  @Output() delete = new EventEmitter<number>();

  constructor (private dialog: MatDialog) {}

  onSell() {
    const dialogRef = this.dialog.open(SellUserItemDialog, {
      width: '400px',
      data: {
        userItem: this.userItem
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.sell.emit({userItemId: this.userItem.id, sellUserItem: result});
    });
  }

  onOpen() {
    const dialogRef = this.dialog.open(OpenUserItemDialog, {
      width: '400px',
      data: {
        userItem: this.userItem
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.open.emit({userItemId: this.userItem.id, openUserItem: result});
    });
  }

  onDuplicate() {
    const dialogRef = this.dialog.open(ConfirmDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      const addUserItem: AddUserItem = {
        userId: this.userItem.user.id,
        itemId: this.userItem.item.id,
        purchasePrice: this.userItem.purchasePrice,
        purchaseDate: String(this.userItem.purchaseDate),
        comment: this.userItem.comment
      };
      this.duplicate.emit(addUserItem);
    });
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.delete.emit(this.userItem.id);
    });
  }

}
