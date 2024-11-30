import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-our-btn-black',
  standalone: true,
  templateUrl: './our-btn-black.component.html',
  styleUrls: ['./our-btn-black.component.css']
})
export class OurBtnBlackComponent {
  @Input() label: string = 'Recover Password'; // Default button label
  @Output() submitted = new EventEmitter<void>(); // Event emitter for form submission

  handleSubmit(): void {
    this.submitted.emit(); // Emit form submission event
  }
}
