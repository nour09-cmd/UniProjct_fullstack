import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-radio-button',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.css',
})
export class RadioButtonComponent {
  @Input() selectedFilter: string = ''; // Aktuell ausgewählter Filter, wird von der übergeordneten Komponente gesetzt
  @Output() filterChange: EventEmitter<string> = new EventEmitter<string>(); // Gibt die Auswahl weiter

  onSelectionChange() {
    this.filterChange.emit(this.selectedFilter); // Sendet die Auswahl nach außen
  }
}
