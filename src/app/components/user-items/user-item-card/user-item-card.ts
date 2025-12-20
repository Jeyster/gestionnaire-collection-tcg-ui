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
import { MatIconModule } from '@angular/material/icon';
import { SellUserItem } from '../../../interfaces/sell-user-item';
import { OpenUserItem } from '../../../interfaces/open-user-item';
import { EditUserItemDialog } from '../dialogs/edit-user-item-dialog/edit-user-item-dialog';

@Component({
  selector: 'app-user-item-card',
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './user-item-card.html',
  styleUrls: [
    './user-item-card.css',
    '../../../shared/css/card.css'
  ],
  standalone: true
})
export class UserItemCard {

  @Input() userItem!: UserItem;

  @Output() edit = new EventEmitter<any>();
  @Output() sell = new EventEmitter<any>();
  @Output() open = new EventEmitter<any>();
  @Output() duplicate = new EventEmitter<AddUserItem>();
  @Output() delete = new EventEmitter<number>();

  constructor (private dialog: MatDialog) {}

  onEdit() {
    const dialogRef = this.dialog.open(EditUserItemDialog, {
      width: '400px',
      data: {
        userItem: this.userItem
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.edit.emit({userItemId: this.userItem.id, editUserItem: result});
    });
  }

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
        purchaseComment: this.userItem.purchaseComment
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
