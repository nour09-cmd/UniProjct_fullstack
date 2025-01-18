import { Component } from '@angular/core';

import { PagebennerComponent } from '../../Components/pagebenner/pagebenner.component';

import { TitleLineComponent } from '../../Components/title-line/title-line.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from '../../redux/store.service';

@Component({
  selector: 'app-recover-pass',
  standalone: true,
  imports: [
    NgOtpInputModule,
    PagebennerComponent,
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
