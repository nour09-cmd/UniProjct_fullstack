import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ourBtn',
  standalone: true,
  imports: [],
  templateUrl: './our-btn.component.html',
  styleUrl: './our-btn.component.css',
})
export class OurBTNComponent {
  @Input() label: string = 'label';
  @Input() classes!: string;
  @Output() clicked = new EventEmitter<void>();
  handelClick(): void {
    this.clicked.emit();
  }
}
