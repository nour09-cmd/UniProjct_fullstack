import { Component } from '@angular/core';
import { PagebennerComponent } from '../pagebenner/pagebenner.component';
import { OurBTNComponent } from '../our-btn/our-btn.component';
import { TitleLineComponent } from '../title-line/title-line.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [
    PagebennerComponent,
    OurBTNComponent,
    TitleLineComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.css',
})
export class SingupComponent {
  loginForm: FormGroup;
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
    console.log('click singUp');
  }
}
