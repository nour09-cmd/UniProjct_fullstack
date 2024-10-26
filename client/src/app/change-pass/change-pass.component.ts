import { Component } from '@angular/core';
import { PagebennerComponent } from '../pagebenner/pagebenner.component';

import { OurBTNComponent } from '../our-btn/our-btn.component';
@Component({
  selector: 'app-change-pass',
  standalone: true,
  imports: [
    PagebennerComponent,
    OurBTNComponent,
  ],
  templateUrl: './change-pass.component.html',
  styleUrl: './change-pass.component.css'
})
export class ChangePassComponent {
onClicke(): void {
  console.log('click recover password');
}

}
