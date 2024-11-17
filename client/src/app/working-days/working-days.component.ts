import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DropdownBtnComponent } from '../dropdown-btn/dropdown-btn.component';

@Component({
  selector: 'app-working-days',
  standalone: true,
  imports: [ MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    CommonModule,
    DropdownBtnComponent],
  templateUrl: './working-days.component.html',
  styleUrl: './working-days.component.css'
})
export class WorkingDaysComponent implements OnInit {
  scheduleForm: FormGroup;
  weekdays = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
  dates: Date[] = [];

  statusOptions = [
    { value: 'offen', text: 'Offen' },
    { value: 'geschlossen', text: 'Geschlossen' },
    { value: 'urlaub', text: 'Urlaub' },
  ];

  constructor(private fb: FormBuilder) {
    this.scheduleForm = this.fb.group({
      weekSchedule: this.fb.array([]), // FormArray für die Woche
    });
  }

  ngOnInit(): void {
    this.calculateWeekDates();
    this.initializeWeekSchedule();
  }

  get weekSchedule(): FormArray<FormGroup> {
    return this.scheduleForm.get('weekSchedule') as FormArray<FormGroup>;
  }

  // Initialisiere die Woche mit den Tagen und Feldern
  initializeWeekSchedule() {
    this.weekdays.forEach((day, index) => {
      const date = this.dates[index];
      const dayForm = this.fb.group({
        day: [day],
        date: [date],
        status: ['geschlossen'],
        start: [''],
        end: [''],
        duration: [''],
      });
      this.weekSchedule.push(dayForm);
    });
  }

  // Berechnung der Daten der aktuellen Woche
  calculateWeekDates() {
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay(); // 0 (So) bis 6 (Sa)
    const mondayOffset = (currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek); // Montag als Starttag der Woche
    const mondayDate = new Date(currentDate);
    mondayDate.setDate(currentDate.getDate() + mondayOffset);

    this.dates = this.weekdays.map((_, index) => {
      const date = new Date(mondayDate);
      date.setDate(mondayDate.getDate() + index);
      return date;
    });
  }

  onSubmit() {
    console.log(this.scheduleForm.value.weekSchedule);
    // Hier die Daten an das Backend senden
    // this.backendService.saveSchedule(this.scheduleForm.value.weekSchedule).subscribe(...)
  }
}