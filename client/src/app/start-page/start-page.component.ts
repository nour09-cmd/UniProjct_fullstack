import { Component, Input } from '@angular/core';
import {  Router } from '@angular/router';
import { PagebennerComponent } from "../pagebenner/pagebenner.component";
import { UnsereButtonComponent } from '../unsere-button/unsere-button.component';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [PagebennerComponent, UnsereButtonComponent],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.css'
})
export class StartPageComponent {
  @Input() title: string = ' ';
  @Input() discription: string = ' ';

  constructor(private router: Router) {}

  onSignUp(): void {
    console.log('Sign Up clicked');
    this.router.navigate(['/singup']);
  }

  onSignIn(): void {
    console.log('Sign In clicked');
    this.router.navigate(['/login']);
  }

  
}
