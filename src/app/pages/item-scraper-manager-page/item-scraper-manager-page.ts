import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { ItemSearchFilters } from '../item-search/item-search-filters/item-search-filters';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../services/item-service';
import { BehaviorSubject, combineLatest, map, switchMap } from 'rxjs';
import { ItemSearchFiltersDto } from '../item-search/item-search-filters/item-search-filters-dto';
import { PageEvent } from '@angular/material/paginator';
import { Item } from '../../shared/interfaces/item';
import { ItemScraperTable } from './item-scraper-table/item-scraper-table';
import { BackButton } from '../../shared/components/back-button/back-button';
import { ToggleCmScraping } from './item-scraper-table/toggle-cm-scraping';

@Component({
  selector: 'app-item-scraper-manager-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButton,
    MatTooltip,
    MatIcon,
    BackButton,
    ItemSearchFilters,
    ItemScraperTable
  ],
  templateUrl: './item-scraper-manager-page.html',
  styleUrls: [
    './item-scraper-manager-page.css',
    '../../shared/css/page.css'
  ]
})
export class ItemScraperManagerPage {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private itemService = inject(ItemService);

  protected filters$ = this.route.queryParams.pipe(
    map(params => ({
      gameId: params['gameId'] ? +params['gameId'] : null,
      itemTypeId: params['itemTypeId'] ? +params['itemTypeId'] : null,
      localeId: params['localeId'] ? +params['localeId'] : null,
      expansionId: params['expansionId'] ? +params['expansionId'] : null,
      pageIndex: params['pageIndex'] ? +params['pageIndex'] : 0,
      pageSize: params['pageSize'] ? +params['pageSize'] : 12
    }))
  );

  private refresh$ = new BehaviorSubject<void>(undefined);

  protected itemsPage$ = combineLatest([
    this.filters$,
    this.refresh$
  ]).pipe(
    switchMap(([filters]) =>
      this.itemService.searchItems(filters)
    )
  );

  private updateQueryParams(filters: Partial<ItemSearchFiltersDto>) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: filters,
      queryParamsHandling: 'merge'
    });
  }

  protected onSearch(filters: ItemSearchFiltersDto) {
    this.updateQueryParams({
      ...filters,
      pageIndex: 0
    });
  }

  protected onPageChange(event: PageEvent) {
    this.updateQueryParams({
      pageIndex: event.pageIndex,
      pageSize: event.pageSize
    });
  }

  protected onToggleScraping(event: { itemId: number; value: boolean }) {
    const payload: ToggleCmScraping = {
      isCmScrapingActive: event.value
    };

    this.itemService.toggleScraping(String(event.itemId), payload).subscribe(() => {
      this.refresh$.next();
    });
  }

}
