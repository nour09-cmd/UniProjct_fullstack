import { Component} from '@angular/core';
import { ApponitmentDashboardComponent } from "../apponitment-dashboard/apponitment-dashboard.component";
import { WorkingDaysComponent } from "../working-days/working-days.component";

@Component({
  selector: 'app-sidebar-dashboard',
  standalone: true,
  imports: [WorkingDaysComponent,ApponitmentDashboardComponent, WorkingDaysComponent],
  templateUrl: './sidebar-dashboard.component.html',
  styleUrl: './sidebar-dashboard.component.css'
})
export class SidebarDashboardComponent {

}
