import { Component } from '@angular/core';

import { PagebennerComponent } from '../pagebenner/pagebenner.component';

import { TitleLineComponent } from '../title-line/title-line.component';
import { UnsereButtonComponent } from '../unsere-button/unsere-button.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from '../redux/store.service';

@Component({
  selector: 'app-recover-pass',
  standalone: true,
  imports: [
    NgOtpInputModule,
    PagebennerComponent,
    UnsereButtonComponent,
    TitleLineComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './recover-pass.component.html',
  styleUrl: './recover-pass.component.css',
})
export class RecoverPassComponent {
  otpForm: FormGroup;
  otpValue: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private storeService: StoreService
  ) {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  // The onOtpChange function will capture the OTP value as it changes
  onOtpChange(otp: string): void {
    this.otpValue = otp;
    this.otpForm.patchValue({ otp: this.otpValue });
    console.log('Form Data:', this.otpForm.value);
  }
  async onClicke() {
    if (this.otpForm.valid) {
      const otpData = this.otpForm.value;

    }
  }
}
