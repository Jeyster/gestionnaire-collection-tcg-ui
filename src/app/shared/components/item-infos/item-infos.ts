import { Component, Input } from '@angular/core';
import { Item } from '../../interfaces/item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-infos',
  imports: [
    CommonModule
  ],
  templateUrl: './item-infos.html',
  styleUrl: './item-infos.css',
  standalone: true
})
export class ItemInfos {

  @Input()
  item!: Item;

}
