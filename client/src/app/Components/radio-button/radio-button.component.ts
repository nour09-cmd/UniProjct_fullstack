import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-radio-button',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.css',
})
export class RadioButtonComponent {
  @Input() options: { label: string; value: string }[] = [];
  @Input() selectedValue: string | null = null;
  @Output() valueChange = new EventEmitter<string>();

  onSelectionChange(value: string): void {
    this.valueChange.emit(value);
  }
}
