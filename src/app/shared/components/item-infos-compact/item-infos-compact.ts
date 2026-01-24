import { Component, Input } from '@angular/core';
import { Item } from '../../interfaces/item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-infos-compact',
  imports: [
    CommonModule
  ],
  templateUrl: './item-infos-compact.html',
  styleUrls: [
    './item-infos-compact.css',
    '../../css/item-infos.css'
  ],
  standalone: true
})
export class ItemInfosCompact {

  @Input()
  item!: Item;

}
