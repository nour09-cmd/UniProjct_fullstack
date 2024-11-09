import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { PagebennerComponent } from '../pagebenner/pagebenner.component';
import { UnsereButtonComponent } from '../unsere-button/unsere-button.component';
import { TitleLineComponent } from '../title-line/title-line.component';
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
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signUPForm: FormGroup;
  constructor(private fb: FormBuilder, private _router: Router) {
    this.signUPForm = this.fb.group({
      image: ['', [Validators.required, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      vorname: ['', [Validators.required, Validators.minLength(3)]],
      nachname: ['', [Validators.required, Validators.minLength(3)]],
      handynummer: ['', [Validators.required, Validators.minLength(12)]],
      geburtsdatum: ['', [Validators.required, Validators.minLength(6)]],
      strasse: ['', [Validators.required, Validators.minLength(3)]],
      hausnummer: ['', [Validators.required, Validators.minLength(1)]],
      ort: ['', [Validators.required, Validators.minLength(3)]],
      plz: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  onSubmit() {
    throw new Error('Method not implemented.');
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new ErrorStateMatcher();

  errorStateMatcher: ErrorStateMatcher | undefined;
  imagePreview: any;
  fileName: any;
  hide: any;

  onClicke() {
    console.log(this.signUPForm.value);
  }

  @Input() title: string = 'crete neu password';
  @Input() discription: string = 'discover amazing thing near around you';

  selectedFileName: string | null = null;
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Hier können Sie die ausgewählte Datei weiterverarbeiten
      console.log('Ausgewählte Datei:', file);
    }
  }
}
