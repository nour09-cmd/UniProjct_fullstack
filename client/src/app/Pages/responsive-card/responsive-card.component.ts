import { Component, OnInit } from '@angular/core';
import { NavbarDesktopComponent } from '../../Components/navbar-desktop/navbar-desktop.component';
import { NavbarMobileComponent } from '../../Components/navbar-mobile/navbar-mobile.component';
import { CardsComponent } from '../../Components/cards/cards.component';
import { StoreService } from '../../redux/store.service';
import { getAllData } from '../../redux/features/Laden/LadenSlice';
import { CommonModule } from '@angular/common';
import { WillkommenComponent } from '../../Components/willkommen/willkommen.component';

@Component({
  selector: 'app-responsive-card',
  standalone: true,
  imports: [
    CommonModule,
    NavbarDesktopComponent,
    NavbarMobileComponent,
    CardsComponent,
    WillkommenComponent,
  ],
  templateUrl: './responsive-card.component.html',
  styleUrl: './responsive-card.component.css',
})
export class ResponsiveCardComponent implements OnInit {
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
