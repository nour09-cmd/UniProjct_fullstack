import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
interface DropdownOption {
  value: string;
  text: string;
}
@Component({
  selector: 'app-dropdown-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-btn.component.html',
  styleUrl: './dropdown-btn.component.css',
})
export class DropdownBtnComponent implements OnInit {
  @Input() options: DropdownOption[] = [];
  @Input() placeholder: string = 'Option auswählen';
  @Input() controlName!: string;
  @Input() control!: FormGroup;

  selectedOptionText: string | null = null;

  ngOnInit() {
    if (!this.control || !this.controlName) {
      console.error(
        'DropdownBtnComponent requires a FormGroup and controlName.'
      );
      return;
    }
    const selectedValue = this.control.get(this.controlName)?.value;
    const selectedOption = this.options.find(
      (opt) => opt.value === selectedValue
    );
    this.selectedOptionText = selectedOption?.text || this.placeholder;
  }

  selectOption(value: string, text: string) {
    if (!this.control || !this.controlName) {
      console.error(
        'DropdownBtnComponent requires a FormGroup and controlName.'
      );
      return;
    }
    this.control.get(this.controlName)?.setValue(value);
    this.selectedOptionText = text;
  }
}
