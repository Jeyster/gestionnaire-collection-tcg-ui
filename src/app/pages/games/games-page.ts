import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game-service';
import { GameCard } from './game-card/game-card';

@Component({
  selector: 'app-games-page',
  standalone: true,
  imports: [
    CommonModule, 
    GameCard
  ],
  templateUrl: './games-page.html',
  styleUrls: [
    './games-page.css',
    '../../shared/css/cards-grid.css',
    '../../shared/css/page.css'
  ]
})
export class GamesPage {

  private gameService = inject(GameService);

  protected games$ = this.gameService.getGames();

}
