import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Item } from '../../interfaces/item';
import { ItemService } from '../../services/item-service';

@Component({
  selector: 'app-items',
  imports: [CommonModule],
  templateUrl: './items.html',
  styleUrls: ['./items.css'],
  standalone: true
})
export default class Items {

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  protected items$: Observable<Item[]>;

  protected gameId!: string;
  protected itemTypeId!: string;
  
  constructor(private itemService: ItemService) {
    this.gameId = this.route.snapshot.paramMap.get('game-id')!;
    this.itemTypeId = this.route.snapshot.paramMap.get('item-type-id')!;
    this.items$ = this.itemService.getItemByGameIdAndItemTypeId(this.gameId, this.itemTypeId);
  }

  retour() {
    this.router.navigate(['/games', this.gameId, 'item-types']);
  }

}
