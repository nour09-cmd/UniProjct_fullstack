import store from './store';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root',
})
export class StoreService {
  getState() {
    return store.getState();
  }
  dispatch(action: any) {
    store.dispatch(action);
  }
  subscribe(listener: any) {
    return store.subscribe(listener);
  }

}
