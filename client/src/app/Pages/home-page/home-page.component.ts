import { Component, OnInit } from '@angular/core';
import { NavbarDesktopComponent } from '../../Components/navbar-desktop/navbar-desktop.component';
import { NavbarMobileComponent } from '../../Components/navbar-mobile/navbar-mobile.component';
import { CardsComponent } from '../../Components/cards/cards.component';
import { StoreService } from '../../redux/store.service';
import { getAllData } from '../../redux/features/Laden/LadenSlice';
import { CommonModule } from '@angular/common';
import { WillkommenComponent } from '../../Components/willkommen/willkommen.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    NavbarDesktopComponent,
    NavbarMobileComponent,
    CardsComponent,
    WillkommenComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  ladenDaten: any;
  loading: boolean = true;
  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.subcribe(() => {
      const state = this.storeService.getState().laden;
      this.ladenDaten = state.LadensDaten;
      this.loading = state.loading;
    });

    this.storeService.dispatch(getAllData());
  }
}
