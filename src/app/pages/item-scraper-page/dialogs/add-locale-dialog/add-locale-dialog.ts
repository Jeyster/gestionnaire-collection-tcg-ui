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
import { Locale } from '../../../../shared/interfaces/locale';

@Component({
  selector: 'app-add-locale-dialog',
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
  templateUrl: './add-locale-dialog.html',
  styleUrls: [
    './add-locale-dialog.css',
    '../../../../shared/components/dialogs/business-object-dialog-shell/business-object-dialog-shell.css'
  ]
})
export class AddLocaleDialog extends AbstractBusinessObjectDialog<Locale> {

  constructor() {
    super();

    this.form = this.fb.group({
      name: [null, [Validators.required]]
    });
  }

  protected buildPayload(): Locale {
    const value = this.form.value;

    return {
      id: 0,
      name: value.name
    };
  }
}

