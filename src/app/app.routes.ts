import { Routes } from '@angular/router';
import { GamesPage } from './pages/games/games-page';
import ItemTypesPage from './pages/item-types/item-types-page';
import ItemPriceHistoriesPage from './pages/item-price-histories/item-price-histories-page';
import { UserItemsPage } from './pages/user-items/user-items-page';
import { ItemSearchPage } from './pages/item-search/item-search-page';

export const routes: Routes = [
    { path: '', redirectTo: '/games', pathMatch: 'full' },
    { path: 'games', component: GamesPage},
    { path: 'games/:game-id/item-types', component: ItemTypesPage},
    { path: 'items/:item-id/price-histories', component: ItemPriceHistoriesPage },
    { path: 'items/:item-id/user-items', component: UserItemsPage },
    { path: 'items', component: ItemSearchPage}
];
