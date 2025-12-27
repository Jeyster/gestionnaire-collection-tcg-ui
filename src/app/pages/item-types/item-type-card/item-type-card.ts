import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ItemType } from '../../../shared/interfaces/item-type';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-item-type-card',
  imports: [
    RouterLink,
    MatCardModule, 
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './item-type-card.html',
  styleUrls: [
    './item-type-card.css',
    '../../../shared/css/card.css'
  ],
})
export class ItemTypeCard {

  private route = inject(ActivatedRoute);

  @Input() 
  itemType!: ItemType;

  protected gameId = this.route.snapshot.paramMap.get('game-id')!;

}
