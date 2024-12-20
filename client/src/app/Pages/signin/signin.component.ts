import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PagebennerComponent } from '../../Components/pagebenner/pagebenner.component';
import { TitleLineComponent } from '../../Components/title-line/title-line.component';
import { UnsereButtonComponent } from '../../Components/unsere-button/unsere-button.component';
import { logIn } from '../../redux/features/User/UserSlice';
import { StoreService } from '../../redux/store.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    PagebennerComponent,
    UnsereButtonComponent,
    TitleLineComponent,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  userData: any;
  loading: boolean = true;

  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    private _router: Router
  ) {
    const token = localStorage.getItem('token') || '';

    if (token || token != '') {
      this._router.navigate(['/']);
    }
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  hide = true;
  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        const userData = this.loginForm.value;
        await this.storeService.dispatch(logIn(userData));
        this._router.navigate(['/']);
      } catch (error) {
        console.error('Login failed:', error);
        alert('Login fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldedaten.');
      }
    }
  }
}
