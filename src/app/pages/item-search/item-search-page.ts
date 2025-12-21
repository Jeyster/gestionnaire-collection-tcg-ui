import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { map, switchMap } from "rxjs";
import { ItemService } from "../../services/item-service";
import { ItemSearchFilters } from "./item-search-filters/item-search-filters";
import { ItemSearchResults } from "./item-search-results/item-search-results";
import { ItemSearchFiltersDto } from "./item-search-filters/item-search-filters-dto";
import { ActivatedRoute, Router } from "@angular/router";
import { BackButton } from "../../shared/components/back-button/back-button";

@Component({
  selector: 'app-item-search',
  standalone: true,
  imports: [
    CommonModule,
    BackButton,
    ItemSearchFilters, 
    ItemSearchResults
  ],
  templateUrl: './item-search-page.html',
  styleUrls: [
    './item-search-page.css',
    '../../shared/css/page.css'
  ]
})
export class ItemSearchPage {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private itemService = inject(ItemService);

  protected filters$ = this.route.queryParams.pipe(
    map(params => ({
      gameId: params['gameId'] ? +params['gameId'] : null,
      itemTypeId: params['itemTypeId'] ? +params['itemTypeId'] : null,
      localeId: params['localeId'] ? +params['localeId'] : null,
      expansionId: params['expansionId'] ? +params['expansionId'] : null
    }))
  );

  protected items$ = this.filters$.pipe(
    switchMap(filters => this.itemService.searchItems(filters))
  );

  onSearch(filters: ItemSearchFiltersDto) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: filters,
    });
  }
}
