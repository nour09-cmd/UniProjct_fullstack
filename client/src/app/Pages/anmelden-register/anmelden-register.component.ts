import { Component, input } from '@angular/core';

import { Router } from '@angular/router';
import { PagebennerComponent } from '../../Components/pagebenner/pagebenner.component';

@Component({
  selector: 'app-anmelden-register',
  standalone: true,
  imports: [PagebennerComponent],
  templateUrl: './anmelden-register.component.html',
  styleUrls: ['./anmelden-register.component.css'],
})
export class AnmeldenRegisterComponent {
  readonly title = input<string>(' ');
  readonly discription = input<string>(' ');

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
