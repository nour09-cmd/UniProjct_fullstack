import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

interface DropdownOption {
  value: string;
  text: string;
}

@Component({
  selector: 'app-dropdown-btn',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dropdown-btn.component.html',
  styleUrl: './dropdown-btn.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownBtnComponent),
      multi: true,
    },
  ],
})
export class DropdownBtnComponent implements ControlValueAccessor {
  @Input() options: DropdownOption[] = [];
  @Input() placeholder: string = 'Bitte wählen';
  @Input() controlName: string = '';
  @Input() control!: FormGroup;

  selectedOptionText: string = '';
  isDisabled: boolean = false;

  private onChange: any = () => {};
  private onTouched: any = () => {};

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit() {
    // Initialize the selected value if it exists
    const currentValue = this.control.get(this.controlName)?.value;
    if (currentValue) {
      const option = this.options.find(opt => opt.value === currentValue);
      if (option) {
        this.selectedOptionText = option.text;
      }
    }

    // Subscribe to value changes
    this.control.get(this.controlName)?.valueChanges.subscribe(value => {
      const option = this.options.find(opt => opt.value === value);
      if (option) {
        this.selectedOptionText = option.text;
      }
    });
  }

  writeValue(value: any): void {
    if (value) {
      const option = this.options.find(opt => opt.value === value);
      if (option) {
        this.selectedOptionText = option.text;
      }
    } else {
      this.selectedOptionText = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  selectOption(value: string, text: string): void {
    this.selectedOptionText = text;
    this.control.get(this.controlName)?.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  getStatusClass(): string {
    return this.selectedOptionText === 'Offen' ? 'status-open' :
           this.selectedOptionText === 'Geschlossen' ? 'status-closed' : '';
  }
}
