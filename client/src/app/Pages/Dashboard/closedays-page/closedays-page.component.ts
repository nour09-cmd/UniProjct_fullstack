import { Component } from '@angular/core';
import { ClosedaysComponent } from '../../../Dashboard/closedays/closedays.component';
import { SidebarDashboardComponent } from '../../../Dashboard/sidebar-dashboard/sidebar-dashboard.component';

@Component({
  selector: 'app-closedays-page',
  standalone: true,
  imports: [ClosedaysComponent, SidebarDashboardComponent],
  templateUrl: './closedays-page.component.html',
  styleUrl: './closedays-page.component.css',
})
export class ClosedaysPageComponent {}
