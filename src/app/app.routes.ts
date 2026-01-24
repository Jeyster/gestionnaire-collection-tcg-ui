import { Routes } from '@angular/router';
import { GamesPage } from './pages/games/games-page';
import ItemTypesPage from './pages/item-types/item-types-page';
import ItemPriceHistoriesPage from './pages/item-price-histories/item-price-histories-page';
import { UserItemsPage } from './pages/user-items/user-items-page';
import { ItemSearchPage } from './pages/item-search/item-search-page';
import { ItemScraperManagerPage } from './pages/item-scraper-manager-page/item-scraper-manager-page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'games',
    pathMatch: 'full'
  },
  {
    path: 'games',
    children: [
      {
        path: '',
        component: GamesPage
      },
      {
        path: ':gameId/item-types',
        component: ItemTypesPage
      },
    ],
  },
  {
    path: 'items',
    children: [
      {
        path: '',
        component: ItemSearchPage
      },
      {
        path: ':itemId/price-histories',
        component: ItemPriceHistoriesPage
      },
      {
        path: ':itemId/user-items',
        component: UserItemsPage
      },
    ],
  },
  {
    path: 'item-scraper',
    component: ItemScraperManagerPage
  }
];

