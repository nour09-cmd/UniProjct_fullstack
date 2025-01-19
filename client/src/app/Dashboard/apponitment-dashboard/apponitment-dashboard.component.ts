import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { format } from 'date-fns';
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
import { StoreService } from '../../redux/store.service';
import {
  deletAppointmentVonBarber,
  getAppos,
} from '../../redux/features/Laden/AppoSlice';
import { SidebarDashboardComponent } from '../sidebar-dashboard/sidebar-dashboard.component';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogAnimationsExampleDialog } from '../../Components/dialog-animations/dialog-animations-example-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-apponitment-dashboard',
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
    SidebarDashboardComponent,
    RouterModule,
  ],
  templateUrl: './apponitment-dashboard.component.html',
  styleUrl: './apponitment-dashboard.component.css',
})
export class ApponitmentDashboardComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  appoData: any = [];
  barber_email: any;
  searchForm: FormGroup;
  selectedDate: Date | null = null;
  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    private snackBar: MatSnackBar
  ) {
    this.searchForm = this.fb.group({
      date: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  counter: boolean = false;
  async getAppso(email: any) {
    this.storeService.subcribe(async () => {
      const stateLaden = await this.storeService.getState().appo;
      this.appoData = await stateLaden.appos.appointments;
    });
    this.storeService.dispatch(getAppos(email));
  }
  async getUserData() {
    await this.storeService.subcribe(async () => {
      const stateUser = await this.storeService.getState().user;
      if (stateUser.userData.email != undefined && this.counter != true) {
        this.getAppso(stateUser.userData.email);
        this.barber_email = stateUser.userData.email;
        this.counter = true;
      }
    });
  }
  ngOnInit(): void {
    this.getUserData();
  }
  formatDate(date: any) {
    return format(date, 'dd-MM-yyyy');
  }
  async onDateChange(event: any) {
    if (this.searchForm.valid) {
      const date = this.searchForm.value;
      this.selectedDate = event.value;
      console.log(date);
    }
  }
  async deletAPPO(id: any, user_email: any, index: any) {
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      data: {
        heading: 'Termin Absagen',
        titel: 'möchten sie wirklich löschen ?',
      },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        await this.storeService.dispatch(
          deletAppointmentVonBarber({
            user_email,
            barber_email: this.barber_email,
            apoId: id,
          })
        );
        this.snackBar.open(`Termin erfolgriech gelöscht`, 'X', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['custom-snackbar-sucssec'],
        });
        location.reload();
      }
    });
  }
}
