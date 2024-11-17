import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { ErrorStateMatcher, provideNativeDateAdapter, MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { PagebennerComponent } from '../pagebenner/pagebenner.component';
import { UnsereButtonComponent } from '../unsere-button/unsere-button.component';
import { TitleLineComponent } from '../title-line/title-line.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [

    ReactiveFormsModule,
    CommonModule,
    PagebennerComponent,
    UnsereButtonComponent,
    TitleLineComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  signINForm: FormGroup;  // Das Formular

  constructor(
    private fb: FormBuilder,
    private _router: Router
  ) {
    // Initialisiere das Formular mit Feldern
    this.signINForm = this.fb.group({
      email: this.emailFormControl,
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  
  // Eingabefelder und Validierungen
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  hide: boolean = true; 

  

  onClicke() {
    // Logik beim Klicken auf den Anmelden-Button
    if (this.signINForm.valid) {
      console.log("Formulardaten:", this.signINForm.value);
      // Hier kannst du die Logik zum Anmelden hinzufügen
    } else {
      console.log("Das Formular ist ungültig");
    }
  }

  @Input() title: string = 'sing in';  // Titel des Formulars
  @Input() discription: string = 'discover amazing thing near around you';
}
