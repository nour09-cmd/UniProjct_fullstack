import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';

@Component({
  selector: 'app-notification-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.css'],
})
export class NotificationBarComponent {
  @Input() message: any = '';
  @Input() type: string = '';
  @Input() duration: number = 3000;
}
