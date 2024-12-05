import { Component } from '@angular/core';
import { SidebarDashboardComponent } from '../../../Dashboard/sidebar-dashboard/sidebar-dashboard.component';
import { PriceListeComponent } from '../../../Dashboard/price-liste/price-liste.component';

@Component({
  selector: 'app-prise-list-page',
  standalone: true,
  imports: [SidebarDashboardComponent, PriceListeComponent],
  templateUrl: './prise-list-page.component.html',
  styleUrl: './prise-list-page.component.css',
})
export class PriseListPageComponent {}
