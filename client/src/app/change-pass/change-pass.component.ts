import { Component } from '@angular/core';
import { PagebennerComponent } from '../Components/pagebenner/pagebenner.component';

import { UnsereButtonComponent } from '../Components/unsere-button/unsere-button.component';
@Component({
  selector: 'app-change-pass',
  standalone: true,
  imports: [PagebennerComponent, UnsereButtonComponent],
  templateUrl: './change-pass.component.html',
  styleUrl: './change-pass.component.css',
})
export class ChangePassComponent {
  onClicke(): void {
    console.log('click recover password');
  }
}
