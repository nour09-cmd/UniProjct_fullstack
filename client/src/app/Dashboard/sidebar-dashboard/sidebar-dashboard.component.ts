import { Component, OnInit } from '@angular/core';
import { ApponitmentDashboardComponent } from '../apponitment-dashboard/apponitment-dashboard.component';
import { WorkingDaysComponent } from '../working-days/working-days.component';
import { ClosedaysComponent } from '../closedays/closedays.component';
import { StoreService } from '../../redux/store.service';
import { getUserData } from '../../redux/features/User/UserSlice';
import { LadenProfileComponent } from '../laden-profile/laden-profile.component';
import { PriceListeComponent } from '../price-liste/price-liste.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-dashboard',
  standalone: true,
  imports: [
    WorkingDaysComponent,
    ApponitmentDashboardComponent,
    ClosedaysComponent,
    LadenProfileComponent,
    PriceListeComponent,
    RouterModule,

    CommonModule,
  ],
  templateUrl: './sidebar-dashboard.component.html',
  styleUrl: './sidebar-dashboard.component.css',
})
export class SidebarDashboardComponent implements OnInit {
  _userData: any = [];
  constructor(private storeService: StoreService) {}
  ngOnInit(): void {
    this.storeService.subcribe(() => {
      const stateUser = this.storeService.getState().user;
      this._userData = stateUser.userData;
    });
    this.storeService.dispatch(getUserData());
  }
  activeComponent: string = 'appointment';
  showComponent(componentName: string): void {
    this.activeComponent = componentName;
  }
}
