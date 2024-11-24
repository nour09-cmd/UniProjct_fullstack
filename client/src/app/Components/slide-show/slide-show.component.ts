import { CommonModule, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slide-show',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slide-show.component.html',
  styleUrl: './slide-show.component.css',
})
export class SlideShowComponent {
  @Input() imagesArr!: string[];
}
