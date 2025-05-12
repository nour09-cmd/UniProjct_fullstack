import { Component, inject, OnInit } from '@angular/core';
import { NavbarMobileComponent } from '../../Components/navbar-mobile/navbar-mobile.component';
import { NavbarDesktopComponent } from '../../Components/navbar-desktop/navbar-desktop.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FooterComponent } from '../../Components/footer/footer.component';
import { format } from 'date-fns';
import {
  getApposUser,
  deletAppointmentVonUser,
} from '../../redux/features/Laden/AppoSlice';
import { StoreService } from '../../redux/store.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAnimationsExampleDialog } from '../../Components/dialog-animations/dialog-animations-example-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-appointments',
  standalone: true,
  imports: [
    NavbarMobileComponent,
    NavbarDesktopComponent,
    FooterComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './user-appointments.component.html',
  styleUrls: ['./user-appointments.component.css'],
})
export class UserAppointmentsComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  appoData: any[] = [];
  barber_email: string = '';
  loading: boolean = true;
  counter: boolean = false;

  constructor(
    private storeService: StoreService,
    private snackBar: MatSnackBar
  ) {}
  async ngOnInit() {
    await this.getAppos();
  }
  async getAppos() {
    await this.storeService.subscribe(async () => {
      const stateUser = await this.storeService.getState().appo;
      this.appoData = stateUser.appos;
    });
    this.storeService.dispatch(getApposUser());
  }

  deletAppointment(item: any) {
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      data: {
        heading: 'Termin Absagen',
        titel: 'möchten sie wirklich löschen ?',
      },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          this.storeService.dispatch(
            deletAppointmentVonUser({
              barber_email: item.barber_email,
              apoId: item.apoLadenId,
              apoData: {
                date: item.date,
                time: item.time,
              },
            })
          );
          this.snackBar.open(`Termin erfolgriech gelöscht`, 'X', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['custom-snackbar-sucssec'],
          });
          location.reload();
        } catch (err) {
          console.error('Fehler beim Löschen des Termins:', err);
        }
      }
    });
  }

  formatDate(date: string): string {
    return format(new Date(date), 'dd-MM-yyyy');
  }
}
