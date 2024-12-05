import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
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
import { StoreService } from '../../redux/store.service';
import { singUp } from '../../redux/features/User/UserSlice';
import { NotificationBarComponent } from '../../Components/notification-bar/notification-bar.component';
import axios from 'axios';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    PagebennerComponent,
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
  loading = true;
  singUpErorr: any = [];
  imagePreview: string | null = null;
  hide = true;
  step = 1; // Track the current step

  stepOneForm!: FormGroup;
  stepTwoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private storeService: StoreService,
    private cdr: ChangeDetectorRef
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.stepOneForm = this.fb.group({
      vorname: ['', [Validators.required, Validators.minLength(3)]],
      nachname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordwd: ['', [Validators.required]],
    });

    this.stepTwoForm = this.fb.group({
      handynummer: ['', [Validators.required]],
      geburtsdatum: ['', [Validators.required]],
      strasse: ['', [Validators.required]],
      hausnummer: ['', [Validators.required]],
      ort: ['', [Validators.required]],
      plz: ['', [Validators.required, Validators.pattern('[0-9]{5}')]],
      image: ['', Validators.required],
    });
  }

  goToStepTwo(): void {
    if (this.stepOneForm.valid) {
      this.step = 2;
    }
  }

  onDateiAuswahl(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.stepTwoForm.patchValue({ image: this.imagePreview });
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  async onSubmit() {
    if (this.stepTwoForm.invalid) {
      alert('Bitte füllen Sie alle Felder aus.');
      return;
    }

    const formData = {
      ...this.stepOneForm.value,
      ...this.stepTwoForm.value,
    };

    try {
      await this.storeService.dispatch(singUp(formData));
      await axios.post('http://localhost:3030/img', {
        img: formData.image,
        text: 'aha',
      });

      const state = this.storeService.getState().user;
      this.singUpErorr = state.singUpError || [];
    } catch (error) {
      console.error('Fehler bei der Registrierung:', error);
    }
  }
  getErrorMessages(constraints: any): string[] {
    if (!constraints) return [];
    return Object.values(constraints);
  }
<<<<<<< HEAD
=======
  async onSubmit() {
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
      const state = this.storeService.getState().user;
      this.singUpErorr = state.singUpError || [];
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
>>>>>>> 0581701c84e888bac01c5ac3433d55a517c8cbc3
}
