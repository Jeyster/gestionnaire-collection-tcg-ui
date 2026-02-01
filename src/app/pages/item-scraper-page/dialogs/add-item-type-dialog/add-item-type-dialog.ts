import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { AbstractBusinessObjectDialog } from '../../../../shared/components/dialogs/abstract-business-object-dialog';
import { BusinessObjectDialogShell } from '../../../../shared/components/dialogs/business-object-dialog-shell/business-object-dialog-shell';
import { ItemType } from '../../../../shared/interfaces/item-type';

@Component({
  selector: 'app-add-item-type-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    BusinessObjectDialogShell
  ],
  templateUrl: './add-item-type-dialog.html',
  styleUrls: [
    './add-item-type-dialog.css',
    '../../../../shared/components/dialogs/business-object-dialog-shell/business-object-dialog-shell.css'
  ]
})
export class AddItemTypeDialog extends AbstractBusinessObjectDialog<ItemType> {

  constructor() {
    super();

    this.form = this.fb.group({
      name: [null, [Validators.required]]
    });
  }

  protected buildPayload(): ItemType {
    const value = this.form.value;

    return {
      id: 0,
      name: value.name
    };
  }
}

