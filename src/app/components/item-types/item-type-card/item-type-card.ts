import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ItemType } from '../../../interfaces/item-type';

@Component({
  selector: 'app-item-type-card',
  imports: [MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './item-type-card.html',
  styleUrls: ['./item-type-card.css'],
})
export class ItemTypeCard {

  private route = inject(ActivatedRoute);

  @Input() itemType!: ItemType;

  protected gameId!: string;

  ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get('game-id')!;
  }
}
