import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Game } from '../../../shared/interfaces/game';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [
    MatCardModule, 
    MatButtonModule,
    MatIconModule, 
    RouterLink
  ],
  templateUrl: './game-card.html',
  styleUrls: [
    './game-card.css',
    '../../../shared/css/card.css'
  ]
})
export class GameCard {
  @Input() game!: Game;
}
