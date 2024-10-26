import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'ourBtn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-btn.component.html',
  styleUrl: './our-btn.component.css',
})
export class OurBTNComponent {
  @Input() label: string = 'Recover Password';
  @Input() classes!: string;
  @Output() clicked = new EventEmitter<void>();
  handelClick(): void {
    this.clicked.emit();
  }
}
