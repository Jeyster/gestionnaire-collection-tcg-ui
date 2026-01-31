import { CommonModule } from "@angular/common";
import { Component, Output, EventEmitter, Input, inject, OnInit, OnDestroy } from "@angular/core";
import { ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatCardActions } from "@angular/material/card";
import { MatFormField } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select';
import { MatIcon } from "@angular/material/icon";
import { GameService } from "../../../services/game-service";
import { ItemTypeService } from "../../../services/item-type-service";
import { ItemSearchFiltersDto } from "./item-search-filters-dto";
import { ExpansionService } from "../../../services/expansion-service";
import { LocaleService } from "../../../services/locale-service";
import { BehaviorSubject, Observable, Subject, switchMap, takeUntil } from "rxjs";

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
export class ItemSearchFilters implements OnInit, OnDestroy {

  @Input({ required: true })
  set filters(value: ItemSearchFiltersDto) {
    this.form.patchValue(value);
  }

  @Input({ required: true }) 
  parentRefresh$!: Observable<void>;

  @Output()
  searchFilters = new EventEmitter<ItemSearchFiltersDto>();
  
  private refresh$ = new BehaviorSubject<void>(undefined);
  private destroy$ = new Subject<void>();
  private fb = inject(FormBuilder);
  private gameService = inject(GameService);
  private itemTypeService = inject(ItemTypeService);
  private localeService = inject(LocaleService);
  private expansionService = inject(ExpansionService);

  private initForm: ItemSearchFiltersDto = {
    gameId: null,
    itemTypeId: null,
    localeId: null,
    expansionId: null
  };
  protected form = this.fb.group<ItemSearchFiltersDto>(this.initForm); 

  protected games$ = this.refresh$.pipe(
    switchMap(() => this.gameService.getGames())
  );

  protected itemTypes$ = this.refresh$.pipe(
    switchMap(() => this.itemTypeService.getItemTypes())
  );

  protected locales$ = this.refresh$.pipe(
    switchMap(() => this.localeService.getLocales())
  );

  protected expansions$ = this.refresh$.pipe(
    switchMap(() => this.expansionService.getExpansions())
  );

  ngOnInit() {
    this.parentRefresh$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.refresh$.next();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected search() {
    this.searchFilters.emit(this.form.getRawValue());
  }

  protected resetForm() {
    this.form.reset(this.initForm);
    this.search();
  }
}
