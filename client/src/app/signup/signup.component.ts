import { Component, Input } from '@angular/core';
import { PagebennerComponent } from '../pagebenner/pagebenner.component';
import { UnsereButtonComponent } from '../unsere-button/unsere-button.component';
import { TitleLineComponent } from '../title-line/title-line.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    PagebennerComponent,
    UnsereButtonComponent,
    TitleLineComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  loginForm: FormGroup;
  router: any;
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onClicke(): void {
    if (this.loginForm.value) {
      const { email, password } = this.loginForm.value;
      console.log({ email, password });
    }
    console.log('click signUp');
  }
  @Input() title: string = 'crete neu password';
  @Input() discription: string = 'discover amazing thing near around you';
  
  onSignUp(): void {
    console.log('Sign Up clicked');
    this.router.navigate(['/signup']);
  }

  onSignIn(): void {
    console.log('Sign In clicked');
    this.router.navigate(['/login']);
  }
}
