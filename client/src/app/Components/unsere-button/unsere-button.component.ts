import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'Unsere-Buton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './unsere-button.component.html',
  styleUrl: './unsere-button.component.css',
})
export class UnsereButtonComponent {
  @Input() label: string = 'Recover Password';
  @Input() classes!: string;
  @Output() clicked = new EventEmitter<void>();
  handelClick(): void {
    this.clicked.emit();
  }
}
