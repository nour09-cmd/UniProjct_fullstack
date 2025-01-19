import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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
import { UnsereButtonComponent } from '../../Components/unsere-button/unsere-button.component';
import { StoreService } from '../../redux/store.service';
import {
  createCloseDay,
  deleteCloseDay,
  getCloseDaysData,
} from '../../redux/features/Laden/CloseDaysSlice';
import { MatDialog } from '@angular/material/dialog';
import { DialogAnimationsExampleDialog } from '../../Components/dialog-animations/dialog-animations-example-dialog';

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
    CommonModule,
    RadioButtonComponent,
    UnsereButtonComponent,
  ],
  templateUrl: './closedays.component.html',
  styleUrl: './closedays.component.css',
})
export class ClosedaysComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  async ngOnInit() {
    this.getUserData();
  }

  radioOptions = [
    { label: 'Füge ein Tag hinzu', value: 'addDay' },
    { label: 'Tag löschen', value: 'deleteDay' },
  ];

  closedDayForm: FormGroup;
  selectedFilter: string = 'addDay';
  closedDay: string | undefined;
  barber_email: any;
  closedDays: any;
  minDate: string;
  selectedDate: Date | null = null;

  constructor(private fb: FormBuilder, private storeService: StoreService) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.closedDayForm = this.fb.group({
      date: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onFilterChange(selected: string) {
    this.getUserData();
    this.selectedFilter = selected;
  }

  async getUserData() {
    const stateUser = await this.storeService.getState().user;
    if (stateUser?.userData?.email != undefined) {
      this.barber_email = stateUser.userData.email;
      await this.getCloseDays(stateUser.userData.email);
    }
  }

  async getCloseDays(email: string) {
    await this.storeService.dispatch(getCloseDaysData(email));

    this.storeService.subcribe(() => {
      const stateCloseDays = this.storeService.getState().closeDays;
      console.log(stateCloseDays);
      this.closedDays = stateCloseDays.closeDays || [];
    });
  }

  async deleteDay(id: any) {
    if (!id) return;
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      data: {
        heading: 'Ruhetage löschen',
        titel: 'möchten sie wirklich den Ruhetage löschen ?',
      },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        await this.storeService.dispatch(deleteCloseDay({ closeDayId: id }));

        location.reload();
      }
    });
  }

  async createClosedDay() {
    if (this.closedDayForm.valid) {
      const { date } = this.closedDayForm.value;
      await this.storeService.dispatch(
        createCloseDay({ date, barber_email: this.barber_email })
      );
    }
    location.reload();
  }
}
