import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Page } from '../../../shared/interfaces/page';
import { Item } from '../../../shared/interfaces/item';
import { BulkToggleCmScrapingDto } from './bulk-toggle-cm-scraping';

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

  @Output()
  toggleAllScraping = new EventEmitter<BulkToggleCmScrapingDto>();

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

  get allChecked(): boolean {
    return this.itemsPage.content.every(i => i.isCmScrapingActive);
  }

  get someChecked(): boolean {
    const activeCount = this.itemsPage.content.filter(i => i.isCmScrapingActive).length;
    return activeCount > 0 && activeCount < this.itemsPage.content.length;
  }

  protected toggleAllOnPage(checked: boolean) {
    const payload: BulkToggleCmScrapingDto = {
      isCmScrapingActive: checked,
      itemIds: this.itemsPage.content
                .filter(i => i.isCmScrapingActive !== checked)
                .flatMap(i => i.id)
    };
    this.toggleAllScraping.emit(payload);
  }

}
