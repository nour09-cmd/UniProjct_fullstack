import { Component, Input } from '@angular/core';
import { PagebennerComponent } from '../pagebenner/pagebenner.component';
import { UnsereButtonComponent } from '../unsere-button/unsere-button.component';
import { TitleLineComponent } from '../title-line/title-line.component';

import {  Router } from '@angular/router';

@Component({
  selector: 'app-anmelden-register',
  standalone: true,
  imports: [PagebennerComponent, UnsereButtonComponent, TitleLineComponent],
  templateUrl: './anmelden-register.component.html',
  styleUrls: ['./anmelden-register.component.css'],
})
export class AnmeldenRegisterComponent {
  @Input() title: string = ' ';
  @Input() discription: string = ' ';

  constructor(private router: Router) {}
  onSignUp(): void {
    console.log('Sign Up clicked');
    this.router.navigate(['/signup']);
  }

  onSignIn(): void {
    console.log('Sign In clicked');
    this.router.navigate(['/login']);
  }
}
