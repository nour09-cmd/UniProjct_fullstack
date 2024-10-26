import { Component, Input } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { PagebennerComponent } from "../pagebenner/pagebenner.component";
import { OurBTNComponent } from '../our-btn/our-btn.component';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [PagebennerComponent, OurBTNComponent],
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
