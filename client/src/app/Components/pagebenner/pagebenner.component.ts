import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagebenner',
  standalone: true,
  imports: [],
  templateUrl: './pagebenner.component.html',
  styleUrl: './pagebenner.component.css',
})
export class PagebennerComponent {
  @Input() title: string = 'SING UP';
  @Input() discription: string='Discover Amazing Thing Near Around You';
}
