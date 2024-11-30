import { Component } from '@angular/core';
import { PagebennerComponent } from '../../Components/pagebenner/pagebenner.component';
import { TitleLineComponent } from '../../Components/title-line/title-line.component';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [PagebennerComponent, TitleLineComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  onClicke() {
    throw new Error('Method not implemented.');
  }
}
