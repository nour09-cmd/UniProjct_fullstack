import { Component , EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-our-btn-gold',
  standalone: true,
  imports: [],
  templateUrl: './our-btn-gold.component.html',
  styleUrl: './our-btn-gold.component.css'
})
export class OurBtnGoldComponent {
  @Input() label: string = 'RECOVER PASSWORD';
  @Output() clicked = new EventEmitter<void>();
  handelClick(): void {
    this.clicked.emit();
  }
}
