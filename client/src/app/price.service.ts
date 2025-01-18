import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface PriceItem {
  id: number;
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  private pricesSubject = new BehaviorSubject<PriceItem[]>([
    { id: 1, name: 'Haircut', price: 20 },
    { id: 2, name: 'Shampoo', price: 10 },
    { id: 3, name: 'Hair Coloring', price: 50 }
  ]);

  prices$ = this.pricesSubject.asObservable();

  addPrice(item: PriceItem) {
    const currentPrices = this.pricesSubject.value;
    this.pricesSubject.next([...currentPrices, item]);
  }

  updatePrice(updatedItem: PriceItem) {
    const currentPrices = this.pricesSubject.value.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    );
    this.pricesSubject.next(currentPrices);
  }

  deletePrice(id: number) {
    const currentPrices = this.pricesSubject.value.filter(item => item.id !== id);
    this.pricesSubject.next(currentPrices);
  }
}
