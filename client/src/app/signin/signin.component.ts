import { Component } from '@angular/core';
import { PagebennerComponent } from '../pagebenner/pagebenner.component';

import { TitleLineComponent } from '../title-line/title-line.component';
import { UnsereButtonComponent } from '../unsere-button/unsere-button.component';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [PagebennerComponent,UnsereButtonComponent, TitleLineComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  onClicke(): void {
    console.log('click singIn');
  }
}
