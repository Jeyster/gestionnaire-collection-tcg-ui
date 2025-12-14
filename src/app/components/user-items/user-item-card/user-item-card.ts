import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserItem } from '../../../interfaces/user-item';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../utils/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-user-item-card',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './user-item-card.html',
  styleUrl: './user-item-card.css',
  standalone: true
})
export class UserItemCard {

  @Input() userItem!: UserItem;

  @Output() delete = new EventEmitter<number>();

  constructor (private dialog: MatDialog) {}

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.delete.emit(this.userItem.id);
    });
  }


}
