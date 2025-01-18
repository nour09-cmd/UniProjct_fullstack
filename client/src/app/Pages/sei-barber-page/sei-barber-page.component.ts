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
  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    private _router: Router
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
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (!file.type.startsWith('image/')) {
        console.error('Bitte nur Bilddateien auswählen!');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        this.uploadedFilesArray.push(this.fb.control(base64String));
      };
      reader.readAsDataURL(file);
      console.log('Ausgewählte Datei:', file.name);
    }
  }

  removeFile(index: number): void {
    this.uploadedFilesArray.removeAt(index);
  }

  isUploadDisabled(): boolean {
    return this.uploadedFilesArray.length >= 3;
  }

  async onSubmit() {
    if (!this.addressForm.value) {
      return;
    }
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
    await this.storeService.dispatch(createLaden(data));
    if (!data) {
      this._router.navigate(['/']);
    }
  }
}
