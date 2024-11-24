import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { getUserData } from '../../redux/features/User/UserSlice';
import { StoreService } from '../../redux/store.service';

@Component({
  selector: 'app-willkommen',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './willkommen.component.html',
  styleUrl: './willkommen.component.css',
})
export class WillkommenComponent implements OnInit {
  userData: any;
  loading: boolean = true;

  constructor(private storeService: StoreService) {}
  ngOnInit(): void {
    this.loading = false;
    this.storeService.subcribe(() => {
      const state = this.storeService.getState().user;
      this.userData = state.userData;
      this.loading = state.loading;
    });
    this.storeService.dispatch(getUserData());
  }
}
