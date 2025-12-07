import { Routes } from '@angular/router';
import { Games } from './games/games';

export const routes: Routes = [
    { path: 'games', component: Games},
    { path: '', redirectTo: '/games', pathMatch: 'full' }
];
