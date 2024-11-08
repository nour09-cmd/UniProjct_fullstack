import { Component } from '@angular/core';

import { PagebennerComponent } from '../pagebenner/pagebenner.component';

import { TitleLineComponent } from '../title-line/title-line.component';
import { UnsereButtonComponent } from '../unsere-button/unsere-button.component';
import { NgOtpInputModule } from 'ng-otp-input';

@Component({
  selector: 'app-recover-pass',
  standalone: true,
  imports: [NgOtpInputModule ,PagebennerComponent,UnsereButtonComponent, TitleLineComponent],
  templateUrl: './recover-pass.component.html',
  styleUrl: './recover-pass.component.css'
})
export class RecoverPassComponent {
  onClicke(): void {
    console.log('click singIn');
  }
  otp: string = '';

  constructor() { }

  // The onOtpChange function will capture the OTP value as it changes
  onOtpChange(event: any) {
    this.otp = event;  // Update the OTP value as per input change

    // You can also log or do further processing here
    console.log('OTP entered: ', this.otp);

    // Additional functionality can be added here, such as checking if the OTP is complete.
    if (this.otp.length === 5) {
      console.log('OTP is complete:', this.otp);
      // Optionally call a service to validate the OTP or trigger some action
    }
  }
}

