import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import {
  ReactiveFormsModule,
  Validators,
  FormControl,
  FormsModule,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  ErrorStateMatcher,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { Router } from '@angular/router';
import { PagebennerComponent } from '../../Components/pagebenner/pagebenner.component';
import { TitleLineComponent } from '../../Components/title-line/title-line.component';
import { UnsereButtonComponent } from '../../Components/unsere-button/unsere-button.component';
import { StoreService } from '../../redux/store.service';
import { singUp } from '../../redux/features/User/UserSlice';
import { NotificationBarComponent } from '../../Components/notification-bar/notification-bar.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    PagebennerComponent,
    UnsereButtonComponent,
    TitleLineComponent,
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
    NotificationBarComponent,
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  loading: boolean = true;
  singUpErorr: any = [];
  passwdchecker: Boolean = false;
  signUPForm: FormGroup;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  imagePreview: any; // Preview for the selected image
  hide: boolean = true;

  @Input() title: string = 'Create a New Password';
  @Input() discription: string = 'Discover amazing things near you';

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private storeService: StoreService
  ) {
    // const token = localStorage.getItem('token') || '';

    // if (token || token != '') {
    //   this._router.navigate(['/']);
    // }
    this.signUPForm = this.fb.group({
      image: ['', Validators.required], // The image will store Base64 string
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordwd: ['', [Validators.required, Validators.minLength(6)]],

      vorname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3)]],

      nachname: ['', [Validators.required, Validators.minLength(3)]],
      handynummer: ['', [Validators.required, Validators.minLength(9)]],
      geburtsdatum: ['', [Validators.required, Validators.minLength(6)]],
      strasse: ['', [Validators.required, Validators.minLength(3)]],
      hausnummer: ['', [Validators.required, Validators.minLength(1)]],
      ort: ['', [Validators.required, Validators.minLength(3)]],
      plz: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onDateiAuswahl(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Validate file type: Only allow images
      if (!file.type.startsWith('image/')) {
        console.error('Bitte nur Bilddateien auswählen!');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.imagePreview = base64String; // For previewing the image
        this.signUPForm.patchValue({ image: base64String }); // Update the form control with the Base64 string
      };
      reader.readAsDataURL(file);

      console.log('Ausgewählte Datei:', file.name);
    }
  }

  isFormNotEmpty(form: FormGroup): boolean {
    return Object.values(form.controls).every((control) => {
      const value = control.value?.toString().trim();
      return value !== null && value !== '';
    });
  }

  passwordMatchValidator2(): boolean {
    console.log(
      this.signUPForm.get('password')?.value ===
        this.signUPForm.get('confirmPassword')?.value
    );
    return (
      this.signUPForm.get('password')?.value ===
      this.signUPForm.get('confirmPassword')?.value
    );
  }
  getErrorMessages(constraints: any): string[] {
    if (!constraints) return [];
    return Object.values(constraints);
  }
  async onClicke() {
    const isFilled = this.isFormNotEmpty(this.signUPForm);

    if (!isFilled) {
      // TODO change this to pushing in the singUpError where {constraints:"MASSAGE"}
      alert('Please fill out all required fields.');
      return;
    }

    if (this.signUPForm.value.password !== this.signUPForm.value.passwordwd) {
      alert('Die Passwörter stimmen nicht überein');
      return;
    }

    const data: any = {
      image: this.signUPForm.value.image,
      email: this.signUPForm.value.email,
      password: this.signUPForm.value.password,
      vorname: this.signUPForm.value.vorname,
      nachname: this.signUPForm.value.nachname,
      handynummer: this.signUPForm.value.handynummer,
      geburtsdatum: this.signUPForm.value.geburtsdatum,
      address: {
        strasse: `${this.signUPForm.value.strasse} ${this.signUPForm.value.hausnummer}`,
        ort: this.signUPForm.value.ort,
        plz: this.signUPForm.value.plz,
      },
    };

    try {
      await this.storeService.dispatch(singUp(data));

      // Update the error state immediately after the dispatch completes
      const state = this.storeService.getState().user;
      this.singUpErorr = state.singUpError || [];

      // Log errors if any
      if (this.singUpErorr.length > 0) {
        console.error('Signup Errors:', this.singUpErorr);
      }
      setTimeout(() => {
        this.loading = false;
      }, 2500);
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  }
}
