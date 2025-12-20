import { CommonModule } from "@angular/common";
import { Component, Output, EventEmitter, inject, Input, signal } from "@angular/core";
import { ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatCard, MatCardActions } from "@angular/material/card";
import { MatFormField } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select';
import { MatIcon } from "@angular/material/icon";
import { ItemSearchFiltersDto } from "../item-search-filters-dto";
import { Game } from "../../../../interfaces/game";
import { ItemType } from "../../../../interfaces/item-type";
import { Locale } from "../../../../interfaces/locale";
import { Expansion } from "../../../../interfaces/expansion";
import { filter } from "rxjs";

@Component({
  selector: 'app-item-search-filters',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatFormField, 
    MatButton, 
    MatIcon, 
    MatCard,
    MatCardActions,
    MatSelectModule
  ],
  templateUrl: './item-search-filters.html',
  styleUrls: ['./item-search-filters.css']
})
export class ItemSearchFilters {

  protected filtersSignal = signal<ItemSearchFiltersDto>({
    gameId: null,
    itemTypeId: null,
    localeId: null,
    expansionId: null
  });

  @Input({ required: true })
  set filters(value: ItemSearchFiltersDto) {
    this.filtersSignal.set(value);
    this.form.patchValue(value);
  }

  @Input({ required: true }) 
  games: Game[] | null = [];

  @Input({ required: true }) 
  itemTypes: ItemType[] | null = [];

  @Input({ required: true }) 
  locales: Locale[] | null = [];

  @Input({ required: true }) 
  expansions: Expansion[] | null = [];

  @Output()
  searchFilters = new EventEmitter<ItemSearchFiltersDto>();

  @Output()
  gameChange = new EventEmitter<number>();

  private fb = inject(FormBuilder);

  protected form = this.fb.group<ItemSearchFiltersDto>({
    gameId: null,
    itemTypeId: null,
    localeId: null,
    expansionId: null
  });

  protected search() {
    this.searchFilters.emit(this.form.value);
  }

  protected onGameChange(gameId: number | null | undefined) {
    const safeGameId = gameId ?? null;

    this.form.patchValue({ 
      gameId: safeGameId,
      expansionId: null 
    });

    this.gameChange.emit(safeGameId);
  }
}
