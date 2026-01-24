import { Component, Input } from '@angular/core';
import { Item } from '../../interfaces/item';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-item-infos',
  imports: [
    CommonModule,
    RouterLink,
    MatTooltip
  ],
  templateUrl: './item-infos.html',
  styleUrls: [
    './item-infos.css',
    '../../css/item-infos.css'
  ],
  standalone: true
})
export class ItemInfos {

  @Input()
  item!: Item;

}
