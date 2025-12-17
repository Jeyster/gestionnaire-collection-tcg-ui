import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game-service';
import { GameCard } from './game-card/game-card';
import { Observable } from 'rxjs';
import { Game } from '../../interfaces/game';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, GameCard],
  templateUrl: './games.html',
  styleUrls: [
    './games.css',
    '../../shared/css/cards-grid.css'
  ]
})
export class Games {
  games$: Observable<Game[]>;

  constructor(private gameService: GameService) {
    this.games$ = this.gameService.getGames();
  }
}
