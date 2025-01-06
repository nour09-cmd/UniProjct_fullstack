import { Component, OnInit } from '@angular/core';
import { rolleIsBarber, rolleIsUser } from '../../utils/config';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-mobile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-mobile.component.html',
  styleUrl: './navbar-mobile.component.css',
})
export class NavbarMobileComponent implements OnInit {
  isBarber: any = false;
  isUser: any = false;
  async ngOnInit() {
    this.isBarber = await rolleIsBarber();
    this.isUser = await rolleIsUser();
  }
}
