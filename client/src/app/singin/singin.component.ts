import { Component } from '@angular/core';
import { PagebennerComponent } from '../pagebenner/pagebenner.component';
import { OurBTNComponent } from '../our-btn/our-btn.component';
import { TitleLineComponent } from '../title-line/title-line.component';

@Component({
  selector: 'app-singin',
  standalone: true,
  imports: [PagebennerComponent, OurBTNComponent, TitleLineComponent],
  templateUrl: './singin.component.html',
  styleUrl: './singin.component.css',
})
export class SinginComponent {
  onClicke(): void {
    console.log('click singIn');
  }
}
