import { Routes } from '@angular/router';
import { Games } from './components/games/games';
import ItemTypes from './components/item-types/item-types';

export const routes: Routes = [
    { path: 'games', component: Games},
    { path: 'games/:game-id/item-types', component: ItemTypes},
    //{ path: 'games/:game-id/item-types/:item-type-id/items', component: Items },
    { path: '', redirectTo: '/games', pathMatch: 'full' }
];
