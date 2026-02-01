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
import { GameService } from '../../../../services/game-service';
import { MatSelect } from '@angular/material/select';
import { CreateItemDto } from './create-item-dto';
import { ExpansionService } from '../../../../services/expansion-service';
import { LocaleService } from '../../../../services/locale-service';
import { ItemTypeService } from '../../../../services/item-type-service';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-add-item-dialog',
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
    MatCheckbox,
    BusinessObjectDialogShell
  ],
  templateUrl: './add-item-dialog.html',
  styleUrls: [
    './add-item-dialog.css',
    '../../../../shared/components/dialogs/business-object-dialog-shell/business-object-dialog-shell.css'
  ]
})
export class AddItemDialog extends AbstractBusinessObjectDialog<CreateItemDto> {

  private gameService = inject(GameService);
  private itemTypeService = inject(ItemTypeService);
  private localeService = inject(LocaleService);
  private expansionService = inject(ExpansionService);

  protected games$ = this.gameService.getGames();
  protected itemTypes$ = this.itemTypeService.getItemTypes();
  protected locales$ = this.localeService.getLocales();
  protected expansions$ = this.expansionService.getExpansions();

  constructor() {
    super();

    this.form = this.fb.group({
      gameId: [null, [Validators.required]],
      itemTypeId: [null, [Validators.required]],
      expansionId: [null, [Validators.required]],
      localeId: [null, [Validators.required]],
      complement: [null],
      url: [null, [Validators.required]],
      isCmScrapingActive: [true]
    });
  }

  protected buildPayload(): CreateItemDto {
    const value = this.form.value;

    return {
      gameId: value.gameId,
      itemTypeId: value.itemTypeId,
      expansionId: value.expansionId,
      localeId: value.localeId,
      complement: value.complement,
      url: value.url,
      isCmScrapingActive: value.isCmScrapingActive
    };
  }
}

