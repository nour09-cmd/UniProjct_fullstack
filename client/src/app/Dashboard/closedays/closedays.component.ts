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
import { MatSnackBar } from '@angular/material/snack-bar';

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
    UnsereButtonComponent
  ],
  templateUrl: './closedays.component.html',
  styleUrl: './closedays.component.css',
})
export class ClosedaysComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  radioOptions = [
    { label: 'Füge ein Tag hinzu', value: 'addDay' },
    { label: 'Tag löschen', value: 'deleteDay' },
  ];

  closedDayForm: FormGroup;
  selectedFilter: string = 'addDay';
  closedDay: string | undefined;
  barber_email: string = '';
  closedDays: any[] = [];
  minDate: string;
  selectedDate: Date | null = null;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    private snackBar: MatSnackBar
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.closedDayForm = this.fb.group({
      date: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async ngOnInit() {
    await this.getUserData();
  }

  onFilterChange(selected: string) {
    this.selectedFilter = selected;
    this.getUserData();
  }

  async getUserData() {
    try {
      const stateUser = await this.storeService.getState().user;
      if (stateUser?.userData?.email) {
        this.barber_email = stateUser.userData.email;
        await this.getCloseDays(stateUser.userData.email);
      }
    } catch (error) {
      this.handleError('Fehler beim Laden der Benutzerdaten');
    }
  }

  async getCloseDays(email: string) {
    try {
      this.isLoading = true;
      await this.storeService.dispatch(getCloseDaysData(email));
      this.storeService.subscribe(() => {
        const stateCloseDays = this.storeService.getState().closeDays;
        if (stateCloseDays?.closeDays) {
          this.closedDays = stateCloseDays.closeDays;
        }
      });
    } catch (error) {
      this.handleError('Fehler beim Laden der geschlossenen Tage');
    } finally {
      this.isLoading = false;
    }
  }

  async deleteDay(id: string) {
    if (!id) return;

    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      data: {
        heading: 'Ruhetage löschen',
        titel: 'Möchten Sie wirklich den Ruhetag löschen?',
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          this.isLoading = true;
          await this.storeService.dispatch(deleteCloseDay({ closeDayId: id }));
          this.showSuccess('Ruhetag wurde erfolgreich gelöscht');
          location.reload();
        } catch (error) {
          this.handleError('Fehler beim Löschen des Ruhetages');
        } finally {
          this.isLoading = false;
        }
      }
    });
  }

  async createClosedDay() {
    if (this.closedDayForm.invalid) {
      this.handleError('Bitte wählen Sie ein gültiges Datum');
      return;
    }

    try {
      this.isLoading = true;
      const { date } = this.closedDayForm.value;
      await this.storeService.dispatch(
        createCloseDay({ date, barber_email: this.barber_email })
      );
      this.showSuccess('Ruhetag wurde erfolgreich hinzugefügt');
      location.reload();
    } catch (error) {
      this.handleError('Fehler beim Erstellen des Ruhetages');
    } finally {
      this.isLoading = false;
    }
  }

  private handleError(message: string) {
    this.snackBar.open(message, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar-error'],
    });
  }

  private showSuccess(message: string) {
    this.snackBar.open(message, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar-success'],
    });
  }
}
