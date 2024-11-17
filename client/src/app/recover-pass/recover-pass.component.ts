import { Component } from '@angular/core';

import { PagebennerComponent } from '../pagebenner/pagebenner.component';

import { TitleLineComponent } from '../title-line/title-line.component';
import { UnsereButtonComponent } from '../unsere-button/unsere-button.component';

@Component({
  selector: 'app-recover-pass',
  standalone: true,
  imports: [PagebennerComponent,UnsereButtonComponent, TitleLineComponent],
  templateUrl: './recover-pass.component.html',
  styleUrl: './recover-pass.component.css'
})
export class RecoverPassComponent {
  onClicke(): void {
    console.log('click singIn');
  }
}
