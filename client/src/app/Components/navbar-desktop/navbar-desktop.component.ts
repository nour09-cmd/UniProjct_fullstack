import { Component } from '@angular/core';
import { StoreService } from '../../redux/store.service';
import { getUserData } from '../../redux/features/User/UserSlice';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RoleGuardBarber } from '../../role.guard';
import { rolleIsBarber, rolleIsUser } from '../../utils/config';

@Component({
  selector: 'app-navbar-desktop',
  standalone: true,
  imports: [NgIf, RouterModule, CommonModule],
  templateUrl: './navbar-desktop.component.html',
  styleUrl: './navbar-desktop.component.css',
})
export class NavbarDesktopComponent {
  userData: any;
  isBarber: any = false;
  isUser: any = false;
  loading: boolean = true;
  islogedin: boolean = false;

  constructor(private storeService: StoreService) {}
  async ngOnInit() {
    this.loading = false;
    this.storeService.subcribe(() => {
      const state = this.storeService.getState().user;
      this.userData = state.userData;
      this.loading = state.loading;
      if (this.userData?.email) {
        this.islogedin = true;
      }
    });
    await this.storeService.dispatch(getUserData());
    this.isBarber = await rolleIsBarber();
    this.isUser = await rolleIsUser();
  }
  logOut() {
    localStorage.removeItem('token');
    this.islogedin = false;
    location.reload();
  }
}
