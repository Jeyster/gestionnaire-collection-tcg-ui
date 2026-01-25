import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Page } from '../../../shared/interfaces/page';
import { Item } from '../../../shared/interfaces/item';

@Component({
  selector: 'app-item-scraper-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginator,
    MatCheckboxModule
  ],
  templateUrl: './item-scraper-table.html',
  styleUrls: [
    './item-scraper-table.css'
  ]
})
export class ItemScraperTable {

  @Input({ required: true })
  itemsPage!: Page<Item>;

  @Output()
  pageChange = new EventEmitter<PageEvent>();

  @Output()
  toggleScraping = new EventEmitter<{ itemId: number; value: boolean }>();

  displayedColumns = [
    'game',
    'type',
    'expansion',
    'locale',
    'complement',
    'scraping'
  ];

  protected onToggleScraping(item: Item, checked: boolean) {
    this.toggleScraping.emit({
      itemId: item.id,
      value: checked
    });
  }

}
