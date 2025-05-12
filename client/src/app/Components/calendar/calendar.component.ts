import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { UnsereButtonComponent } from '../unsere-button/unsere-button.component';
import { format, parse } from 'date-fns';
import { ApoBtnComponent } from '../apo-btn/apo-btn.component';
import { StoreService } from '../../redux/store.service';
import { getUserData } from '../../redux/features/User/UserSlice';
import { Router } from '@angular/router';
import { createAppos } from '../../redux/features/Laden/AppoSlice';
import { IAppointment } from '@mrx/barbar-finder';
import { MatDialog } from '@angular/material/dialog';
import { DialogAnimationsExampleDialog } from '../dialog-animations/dialog-animations-example-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    UnsereButtonComponent,
    ApoBtnComponent,
  ],
})
export class CalendarComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  @ViewChild('calendar') calendar: MatCalendar<Date> | undefined;
  @Input() weeksDays: any;
  @Input() reserved_appointments: any;
  @Input() closeDays: any;
  @Input() barberEmail: any;
  hide: boolean = false;
  selectedTime: any = '';
  times: any = [];
  selectedDate: any | null = null;
  minDate: Date;
  maxDate: Date;
  isAngemeldet: boolean = false;
  userData: any;
  loading: boolean = true;
  constructor(
    private _router: Router,
    private dateAdapter: DateAdapter<Date>,
    private storeService: StoreService,
    private snackBar: MatSnackBar
  ) {
    this.minDate = this.dateAdapter.today();
    this.maxDate = new Date(
      this.minDate.getFullYear(),
      this.minDate.getMonth() + 1,
      this.minDate.getDate()
    );
  }
  ngOnInit(): void {
    this.loading = false;
    this.storeService.subscribe(() => {
      const state = this.storeService.getState().user;
      this.userData = state.userData;
      this.loading = state.loading;
    });
    this.storeService.dispatch(getUserData());
  }
  findADayName(data: any) {
    const dayMap = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    const date = new Date(data);
    const selectedDay = dayMap[date.getDay()];
    return selectedDay;
  }
  dateChanged(selectedDate: Date) {
    if (
      this.isSameOrAfter(selectedDate, this.minDate) &&
      this.isSameOrBefore(selectedDate, this.maxDate)
    ) {
      this.selectedDate = format(selectedDate, 'dd-MM-yyyy');
      this.genarateTime(selectedDate);
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

  filterResivedTime(time: any, date: any): boolean {
    let check = false;
    this.reserved_appointments.find((item: any) => {
      let itmdate = item.date.split('T');
      if (itmdate[0] == date && item.time == time) {
        check = true;
      }
    });
    return check;
  }
  makeHours = (from: any, to: any, appointmentDuration: any, date: any) => {
    const hours = [];
    const [fromHour, fromMinutes] = from.split(':').map(Number);
    const [toHour, toMinutes] = to.split(':').map(Number);

    let startTime = fromHour * 60 + fromMinutes;
    const endTime = toHour * 60 + toMinutes;

    while (startTime + appointmentDuration <= endTime) {
      const hour = Math.floor(startTime / 60)
        .toString()
        .padStart(2, '0');
      const minutes = (startTime % 60).toString().padStart(2, '0');
      const checkTime = `${hour}:${minutes}`;
      if (!this.filterResivedTime(checkTime, date)) {
        hours.push(`${hour}:${minutes}`);
      }
      startTime += appointmentDuration;
    }

    return hours;
  };
  async genarateTime(date: any) {
    const reFormatDay = format(date, 'yyyy-MM-dd');
    const day = this.findADayName(reFormatDay);
    const getDayDatials = this.weeksDays.find((item: any) => item.day === day);
    const startTime = getDayDatials.available_time_from;
    const endTime = getDayDatials.available_time_to;
    const appointment_duration = getDayDatials.appointment_duration;
    this.times = this.makeHours(
      startTime,
      endTime,
      appointment_duration,
      reFormatDay
    );
    this.hide = true;
    return this.selectedTime;
  }
  checkAvailableDays = (date: any): boolean => {
    const reFormatDay = format(date, 'yyyy-MM-dd');
    const day = this.findADayName(reFormatDay);
    const getDayDatials = this.weeksDays.find((item: any) => item.day == day);
    let check = true;
    if (getDayDatials.status == 'close') {
      check = false;
      return check;
    }
    const checkCloseDays = this.closeDays.find(
      (item: any) => format(item.date, 'yyyy-MM-dd') == reFormatDay
    );
    if (checkCloseDays) {
      check = false;
      return check;
    }
    return check;
  };

  handelClick(e: any) {
    this.selectedTime = e;
    this.times = [];
    this.hide = false;
    if (this.userData.email) {
      this.isAngemeldet = true;
    }
  }
  async handleSelectedTime() {
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      data: {
        heading: 'Termin buchen',
        titel: `möchten sie dise ${
          'Datum:' +
          this.selectedDate +
          '   |   ' +
          'Uhrzeit:' +
          this.selectedTime
        }  Termin buchen`,
      },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          if (!this.selectedDate || !this.selectedTime) {
            console.error('Datum oder Zeit fehlt.');
            return;
          }
          const parsedDate = parse(this.selectedDate, 'dd-MM-yyyy', new Date());
          const formDatas: IAppointment = {
            user_email: 'string',
            name: `${this.userData.vorname} ${this.userData.nachname}`,
            date: parsedDate,
            time: this.selectedTime,
            status: true,
          };
          const formData = {
            barber_email: this.barberEmail,
            ...formDatas,
          };

          await this.storeService.dispatch(createAppos(formData));
          this.snackBar.open(`Termin erfolgriech gebucht`, 'X', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['custom-snackbar-sucssec'],
          });
          location.reload();
        } catch (error) {
          console.error('Fehler beim Verarbeiten der Auswahl:', error);
        }
      }
    });
  }

  goToLogin() {
    this._router.navigate(['/login']);
  }
}
