import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../services/item-service';
import { PriceHistory } from '../../interfaces/price-history';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../interfaces/item';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'app-item-price-histories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-price-histories.html',
  styleUrls: ['./item-price-histories.css']
})
export default class ItemPriceHistories {

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  protected priceHistories$: Observable<PriceHistory[]>;

  protected itemId!: string;
  protected item$: Observable<Item>;
  protected item!: Item;

  @ViewChild('priceChart', { static: false })
  priceChartCanvas!: ElementRef<HTMLCanvasElement>;

  chart: any;

  constructor(private itemService: ItemService) {
    this.itemId = this.route.snapshot.paramMap.get('item-id')!;
    this.priceHistories$ = this.itemService.getPriceHistories(this.itemId);

    this.item$ = this.itemService.getItem(this.itemId)
      .pipe(
        tap(item => {
          this.item = item;
        })
      );
  }

  ngAfterViewInit() {
    // On crée le graph lorsque les données arrivent
    this.priceHistories$.subscribe(histories => {
      this.buildChart(histories);
    });
  }

private buildChart(histories: PriceHistory[]) {
  if (!histories || histories.length === 0) return;

  if (this.chart) {
    this.chart.destroy();
  }

  const sorted = [...histories].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const data = sorted.map(h => ({
    x: new Date(h.createdAt),   // Date JS → time scale
    y: h.averagePrice
  }));

  this.chart = new Chart(this.priceChartCanvas.nativeElement, {
    type: 'line',
    data: {
      datasets: [
        {
          label: 'Prix moyen',
          data,
          borderColor: '#3b82f6',
          borderWidth: 2,
          tension: 0.25,
          pointRadius: 3,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'time',   // 🎉 Échelle temporelle
          time: {
            unit: 'month',  // ou 'month', 'week', auto, etc.
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
