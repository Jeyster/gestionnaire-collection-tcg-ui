import { CommonModule } from "@angular/common";
import { Component, Output, EventEmitter, Input, inject } from "@angular/core";
import { ReactiveFormsModule, FormBuilder, FormGroup } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatCard, MatCardActions, MatCardTitle } from "@angular/material/card";
import { MatFormField } from "@angular/material/form-field";
import {MatSelectModule} from '@angular/material/select';
import { MatIcon } from "@angular/material/icon";
import { GameService } from "../../../../services/game-service";
import { ItemTypeService } from "../../../../services/item-type-service";
import { ItemSearchFiltersDto } from "../item-search-filters-dto";
import { Observable } from "rxjs";
import { Game } from "../../../../interfaces/game";
import { ItemType } from "../../../../interfaces/item-type";
import { Locale } from "../../../../interfaces/locale";
import { Expansion } from "../../../../interfaces/expansion";
import { ExpansionService } from "../../../../services/expansion-service";
import { LocaleService } from "../../../../services/locale-service";

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
    MatSelectModule,
    MatCardTitle
  ],
  templateUrl: './item-search-filters.html'
})
export class ItemSearchFilters {

  @Output()
  searchFilters = new EventEmitter<ItemSearchFiltersDto>();

  private fb = inject(FormBuilder);

  protected form = this.fb.group<ItemSearchFiltersDto>({
    gameId: null,
    itemTypeId: null,
    localeId: null,
    expansionId: null
  });

  protected games$: Observable<Game[]>;
  protected itemTypes$: Observable<ItemType[]>;
  protected locales$: Observable<Locale[]>;
  protected expansions$: Observable<Expansion[]>;
  
  constructor(
    private gameService: GameService,
    private itemTypeService: ItemTypeService,
    private localeService: LocaleService,
    private expansionService: ExpansionService
  ) {
    this.games$ = this.gameService.getGames();
    this.itemTypes$ = this.itemTypeService.getItemTypes();
    this.locales$ = this.localeService.getLocales();
    this.expansions$ = this.expansionService.getExpansions();
    
  }

  search() {
    this.searchFilters.emit(this.form.value);
  }
}
