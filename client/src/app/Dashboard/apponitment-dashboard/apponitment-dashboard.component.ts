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
import * as XLSX from 'xlsx';

interface Appointment {
  _id: string;
  name: string;
  date: string;
  time: string;
  email: string;
  handynummer: string;
  user_IMG: string;
}

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
    CommonModule,
    SidebarDashboardComponent,
    RouterModule,
  ],
  templateUrl: './apponitment-dashboard.component.html',
  styleUrl: './apponitment-dashboard.component.css',
})
export class ApponitmentDashboardComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  appoData: Appointment[] = [];
  filteredAppoData: Appointment[] = [];
  barber_email: any;
  searchForm: FormGroup;
  selectedDate: Date | null = null;
  searchTerm: string = '';

  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    private snackBar: MatSnackBar
  ) {
    this.searchForm = this.fb.group({
      date: ['', Validators.required],
    });
  }

  counter: boolean = false;

  async ngOnInit() {
    await this.getUserData();
    await this.initializeData();
  }

  private async initializeData() {
    if (this.barber_email) {
      await this.storeService.dispatch(getAppos(this.barber_email));
      this.storeService.subscribe(async () => {
        const stateLaden = await this.storeService.getState().appo;
        if (stateLaden?.appos?.appointments) {
          // Create a new array from the Redux state
          const appointments = [...stateLaden.appos.appointments];
          // Sort the new array
          this.appoData = this.getSortedAppointments(appointments);
          // Initialize filtered data
          this.filteredAppoData = [...this.appoData];
        }
      });
    }
  }

  private getSortedAppointments(appointments: Appointment[]): Appointment[] {
    return appointments.slice().sort((a: Appointment, b: Appointment) => {
      const dateTimeA = new Date(a.date + 'T' + a.time);
      const dateTimeB = new Date(b.date + 'T' + b.time);
      return dateTimeA.getTime() - dateTimeB.getTime();
    });
  }

  async getUserData() {
    return new Promise<void>((resolve) => {
      this.storeService.subscribe(async () => {
        const stateUser = await this.storeService.getState().user;
        if (stateUser?.userData?.email && !this.counter) {
          this.barber_email = stateUser.userData.email;
          this.counter = true;
          resolve();
        }
      });
    });
  }

  formatDate(date: any) {
    return format(date, 'dd-MM-yyyy');
  }

  // Neue Funktionen für die Statistiken
  getTodayAppointments(): number {
    if (!this.appoData) return 0;
    const today = new Date();
    return this.appoData.filter((appo: Appointment) =>
      format(new Date(appo.date), 'dd-MM-yyyy') === format(today, 'dd-MM-yyyy')
    ).length;
  }

  getNextAppointment(): string {
    if (!this.appoData || this.appoData.length === 0) return '-';
    const now = new Date();
    const upcoming = [...this.appoData]
      .filter((appo: Appointment) => new Date(appo.date) > now)
      .sort((a: Appointment, b: Appointment) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
    return upcoming ? format(new Date(upcoming.date), 'HH:mm') : '-';
  }

  getTotalCustomers(): number {
    if (!this.appoData) return 0;
    // Count unique users by their names
    const uniqueUsers = new Set(this.appoData.map(appo => appo.name));
    return uniqueUsers.size;
  }

  calculateDailyRevenue(): string {
    return '-';
  }

  // Filter-Funktionen
  filterAppointments() {
    const today = new Date();
    const todayStr = format(today, 'dd-MM-yyyy');

    // Create a new array for filtering
    let filtered = [...this.appoData];

    if (this.searchTerm) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter((appo: Appointment) =>
        appo.name.toLowerCase().includes(searchLower) ||
        appo.handynummer.includes(searchLower)
      );
    }

    if (this.selectedDate) {
      const selectedDateStr = format(new Date(this.selectedDate), 'dd-MM-yyyy');
      filtered = filtered.filter((appo: Appointment) =>
        format(new Date(appo.date), 'dd-MM-yyyy') === selectedDateStr
      );
    } else {
      filtered = filtered.filter((appo: Appointment) =>
        format(new Date(appo.date), 'dd-MM-yyyy') === todayStr
      );
    }

    // Sort the filtered results
    this.filteredAppoData = this.getSortedAppointments(filtered);
  }

  // Export-Funktion
  exportToExcel() {
    const data = this.filteredAppoData.map((appo: Appointment) => ({
      Name: appo.name,
      Datum: format(new Date(appo.date), 'dd-MM-yyyy'),
      Zeit: appo.time,
      Telefon: appo.handynummer
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Termine');
    XLSX.writeFile(wb, `Termine_${format(new Date(), 'dd-MM-yyyy')}.xlsx`);
  }

  // Status-Funktion
  markAsCompleted(index: number) {
    // Hier können Sie die Logik für die Statusänderung implementieren
    this.snackBar.open('Termin als erledigt markiert', 'OK', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  async deletAPPO(id: string, user_email: string, i: number, appo: any) {
    const appointmentInfo = `
Kunde: ${appo.name}
Datum: ${this.formatDate(appo.date)}
Zeit: ${appo.time}
Tel.: ${appo.handynummer}
    `;

    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '400px',
      data: {
        heading: 'Termin Stornieren',
        titel: 'Möchten Sie diesen Termin wirklich stornieren?',
        content: appointmentInfo
      }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          await this.storeService.dispatch(
            deletAppointmentVonBarber({
              user_email,
              barber_email: this.barber_email,
              apoId: id,
            })
          );
          this.snackBar.open(`Termin wurde erfolgreich storniert`, 'X', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['custom-snackbar-sucssec'],
          });
          // Create new arrays instead of modifying existing ones
          this.appoData = this.appoData.filter((a: Appointment) => a._id !== id);
          this.filteredAppoData = this.filteredAppoData.filter((a: Appointment) => a._id !== id);
        } catch (error) {
          this.snackBar.open(`Fehler beim Stornieren des Termins`, 'X', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['custom-snackbar-error'],
          });
        }
      }
    });
  }
}

