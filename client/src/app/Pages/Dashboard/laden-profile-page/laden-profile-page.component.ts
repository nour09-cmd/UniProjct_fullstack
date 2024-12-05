import { Component } from '@angular/core';
import { LadenProfileComponent } from '../../../Dashboard/laden-profile/laden-profile.component';
import { SidebarDashboardComponent } from '../../../Dashboard/sidebar-dashboard/sidebar-dashboard.component';

@Component({
  selector: 'app-laden-profile-page',
  standalone: true,
  imports: [LadenProfileComponent, SidebarDashboardComponent],
  templateUrl: './laden-profile-page.component.html',
  styleUrl: './laden-profile-page.component.css',
})
export class LadenProfilePageComponent {}
