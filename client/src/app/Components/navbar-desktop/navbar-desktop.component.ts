import { Component, inject } from '@angular/core';
import { StoreService } from '../../redux/store.service';
import { getUserData } from '../../redux/features/User/UserSlice';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RoleGuardBarber } from '../../role.guard';
import { rolleIsBarber, rolleIsUser } from '../../utils/config';
import { DialogAnimationsExampleDialog } from '../dialog-animations/dialog-animations-example-dialog';
import { MatDialog } from '@angular/material/dialog';

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
  readonly dialog = inject(MatDialog);

  constructor(private storeService: StoreService) {}
  async ngOnInit() {
    this.loading = false;
    this.storeService.subscribe(() => {
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
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      data: {
        heading: 'abmelden',
        titel: 'wollen sie wirklich abmelden ?',
      },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        localStorage.removeItem('token');
        this.islogedin = false;
        location.reload();
      }
    });
  }
}
