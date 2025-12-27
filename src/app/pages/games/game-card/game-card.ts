import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Game } from '../../../shared/interfaces/game';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule, 
    MatButtonModule,
    MatIconModule,
    MatTooltip 
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
