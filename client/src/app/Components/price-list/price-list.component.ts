import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-price-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './price-list.component.html',
  styleUrl: './price-list.component.css',
})
export class PriceListComponent {
  @Input() list: any = [];
}
