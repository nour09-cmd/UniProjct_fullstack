import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
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
import { getAllData } from '../../redux/features/Laden/LadenSlice';
import { StoreService } from '../../redux/store.service';
import { BASEURL } from '../../utils/config';

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
export class UserAppointmentsComponent implements OnInit, AfterViewInit {
  appoData: any[] = []; // Speichert die Appointment-Daten
  userEmail: string | undefined; // Speichert die E-Mail des Benutzers
  loading: boolean = true; // Zeigt den Ladezustand an
  counter: boolean = false; // Verhindert mehrfaches Laden der Benutzerdaten
  images: Map<string, { name: string; img: string }> = new Map(); // Speichert Barber-Details

  constructor(
    private storeService: StoreService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDataSequentially(); // Lade alle notwendigen Daten beim Initialisieren
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges(); // Erzwinge GUI-Update nach der Initialisierung
  }

  /** Lade Benutzerdaten und Appointments in richtiger Reihenfolge */
  async loadDataSequentially() {
    try {
      this.loading = true;
      await this.getUserData();
      await this.getUserAppointments();
      await this.fetchAllBarberData();
      this.loading = false;
      this.cdr.detectChanges(); // Aktualisiere die Ansicht
    } catch (err) {
      console.error('Fehler beim Laden der Daten:', err);
      this.loading = false;
    }
  }

  /** Fetch All Barber Data */
  async fetchAllBarberData() {
    try {
      await this.storeService.dispatch(getAllData());
      const state = this.storeService.getState().laden;
      let barberData = state?.LadensDaten;

      console.log('Rohdaten von Barber-API:', barberData);

      if (barberData && typeof barberData === 'object') {
        barberData = Object.values(barberData);
      }

      if (Array.isArray(barberData)) {
        barberData.forEach((barber: any) => {
          const imageUrl =
            barber.Laden_IMG && barber.Laden_IMG.length > 0
              ? barber.Laden_IMG[0]
              : 'assets/default-image.jpg';
          console.log(
            `Barber Email: ${barber.barber_email}, Image URL: ${imageUrl}`
          );
          this.images.set(barber.barber_email, {
            name: barber.Laden_name || 'Unbekannter Barber',
            img: imageUrl,
          });
        });
        console.log('Images Map nach Laden:', this.images);
      } else {
        console.error('Barber-Daten sind kein Array:', barberData);
      }
      this.cdr.detectChanges();
    } catch (err: any) {
      console.error(
        'Fehler beim Laden aller Barber-Daten:',
        err?.response?.data || err.message
      );
    }
  }

  /** Fetch User Appointments */
  async getUserAppointments() {
    try {
      await this.storeService.dispatch(getApposUser()); // Lade Benutzertermine
      const stateUser = this.storeService.getState().appo;
      this.appoData = stateUser?.appos?.appointments?.Appointments || [];

      console.log('Appointment-Daten geladen:', this.appoData);
      this.appoData.forEach((appo) => {
        if (!this.images.has(appo.barber_email)) {
          console.warn(
            'Kein Bild/Name für Barber gefunden:',
            appo.barber_email
          );
        }
      });
      this.cdr.detectChanges();
    } catch (err) {
      console.error('Fehler beim Laden der User-Termine:', err);
    }
  }

  /** Fetch User Data */
  async getUserData() {
    try {
      const stateUser = this.storeService.getState().user;
      console.log('User State:', stateUser);
      if (stateUser?.userData?.email) {
        this.userEmail = stateUser.userData.email;
      } else {
        console.warn('Keine Benutzerdaten gefunden:', stateUser);
      }
      this.cdr.detectChanges();
    } catch (err) {
      console.error('Fehler beim Laden der Benutzerdaten:', err);
    }
  }

  /** Delete an Appointment */
  deletAppointment(item: any) {
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
      this.loadDataSequentially();
    } catch (err) {
      console.error('Fehler beim Löschen des Termins:', err);
    }
  }

  /** Get Barber Details for GUI */
  getBarberDetails(email: string): { name: string; img: string } {
    const barber = this.images.get(email);
    if (!barber) {
      console.warn('Barber nicht gefunden für Email:', email);
    }
    return (
      barber || { name: 'Unbekannter Barber', img: 'assets/default-image.jpg' }
    );
  }

  /** Format Date */
  formatDate(date: string): string {
    return format(new Date(date), 'dd-MM-yyyy');
  }
}
