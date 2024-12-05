import { Component } from '@angular/core';
import { ApponitmentDashboardComponent } from '../../../Dashboard/apponitment-dashboard/apponitment-dashboard.component';
import { SidebarDashboardComponent } from '../../../Dashboard/sidebar-dashboard/sidebar-dashboard.component';

@Component({
  selector: 'app-appointment-page',
  standalone: true,
  imports: [ApponitmentDashboardComponent, SidebarDashboardComponent],
  templateUrl: './appointment-page.component.html',
  styleUrl: './appointment-page.component.css',
})
export class AppointmentPageComponent {}
