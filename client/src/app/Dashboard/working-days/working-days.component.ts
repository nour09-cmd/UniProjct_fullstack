import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DropdownBtnComponent } from '../../Components/dropdown-btn/dropdown-btn.component';
import { StoreService } from '../../redux/store.service';
import {
  getWeeksDaysData,
  updateWeeksDaysData,
} from '../../redux/features/Laden/WeekDaysSlice';
import { getUserData } from '../../redux/features/User/UserSlice';
import { Router } from '@angular/router';
@Component({
  selector: 'app-working-days',
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
    DropdownBtnComponent,
  ],
  templateUrl: './working-days.component.html',
  styleUrl: './working-days.component.css',
})
export class WorkingDaysComponent implements OnInit {
  scheduleForm: FormGroup;
  //'MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'
  weekdays: string[] = [];

  statusOptions = [
    { value: 'open', text: 'Offen' },
    { value: 'close', text: 'Geschlossen' },
  ];

  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    private _router: Router
  ) {
    this.scheduleForm = this.fb.group({
      weekSchedule: this.fb.array([]),
    });
  }
  _WeeksDays: any = [];
  counter: boolean = false;
  async getList(email: any) {
    await this.storeService.dispatch(getWeeksDaysData(email));
    this.storeService.subcribe(() => {
      const stateLaden = this.storeService.getState().weeksDays;

      this.weekdays = Object.values(stateLaden.weekDays).map(
        (item: any) => item
      );
      this.initializeWeekSchedule();
    });
  }
  async getUserData() {
    await this.storeService.subcribe(async () => {
      const stateUser = await this.storeService.getState().user;
      if (stateUser.userData.email != undefined && this.counter != true) {
        this.getList(stateUser.userData.email);
        this.counter = true;
      }
    });
  }

  ngOnInit(): void {
    if (!this.counter) this.getUserData();
  }

  get weekSchedule(): FormArray<FormGroup> {
    return this.scheduleForm.get('weekSchedule') as FormArray<FormGroup>;
  }

  initializeWeekSchedule() {
    this.weekdays.forEach((day: any, index) => {
      const dayForm = this.fb.group({
        day: [day.day],
        status: [day.status],
        available_time_from: [day.available_time_from],
        available_time_to: [day.available_time_to],
        appointment_duration: [day.appointment_duration],
      });
      this.weekSchedule.push(dayForm);
    });
  }

  async onSubmit() {
    if (this.scheduleForm.value.weekSchedule.length != 0) {
      await this.storeService.dispatch(
        updateWeeksDaysData(this.scheduleForm.value.weekSchedule)
      );
    }
    location.reload();
  }
}
