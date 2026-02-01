import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ItemSearchFilters } from '../item-search/item-search-filters/item-search-filters';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../services/item-service';
import { BehaviorSubject, catchError, combineLatest, debounceTime, EMPTY, map, switchMap } from 'rxjs';
import { ItemSearchFiltersDto } from '../item-search/item-search-filters/item-search-filters-dto';
import { PageEvent } from '@angular/material/paginator';
import { ItemScraperTable } from './item-scraper-table/item-scraper-table';
import { BackButton } from '../../shared/components/back-button/back-button';
import { ToggleCmScraping } from './item-scraper-table/toggle-cm-scraping';
import { BulkToggleCmScrapingDto } from './item-scraper-table/bulk-toggle-cm-scraping';
import { MatDialog } from '@angular/material/dialog';
import { GameService } from '../../services/game-service';
import { AddGameDialog } from './dialogs/add-game-dialog/add-game-dialog';

@Component({
  selector: 'app-item-scraper-page',
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
  templateUrl: './item-scraper-page.html',
  styleUrls: [
    './item-scraper-page.css',
    '../../shared/css/page.css'
  ]
})
export class ItemScraperPage {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private itemService = inject(ItemService);
  private gameService = inject(GameService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  protected filters$ = this.route.queryParams.pipe(
    map(params => ({
      gameId: params['gameId'] ? +params['gameId'] : null,
      itemTypeId: params['itemTypeId'] ? +params['itemTypeId'] : null,
      localeId: params['localeId'] ? +params['localeId'] : null,
      expansionId: params['expansionId'] ? +params['expansionId'] : null,
      pageIndex: params['pageIndex'] ? +params['pageIndex'] : 0,
      pageSize: params['pageSize'] ? +params['pageSize'] : 20
    }))
  );

  protected refresh$ = new BehaviorSubject<void>(undefined);

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

  protected onToggleAllScraping(payload: BulkToggleCmScrapingDto) {
    this.itemService.bulkToggleScraping(payload).subscribe(() => {
      this.refresh$.next();
    });
  }

  protected addGameDialog() {
    const dialogRef = this.dialog.open(AddGameDialog, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.gameService.createGame(result).pipe(
        catchError(err => {
          // 🟥 Cas erreur métier (409)
          if (err.status === 409 && err.error?.detail) {
            this.snackBar.open(
              err.error.detail,
              'Fermer',
              {
                panelClass: ['snackbar-error'],
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 10000
              }
            );
            return EMPTY;
          }

          // 🟥 Cas erreur inconnue
          this.snackBar.open(
            'Une erreur est survenue lors de la création du jeu.',
            'Fermer', 
            {
              panelClass: ['snackbar-error'],
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 10000
            }
          );
          return EMPTY;
        })
      ).subscribe((createdGame) => {
        // 🟩 Succès
        this.snackBar.open(
          `Jeu "${createdGame.name}" créé avec succès`,
          'OK',
          {
            panelClass: ['snackbar-success'],
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 6000
          }
        );

        this.refresh$.next();
      });
    });
  }

}
