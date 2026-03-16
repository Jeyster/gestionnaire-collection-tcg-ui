import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ItemSearchFilters } from '../item-search/item-search-filters/item-search-filters';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../services/item-service';
import { BehaviorSubject, catchError, combineLatest, EMPTY, map, switchMap, takeUntil } from 'rxjs';
import { ItemSearchFiltersDto } from '../item-search/item-search-filters/item-search-filters-dto';
import { PageEvent } from '@angular/material/paginator';
import { ItemScraperTable } from './item-scraper-table/item-scraper-table';
import { BackButton } from '../../shared/components/back-button/back-button';
import { ToggleCmScraping } from './item-scraper-table/toggle-cm-scraping';
import { BulkToggleCmScrapingDto } from './item-scraper-table/bulk-toggle-cm-scraping';
import { MatDialog } from '@angular/material/dialog';
import { GameService } from '../../services/game-service';
import { AddGameDialog } from './dialogs/add-game-dialog/add-game-dialog';
import { AddItemTypeDialog } from './dialogs/add-item-type-dialog/add-item-type-dialog';
import { ItemTypeService } from '../../services/item-type-service';
import { LocaleService } from '../../services/locale-service';
import { AddLocaleDialog } from './dialogs/add-locale-dialog/add-locale-dialog';
import { AddExpansionDialog } from './dialogs/add-expansion-dialog/add-expansion-dialog';
import { ExpansionService } from '../../services/expansion-service';
import { AddItemDialog } from './dialogs/add-item-dialog/add-item-dialog';
import { ScrapingService } from '../../services/scraping-service';
import { OpenLogsDialog } from './dialogs/open-logs-dialog/open-logs-dialog';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-item-scraper-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButton,
    MatIcon,
    MatIconButton,
    MatTooltip,
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
  private expansionService = inject(ExpansionService);
  private itemTypeService = inject(ItemTypeService);
  private localeService = inject(LocaleService);
  private scrapingService = inject(ScrapingService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  /**
   * Initialize filters with query parameters or default values
   */
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
  protected scrapingRunning$ = this.scrapingService.status$;

  /**
   * Load items when filters or refresh (after creating a new item) are modified
   */
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

  protected addItemDialog() {
    const dialogRef = this.dialog.open(AddItemDialog, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.itemService.createItem(result).pipe(
        catchError(err => {
          // 🟥 Cas erreur métier (409 ou 404)
          if ((err.status === 409 || err.status === 404) && err.error?.detail) {
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
            'Une erreur est survenue lors de la création de l\'item.',
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
      ).subscribe((createdItem) => {
        // 🟩 Succès
        this.snackBar.open(
          `Item ${createdItem.game.name} / ${createdItem.itemType.name} / ${createdItem.locale.name} / ${createdItem.expansion.name} créé avec succès`,
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

  protected addExpansionDialog() {
    const dialogRef = this.dialog.open(AddExpansionDialog, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.expansionService.createExpansion(result).pipe(
        catchError(err => {
          // 🟥 Cas erreur métier (409 ou 404)
          if ((err.status === 409 || err.status === 404) && err.error?.detail) {
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
            'Une erreur est survenue lors de la création de l\'extension.',
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
      ).subscribe((createdExpansion) => {
        // 🟩 Succès
        this.snackBar.open(
          `Extension "${createdExpansion.name}" du jeu "${createdExpansion.game.name}" créé avec succès`,
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

  protected addItemTypeDialog() {
    const dialogRef = this.dialog.open(AddItemTypeDialog, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.itemTypeService.createItemType(result).pipe(
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
            'Une erreur est survenue lors de la création du type d\'item.',
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
      ).subscribe((createdItemType) => {
        // 🟩 Succès
        this.snackBar.open(
          `Type d'item "${createdItemType.name}" créé avec succès`,
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

  protected addLocaleDialog() {
    const dialogRef = this.dialog.open(AddLocaleDialog, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.localeService.createLocale(result).pipe(
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
            'Une erreur est survenue lors de la création du langage.',
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
      ).subscribe((createdItemType) => {
        // 🟩 Succès
        this.snackBar.open(
          `Langage "${createdItemType.name}" créé avec succès`,
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

  protected startScraping() {
    this.scrapingService.start();
    this.openLogsDialog();
  }

  /**
   * OpenLogsDialog has an Output stopScraping.
   * Subscription on the stopScraping emition.
   */
  protected openLogsDialog() {
    const dialogRef = this.dialog.open(OpenLogsDialog, {
      width: '800px'
    });

    dialogRef.componentInstance.stopScraping
      .subscribe(() => {
        this.scrapingService.stop();
      });
  }

}
