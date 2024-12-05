import { Component } from '@angular/core';
import { SidebarDashboardComponent } from '../../../Dashboard/sidebar-dashboard/sidebar-dashboard.component';
import { WorkingDaysComponent } from '../../../Dashboard/working-days/working-days.component';

@Component({
  selector: 'app-weekdays-page',
  standalone: true,
  imports: [SidebarDashboardComponent, WorkingDaysComponent],
  templateUrl: './weekdays-page.component.html',
  styleUrl: './weekdays-page.component.css',
})
export class WeekdaysPageComponent {}
