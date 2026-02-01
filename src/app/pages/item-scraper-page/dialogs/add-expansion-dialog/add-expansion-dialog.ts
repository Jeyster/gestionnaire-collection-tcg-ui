import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { AbstractBusinessObjectDialog } from '../../../../shared/components/dialogs/abstract-business-object-dialog';
import { BusinessObjectDialogShell } from '../../../../shared/components/dialogs/business-object-dialog-shell/business-object-dialog-shell';
import { CreateExpansionDto } from './create-expansion-dto';
import { GameService } from '../../../../services/game-service';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-add-expansion-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelect,
    MatLabel,
    MatOption,
    BusinessObjectDialogShell
  ],
  templateUrl: './add-expansion-dialog.html',
  styleUrls: [
    './add-expansion-dialog.css',
    '../../../../shared/components/dialogs/business-object-dialog-shell/business-object-dialog-shell.css'
  ]
})
export class AddExpansionDialog extends AbstractBusinessObjectDialog<CreateExpansionDto> {

  private gameService = inject(GameService);

  protected games$ = this.gameService.getGames();

  constructor() {
    super();

    this.form = this.fb.group({
      expansionName: [null, [Validators.required]],
      gameId: [null, [Validators.required]]
    });
  }

  protected buildPayload(): CreateExpansionDto {
    const value = this.form.value;

    return {
      expansionName: value.expansionName,
      gameId: value.gameId
    };
  }
}

