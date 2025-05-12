import { Component } from '@angular/core';
import { FooterComponent } from '../../Components/footer/footer.component';
import { NavbarDesktopComponent } from '../../Components/navbar-desktop/navbar-desktop.component';
import { NavbarMobileComponent } from '../../Components/navbar-mobile/navbar-mobile.component';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UnsereButtonComponent } from '../../Components/unsere-button/unsere-button.component';
import { StoreService } from '../../redux/store.service';
import { createLaden } from '../../redux/features/Laden/LadenSlice';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sei-barber-page',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarDesktopComponent,
    NavbarMobileComponent,
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
    UnsereButtonComponent,
  ],
  templateUrl: './sei-barber-page.component.html',
  styleUrl: './sei-barber-page.component.css',
})
export class SeiBarberPageComponent {
  addressForm: FormGroup;
  uploadedFiles: File[] = [];
  singUpErorr: any = [];
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    private _router: Router,
    private snackBar: MatSnackBar
  ) {
    this.addressForm = this.fb.group({
      Laden_name: ['', Validators.required],
      Laden_description: ['', Validators.required],
      street: ['', Validators.required],
      houseNumber: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      city: ['', Validators.required],
      uploadedFiles: this.fb.array(
        [],
        [Validators.required, Validators.maxLength(3)]
      ),
    });
  }

  get uploadedFilesArray(): FormArray {
    return this.addressForm.get('uploadedFiles') as FormArray;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.type.match(/image\/*/) && file.size <= 5 * 1024 * 1024) {
        this.selectedFile = file;
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result as string;
        };
        reader.readAsDataURL(file);
        this.showSuccess('Bild erfolgreich ausgewählt');
      } else {
        this.handleError('Bitte wählen Sie ein gültiges Bild (max. 5MB) aus');
      }
    }
  }

  removeFile(index: number): void {
    this.uploadedFilesArray.removeAt(index);
  }

  isUploadDisabled(): boolean {
    return this.uploadedFilesArray.length >= 3;
  }

  async onSubmit() {
    if (this.addressForm.invalid) {
      this.handleError('Bitte füllen Sie alle Pflichtfelder aus');
      return;
    }

    try {
      const data = {
        Laden_name: this.addressForm.value.Laden_name || '',
        Laden_description: this.addressForm.value.Laden_description || '',
        Laden_IMG: this.addressForm.value.uploadedFiles || [],
        Laden_adress: {
          strasse:
            this.addressForm.value.street +
              ' ' +
              this.addressForm.value.houseNumber || '',
          ort: this.addressForm.value.city || '',
          plz: this.addressForm.value.postalCode || '',
        },
      };

      const formData = new FormData();
      formData.append('Laden_name', data.Laden_name);
      formData.append('Laden_description', data.Laden_description);
      formData.append('Laden_IMG', JSON.stringify(data.Laden_IMG));
      formData.append('Laden_adress', JSON.stringify(data.Laden_adress));

      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      await this.storeService.dispatch(createLaden(data));
      this.storeService.subscribe(() => {
        const state = this.storeService.getState().laden;
        console.log(state.errors);
        this.singUpErorr = state.errors || [];
        if (state.errors.message == 'Created') {
          this.showSuccess('Created sucssuc');
          this.addressForm.reset();
          setTimeout(() => {
            this._router.navigate(['/']);
          }, 2500);
        } else if (this.singUpErorr.message) {
          this.handleError(this.singUpErorr.message);
        }
      });
    } catch (error) {
      this.handleError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
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
