import { Component } from '@angular/core';
import { AddresseInputComponent } from '../../Components/addresse-input/addresse-input.component';
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

@Component({
  selector: 'app-laden-profile',
  standalone: true,
  imports: [
    AddresseInputComponent,
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
export class LadenProfileComponent {
  addressForm: FormGroup;
  uploadedFiles: File[] = [];
  constructor(private fb: FormBuilder) {
    this.addressForm = this.fb.group({
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
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];

        if (file.type.startsWith('image/')) {
          if (this.uploadedFilesArray.length < 3) {
            this.uploadedFilesArray.push(this.fb.control(file));
          } else {
            alert('Maximal 3 Bilder erlaubt!');
            break;
          }
        } else {
          alert('Nur Bilder sind erlaubt!');
        }
      }
    }
  }

  removeFile(index: number): void {
    this.uploadedFilesArray.removeAt(index);
  }

  isUploadDisabled(): boolean {
    return this.uploadedFilesArray.length >= 3;
  }

  onSubmit(): void {
    console.log('Form Value:', this.addressForm.value);
    console.log('Uploaded Files:', this.uploadedFilesArray.value);
  }
}
