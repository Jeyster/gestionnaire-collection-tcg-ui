import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { combineLatest } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../services/item-service';
import { ItemPriceHistory } from './item-price-history';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { UserItem } from '../user-items/user-item';
import { UserService } from '../../services/user-service';
import { UserItemService } from '../../services/user-item-service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BackButton } from '../../shared/components/back-button/back-button';
import { ItemInfos } from '../../shared/components/item-infos/item-infos';

@Component({
  selector: 'app-item-price-histories',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    BackButton,
    ItemInfos
  ],
  templateUrl: './item-price-histories-page.html',
  styleUrls: [
    './item-price-histories-page.css',
    '../../shared/css/page.css'
  ]
})
export default class ItemPriceHistoriesPage {

  private route = inject(ActivatedRoute);
  private itemService = inject(ItemService);
  private userService = inject(UserService);
  private userItemService = inject(UserItemService);

  protected user = this.userService.getLoggedUser();
  protected itemId = this.route.snapshot.paramMap.get('item-id')!;  

  protected item$ = this.itemService.getItem(this.itemId);
  protected priceHistories$ = this.itemService.getPriceHistories(this.itemId);
  protected userItems$ = this.userItemService.getUserItems(String(this.user.id), this.itemId);

  @ViewChild('priceChart', { static: false })
  protected priceChartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart: any;

  ngAfterViewInit() {
    // On crée le graph lorsque les données arrivent
    combineLatest([
      this.priceHistories$,
      this.userItems$
    ]).subscribe(([priceHistories, userItems]) => {
      this.buildChart(priceHistories, userItems);
    });
  }

  private buildChart(
    priceHistories: ItemPriceHistory[],
    userItems: UserItem[]
  ) {

    if (!priceHistories || priceHistories.length === 0) return;

    if (this.chart) {
      this.chart.destroy();
    }

    const cmDataset = {
      label: 'Prix moyen CardMarket',
      data: priceHistories
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        .map(h => ({
          x: new Date(h.createdAt),
          y: h.averagePrice
        })),
      borderColor: '#3b82f6',
      borderWidth: 2,
      tension: 0.25,
      pointRadius: 3,
    };

    const userItemDatasets = userItems.flatMap((userItem, index) => {
      const color = this.randomColor(index);

      const datasets: any[] = [];

      // ACHAT
      if (
        userItem.purchaseDate && 
        userItem.purchasePrice &&
        ((!userItem.sellingOrOpeningDate && !userItem.sellingPrice) ||
        (userItem.sellingOrOpeningDate && userItem.sellingPrice)) 
      ) {
        datasets.push({
          label: `Achat Item #${userItem.id}`,
          data: [{
            x: new Date(userItem.purchaseDate),
            y: userItem.purchasePrice
          }],
          borderColor: '#38bdf8',
          backgroundColor: color,
          pointStyle: 'triangle',
          pointRadius: 8,
          showLine: false
        });
      }

      // VENTE
      if (userItem.sellingOrOpeningDate && userItem.sellingPrice) {
        datasets.push({
          label: `Vente Item #${userItem.id}`,
          data: [{
            x: new Date(userItem.sellingOrOpeningDate),
            y: userItem.sellingPrice
          }],
          borderColor: '#22c55e',
          backgroundColor: color,
          pointStyle: 'rect',
          pointRadius: 8,
          showLine: false
        });
      }

      return datasets;
    });

    const datasets = [
      cmDataset,
      ...userItemDatasets
    ];

    this.chart = new Chart(this.priceChartCanvas.nativeElement, {
      type: 'line',
      data: { datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'time', 
            time: {
              unit: 'month',  // ou 'day', 'week', auto, etc.
              tooltipFormat: 'dd/MM/yyyy'
            },
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Prix (en €)'
            }
          }
        }
      }
    });
  }

  private randomColor(seed: number) {
    const colors = [
      '#16a34a', '#dc2626', '#9333ea',
      '#f97316', '#0ea5e9', '#14b8a6'
    ];
    return colors[seed % colors.length];
  }

}
