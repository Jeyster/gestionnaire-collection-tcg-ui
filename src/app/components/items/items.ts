import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Item } from '../../interfaces/item';
import { ItemService } from '../../services/item-service';
import { ItemCard } from './item-card/item-card';
import { Game } from '../../interfaces/game';
import { GameService } from '../../services/game-service';
import { ItemType } from '../../interfaces/item-type';
import { ItemTypeService } from '../../services/item-type-service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BackButton } from '../shared/back-button/back-button';

@Component({
  selector: 'app-items',
  imports: [
    CommonModule, 
    MatButtonModule,
    MatIconModule,
    BackButton,
    ItemCard
  ],
  templateUrl: './items.html',
  styleUrls: [
    './items.css',
    '../../shared/css/cards-grid.css',
    '../../shared/css/page.css'
  ],
  standalone: true
})
export default class Items {

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private itemService = inject(ItemService);

  protected items$: Observable<Item[]>;

  protected gameId!: string;
  protected itemTypeId!: string;
  protected game$: Observable<Game>;
  protected itemType$: Observable<ItemType>;
  
  constructor(
    private gameService: GameService,
    private itemTypeService: ItemTypeService
  ) {
    this.gameId = this.route.snapshot.paramMap.get('game-id')!;
    this.itemTypeId = this.route.snapshot.paramMap.get('item-type-id')!;
    this.game$ = this.gameService.getGame(this.gameId);
    this.itemType$ = this.itemTypeService.getItemType(this.itemTypeId);
    this.items$ = this.itemService.getItemsByGameIdAndItemTypeId(this.gameId, this.itemTypeId);
  }

  retour() {
    this.router.navigate(['/games', this.gameId, 'item-types']);
  }

}
