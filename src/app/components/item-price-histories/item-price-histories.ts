import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Observable, tap, combineLatest } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../services/item-service';
import { PriceHistory } from '../../interfaces/price-history';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../interfaces/item';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { User } from '../../interfaces/user';
import { UserItem } from '../../interfaces/user-item';
import { UserService } from '../../services/user-service';
import { UserItemService } from '../../services/user-item-service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-item-price-histories',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './item-price-histories.html',
  styleUrls: [
    './item-price-histories.css',
    '../../shared/css/page.css'
  ]
})
export default class ItemPriceHistories {

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  protected priceHistories$: Observable<PriceHistory[]>;

  protected itemId!: string;
  protected item$: Observable<Item>;
  protected item!: Item;
  protected user!: User;
  protected userItems$: Observable<UserItem[]>;

  @ViewChild('priceChart', { static: false })
  priceChartCanvas!: ElementRef<HTMLCanvasElement>;

  chart: any;

  constructor(
    private itemService: ItemService,
    private userService: UserService,
    private userItemService: UserItemService
  ) {
    this.itemId = this.route.snapshot.paramMap.get('item-id')!;
    this.priceHistories$ = this.itemService.getPriceHistories(this.itemId);

    this.item$ = this.itemService.getItem(this.itemId)
      .pipe(
        tap(item => {
          this.item = item;
        })
      );
    
    this.user = this.userService.getLoggedUser();
    this.userItems$ = this.userItemService.getUserItems(String(this.user.id), this.itemId);
  }

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
    priceHistories: PriceHistory[],
    userItems: UserItem[]
  ) {

    if (!priceHistories || priceHistories.length === 0) return;

    if (this.chart) {
      this.chart.destroy();
    }

    const cmDataset = {
      label: 'Prix moyen (CM)',
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

      // 🟢 ACHAT
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
          borderColor: '#16a34a',
          backgroundColor: color,
          pointStyle: 'triangle',
          pointRadius: 8,
          showLine: false
        });
      }

      // 🔴 VENTE
      if (userItem.sellingOrOpeningDate && userItem.sellingPrice) {
        datasets.push({
          label: `Vente Item #${userItem.id}`,
          data: [{
            x: new Date(userItem.sellingOrOpeningDate),
            y: userItem.sellingPrice
          }],
          borderColor: '#dc2626',
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
              text: 'Prix'
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

  retour() {
    this.router.navigate([
      '/games',
      this.item.game.id,
      'item-types',
      this.item.itemType.id,
      'items'
    ]);
  }
}
