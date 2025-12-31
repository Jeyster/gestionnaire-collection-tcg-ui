import { Component, Input } from '@angular/core';
import { Item } from '../../interfaces/item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-infos-compact',
  imports: [
    CommonModule
  ],
  templateUrl: './item-infos-compact.html',
  styleUrl: './item-infos-compact.css',
  standalone: true
})
export class ItemInfosCompact {

  @Input()
  item!: Item;

}
