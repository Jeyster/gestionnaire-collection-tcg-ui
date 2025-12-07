import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Game } from '../../../interfaces/game';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './game-card.html',
  styleUrls: ['./game-card.css']
})
export class GameCard {
  @Input() game!: Game;
}
