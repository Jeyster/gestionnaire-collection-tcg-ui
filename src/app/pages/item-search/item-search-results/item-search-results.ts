import { Component, Input } from '@angular/core';
import { Item } from '../../../shared/interfaces/item';
import { ItemCard } from './item-card/item-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-search-results',
  imports: [
    CommonModule,
    ItemCard
  ],
  templateUrl: './item-search-results.html',
  styleUrl: './item-search-results.css',
})
export class ItemSearchResults {

  @Input({ required: true })
  items: Item[] = [];

  protected trackByItemId(index: number, item: Item): number {
    return item.id;
  }

}
