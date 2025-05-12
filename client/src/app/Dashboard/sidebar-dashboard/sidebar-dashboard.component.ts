import { Component, inject, OnInit, HostListener } from '@angular/core';
import { ApponitmentDashboardComponent } from '../apponitment-dashboard/apponitment-dashboard.component';
import { WorkingDaysComponent } from '../working-days/working-days.component';
import { ClosedaysComponent } from '../closedays/closedays.component';
import { StoreService } from '../../redux/store.service';
import { getUserData } from '../../redux/features/User/UserSlice';
import { LadenProfileComponent } from '../laden-profile/laden-profile.component';
import { PriceListeComponent } from '../price-liste/price-liste.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DialogAnimationsExampleDialog } from '../../Components/dialog-animations/dialog-animations-example-dialog';
import { MatDialog } from '@angular/material/dialog';

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
  readonly dialog = inject(MatDialog);

  _userData: any = [];
  isSidebarOpen: boolean = false;

  constructor(private storeService: StoreService, private router: Router) {}

  ngOnInit(): void {
    this.storeService.subscribe(() => {
      const stateUser = this.storeService.getState().user;
      this._userData = stateUser.userData;
    });
    this.storeService.dispatch(getUserData());
  }

  activeComponent: string = 'appointment';
  showComponent(componentName: string): void {
    this.activeComponent = componentName;
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    if (this.isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeSidebarOnMobile(): void {
    if (window.innerWidth <= 768) {
      this.isSidebarOpen = false;
      document.body.style.overflow = '';
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 768) {
      this.isSidebarOpen = false;
      document.body.style.overflow = '';
    }
  }

  logOut() {
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      data: {
        heading: 'Abmelden',
        titel: 'möchten sie wirklich abmelden ?',
      },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    });
  }
}
