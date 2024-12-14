import { Component } from '@angular/core';
import { StoreService } from '../../redux/store.service';
import { getUserData } from '../../redux/features/User/UserSlice';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-desktop',
  standalone: true,
  imports: [NgIf, RouterModule, CommonModule],
  templateUrl: './navbar-desktop.component.html',
  styleUrl: './navbar-desktop.component.css',
})
export class NavbarDesktopComponent {
  userData: any;
  loading: boolean = true;
  islogedin: boolean = false;
  constructor(private storeService: StoreService) {}
  ngOnInit(): void {
    this.loading = false;
    this.storeService.subcribe(() => {
      const state = this.storeService.getState().user;
      this.userData = state.userData;
      this.loading = state.loading;
      if (this.userData.email) {
        this.islogedin = true;
      }
    });
    this.storeService.dispatch(getUserData());
  }
  logOut() {
    localStorage.removeItem('token');
    location.reload();
  }
}
