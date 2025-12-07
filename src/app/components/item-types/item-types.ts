import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemType } from '../../interfaces/item-type';
import { ItemTypeService } from '../../services/item-type-service';
import { Observable } from 'rxjs';
import { ItemTypeCard } from './item-type-card/item-type-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-types',
  imports: [CommonModule, ItemTypeCard],
  templateUrl: './item-types.html',
  styleUrls: ['./item-types.css'],
  standalone: true
})
export default class ItemTypes {

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  protected gameId!: string;
  protected itemTypes$: Observable<ItemType[]>;
  
  constructor(private itemTypeService: ItemTypeService) {
    this.gameId = this.route.snapshot.paramMap.get('game-id')!;
    this.itemTypes$ = this.itemTypeService.getItemTypesByGameId(this.gameId);
  }

  retour() {
    this.router.navigate(['/games']);
  }

}
