import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-apo-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './apo-btn.component.html',
  styleUrl: './apo-btn.component.css',
})
export class ApoBtnComponent {
  @Input() value: any;
  @Input() classs: any;
  @Output() clicked = new EventEmitter<void>();
  handelClick(): void {
    this.clicked.emit();
  }
}
