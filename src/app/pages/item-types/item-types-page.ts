import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemType } from '../../shared/interfaces/item-type';
import { ItemTypeService } from '../../services/item-type-service';
import { Observable } from 'rxjs';
import { ItemTypeCard } from './item-type-card/item-type-card';
import { CommonModule } from '@angular/common';
import { Game } from '../../shared/interfaces/game';
import { GameService } from '../../services/game-service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BackButton } from '../../shared/components/back-button/back-button';

@Component({
  selector: 'app-item-types',
  imports: [
    CommonModule, 
    MatButtonModule,
    MatIconModule,
    BackButton,
    ItemTypeCard
  ],
  templateUrl: './item-types-page.html',
  styleUrls: [
    './item-types-page.css',
    '../../shared/css/cards-grid.css',
    '../../shared/css/page.css'
  ],
  standalone: true
})
export default class ItemTypesPage {

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  protected gameId!: string;
  protected game$: Observable<Game>;
  protected itemTypes$: Observable<ItemType[]>;
  
  constructor(
    private itemTypeService: ItemTypeService,
    private gameService: GameService
  ) {
    this.gameId = this.route.snapshot.paramMap.get('game-id')!;
    this.game$ = this.gameService.getGame(this.gameId);
    this.itemTypes$ = this.itemTypeService.getItemTypesByGameId(this.gameId);
  }

}
