import { CommonModule } from "@angular/common";
import { Component, computed, effect, inject, signal } from "@angular/core";
import { map, switchMap } from "rxjs";
import { ItemService } from "../../../services/item-service";
import { ItemSearchFilters } from "./item-search-filters/item-search-filters";
import { ItemSearchResults } from "./item-search-results/item-search-results";
import { ItemSearchFiltersDto } from "./item-search-filters-dto";
import { ActivatedRoute, Router } from "@angular/router";
import { GameService } from "../../../services/game-service";
import { ExpansionService } from "../../../services/expansion-service";
import { ItemTypeService } from "../../../services/item-type-service";
import { LocaleService } from "../../../services/locale-service";
import { Expansion } from "../../../interfaces/expansion";

@Component({
  selector: 'app-item-search',
  standalone: true,
  imports: [
    CommonModule, 
    ItemSearchFilters, 
    ItemSearchResults
  ],
  templateUrl: './item-search.html',
  styleUrls: ['./item-search.css']
})
export class ItemSearch {

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private itemService = inject(ItemService);
  private gameService = inject(GameService);
  private expansionService = inject(ExpansionService);
  private itemTypeService = inject(ItemTypeService);
  private localeService = inject(LocaleService);
  
  protected currentFilters = signal<ItemSearchFiltersDto>({
    gameId: null,
    itemTypeId: null,
    localeId: null,
    expansionId: null
  });

  protected currentFiltersEffect = effect(() => {
    this.filters$.subscribe(filters => {
      this.currentFilters.set(filters);
    });
  });
  
  protected filters$ = this.route.queryParams.pipe(
    map(params => ({
      gameId: params['gameId'] != null ? +params['gameId'] : null,
      itemTypeId: params['itemTypeId'] != null ? +params['itemTypeId'] : null,
      localeId: params['localeId'] != null ? +params['localeId'] : null,
      expansionId: params['expansionId'] != null ? +params['expansionId'] : null
    } as ItemSearchFiltersDto))
  );

  protected items$ = this.filters$.pipe(
    switchMap(filters => this.itemService.searchItems(filters))
  );

  protected selectedGameId = signal<number | null>(null);
  protected expansions$ = computed(() => {
    const gameId = this.selectedGameId();
    return this.expansionService.getExpansionsByGame(gameId ? String(gameId): "");
  });

  
  protected games$ = this.gameService.getGames();
  protected itemTypes$ = this.itemTypeService.getItemTypes();
  protected locales$ = this.localeService.getLocales();
  
  ngOnInit() {
    this.filters$.subscribe(filters => {
      this.selectedGameId.set(filters.gameId);
    });
  }

  protected onSearch(filters: ItemSearchFiltersDto) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: filters
    });
  }

  protected onGameChange(gameId: number | null) {
    this.selectedGameId.set(gameId);
  }

}

