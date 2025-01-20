import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

import {
  Validators,
  FormGroup,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { PagebennerComponent } from '../../Components/pagebenner/pagebenner.component';
import { TitleLineComponent } from '../../Components/title-line/title-line.component';
import { StoreService } from '../../redux/store.service';
import { singUp } from '../../redux/features/User/UserSlice';

import { MatSnackBar } from '@angular/material/snack-bar';

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
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  year = new Date();
  startDate = new Date(this.year.getFullYear() - 15, 0, 1);
  loading = true;
  singUpErorr: any = [];
  imagePreview: string | null = null;
  hide = true;
  step = 1;
  maxDate: Date;

  stepOneForm!: FormGroup;
  stepTwoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private storeService: StoreService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/']);
    }
    this.maxDate = new Date();
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
      geburtsdatum: ['', [Validators.required, this.validateAge]],
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
  goToStepOne(): void {
    this.step = 1;
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
      this.snackBar.open('Bitte füllen Sie alle Felder aus.', 'X', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['custom-snackbar-werning'],
      });
      return;
    }

    const formData = {
      ...this.stepOneForm.value,
      ...this.stepTwoForm.value,
    };

    try {
      await this.storeService.dispatch(singUp(formData));

      const state = this.storeService.getState().user;
      this.singUpErorr = state.singUpError || [];
    } catch (error) {
      console.error('Fehler bei der Registrierung:', error);
    }
  }

  async onSubmits() {
    const isFilled =
      this.isFormNotEmpty(this.stepOneForm) &&
      this.isFormNotEmpty(this.stepTwoForm);

    if (!this.stepTwoForm.value.image) {
      this.snackBar.open('Bitte füllen Sie bild Felder aus.', 'X', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['custom-snackbar-werning'],
      });
      console.log(this.stepOneForm.value + this.stepTwoForm.value);
      return;
    }

    if (this.stepOneForm.value.password !== this.stepOneForm.value.passwordwd) {
      this.snackBar.open('password stimmt nicht', 'X', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['custom-snackbar-werning '],
      });
      return;
    }

    const data: any = {
      image: this.stepTwoForm.value.image,
      email: this.stepOneForm.value.email,
      password: this.stepOneForm.value.password,
      vorname: this.stepOneForm.value.vorname,
      nachname: this.stepOneForm.value.nachname,
      handynummer: this.stepTwoForm.value.handynummer,
      geburtsdatum: this.stepTwoForm.value.geburtsdatum,
      address: {
        strasse: `${this.stepTwoForm.value.strasse} ${this.stepTwoForm.value.hausnummer}`,
        ort: this.stepTwoForm.value.ort,
        plz: this.stepTwoForm.value.plz,
      },
    };

    try {
      await this.storeService.dispatch(singUp(data));
      this.storeService.subcribe(() => {
        const state = this.storeService.getState().user;
        console.log(state.errors);
        this.singUpErorr = state.errors || [];
        if (state.errors == 'User registered successfully') {
          this.snackBar.open(`${state.errors}`, 'X', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['custom-snackbar-sucssec'],
          });
          this.stepOneForm.reset();
          this.stepTwoForm.reset();
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2500);
          return;
        }
        if (this.singUpErorr) {
          this.snackBar.open(`'Etwas ${state.errors}`, 'X', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['custom-snackbar-error'],
          });
          console.error('Signup Errors:', this.singUpErorr);
        }
      });
    } catch (error) {
      console.error('Fehler während des Formular-Submits:', error);
    }
  }

  private isFormNotEmpty(formGroup: FormGroup): boolean {
    return Object.values(formGroup.controls).every(
      (control) => control.value !== '' && control.valid
    );
  }
  getErrorMessages(constraints: any): string[] {
    if (!constraints) return [];
    return Object.values(constraints);
  }
  validateAge(control: any): { [key: string]: boolean } | null {
    const birthDate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    if (
      age < 16 ||
      (age === 16 &&
        (today.getMonth() < birthDate.getMonth() ||
          (today.getMonth() === birthDate.getMonth() &&
            today.getDate() < birthDate.getDate())))
    ) {
      return { tooYoung: true };
    }
    return null;
  }
}
