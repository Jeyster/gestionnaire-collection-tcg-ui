import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddUserItem } from '../../../interfaces/add-user-item';
import { UserItemService } from '../../../services/user-item-service';
import { AddUserItemFormDto } from '../../../interfaces/add-user-item-form-dto';

@Component({
  selector: 'app-add-user-item-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-user-item-form.html'
})
export class AddUserItemForm {

  @Input() userId!: number;
  @Input() itemId!: number;

  @Output() added = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  protected form: AddUserItemFormDto = {
    purchasePrice: 0,
    purchaseDate: '',
    comment: ''
  };

  constructor(private userItemService: UserItemService) {}

  submit() {
    const timestamp = new Date(this.form.purchaseDate).toISOString();

    const addUserItem: AddUserItem = {
      userId: this.userId,
      itemId: this.itemId,
      purchasePrice: this.form.purchasePrice,
      purchaseDate: timestamp,
      comment: this.form.comment
    };
    this.userItemService.addUserItem(addUserItem).subscribe({
      next: () => {
        this.added.emit(); // informe le parent
      }
    });
  }

  cancel() {
    this.cancelled.emit();
  }
}
