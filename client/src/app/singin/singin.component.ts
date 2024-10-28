import { Component } from '@angular/core';
import { PagebennerComponent } from '../pagebenner/pagebenner.component';

import { TitleLineComponent } from '../title-line/title-line.component';
import { UnsereButtonComponent } from '../unsere-button/unsere-button.component';

@Component({
  selector: 'app-singin',
  standalone: true,
  imports: [PagebennerComponent,UnsereButtonComponent, TitleLineComponent],
  templateUrl: './singin.component.html',
  styleUrl: './singin.component.css',
})
export class SinginComponent {
  onClicke(): void {
    console.log('click singIn');
  }
}
