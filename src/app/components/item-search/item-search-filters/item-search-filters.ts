import { CommonModule } from "@angular/common";
import { Component, Output, EventEmitter, Input, inject } from "@angular/core";
import { ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatCardActions } from "@angular/material/card";
import { MatFormField } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select';
import { MatIcon } from "@angular/material/icon";
import { GameService } from "../../../services/game-service";
import { ItemTypeService } from "../../../services/item-type-service";
import { ItemSearchFiltersDto } from "../item-search-filters-dto";
import { ExpansionService } from "../../../services/expansion-service";
import { LocaleService } from "../../../services/locale-service";

@Component({
  selector: 'app-item-search-filters',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatFormField, 
    MatButton, 
    MatIcon, 
    MatCardActions,
    MatSelectModule
  ],
  templateUrl: './item-search-filters.html',
  styleUrls: ['./item-search-filters.css']
})
export class ItemSearchFilters {

  @Input({ required: true })
  set filters(value: ItemSearchFiltersDto) {
    this.form.patchValue(value);
  }

  @Output()
  searchFilters = new EventEmitter<ItemSearchFiltersDto>();

  private fb = inject(FormBuilder);
  private gameService = inject(GameService);
  private itemTypeService = inject(ItemTypeService);
  private localeService = inject(LocaleService);
  private expansionService = inject(ExpansionService);

  protected form = this.fb.group<ItemSearchFiltersDto>({
    gameId: null,
    itemTypeId: null,
    localeId: null,
    expansionId: null
  });

  protected games$ = this.gameService.getGames();
  protected itemTypes$ = this.itemTypeService.getItemTypes();
  protected locales$ = this.localeService.getLocales();
  protected expansions$ = this.expansionService.getExpansions();

  protected search() {
    this.searchFilters.emit(this.form.getRawValue());
  }
}
