import { Component, ViewChild } from '@angular/core';
import {
  MatCalendar,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { UnsereButtonComponent } from "../unsere-button/unsere-button.component";

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    UnsereButtonComponent
  ],
})
export class CalendarComponent {
  @ViewChild('calendar') calendar: MatCalendar<Date> | undefined;

  selectedDate: Date | null = null;

  minDate: Date;
  maxDate: Date;

  constructor(private dateAdapter: DateAdapter<Date>) {
    this.minDate = this.dateAdapter.today();
    this.maxDate = new Date(this.minDate.getFullYear(), this.minDate.getMonth() + 1, this.minDate.getDate());
  }

  dateChanged(selectedDate: Date) {
    if (this.isSameOrAfter(selectedDate, this.minDate) && this.isSameOrBefore(selectedDate, this.maxDate)) {
      this.selectedDate = selectedDate;
    } else {
      this.selectedDate = null;
    }
  }

  private isSameOrAfter(date1: Date, date2: Date): boolean {
    const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    return d1.getTime() >= d2.getTime();
  }

  private isSameOrBefore(date1: Date, date2: Date): boolean {
    const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    return d1.getTime() <= d2.getTime();
  }
}
