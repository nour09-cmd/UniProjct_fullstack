import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagebenner',
  standalone: true,
  imports: [],
  templateUrl: './pagebenner.component.html',
  styleUrl: './pagebenner.component.css',
})
export class PagebennerComponent {
  @Input() title: string = 'title';
  @Input() discription: string = 'discription';
}
