import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemTypeService } from '../../services/item-type-service';
import { ItemTypeCard } from './item-type-card/item-type-card';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game-service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BackButton } from '../../shared/components/back-button/back-button';

@Component({
  selector: 'app-item-types-page',
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

  private route = inject(ActivatedRoute);
  private itemTypeService = inject(ItemTypeService);
  private gameService = inject(GameService);

  protected gameId = this.route.snapshot.paramMap.get('game-id')!;
  protected game$ = this.gameService.getGame(this.gameId);
  protected itemTypes$ = this.itemTypeService.getItemTypesByGameId(this.gameId);

}
