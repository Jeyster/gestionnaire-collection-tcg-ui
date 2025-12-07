import { Component, inject, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../services/item-service';
import { PriceHistory } from '../../interfaces/price-history';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../interfaces/item';

@Component({
  selector: 'app-item-price-histories',
  imports: [CommonModule],
  templateUrl: './item-price-histories.html',
  styleUrls: ['./item-price-histories.css'],
  standalone: true
})
export default class ItemPriceHistories {

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  protected priceHistories$: Observable<PriceHistory[]>;

  protected itemId!: string;
  protected item!: Item;
  
  constructor(private itemService: ItemService) {
    this.itemId = this.route.snapshot.paramMap.get('item-id')!;
    this.priceHistories$ = this.itemService.getPriceHistories(this.itemId);
  }

  ngOnInit() {
    this.itemService.getItem(this.itemId)
    .subscribe({
      next: (item: Item) => {
        this.item = item;
      }
    });
  }

  retour() {
    this.router.navigate(['/games', this.item.game.id, 'item-types', this.item.itemType.id, 'items']);
  }

}
