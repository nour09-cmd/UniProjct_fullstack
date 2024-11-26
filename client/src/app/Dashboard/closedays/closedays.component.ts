import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RadioButtonComponent } from '../../Components/radio-button/radio-button.component';

@Component({
  selector: 'app-closedays',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    CommonModule,
    RadioButtonComponent,
  ],
  templateUrl: './closedays.component.html',
  styleUrl: './closedays.component.css',
})
export class ClosedaysComponent {
  searchForm: FormGroup;
  radioOptions = [
    { label: 'Show All Appointments', value: 'showAll' },
    { label: 'Delete Appointment', value: 'deleteAppointment' },
  ];
  selectedFilter: string = 'showAll';

  selectedDate: Date | null = null;
  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      date: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  async onDateChange(event: any) {
    if (this.searchForm.valid) {
      const date = this.searchForm.value;
      this.selectedDate = event.value;
      console.log(date);
    }
  }
  onFilterChange(selected: string) {
    this.selectedFilter = selected;
  }
}
