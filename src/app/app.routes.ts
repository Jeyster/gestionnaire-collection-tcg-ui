import { Routes } from '@angular/router';
import { Games } from './components/games/games';
import ItemTypes from './components/item-types/item-types';
import ItemPriceHistories from './components/item-price-histories/item-price-histories';
import { UserItems } from './components/user-items/user-items';
import { ItemSearch } from './components/item-search/item-search';

export const routes: Routes = [
    { path: '', redirectTo: '/games', pathMatch: 'full' },
    { path: 'games', component: Games},
    { path: 'games/:game-id/item-types', component: ItemTypes},
    { path: 'items/:item-id/price-histories', component: ItemPriceHistories },
    { path: 'items/:item-id/user-items', component: UserItems },
    { path: 'items', component: ItemSearch}
];
