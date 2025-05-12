import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
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
import { UnsereButtonComponent } from '../../Components/unsere-button/unsere-button.component';
import { StoreService } from '../../redux/store.service';
import { Router } from '@angular/router';
import {
  getOneLaden,
  updateLaden,
} from '../../redux/features/Laden/LadenSlice';
import { getUserData } from '../../redux/features/User/UserSlice';
import { WillkommenComponent } from '../../Components/willkommen/willkommen.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogAnimationsExampleDialog } from '../../Components/dialog-animations/dialog-animations-example-dialog';
import { Subject } from 'rxjs';

interface UserData {
  email: string;
  vorname: string;
  nachname: string;
  image: string;
}

interface LadenData {
  Laden_name: string;
  Laden_description: string;
  Laden_IMG: string[];
  Laden_adress: {
    strasse: string;
    ort: string;
    plz: string;
  };
}

@Component({
  selector: 'app-laden-profile',
  standalone: true,
  imports: [
    WillkommenComponent,
    UnsereButtonComponent,
    CommonModule,
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
  ],
  templateUrl: './laden-profile.component.html',
  styleUrl: './laden-profile.component.css',
})
export class LadenProfileComponent implements OnInit, OnDestroy {
  readonly dialog = inject(MatDialog);

  _ladenDate: LadenData | null = null;
  barber_email: string = '';
  _userData: UserData | null = null;
  counter: boolean = false;
  private destroy$ = new Subject<void>();

  readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  readonly ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    private _router: Router,
    private snackBar: MatSnackBar
  ) {
    this.initializeForm();
  }

  addressForm: FormGroup = this.initializeForm();

  private initializeForm(): FormGroup {
    return this.fb.group({
      Laden_name: ['', [Validators.required]],
      Laden_description: ['', [Validators.required]],
      street: ['', [Validators.required]],
      houseNumber: ['', [Validators.required]],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      city: ['', [Validators.required]],
      uploadedFiles: this.fb.array([])
    });
  }

  get uploadedFilesArray() {
    return this.addressForm.get('uploadedFiles') as FormArray;
  }

  ngOnInit(): void {
    this.getUserData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async getUserData() {
    try {
      this.storeService.subscribe(async () => {
        const stateUser = await this.storeService.getState().user;
        if (stateUser?.userData?.email && !this.counter) {
          this.barber_email = stateUser.userData.email;
          this._userData = stateUser.userData;
          await this.getLadenData(stateUser.userData.email);
          this.counter = true;
        }
      });
    } catch (error) {
      this.handleError('Error fetching user data');
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

  getLadenData = async (email: any) => {
    try {
      await this.storeService.dispatch(getOneLaden({ email }));
      this.storeService.subscribe(() => {
        const state = this.storeService.getState().laden;
        this._ladenDate = state.getOneLaden;
        if (
          this._ladenDate?.Laden_IMG &&
          Array.isArray(this._ladenDate.Laden_IMG) &&
          this.uploadedFilesArray.length == 0
        ) {
          this._ladenDate.Laden_IMG.forEach((item: any) => {
            this.uploadedFilesArray.push(this.fb.control(item));
          });
        }
        if (this._ladenDate?.Laden_name) {
          this.initializeProfileData(state.getOneLaden);
        }
      });
    } catch (error) {
      this.handleError('Error loading shop data');
    }
  };

  initializeProfileData(laden: any) {
    const teile = laden.Laden_adress.strasse.split(' ');
    const hausnumer = teile.pop();
    const strasse = teile.join(' ').trim();
    this.addressForm.patchValue({
      Laden_name: laden.Laden_name,
      Laden_description: laden.Laden_description,
      street: strasse || '',
      houseNumber: hausnumer,
      postalCode: laden.Laden_adress.plz || '',
      city: laden.Laden_adress.ort || '',
      uploadedFiles: laden.Laden_IMG,
    });
  }

  uploadedFiles: File[] = [];

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (!this.ALLOWED_TYPES.includes(file.type)) {
        this.handleError('Nur JPEG, PNG und WebP Bilder sind erlaubt');
        return;
      }

      if (file.size > this.MAX_FILE_SIZE) {
        this.handleError('Maximale Dateigröße ist 5MB');
        return;
      }

      this.isLoading = true;
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          if (img.width < 200 || img.height < 200) {
            this.handleError('Bild muss mindestens 200x200 Pixel groß sein');
            this.isLoading = false;
            return;
          }

          this.uploadedFilesArray.push(this.fb.control(e.target.result));
          this.isLoading = false;
        };
        img.src = e.target.result;
      };

      reader.onerror = () => {
        this.handleError('Fehler beim Laden des Bildes');
        this.isLoading = false;
      };

      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number): void {
    this.uploadedFilesArray.removeAt(index);
  }

  async onSubmit() {
    if (this.addressForm.invalid) {
      this.handleError('Bitte füllen Sie alle erforderlichen Felder aus');
      return;
    }

    try {
      const data = this.prepareFormData();

      const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
        width: '250px',
        data: {
          heading: 'Änderungen speichern',
          titel: 'Möchten Sie die Änderungen wirklich speichern?',
        },
      });

      dialogRef.afterClosed().subscribe(async (result) => {
        if (result) {
          this.isLoading = true;
          await this.storeService.dispatch(updateLaden(data));
          this.snackBar.open('Die Änderungen wurden gespeichert', 'X', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['custom-snackbar-sucssec'],
          });
          this.isLoading = false;
          location.reload();
        }
      });
    } catch (error) {
      this.handleError('Fehler beim Speichern der Änderungen');
      this.isLoading = false;
    }
  }

  private prepareFormData() {
    const formValue = this.addressForm.value;
    return {
      Laden_name: formValue.Laden_name.trim(),
      Laden_description: formValue.Laden_description.trim(),
      Laden_IMG: formValue.uploadedFiles || [],
      Laden_adress: {
        strasse: `${formValue.street.trim()} ${formValue.houseNumber.trim()}`,
        ort: formValue.city.trim(),
        plz: formValue.postalCode.trim(),
      },
    };
  }
}
