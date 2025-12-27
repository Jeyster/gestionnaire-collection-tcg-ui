import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { Item } from '../../../shared/interfaces/item';
import { Page } from '../../../shared/interfaces/page';
import { ItemCard } from './item-card/item-card';

@Component({
  selector: 'app-item-search-results',
  standalone: true,
  imports: [
    CommonModule,
    ItemCard,
    MatPaginatorModule
  ],
  templateUrl: './item-search-results.html',
  styleUrl: './item-search-results.css',
})
export class ItemSearchResults {

  @Input({ required: true }) itemsPage!: Page<Item>;

  @Output() pageChange = new EventEmitter<PageEvent>();

  trackByItemId(_: number, item: Item): number {
    return item.id;
  }
}
